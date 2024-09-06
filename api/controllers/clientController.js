import MysqlClientModel from '../models/mysqlClientModel.js';
import DynamoDBClientModel from '../models/dynamoDBClientModel.js';

class ClientController 
{
  constructor(database) 
  {
      this.db = database.getConnection();
      this.connectionTime = Date.now();
      this.clientModel = this.createClientModel(database);
  }

  createClientModel(database) 
  {
      switch (database.constructor.name) 
      {
        case 'MysqlDatabase':
              return new MysqlClientModel(database.getConnection());
        case 'DynamoDBDatabase':
                return new DynamoDBClientModel(database.getConnection());
        default:
            throw new Error("Unsupported database type");
      }
  }

  async storeClient(req, res) 
  {
    const { name_client, age_client, gender_client} = req.body

    if (!name_client || !age_client || !gender_client) 
    {
      return res.status(400).json({ message: "Dados incompletos" });
    }

    try 
    {
      const result = await this.clientModel.createClient(name_client, age_client, gender_client);
      return res.status(200).json(result);
    } 
    catch (error) 
    {
      return res.status(500).json({ status: false, message: `CONTROLLER: Erro ao criar cliente: ${error.message}` });
    }
  }

  async getClient(req, res) 
  {
    const id_client = req.params.id_client;

    if (!id_client)
    {
          return res.status(400).json({ message: "Infome o cliente a ser editado" });
    }

    try 
    {
      const result = await this.clientModel.readClient(id_client);
      return res.status(200).json(result);
    } 
    catch (error) 
    {
      return res.status(500).json({ status: false, message: `CONTROLLER: Erro ao visualizar o cliente: ${error.message}` });
    }
  }

  async getClientNames(req, res) 
  {
    try 
    {
      const result = await this.clientModel.readClientNames(req);
      return res.status(200).json(result);
    } 
    catch (error) 
    {
      return res.status(500).json({ status: false, message: `CONTROLLER: Erro ao visualizar os nomes dos clientes: ${error.message}` });
    }
  }

  async setClient(req, res) 
  {
    const id_client = req.params.id_client;
    const {name_client, age_client, gender_client} = req.body

    if (!id_client || !name_client || !age_client || !gender_client) 
    {
      return res.status(400).json({ message: "Dados incompletos" });
    }

    try 
    {
      const result = await this.clientModel.updateClient(id_client, name_client, age_client, gender_client);
      return res.status(200).json(result);
    } 
    catch (error) 
    {
      return res.status(500).json({ status: false, message: `CONTROLLER: Erro ao editar o cliente: ${error.message}` });
    }
  }
  
  async destroyClient(req, res) 
  {
    const id_client = req.params.id_client;

    try 
    {
      const result = await this.clientModel.deleteClient(id_client);
      return res.status(200).json(result);
    } 
    catch (error) 
    {
      return res.status(500).json({ status: false, message: `CONTROLLER: Erro ao deletar o cliente: ${error.message}` });
    }
  }
}

export default ClientController;
