BEGIN {
    name = ARGV[1]
    ARGV[1] = ""
    media = ARGV[2]
    ARGV[2] = ""
    print "<extract>";
    print "<entry>" name "</entry>";
    print "<media>" media "</media>";
    acr = 0;
    acj = 0;
    thj = 0;
    dur = 0;
}
END { print "</extract>"; }
/<li>Projet :/ { print "<projet>" substr($0, 14, length($0)-18) "</projet>"; next; }
/<li>Extract/ { print "<from>" substr($0, 14, length($0)-18) "</from>"; next; }
/<li>Enfant :/ { print "<child>" substr($0, 14, length($0)-18) "</child>"; next; }
/<li>..ge :/ { print "<age>" substr($0, 12, length($0)-16) "</age>"; next; }
/<li>Langue :/ { print "<lang>" substr($0, 14, length($0)-18) "</lang>"; next; }
/<li>Lieu :/ { print "<place>" substr($0, 12, length($0)-16) "</place>"; next; }
/<li>Activit/ { print "<act>" substr($0, 17, length($0)-21) "</act>"; next; }
/<li>Th/ { print "<theme>" substr($0, 17, length($0)-21) "</theme>"; next; }
/<li>Mot/ { print "<keyword>" substr($0, 19, length($0)-23) "</keyword>"; next; }
/<li>activite_json/ { 
    if (acj == 0) print "<actkey>" substr($0, 20) "</actkey>"; 
    acj = 1;
    next;
}
/<li>theme_json/ { 
    if (thj == 0) print "<themekey>" substr($0, 17) "</themekey>"; 
    thj = 1;
    next;
}
/<li>duration/ { 
    if (dur == 0) print "<duration>" substr($0, 15) "</duration>"; 
    dur = 1;
    next;
}
