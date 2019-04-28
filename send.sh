# rsync -auv * parisse@ct3.ortolang.fr:/applis/valange/
rsync -auv --exclude="*.mov" --exclude="*.mpg" --exclude="old/" --exclude="node_modules/" * parisse@ct3.ortolang.fr:/applis/valange/
