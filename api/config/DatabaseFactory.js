import DynamoDBDatabase from './dynamodbDatabase.js';
import MysqlDatabase from './mysqlDatabase.js';


class DatabaseFactory 
{
    static createDatabase(config) 
    {
        switch (config.DB_TYPE) 
        {
            case 'mysql':
                return new MysqlDatabase(config);
            case 'dynamodb':
                return new DynamoDBDatabase(config)
            default:
                throw new Error(`Unsupported database type: ${config.DB_TYPE}`);
        }
    }
}

export default DatabaseFactory;
