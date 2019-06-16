/**
 * lookfor.js
 * file inserted in rechercher.html
 */

"use strict";

function mykeyFunction() {
    var input, filter, ul, tr, li, a, i, j, txtValue, nbfound;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    ul = document.getElementById("myUL");
    tr = ul.getElementsByTagName("tr");
    nbfound = 0;
    for (i = 0; i < tr.length; i++) {
        tr[i].style.display = "none";
        li = tr[i].getElementsByTagName("td");
        for (j = 1; j <= 6; j++) {
            console.log('td:', i, j, li[j]);
            a = li[j];
            txtValue = a.textContent || a.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
                nbfound ++;
                break;
            }
        }
    }
    $("#result_length").text(nbfound);
}

/*
function printValue(sliderID, textbox) {
    var x = document.getElementById(textbox);
    var y = document.getElementById(sliderID);
    x.value = y.value;
}
*/

function change_css1() {
    document.getElementById('demo1').style.cssText = 'background-color:#b2b2ff; border:1px solid #0c0800;';
}

function addOne(x) { return (x) ? x + 1 : 1; }

/**
 * divide a string into element separated by a comma: ","
 * no empty elements are authorized
 * white space removed at both sides of the elements
 */
function parseElements(v) {
    if (!v) return [];
    var w = v.split(/,+/);
    var lg = [];
    for (var e in w) {
        var s = w[e].trim();
        if (s.length > 0) lg.push(s);
    }
    return lg;
}

/**
 * get year part of age value (part before character ";")
 */
function parseAge(v) {
    if (!v) return -1;
    if (v.length < 1) return [];
    var w = v[0].trim().split(/;/);
    return (w.length > 0) ? Number(w[0]) : -1;
}

/**
 * normalize a string with a serie of words separated by comma
 * all trailing spaces (front and back) and empty elements are removed
 */
function parseElementsPack(v) {
    if (!v) return "";
    var w = v.split(/[,\s]+/);
    var lg = [];
    for (var e in w) {
        var s = w[e].trim();
        if (s.length > 0) lg.push(s);
    }
    return lg.join(",");
}

function buildTab(list, category) {
    var s = "";
    for (var str in list) {
        if (str === "") continue;
        s += '<div class="col-lg-6 col-md-6">';
        s += '<label class="container_cb capitalize">';
        s += str; // put first letter as uppercase
        s += '<input id="checkbox_' + category + '_' + str + '" type="checkbox" value="' + str + '">';
        s += '<span class="checkmark"></span>';
        s += '<span class="nbocc">' + list[str] + '</span>';
        s += '</label>';
        s += '</div>';
    }
    return s;
}

function buildTabPartPicture(list, category, subparts, pictures) {
    var s = "";
    // get all subparts
    var listparts = {};
    for (var cat in subparts) {
        listparts[subparts[cat]] = addOne(listparts[subparts[cat]]);
    }
    // for all parts in listparts display the elements of list
    for (var part in listparts) {
        // console.log("cc:", part, listparts[part]);
        s += '<div class="col-lg-3 col-md-3">';
        var p = pictures[part];
        if (p)
            s += '<a><img src="../../common/img/' + p + '" class="img-rounded nousimg"></a>';
        else
            s += '<a><img src="../../common/img/default.svg" class="img-rounded nousimg"></a>';
        for (var str in list) {
            // console.log('gg', str, list[str], subparts[str], part, listparts[part]);
            if (subparts[str] !== part) continue; // not the current part
            s += '<label class="container_cb capitalize">';
            s += str; // put first letter as uppercase
            s += '<input id="checkbox_' + category + '_' + str + '" type="checkbox" value="' + str + '">';
            s += '<span class="checkmark"></span>';
            s += '<span class="nbocc">' + list[str] + '</span>';
            s += '</label>';
        }
        s += '</div>';
    }
    return s;
}

