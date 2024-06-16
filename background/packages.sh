#!/bin/bash

echo "Installing dependencies..."

# Install development dependencies
npm install --save-dev @types/concurrently
npm install --save-dev @types/dotenv
npm install --save-dev @types/ejs
npm install --save-dev @types/express
npm install --save-dev @types/mssql
npm install --save-dev @types/node-cron
npm install --save-dev @types/nodemailer
npm install --save-dev @types/nodemon

npm install concurrently
npm install nodemon
npm install dotenv
npm install ejs
npm install express
npm install mssql@
npm install node-cron
npm install nodemailer
npm install nodemon

echo "Dependencies installed successfully!"
