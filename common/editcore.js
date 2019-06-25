/**
 * editcore.js
 */

"use strict";

const incomplete = "Il manque des données obligatoires dans le formulaire. Veuillez les compléter avant de l'envoyer. Merci.";

var editSupervisor = false;

function createHtmlEdit() {
    /*
    * insert editing element in the HTML
    */
    var s, h;
    s = buildTab(actkeyList, "actkey", 2);
    h = document.getElementById("listactkey");
    h.innerHTML = s;
    s = buildTab(themekeyList, "themekey", 2);
    h = document.getElementById("listthemekey");
    h.innerHTML = s;
    s = buildTab(keywordsList, "keywords", 2);
    h = document.getElementById("listkeys");
    h.innerHTML = s;
    /*
    s = buildTab(langMotherList, "langmother", 2, "lowercase");
    h = document.getElementById("listlangmother");
    h.innerHTML = s;
    s = buildTab(langSecondList, "langsecond", 2, "lowercase");
    h = document.getElementById("listlangsecond");
    h.innerHTML = s;
    */
    // lang mother
    s = buildTabOrdered(langMotherList, "langmotherchoices", "langmotherselected", 3, "lowercase");
    h = document.getElementById("langmotherlist");
    h.innerHTML = s;
    s = iso('langmotheriso', 'langmotherisolist');
    h = document.getElementById("langmotheriso");
    h.innerHTML = s;
    // lang second
    s = buildTabOrdered(langSecondList, "langsecondchoices", "langsecondselected", 3, "lowercase");
    h = document.getElementById("langsecondlist");
    h.innerHTML = s;
    s = iso('langsecondiso', 'langsecondisolist');
    h = document.getElementById("langsecondiso");
    h.innerHTML = s;
    // lang extract
    s = buildTabOrdered(langExtractList, "langextractchoices", "langextractselected", 3, "lowercase");
    h = document.getElementById("langextractlist");
    h.innerHTML = s;
    s = iso('langextractiso', 'langextractisolist');
    h = document.getElementById("langextractiso");
    h.innerHTML = s;
}

function iso(place, ident) {
    // choice in a list
    var s = '<select class="selectlist iso" ';
    s += ' id="' + ident + '" ';
    s += ' name="' + ident + '" >\n';
    for (let k=0; k < code639.length; k++) {
        s += '<option value="' +
        code639[k].code + '" ';
        s += '>' + code639[k].name /* + ' - ' + iso639.code639[k].desc */ + '</option>\n';
    }
    s += '</select>\n';
    return s;
}

window.addlangextract = function () {
    var v = $('input[name="languageextract"]').val();
    if (v !== "") window.moveTagTo("langextractchoices", "langextractselected", v);
}

window.addlang = function(inputplace, tagplace, idselected) {
    var v = $('#' + inputplace);
    v = v.val();
    if (v !== "") window.moveTagTo(tagplace, idselected, v);
}

window.moveTagTo = function (place, category, value) {
    // the span contains a category in the class to find them all and
    // an ID to remove a specific element
    var s = '<span class="langtag ' + category
            + '" data-value="' + value 
            + '" id="orderboxplaced_' + category + value 
            + '" onclick="window.removeTag(\'orderboxplaced_' 
            + category + value + '\');">' + "&#x2716; " + value + "</span>";
    var p = document.getElementById(place);
    p.insertAdjacentHTML('beforeend', s);
}

window.removeTag = function (place) {
    var p = document.getElementById(place);
    p.remove();
}

function isValidEmailAddress(emailAddress) {
    var pattern = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
    return pattern.test(emailAddress);
}

function limitTo(v, max) {
    var vv = v.val();
    vv = vv.substr(0, max);
    if (vv.length > max) v.val(vv);
    return vv;
}

