import DynamoDBAddressModel from '../models/dynamoDBAddressModel.js';
import MysqlAddressModel from '../models/mysqlAddressModel.js';

class AddressController 
{
  constructor(database) 
  {
      this.db = database.getConnection();
      this.connectionTime = Date.now();
      this.addressModel = this.createAddressModel(database);
  }

  createAddressModel(database) 
  {
      switch (database.constructor.name) 
      {
        case 'MysqlDatabase':
              return new MysqlAddressModel(database.getConnection());
        case "DynamoDBDatabase":
               return new DynamoDBAddressModel(database.getConnection())
        default:
            throw new Error("Unsupported database type");
      }
  }

  async storeAddress(req, res) 
  {
    const 
    {
      zip_code_address, 
      street_address, 
      neighborhood_address, 
      city_address, 
      state_address, 
      region_address, 
      country_address
      
    } = req.body

    if (
         !zip_code_address 
      || !street_address 
      || !neighborhood_address 
      || !city_address 
      || !state_address 
      || !region_address 
      || !country_address
    )  
    {
      return res.status(400).json({ message: "Dados incompletos" });
    }

    try 
    {
      const result = await this.addressModel.createAddress(zip_code_address, street_address, neighborhood_address, city_address, state_address, region_address, country_address);
      return res.status(200).json(result);
    } 
    catch (error) 
    {
      return res.status(500).json({ status: false, message: `CONTROLLER: Erro ao criar o endereço: ${error.message}` });
    }
  }

  async getAddresses(req, res) 
  {
    try 
    {
      const result = await this.addressModel.readAddresses(req);
      return res.status(200).json(result);
    } 
    catch (error) 
    {
      return res.status(500).json({ status: false, message: `CONTROLLER: Erro ao visualizar os endereços: ${error.message}` });
    }
  }

  async getAddressByZipCode(req, res) 
  { 
    const zip_code = req.params.id_zipCode;
    try 
    {
      const result = await this.addressModel.readAddressByZipCode(zip_code);
      return res.status(200).json(result);
    } 
    catch (error) 
    {
      return res.status(500).json({ status: false, message: `CONTROLLER: Erro ao visualizar o cep: ${error.message}` });
    }
  }

  async setAddress(req, res) 
  {
    const id_address = req.params.id_address;
    const 
    {
      zip_code_address, 
      street_address, 
      neighborhood_address, 
      city_address, state_address, 
      region_address, 
      country_address
    } = req.body

    if (
         !id_address 
      || !zip_code_address 
      || !street_address 
      || !neighborhood_address 
      || !city_address 
      || !state_address 
      || !region_address 
      || !country_address
    )
    {
      return res.status(400).json({ message: "Dados incompletos" });
    }

    try 
    {
      const result = await this.addressModel.updateAddress(id_address, zip_code_address, street_address, neighborhood_address, city_address, state_address, region_address, country_address);
      return res.status(200).json(result);
    } 
    catch (error) 
    {
      return res.status(500).json({ status: false, message: `CONTROLLER: Erro ao editar o endereço: ${error.message}` });
    }
  }
  
  async destroyAddress(req, res) 
  {
    const id_address = req.params.id_address;

    try 
    {
      const result = await this.addressModel.deleteAddress(id_address);
      return res.status(200).json(result);
    } 
    catch (error) 
    {
      return res.status(500).json({ status: false, message: `CONTROLLER: Erro ao deletar o endereço: ${error.message}` });
    }
  }
}

export default AddressController;
