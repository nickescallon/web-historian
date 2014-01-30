var path = require('path');
var archive = require('../helpers/archive-helpers');
var helpers = require('./http-helpers');
var url = require('url');
// require more modules/folders here!
var isWww = /^\/www\./;
var notYet = "This site has not yet been archived. Archiving..."
var archiving = "This site is still Archiving";

archive.readListOfUrls();

exports.handleRequest = function (req, res) {
  var parsedUrl = url.parse(req.url);


  if (req.method === 'GET'){
    if (isWww.test(parsedUrl.path)){
      //check to see if URI is in memStore

      var unSlashed = parsedUrl.path.match(/www.*.com/);
      archive.readListOfUrls();
      if (archive.isUrlInList(unSlashed)){
        //check if page is archived
        if (archive.isURLArchived(unSlashed)){
          helpers.serveAssets(res, unSlashed, 'archivedSites');
        }else{
          //need to refactor to send to LOADING
          helpers.sendResponse(res, archiving, 200);
        }
       
      }else{
        
        archive.addUrlToList(unSlashed);
        //archive page
        archive.downloadUrls(unSlashed[0]);
        //redirect to loading
        helpers.sendResponse(res, notYet, 200);
      }


      //helpers.sendResponse(res, 'site check working');

    } else if (parsedUrl.path === '/'){
      //return the rendered index.html file
      helpers.serveAssets(res, 'index.html');
     
    } else if (parsedUrl.path === '/styles.css' || parsedUrl.path === '/public/styles.css'){
      //return the rendered index.html file
      helpers.serveAssets(res, 'styles.css');
     
    } else if (parsedUrl.path === '/loading.html'){
      //return the rendered index.html file
      helpers.serveAssets(res, 'loading.html');
     
    } else {
      helpers.sendResponse(res, null, 404);
    }    
  
  }else if (req.method === 'POST'){
    //if site is archived, redirect to the site
    //if site is not in sites.txt, add it!
    var dataString = '';

    req.on('data', function(chunk) {
      dataString += chunk;
    });
    
    req.on('end', function() {
      //this strips the 'url=' from the front of the POST data
      dataString = dataString.match(/www.*.com/)[0];
      
      if (!archive.isUrlInList(dataString)){
        //add URL to list.txt
        archive.addUrlToList(dataString);
        //archive page
        archive.downloadUrls(dataString);
      }

      helpers.sendResponse(res, dataString, 302);
    });


    
  }
  

   


};

