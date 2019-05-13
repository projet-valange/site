/**
 * construct.js
 */

var fs = require('fs');
var glob = require("glob");

var pm = require('./parsemetadata.js')

var files = glob.sync('./data/doc/*/metadata.xml');

console.log("var valange_data = [");
for (var f in files) {
    var fctn = fs.readFileSync(files[f]).toString();
    var meta = pm.parseMetadata(fctn, files[f]);
    console.log("{");
    console.log('title: "' + meta.title + '",');
    console.log('entry: "' + meta.entry + '",');
    console.log('media: "' + meta.media + '",');
    console.log('project: "' + meta.project + '",');
    console.log('child: "' + meta.child + '",');
    console.log('age: "' + meta.age + '",');
    console.log('lang: "' + meta.lang + '",');
    console.log('act: "' + meta.act + '",');
    console.log('actkey: "' + meta.actkey + '",');
    console.log('theme: "' + meta.theme + '",');
    console.log('themekey: "' + meta.themekey + '",');
    console.log('keywords: "' + meta.keyword + '",');
    console.log('duration: "' + meta.duration + '",');
    console.log("},");
}
console.log("]");