function buildTabPicture(list, category, pictures) {
    var s = "";
    for (var str in list) {
        if (str === "") continue;
        s += '<div class="col-lg-2 col-md-2">';
        s += '<label class="container_cb capitalize">';
        var p = pictures[str];
        if (p)
            s += '<a><img src="../../common/img/children/' + p + '" class="img-circle nousimg"></a><br/>';
        else
            s += '<a><img src="../../common/img/children/default.jpg" class="img-circle nousimg"></a><br/>';
        s += str; // put first letter as uppercase
        s += '<input id="checkbox_' + category + '_' + str + '" type="checkbox" value="' + str + '">';
        s += '<span class="checkmark"></span>';
        s += '<span class="nbocc">' + list[str] + '</span>';
        s += '</label>';
        s += '</div>';
    }
    return s;
}

function buildTabLanguage(list, category) {
    var s = "";
    for (var str in list) {
        if (str === "") continue;
        s += '<label class="container_cb lang_cb">';
        s += str;
        s += '<input id="checkbox_' + category + '_' + str + '" type="checkbox" value="' + str + '">';
        s += '<span class="checkmark"></span>';
        s += '<span class="nbocc">' + list[str] + '</span>';
        s += '</label>';
    }
    return s;
}

function checkedTab(list, category) {
    var selected = [];
    for (var str in list) {
        var id = 'checkbox_' + category + '_' + str;
        var h = document.getElementById(id);
        // var h = document.querySelector('input[id="' + id + '"]');
        if (h && h.checked) {
            selected.push(str);
        }
    }
    return selected;
}

function resetTab(list, category) {
    for (var str in list) {
        var id = 'checkbox_' + category + '_' + str;
        var h = document.getElementById(id);
        // var h = document.querySelector('input[id="' + id + '"]');
        if (h) {
            h.checked = false;
        }
    }
}

function filter(params) {
    return dbTotalSplitted.filter(
        function (dbobject) {
            // console.log("FILTER", dbobject.entry);
            return Object.keys(params).every(
                function (filter) {
                    // console.log("EVERY", filter);
                    return params[filter].some(
                        function (test_element) {
                            // console.log("SOME", test_element, filter, dbobject[filter]);
                            // dbobject[filter]: element in the database -- it is an array of values.
                            // testelement: element choosen by the user -- it is a single value
                            // console.log(test_element, filter, dbobject[filter], dbobject[filter].indexOf(test_element) >= 0);
                            if (!test_element) return true;
                            if (filter === "age") {
                                return dbobject[filter] ? parseAge(dbobject[filter]) === test_element : false;
                            } else if (filter === "child" || filter === "languagemother"
                                    || filter === "languagesecond" || filter === "languageextract") {
                                return dbobject[filter] ? dbobject[filter] === test_element : false;
                            } else {
                                return dbobject[filter] ? dbobject[filter].indexOf(test_element) >= 0 : false;
                            }
                        })
                })
        });
}

var entryList = {};
var childList = {};
var ageList = {};
var langMotherList = {};
var langSecondList = {};
var langExtractList = {};
var actList = {};
var actkeyList = {};
var themekeyList = {};
var dbTotalSplitted = [];

