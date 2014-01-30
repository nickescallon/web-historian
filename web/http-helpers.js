var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');

exports.headers = headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10, // Seconds.
  'Content-Type': "text/html"
};

exports.serveAssets = function(res, asset, path) {
  
/*--------------------SETS PATH------------------------*/
  if (path === undefined){
    path = archive.paths.siteAssets;
  } else {
    path = archive.paths[path] + '/';
  }

/*---------------READS FILE, SENDS RESPONSE-------------*/
  var filePath = path + asset;
  fs.readFile(filePath, function(err, data){
  	if (err){
  		throw err;
  	}
  	exports.sendResponse(res, data);
  });

};

// As you progress, keep thinking about what helper functions you can put here!

exports.sendResponse = function(res, object, status){
  status = status || 200;

  res.writeHead(status, exports.headers);
  res.end(object);
}