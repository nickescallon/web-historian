var path = require('path');
var archive = require('../helpers/archive-helpers');
var helpers = require('./http-helpers');
var url = require('url');
// require more modules/folders here!
var isWww = /^\/www\./;
var notYet = "This site has not yet been archived. Archiving..."

exports.handleRequest = function (req, res) {
  var parsedUrl = url.parse(req.url);
  //console.log(parsedUrl);



  if (isWww.test(parsedUrl.path)){
    //check to see if URI is in memStore

    var unSlashed = parsedUrl.path.match(/www.*.com/);
    archive.readListOfUrls();
    if (archive.isUrlInList(unSlashed)){
      //serve up archived page 
      helpers.serveAssets(res, unSlashed, 'archivedSites');

    }else{
      helpers.sendResponse(res, notYet, 200);
      //archive page;
    }


    //helpers.sendResponse(res, 'site check working');

  } else if (parsedUrl.path === '/'){
    //return the rendered index.html file
    helpers.serveAssets(res, 'index.html');
   
  } else if (parsedUrl.path === '/styles.css'){
    //return the rendered index.html file
    helpers.serveAssets(res, 'styles.css');
   
  } else {
    helpers.sendResponse(res, null, 404);
  }

   


};

