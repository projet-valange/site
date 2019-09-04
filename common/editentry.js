/**
 * editentry.js
 */

/*
* insert editing element in the HTML
*/
function createHtmlEditComplements(params) {
    var s = buildTab(actList, "act", 2);
    var h = document.getElementById("listact");
    h.innerHTML = s;
    var s = buildTab(themeList, "theme", 2);
    var h = document.getElementById("listtheme");
    h.innerHTML = s;
}

var lastfilename = "extract.xml";
/**
 * function for opening an external file and filling the data
 */
system.process = function(filename, filecontent) {
    lastfilename = filename;
    var meta = parsemetadata.parseMetadata(filecontent, filename);
    console.log(filecontent);
    console.log(meta);

    $('#nameentry').text(meta.entry);
    $('input[name="name"]').val(meta.name);
    $('input[name="surname"]').val(meta.surname)
    $('input[name="institution"]').val(meta.institution);
    $('input[name="email"]').val(meta.email);
    $('input[name="namechi"]').val(meta.child);
    $('input[name="age"]').val(meta.age);
    $('input[name="localisation"]').val(meta.localisation);
    $('input[name="project"]').val(meta.project);
    $('input[name="title"]').val(meta.title);
    $('textarea[name="description"]').val(meta.description);
    $('textarea[name="transcription"]').val(meta.transcription);
    $('textarea[name="quote"]').val(meta.quote);
    // $('input[name="act"]').val(meta.act);
    var ls = meta.actkey.trim().split(/[\s,]+/g);
    for (var i in ls) {
        if (ls[i]) {
            var id = 'checkbox_' + 'actkey' + '_' + ls[i];
            $( "#" + id ).prop( "checked", true );
        }
    }
    // $('input[name="theme"]').val(meta.theme);
    var ls = meta.themekey.trim().split(/[\s,]+/g);
    for (var i in ls) {
        if (ls[i]) {
            var id = 'checkbox_' + 'themekey' + '_' + ls[i];
            $( "#" + id ).prop( "checked", true );
        }
    }
    // $('input[name="keywords"]').val(meta.keywords);
    /*
    var ls = meta.keywords.trim().split(/[\s,]+/g);
    for (var i in ls) {
        if (ls[i]) {
            var id = 'checkbox_' + 'keywords' + '_' + ls[i];
            $( "#" + id ).prop( "checked", true );
        }
    }
    */
    $('input[name="media"]').val(meta.media);
    $('input[name="extmedia"]').val(meta.extmedia);
    $('input[name="entry"]').val(meta.entry);
    // $('input[name="actkey"]').val(meta.actkey);
    var ls = meta.act.trim().split(/[\s,]+/g);
    for (var i in ls) {
        if (ls[i]) {
            var id = 'checkbox_' + 'act' + '_' + ls[i];
            $( "#" + id ).prop( "checked", true );
        }
    }
    // $('input[name="themekey"]').val(meta.themekey);
    var ls = meta.theme.trim().split(/[\s,]+/g);
    for (var i in ls) {
        if (ls[i]) {
            var id = 'checkbox_' + 'theme' + '_' + ls[i];
            $( "#" + id ).prop( "checked", true );
        }
    }
    $('input[name="duration"]').val(meta.duration);

    /*
    $('input[name="languagemother"]').val(meta.languagemother);
    $('input[name="languagesecond"]').val(meta.languagesecond);
    $('input[name="languageextract"]').val(meta.languageextract);
    */
    // insert information about the languages
    var ls = meta.languagemother.trim().split(/\s+/g);
    for (var i in ls) {
        if (ls[i])
            window.moveTagTo('langmotherchoices', 'langmotherchoices', ls[i]);
    }
    ls = meta.languagesecond.trim().split(/\s+/g);
    for (var i in ls) {
        if (ls[i])
            window.moveTagTo('langsecondchoices', 'langsecondchoices', ls[i]);
    }
    ls = meta.languageextract.trim().split(/\s+/g);
    for (var i in ls) {
        if (ls[i])
            window.moveTagTo('langextractchoices', 'langextractchoices', ls[i]);
    }

    if (meta.agree === "agreement signed") {
        $("input[name='agree']").prop('checked', true);
    } else {
        $("input[name='agree']").prop('checked', false);
    }
    if (meta.contact === "contact ok") {
        $("input[name='contact']").prop('checked', true);
    } else {
        $("input[name='contact']").prop('checked', false);
    }
    if (meta.disc === "monologue") {
        $("input[name='disc'][value='monologue']").prop('checked', true);
    } else if (meta.disc === "monologue") {
        $("input[name='disc'][value='interaction']").prop('checked', true);
    } else {
        $("input[name='disc'][value='unknown']").prop('checked', true);
    }
    if (meta.gender === "girl") {
        $("input[name='gender'][value='girl']").prop('checked', true);
    } else if (meta.gender === "boy") {
        $("input[name='gender'][value='boy']").prop('checked', true);
    } else {
        $("input[name='gender'][value='unknown']").prop('checked', true);
    }
    /*
    console.log("xml", getXmlData());
    console.log("xml", getXmlDataUser());
    console.log("entry", getEntryName());
    */
}

function saveData() {
    var data = getXmlDataValidator();
    if (data === '') {
        console.log("Saisie annulée.");
        return;
    }
    console.log("valid:", data);
    system.saveFileLocal("xml", lastfilename, data);
}

// use url if there is one
var input_text = location.href.split("?")[1].replace("=","");
fetch("../../data/doc/"+input_text+"/metadata.xml").then(function(response){
  response.text().then(function(text){
    system.process("metadata.xml", text);
  })
});