function resetValue() {
    resetTab(childList, "children");
    resetTab(themekeyList, "theme");
    resetTab(actkeyList, "actkey");
    resetTab(langMotherList, "language_mother");
    resetTab(langSecondList, "language_second");
    resetTab(langExtractList, "language_extract");
    resetInfo('info_child');
    resetInfo('info_theme');
    resetInfo('info_activity');
    resetInfo('info_age');
    resetInfo('info_language');
}
function initTotalValue(dataDB) {
    // stat about dataDB
    for (var dd in dataDB) {
        // create search data
        var splitted = {};
        // elements with single values
        // entry
        entryList[dataDB[dd].entry] = addOne(entryList[dataDB[dd].entry]);
        splitted.entry = dataDB[dd].entry;
        // child
        childList[dataDB[dd].child] = addOne(childList[dataDB[dd].child]);
        splitted.child = dataDB[dd].child;
        // age
        ageList[dataDB[dd].age] = addOne(ageList[dataDB[dd].age]);
        splitted.age = parseElements(dataDB[dd].age);
        // title
        splitted.title = dataDB[dd].title ? dataDB[dd].title : dataDB[dd].entry;
        // elements with multiple values
        var p; // temp value
        // languagemother
        splitted.languages = dataDB[dd].languagemother + " (" + dataDB[dd].languageextract + ")";
        p = parseElementsPack(dataDB[dd].languagemother);
        splitted.languagemother = p;
        langMotherList[p] = addOne(langMotherList[p]);
        // languagesecond
        p = parseElementsPack(dataDB[dd].languagesecond);
        splitted.languagesecond = p;
        langSecondList[p] = addOne(langSecondList[p]);
        // languageextract
        p = parseElementsPack(dataDB[dd].languageextract);
        splitted.languageextract = p;
        langExtractList[p] = addOne(langExtractList[p]);
        // act
        p = parseElements(dataDB[dd].act);
        splitted.act = dataDB[dd].act;
        for (var i in p) {
            actList[p[i]] = addOne(actList[p[i]]);
        }
        // actkey
        p = parseElements(dataDB[dd].actkey);
        splitted.actkey = p;
        for (var i in p) {
            actkeyList[p[i]] = addOne(actkeyList[p[i]]);
        }
        // themekey
        p = parseElements(dataDB[dd].themekey);
        splitted.themekey = p;
        for (var i in p) {
            themekeyList[p[i]] = addOne(themekeyList[p[i]]);
        }
        dbTotalSplitted.push(splitted);
    }
    /*
    // pour info
    console.log("actList", actList);
    console.log("actkeyList", actkeyList);
    console.log("ageList", ageList);
    console.log("entryList", entryList);
    console.log("childList", childList);
    console.log("themekeyList", themekeyList);
    */
    console.log("langMotherList", langMotherList);
    console.log("langSecondList", langSecondList);
    console.log("langExtractList", langExtractList);

    // build interface with actual values in dataDB
    var s = buildTab(themekeyList, "theme");
    var h = document.getElementById("tab-theme");
    h.innerHTML = s;
    var s = buildTabPartPicture(actkeyList, "actkey", activitiesCategories, activitiesPictures);
    var h = document.getElementById("tab-activity");
    h.innerHTML = s;
    var s = buildTabPicture(childList, "children", childrenPictures);
    var h = document.getElementById("tab-children");
    h.innerHTML = s;
    var s = buildTabLanguage(langMotherList, "language_mother");
    var h = document.getElementById("tab-language-mother");
    h.innerHTML = s;
    var s = buildTabLanguage(langSecondList, "language_second");
    var h = document.getElementById("tab-language-second");
    h.innerHTML = s;
    var s = buildTabLanguage(langExtractList, "language_extract");
    var h = document.getElementById("tab-language-extract");
    h.innerHTML = s;
}

function adjustInfo(data_class, type, id_data) {
    var localFilter = {};
    localFilter[type] = data_class;
    var n = filter(localFilter);
    var p = document.getElementById(id_data);
    p.innerHTML = '<span class="nbinfo">' + n.length + '</span>';
}

function countInfo(data_class, type) {
    var localFilter = {};
    localFilter[type] = data_class;
    var n = filter(localFilter);
    return n.length;
}

function adjustInfoNb(nb, id_data) {
    var p = document.getElementById(id_data);
    p.innerHTML = '<span class="nbinfo">' + nb + '</span>';
}

function resetInfo(id_data) {
    var p = document.getElementById(id_data);
    p.innerHTML = '';
}

