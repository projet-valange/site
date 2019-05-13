/<ul/ { next; }
/<li>/ { gsub(/\<\/?li\>/, ""); print; next; }
/<\/li>/ { gsub(/\<\/?li\>/, ""); print; next; }