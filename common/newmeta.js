/**
 * newmeta.js
 */

var fs = require('fs');
var glob = require("glob");

var pm = require('./parsemetadata.js')

var files = glob.sync('./data/doc/*/metadata-short.xml');

for (var f in files) {
    var fctn = fs.readFileSync(files[f]).toString();
    var meta = pm.parseMetadata(fctn, files[f]);

    var fnr = files[f].substr(0, files[f].length - "/metadata-short.xml".length);
    try {
        var title = fs.readFileSync(fnr + '/title.txt').toString();
        if (title === null || title === undefined) title = '';
        meta.title = title.trim();
    } catch (error) {
        console.log('## Missing: title.txt not found in ' + fnr);
        meta.title = "";
    }
    try {
        var transcription = fs.readFileSync(fnr + '/transcription.txt').toString();
        if (transcription === null || transcription === undefined) transcription = '';
        meta.transcription = transcription;
    } catch (error) {
        console.log('## Missing: transcription.txt not found in ' + fnr);
        meta.transcription = "";
    }
    try {
        var description = fs.readFileSync(fnr + '/description.txt').toString();
        if (description === null || description === undefined) description = '';
        meta.description = description;
    } catch (error) {
        console.log('## Missing: description.txt not found in ' + fnr);
        meta.description = "";
    }
    try {
        var quote = fs.readFileSync(fnr + '/quote.txt').toString();
        if (quote === null || quote === undefined) quote = '';
        meta.quote = quote;
    } catch (error) {
        console.log('## Missing: quote.txt not found in ' + fnr);
        meta.quote = "";
    }
    var s = pm.metadataToString(meta);
    fs.writeFileSync(fnr + '/metadata.xml', s);
}