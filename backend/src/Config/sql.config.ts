import dotenv from 'dotenv';

dotenv.config();


// This code snippet imports the dotenv module to load environment variables from a .env file. 
// It then defines a sqlConfig object containing database connection details like user, database name, password, server, pool settings, and encryption options

export const sqlConfig = {
    user: process.env.DB_USER as string,
    database: process.env.DB_NAME as string,
    password: process.env.DB_PWD as string,
    server: process.env.SERVER as string,
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000,
    },
    options: {
        encrypt: false,
        trustServerCertificate: true
    }
}

// This code snippet imports the dotenv module to load environment variables from a .env file. It then defines a sqlConfig object containing database connection details like user, database name, password, server, pool settings, and encryption options