function checkedTotalValue() {
    //child
    var data_class_child = checkedTab(childList, "children");

    //language
    /*
    var v = $('input[name="languagemother"]').val();
    var data_class_languagemother = [parseElementsPack(v)];
    v = $('input[name="languagesecond"]').val();
    var data_class_languagesecond = [parseElementsPack(v)];
    v = $('input[name="languageextract"]').val();
    var data_class_languageextract = [parseElementsPack(v)];
    */
    var data_class_languagemother = checkedTab(langMotherList, "language_mother");
    var data_class_languagesecond = checkedTab(langSecondList, "language_second");
    var data_class_languageextract = checkedTab(langExtractList, "language_extract");

    //age
    var age_data = document.getElementById("slider_my").value;
    //console.log("age_data(all):", age_data);
    var data_class_age = []
    if (age_data.length !== 0) {
        var range = age_data.split(",");
        if (range[0] !== 0) {
            //data_class_age.push(parseInt(range[0])-1);
            for (let i = (range[0]); i <= (range[1]); i++) {
                data_class_age.push(parseInt(i));
                //console.log("age_data: " + parseInt(i));
            }
            //data_class_age.push(parseInt(range[1])+1);
        }
    }
    //console.log("data_class_age: " + data_class_age);

    //theme
    var data_class_theme = checkedTab(themekeyList, "theme");

    //activity
    var data_class_activity = checkedTab(actkeyList, "actkey");

    var filterBy = {};
    window.filterBy = filterBy; // for debug

    if (data_class_child.length > 0) {
        filterBy.child = data_class_child;
        adjustInfo(data_class_child, 'child', "info_child");
    } else {
        resetInfo('info_child');
    }

    var nblang = 0;
    if (data_class_languagemother.length > 0) {
        filterBy.languagemother = data_class_languagemother;
        nblang += countInfo(data_class_languagemother, 'languagemother');
    }
    if (data_class_languagesecond.length > 0) {
        filterBy.languagesecond = data_class_languagesecond;
        nblang += countInfo(data_class_languagesecond, 'languagesecond');
    }
    if (data_class_languageextract.length > 0) {
        filterBy.languageextract = data_class_languageextract;
        nblang += countInfo(data_class_languageextract, 'languageextract');
    }
    if (nblang > 0)
        adjustInfoNb(nblang, "info_language");
    else
        resetInfo("info_language");

    if (data_class_theme.length > 0) {
        filterBy.themekey = data_class_theme;
        adjustInfo(data_class_theme, 'themekey', "info_theme");
    } else {
        resetInfo('info_theme');
    }
    if (data_class_activity.length > 0) {
        filterBy.actkey = data_class_activity;
        adjustInfo(data_class_activity, 'actkey', "info_activity");
    } else {
        resetInfo('info_activity');
    }
    if (data_class_age.length > 0) {
        filterBy.age = data_class_age;
        adjustInfo(data_class_age, 'age', "info_age");
    } else {
        resetInfo('info_age');
    }

    // console.log("filterBy", filterBy);

    var result = filter(filterBy);

    var edit = false;
    if (window.location.href.lastIndexOf("?edit") === window.location.href.length - 5) edit = true;
    $("#result_length").text(result.length);
    $('#myUL').empty();
    for (var k = 0; k < result.length; k++) {
        var line = "<tr style='padding: 0px;'><td>" + k + "</td><td>" + result[k].title + "</td><td>" + result[k].child
            + "</td><td>" + result[k].languages + "</td><td>" + result[k].age + "</td><td>" + result[k].themekey + "</td><td>"
            + result[k].act + "</td><td><form method='GET' action='./dossier_offre.html' style='height: 7px;'>"
            + "<button class='btn btn-large btn-info' style='padding: 0px; font-size: 12px; height: 25px; width: 60px;' type='submit' name='"
            + result[k].entry + "'>Examiner</button></form></td>";
        if (edit === true) line += "<td><form method='GET' action='./editentry.html' style='height: 7px;'>"
            + "<button class='btn btn-large btn-info' style='padding: 0px; font-size: 12px; height: 25px; width: 60px;' type='submit' name='"
            + result[k].entry + "'>Edit</button></form></td>";
        line += "</tr>";
        $("#myUL").append(line);
    }

    function checkedeachValue(data_cb_class) {
        var value;
        var checkedValue = document.querySelector('.' + data_cb_class + ':checked');
        if (checkedValue == null) {
            value = "null";
        } else {
            var result = checkedValue.value;
            value = result.split(",")[1];
        }
        return value;
    }
}

/*
 * to do the first time
 */
initTotalValue(valange_data); // finalize creation of html
checkedTotalValue(); // display all extracts or only extract validated by the user (first time = all extracts)
