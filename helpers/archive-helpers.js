var fs = require('fs');
var http = require('http');
var path = require('path');

/* You will need to reuse the same paths many times over in the course of this sprint.
  Consider calling this function in `request-handler.js` and passing in the necessary
  directories/files. This way, if you move any files, you'll only need to change your
  code in one place! Feel free to customize it in any way you wish.
*/

exports.paths = {
  'siteAssets' : path.join(__dirname, '../web/public/'),
  'archivedSites' : path.join(__dirname, '../archives/sites'),
  'list' : path.join(__dirname, '../archives/sites.txt'),
};

// Used for stubbing paths for jasmine tests, do not modify
exports.initialize = function(pathsObj){
  for(var type in pathsObj) {
    // Check that the type is valid
    if (exports.paths[type] && pathsObj.hasOwnProperty(type)) {
      exports.paths[type] = pathsObj[type];
    }
  }
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

var memStore = {}; //Object that gets populated on readListofUrls

exports.readListOfUrls = function(){
  fs.readFile(exports.paths.list, 'utf8', function(err, data){
    if (err){
      throw err;
    }
    var dataArray = data.split('\n');
    for (var i =0; i<dataArray.length; i++){
      if (memStore[dataArray[i]] === undefined){
        memStore[dataArray[i]] = dataArray[i];
      }
    }
  });
};

exports.isUrlInList = function(site){
  var found = false;
  if (memStore[site] !== undefined){
    found = true;
  }
  return found;
};

exports.addUrlToList = function(url){
  if (memStore[url] === undefined){ //maybe redundant?
    fs.appendFile(exports.paths.list, (url + '\n'), function(){
      memStore[url] = url;
    });
  }
};

exports.isURLArchived = function(site){
  var found = false;
  var file = exports.paths.archivedSites + '/' + site;
  fs.existsSync(file) ? found = true : console.log('not found');

  return found;
};

exports.downloadUrls = function(url){
  var options = {
    host: url,
    port: 80,
    path: '/',
    method: 'GET'
  };

  var dataString = '';

  http.get(options, function(res){
    res.on('data', function(chunk){
      dataString += chunk;
      //console.log(chunk);
    });

    res.on('end', function(){
      //console.log(dataString);
      //WRITE TO FILE
      var path = exports.paths.archivedSites + '/' + url;
      fs.writeFile(path, dataString, function(err){
        if (err){
          throw err;
        }
        console.log('FILE DOWNLOADED');
      });
    });
  });

};

