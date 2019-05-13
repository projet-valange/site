BEGIN {
    fn = ""
    acr = ""
    ac = ""
    th = ""
    du = ""
}
/title:/ { fn = substr($2,2,length($2)-3); next; }
/activite_real:/ { acr = substr($0,21,length($0)-22); next; }
/activite:/ { ac = substr($0,15,length($0)-16); next; }
/theme:/ { th = substr($0,13,length($0)-14); next; }
/\"Dur/ {
    du = substr($0,16,length($0)-16);
    ffn = fn "/metadonnees.txt";
    print "" >> ffn
    print "<li>activite_real: " acr >> ffn
    print "<li>activite_json: " ac >> ffn
    print "<li>theme_json: " th >> ffn
    print "<li>duration: " du >> ffn
    close(ffn)
    next;
}
