NF == 0 { next; }
{ gsub(/\<\/?h2\>/, ""); print; next; }