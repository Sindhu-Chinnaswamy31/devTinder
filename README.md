Git with SSH Key for Authentication pushing/pulling

1. Generate an SSH key
ssh-keygen -t ed25519 -C "darshank4070@gmail.com"
ssh-keygen -t ed25519 -C "darshan.k@sequel.co.in"

eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_ed25519

-------> Start from here <--------

2. Add the SSH key to GitHub
cat ~/.ssh/id_ed25519.pub
3. Test the connection again
ssh -T git@github.com
Hi username! You've successfully authenticated, but GitHub does not provide shell access.


SET username and email for that folder path
# In personal repo
git config user.name "Personal Name"
git config user.email "personal@email.com"

# In work repo
git config user.name "Work Name"
git config user.email "work@email.com"

# Clone using SSH
git clone git@github.com:Sindhu-Chinnaswamy31/devTinder.git

Textract of this project
---------------------------------------------
mangoDb -> Database
expressJs -> for building server and code
Npm libraries
ReactJs
NodeJs

//create new project
terminal 
 - npm init

connect server express js
 - npm i express

to stop we can't use cntl+c every time so we are using nodemon, it will resrat the server when changes done.
 - sudo npm i -g nodemon (because we are isntaling global level thats why we are using -g and permission issue we are using sudo)
 - nodemon src/app.js insted of node src/app.js
 - added the scripts : nodemon src/app.js so we can use npm run start
* node modules : is a place when we install some packages and it get the code form internet and put it here
* package.json will also update when ever we did npm i install package
* dependencies : without that package project won't work properly ex : express for nodejs
* all dependencis store inside node_modules.
* package-lock.json : to lock the installed package version.

* the ^ (caret) symbol, which is the default for new dependencies and allows for both minor and patch updates while locking the major version. For example, ^1.2.3 would allow 1.3.0 or 1.4.0 but not 2.0.0.

* The ~ (tilde) symbol in package.json is used to specify a version range for a project's dependencies, indicating that the project can use any version of the package within the same minor version, allowing for patch updates. eg : ~1.2.3 allows 1.2.4, 1.2.5, etc