function getXmlData() {
    var meta = {};
    meta.act = "";
    meta.theme = "";
    meta.duration = "";
    var v, vv, l;
    // Check values
    // and insert them
    // Information about the depositor
    // name
    v = $('input[name="name"]');
    v = limitTo(v, 80);
    if ( !v ) {
        window.alert(incomplete);
        return '';
    }
    meta.name = v;
    // surname
    v = $('input[name="surname"]');
    v = limitTo(v, 80);
    if ( !v ) {
        window.alert(incomplete);
        return '';
    }
    meta.surname = v;
    // institution
    v = $('input[name="institution"]');
    meta.institution = limitTo(v, 240);
    // email
    v = $('input[name="email"]');
    vv = limitTo(v, 240);
    if ( !isValidEmailAddress(vv) ) {
        window.alert('Adresse email invalide: veuillez la corriger');
        return '';
    }
    meta.email = vv;
    // information about the extract : metadata
    // agreement
    v = $('input[name="agree"]');
    meta.agree = v.is(':checked') ? "agreement signed" : "no agreement";
    // mail contact
    v = $('input[name="contact"]');
    meta.contact = v.is(':checked') ? "contact ok" : "no contact";
    // namechi
    v = $('input[name="namechi"]');
    v = limitTo(v, 80);
    if ( !v ) {
        window.alert(incomplete);
        return '';
    }
    meta.child = v;
    // gender
    v = $('input[name="gender"]:checked');
    if (v.length < 1) v = "unknown"; else v = v.val();
    meta.gender = v;
    // age
    v = $('input[name="age"]');
    if ( !v ) {
        window.alert(incomplete);
        return '';
    }
    meta.age = limitTo(v, 80);
    // localisation
    v = $('input[name="localisation"]');
    vv = v.val();
    if (vv.length > 300) {
        vv.substr(0, 300);
        window.alert("Le texte du message est limité à 300 caractères.");
        v.val(vv);
    }
    meta.place = vv;

    // languagemother
    l = checkedTabClass("langmotherselected");
    meta.languagemother = l.join(',');
    // languagesecond
    l = checkedTabClass("langsecondselected");
    meta.languagesecond = l.join(',');
    // languageextract
    l = checkedTabClass("langextractselected");
    meta.languageextract = l.join(',');

    // discourse
    v = $('input[name="disc"]:checked').val();
    if (v === undefined) v = "unknown";
    meta.disc = v;
    // project
    v = $('input[name="project"]');
    meta.project = limitTo(v, 120);

    // information about the extract : data
    // title/entry
    v = $('input[name="title"]');
    if ( !v ) {
        window.alert(incomplete);
        return '';
    }
    meta.title = limitTo(v, 80);

    // description
    v = $('textarea[name="description"]');
    vv = v.val();
    if (vv.length > 1200) {
        vv.substr(0, 1200);
        window.alert("Le texte de la description est limité à 1200 caractères.");
        v.val(vv);
    }
    meta.description = vv;

    // transcription
    v = $('textarea[name="transcription"]');
    vv = v.val();
    if (vv.length > 12000) {
        vv.substr(0, 12000);
        window.alert("Le texte de la transcription est limité à 12000 caractères.");
        v.val(vv);
    }
    meta.transcription = vv;

    // quote
    v = $('textarea[name="quote"]');
    vv = v.val();
    if (vv.length > 1200) {
        vv.substr(0, 1200);
        window.alert("Le texte des références est limité à 1200 caractères.");
        v.val(vv);
    }
    meta.quote = vv;

    // actkey
    l = checkedTab(actkeyList, "actkey");
    v = $('input[name="actkey"]');
    v = limitTo(v, 240);
    // v représente les ajouts non normalisés de la personne
    // on les mets dans act si pas editSupervisor === true (moderated editing)
    if (editSupervisor !== true) {
        meta.actkey = l.join(',');
        if (v !== "") meta.act = v;
    } else {
        if (v !== "")
            meta.actkey = l.join(',') + ',' + v;
        else
            meta.actkey = l.join(',');
    }

    // themekey
    l = checkedTab(themekeyList, "themekey");
    v = $('input[name="themekey"]');
    v = limitTo(v, 240);
    // v représente les ajouts non normalisés de la personne
    // on les mets dans theme
    if (editSupervisor !== true) {
        meta.themekey = l.join(',');
        if (v !== "") meta.theme = v;
    } else {
        if (v !== "")
            meta.themekey = l.join(',') + ',' + v;
        else
            meta.themekey = l.join(',');
    }

    // keywords
    l = checkedTab(keywordsList, "keywords");
    v = $('input[name="keywords"]');
    v = limitTo(v, 240);
    if (v !== "")
        meta.keywords = l.join(',') + ',' + v;
    else
        meta.keywords = l.join(',');

    // extmedia
    v = $('input[name="extmedia"]');
    meta.extmedia = limitTo(v, 240);

    return meta;
}

function getXmlDataUser() {
    var meta = getXmlData();
    if (meta === '') return '';

    meta.entry = getEntryName();

    var str = $("#file")[0].value;
    var n = /[^/\\]*$/.exec(str);
    meta.media = n; 

    return parsemetadata.metadataToString(meta);
}

function getXmlDataValidator() {
    var meta = getXmlData();
    if (meta === '') return '';

    // entry
    v = $('input[name="entry"]');
    v = limitTo(v, 240);
    meta.entry = vv;

    // act
    l = checkedTab(actList, "act");
    v = $('input[name="act"]');
    v = limitTo(v, 240);
    if (v !== "")
        meta.act = l.join(',');
    else
        meta.act = l.join(',') + ',' + v;

    // theme
    l = checkedTab(themeList, "theme");
    v = $('input[name="theme"]');
    v = limitTo(v, 240);
    if (v !== "")
        meta.theme = l.join(',');
    else
        meta.theme = l.join(',') + ',' + v;

    // duration
    v = $('input[name="duration"]');
    v = limitTo(v, 240);
    meta.duration = vv;

    // media
    v = $('input[name="media"]');
    v = limitTo(v, 240);
    meta.media = vv;

    return parsemetadata.metadataToString(meta);
}

function formatDate(date) {
    var monthNames = [
        "January", "February", "March",
        "April", "May", "June", "July",
        "August", "September", "October",
        "November", "December"
    ];

    var day = date.getDate();
    var monthIndex = date.getMonth();
    var year = date.getFullYear();
    var hours = date.getHours();
    var minutes = date.getMinutes();

    // return day + ' ' + monthNames[monthIndex] + ' ' + year;
    return year+ "-" + (monthIndex+1) + "-" + day + "-" + hours + "h-" + minutes + "m";
}

function getEntryName() {
    // name
    var v = $('input[name="name"]');
    var name = v.val().replace(/\s/g, "-");
    if (name.length > 80) name = name.substr(0, 80);
    // surname
    v = $('input[name="surname"]');
    var surname = v.val().replace(/\s/g, "-");
    if (surname.length > 80) surname = surname.substr(0, 80);
    var d = new Date();
    return name + "-" + surname + "-" + formatDate(d);
}
