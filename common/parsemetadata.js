/**
 * parsemetadata.js
 */

if (typeof exports !== 'undefined') {
    var parsemetadata = exports;
    var DOMParser = require('xmldom').DOMParser;
} else {
    var parsemetadata = {};
}


/**
 * convert XML to text format
 * @method xmlEntitiesDecode
 * @param xml coded text
 * @return plain text
 */
parsemetadata.xmlEntitiesDecode = function(texte) {
    if (texte === undefined) return '';
	texte = texte.replace(/&quot;/g,'"'); // 34 22
	texte = texte.replace(/&amp;/g,'&'); // 38 26
	texte = texte.replace(/&#39;/g,"'"); // 39 27
	texte = texte.replace(/\&lt\;/g,'<'); // 60 3C
	texte = texte.replace(/\&gt\;/g,'>'); // 62 3E
	//texte = texte.replace(/&circ;/g,'^'); // 94 5E
	return texte;
}

/**
 * convert text to XML format
 * @method xmlEntitiesEncode
 * @param plain text
 * @return xml coded text
 */
parsemetadata.xmlEntitiesEncode = function(texte) {
    if (texte === undefined) return '';
    texte = texte.replace(/&/g, '&amp;'); // 38 26
    texte = texte.replace(/"/g, '&quot;'); // 34 22
    texte = texte.replace(/\'/g, '&#39;'); // 39 27
    texte = texte.replace(/\</g, '&lt;'); // 60 3C
    texte = texte.replace(/\>/g, '&gt;'); // 62 3E
    //texte = texte.replace(/\^/g,'&circ;'); // 94 5E
    return texte;
}

parsemetadata.checkElement = function(xml, name, fn) {
    var h = xml.getElementsByTagName(name);
    if (h.length > 1)
        console.log('// Warning: more than one element for ', name, ' in ', fn);
    if (h.length < 1) {
        console.log('// Error: no element for ', name, ' in ', fn);
        return "";
    }
    var cn = h[0].childNodes;
    if (cn.length > 1)
        console.log('// Warning: more than one childNodes for ', name, ' in ', fn);
    if (cn.length < 1) {
        console.log('// Error: no child node for ', name, ' in ', fn);
        return "";
    }
    var v = cn[0].nodeValue;
    if (v === undefined || v === null) return "";
    return v;
}

/*
parsemetadata.parseTitle = function(fn) {
    var fnr = fn.substr(0, fn.length - "/metadata.xml".length);
    var i = fnr.lastIndexOf("/");
    if (i < 0) return fnr;
    return fnr.substr(i+1);
}
*/

parsemetadata.parseMetadata = function(text, fn) {
    var meta = {};
    var parser = new DOMParser();
    var xml = parser.parseFromString(text,"text/xml");

    // depositor
    meta.name = parsemetadata.checkElement(xml, "name", fn);
    meta.surname = parsemetadata.checkElement(xml, "surname", fn);
    meta.institution = parsemetadata.checkElement(xml, "institution", fn);
    meta.email = parsemetadata.checkElement(xml, "email", fn);
    
    // for us: the reference of the extract
    meta.entry = parsemetadata.checkElement(xml, "entry", fn);

    // the extract - metadata
    meta.agree = parsemetadata.checkElement(xml, "agree", fn);
    meta.child = parsemetadata.checkElement(xml, "child", fn);
    meta.gender = parsemetadata.checkElement(xml, "gender", fn);
    meta.age = parsemetadata.checkElement(xml, "age", fn);
    meta.languagemother = parsemetadata.checkElement(xml, "languagemother", fn);
    meta.languagesecond = parsemetadata.checkElement(xml, "languagesecond", fn);
    meta.languageextract = parsemetadata.checkElement(xml, "languageextract", fn);
    meta.place = parsemetadata.checkElement(xml, "place", fn);
    meta.disc = parsemetadata.checkElement(xml, "disc", fn);
    meta.project = parsemetadata.checkElement(xml, "project", fn);

    // the extract data
    var s = parsemetadata.checkElement(xml, "title", fn);
    meta.title = parsemetadata.xmlEntitiesDecode(s);
    s = parsemetadata.checkElement(xml, "description", fn);
    meta.description = parsemetadata.xmlEntitiesDecode(s);
    s = parsemetadata.checkElement(xml, "transcription", fn);
    meta.transcription = parsemetadata.xmlEntitiesDecode(s);
    s = parsemetadata.checkElement(xml, "quote", fn);
    meta.quote = parsemetadata.xmlEntitiesDecode(s);

    meta.media = parsemetadata.checkElement(xml, "media", fn);
    meta.extmedia = parsemetadata.checkElement(xml, "extmedia", fn);
    meta.act = parsemetadata.checkElement(xml, "act", fn);
    meta.theme = parsemetadata.checkElement(xml, "theme", fn);
    meta.keywords = parsemetadata.checkElement(xml, "keywords", fn);
    meta.actkey = parsemetadata.checkElement(xml, "actkey", fn);
    meta.themekey = parsemetadata.checkElement(xml, "themekey", fn);
    meta.duration = parsemetadata.checkElement(xml, "duration", fn);

    return meta;
}

parsemetadata.metadataToString = function(meta) {
    var s = "<extract>\n";
    // depositor
    s += '<name>' + meta.name + '</name>\n';
    s += '<surname>' + meta.surname + '</surname>\n';
    s += '<institution>' + meta.institution + '</institution>\n';
    s += '<email>' + meta.email + '</email>\n';

    // for us
    s += '<entry>' + meta.entry + '</entry>\n';

    // extract - metadata
    s += '<agree>' + meta.agree + '</agree>\n';
    s += '<child>' + meta.child + '</child>\n';
    s += '<gender>' + meta.gender + '</gender>\n';
    s += '<age>' + meta.age + '</age>\n';
    s += '<languagemother>' + meta.languagemother + '</languagemother>\n';
    s += '<languagesecond>' + meta.languagesecond + '</languagesecond>\n';
    s += '<languageextract>' + meta.languageextract + '</languageextract>\n';
    s += '<place>' + meta.place + '</place>\n';
    s += '<disc>' + meta.disc + '</disc>\n';
    s += '<project>' + meta.project + '</project>\n';

    // extract data
    s += '<title>' + parsemetadata.xmlEntitiesEncode(meta.title) + '</title>\n';
    s += '<description>' + parsemetadata.xmlEntitiesEncode(meta.description) + '</description>\n';
    s += '<transcription>' + parsemetadata.xmlEntitiesEncode(meta.transcription) + '</transcription>\n';
    s += '<quote>' + parsemetadata.xmlEntitiesEncode(meta.quote) + '</quote>\n';
    s += '<media>' + meta.media + '</media>\n';
    s += '<extmedia>' + meta.extmedia + '</extmedia>\n';
    s += '<act>' + meta.act + '</act>\n';
    s += '<actkey>' + meta.actkey + '</actkey>\n';
    s += '<theme>' + meta.theme + '</theme>\n';
    s += '<themekey>' + meta.themekey + '</themekey>\n';
    s += '<keywords>' + meta.keywords + '</keywords>\n';
    s += '<duration>' + meta.duration + '</duration>\n';
    // name
    // surname
    // email
    // institution
    s += "</extract>\n";
    return s;
}
