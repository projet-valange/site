/\<lang\>fr</ {
    print "<languagemother>fra</languagemother>";
    print "<languagesecond></languagesecond>";
    print "<languageextract>fra</languageextract>";
    next;
}
/<lang>fr \(it/ {
    print "<languagemother>fra, ita</languagemother>";
    print "<languagesecond></languagesecond>";
    print "<languageextract>fra, ita</languageextract>";
    next;
}
/<lang>it \(fr/ {
    print "<languagemother>fra, ita</languagemother>";
    print "<languagesecond></languagesecond>";
    print "<languageextract>ita, fra</languageextract>";
    next;
}
{ print }