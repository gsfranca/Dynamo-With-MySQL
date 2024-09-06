import MysqlAddressOfClientModel from '../models/mysqlAddressOfClientModel.js';
import DynamoDBAddressOfClientModel from '../models/dynamoDBAddressOfClientModel.js';

class AddressOfClienController 
{
  constructor(database) 
  {
      this.db = database.getConnection();
      this.connectionTime = Date.now();
      this.addressOfClientModel = this.createAddressOfClientModel(database);
  }

  createAddressOfClientModel(database) 
  {
      switch (database.constructor.name) 
      {
        case 'MysqlDatabase':
              return new MysqlAddressOfClientModel(database.getConnection());
        case "DynamoDBDatabase":
          return new DynamoDBAddressOfClientModel(database.getConnection())
        default:
            throw new Error("Unsupported database type");
      }
  }

  async storeAddressOfClient(req, res) 
  {
    const 
    {
        id_address,
        id_client,
        number_address_of_client,
        complement_address_of_client
    } = req.body

    if (
        !id_address
        || !id_client
        || !number_address_of_client
        || !complement_address_of_client
    )  
    {
      return res.status(400).json({ message: "Dados incompletos" });
    }

    try 
    {
      const result = await this.addressOfClientModel.createAddressOfClient(id_address, id_client, number_address_of_client, complement_address_of_client);
      return res.status(200).json(result);
    } 
    catch (error) 
    {
      return res.status(500).json({ status: false, message: `CONTROLLER: Erro ao criar o endereço do cliente: ${error.message}` });
    }
  }

  async getAddressOfClient(req, res) 
  {
    const id_address_of_client = req.params.id_address_of_client;
    try 
    {
      const result = await this.addressOfClientModel.readAddressOfClient(id_address_of_client);
      return res.status(200).json(result);
    } 
    catch (error) 
    {
      return res.status(500).json({ status: false, message: `CONTROLLER: Erro ao visualizar os endereços do cliente: ${error.message}` });
    }
  }

  async setAddressOfClient(req, res) 
  {
    const id_address_of_client = req.params.id_address_of_client;
    const 
    {
        id_address,
        id_client,
        number_address_of_client,
        complement_address_of_client
    } = req.body

    if (
         !id_address 
      || !id_client
      || !number_address_of_client
      || !complement_address_of_client
    )
    {
      return res.status(400).json({ message: "Dados incompletos" });
    }

    try 
    {
      const result = await this.addressOfClientModel.updateAddressOfClient(id_address_of_client, id_address, id_client, number_address_of_client, complement_address_of_client);
      return res.status(200).json(result);
    } 
    catch (error) 
    {
      return res.status(500).json({ status: false, message: `CONTROLLER: Erro ao editar o endereço do cliente: ${error.message}` });
    }
  }
  
  async destroyAddressOfClient(req, res) 
  {
    const id_address_of_client = req.params.id_address_of_client;

    try 
    {
      const result = await this.addressOfClientModel.deleteAddressOfClient(id_address_of_client);
      return res.status(200).json(result);
    } 
    catch (error) 
    {
      return res.status(500).json({ status: false, message: `CONTROLLER: Erro ao deletar o endereço do cliente: ${error.message}` });
    }
  }
}

export default AddressOfClienController;
