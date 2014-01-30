// eventually, you'll have some code here that uses the code in `archive-helpers.js` 
// to actually download the urls you want to download.
var path = require('path');
var archive = require(path.join(__dirname, '../helpers/archive-helpers'));
var memStore;

archive.readListOfUrls();

setTimeout(function(){
  memStore = archive.getMem();

  for (var keys in memStore){
    if(!archive.isURLArchived(keys)){
      archive.downloadUrls(keys);
      console.log(keys + ' downloaded to archive');
    }
}

}, 1000);






