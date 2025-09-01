* Launching a AWS Instance and deploying frontend
--------------------------------------------------
EC2 - Elastic Compute Cloud (EC2) -> virtual server in cloud

After createing instance-> secrect key will generate
>> go to project path and place the downloaded aws secret key file give permision
>>chmod 400 devTinder-secret.pem

Connect to aws machine
>> ssh -i "devTinder-secret.pem" ubuntu@ec2-13-61-148-97.eu-north-1.compute.amazonaws.com

afetr this you will get the terminal of the machine
instal node to ubuntu machine
# Download and install nvm:
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash
# in lieu of restarting the shell
\. "$HOME/.nvm/nvm.sh"
# Download and install Node.js:
nvm install 22
# Verify the Node.js version:
node -v # Should print "v22.19.0".
nvm current # Should print "v22.19.0".
# Verify npm version:
npm -v # Should print "10.9.3".

git clone https://github.com/Sindhu-Chinnaswamy31/devTinder-web.git

git clone https://github.com/Sindhu-Chinnaswamy31/devTinder.git

* it will clone my project to aws

* Deploying the front end project
-> create build of the project 
-> we re using vite here it is a bundle, like parcel, webpack, babel
-> inside the devtinder-web project we need to create a build
>>>>>npm run build -> compress the code and create the dist folder for production (remote machine)
>>>>>> npm install
>>>>>>> npm run build
here also will create dist folder and it will have all the code which we need to run our application

* to deploy out front end we need nginx (acts as a http webserver) here we are using to host the front end project
>>>>>>> sudo apt update
>>>>>>> sudo apt install nginx

start nginx in remote system
>>>>>>> sudo systemctl start nginx -> this will run out project
>>>>>>> sudo systemctl enable nginx -> enable nginx

* Copy code from dist (build file) to /var/www/html/ (check cd /var/www/html/)

* got to the project folder and commnad
>>>>>>> sudo scp -r dist/* /var/www/html/ -> all the files it will copy /var/www/html/

go to aws and instance you can see the public ip ex : 13.61.148.97

* enable port 80 to work on your instance - access the front end

---------------------------------------------------
* Nginx & Backend Node App Deployment
---------------------------------------------------
* using the pem key downloaded from aws login to server
>> sudo apt update
>> curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
>> sudo apt install -y nodejs

cd ~/devTinder
>> npm install   # install your project deps from package.json
>> npm start

>>>>>>>>>> Pro tip: For a production server, use pm2 instead of nodemon.
sudo npm install -g pm2
pm2 start src/app.js --name devtinder / pm2 start npm -- start

-> check logs
>> pm2 logs

-> clear logs
>> pm2 flush npm (name of teh application)

-> pm2 list (get the list of the process)
-> pm2 stop npm (name of the application)
-> pm2 delete npm -> delete the process 
-> change the custome process name
    - pm2 start npm --name "devTinder-backend" -- start

-> not mandatoury
pm2 save
pm2 startup

it will run the project if you close the commnad also so

->PM2, or Process Manager 2, is a production process manager for Node.js applications that keeps your applications running 24/7 by automatically restarting them if they crash

-> make the db network public like 0.0.0.0:0 ( nevere do this because we can access anywhere no security)
-> make the public ip only allow 13.61.148.97
-> after running the backend sdd the port to aws in security instance.


Front end - http://13.61.148.97/
Back end - http://13.61.148.97:8000/

* To map the ngnix proxy pass /api to 8000 node application

>> sudo nano /etc/nginx/sites-available/default
Don't mess up edit properly
add only the below configration

nginx config
------------
server_name 13.61.148.97;

location /api/ {
    proxy_pass http://localhost:8000/;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;
}

-> restart nginx
>>>>>> sudo systemctl restart nginx

Modify the front end base url "/api"
-> pull the code in aws 
-> create build
>> npm run build
>> sudo scp -r dist/* /var/www/html/
>> ready to use application