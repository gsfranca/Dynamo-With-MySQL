import AWS from 'aws-sdk';
import DatabaseInterface from './databaseInterface.js';

class DynamoDBDatabase extends DatabaseInterface 
{
    
    constructor(config) 
    {
        super();
        this.config = config;
        this.db = null;
        
    }

    async connect() 
    {
        AWS.config.update({
            region: process.env.DB_REGION,
            endpoint: process.env.DB_ENDPOINT,
            accessKeyId: process.env.DB_ACCESSKEYID,
            secretAccessKey: process.env.DB_SECRETACCESSKEY
        });

        this.db = new AWS.DynamoDB.DocumentClient();

    }

    getConnection() 
    {
        return this.db;
    }
}

export default DynamoDBDatabase;
