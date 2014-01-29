var path = require('path');
var archive = require('../helpers/archive-helpers');
var helpers = require('./http-helpers');
var url = require('url');
// require more modules/folders here!

exports.handleRequest = function (req, res) {
  var parsedUrl = url.parse(req.url);
  //console.log(parsedUrl);


  //need to check the parsed URL against the sites.txt file
  archive.readListOfUrls();


  if (parsedUrl.path === '/'){
    //return the rendered index.html file
    helpers.serveAssets(res, 'index.html');
   
  } else if (parsedUrl.path === '/styles.css'){
    //return the rendered index.html file
    helpers.serveAssets(res, 'styles.css');
   
  } else {
    helpers.sendResponse(res, null, 404);
  }

   




  // res.writeHead(200, helpers.headers);
  // res.end(archive.paths.list);
};

