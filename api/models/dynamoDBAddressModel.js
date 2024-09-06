import axios from "axios"

class DynamoDBAddressModel 
{
    constructor(db, connectionTime) 
    {
      this.db = db;
      this.connectionTime = connectionTime;
    }
    async createId()
    {
      try 
      {
        const data = await this.db.scan({
          TableName: "address",
          ProjectionExpression: "id_address"
        }).promise();

        const ids = data.Items
        let new_id = 1
        if(ids.length > 0)
        {
          new_id = ids.length + 1
        }
        return new_id
      } 
      catch (error) 
      {
        console.error(error)
      }
    }

    /*-------------------- CREATE --------------------*/
      async createAddress(zip_code_address, street_address, neighborhood_address, city_address, state_address, region_address, country_address)
      {
        try 
        {
          const start_time = process.hrtime();
    
          const id_address = await this.createId(); 
          await this.db.put({
            TableName: "address",
            Item: 
            {
              id_address,
              zip_code_address, 
              street_address, 
              neighborhood_address, 
              city_address, 
              state_address, 
              region_address, 
              country_address
            }
          }).promise()
  
          const end_time = process.hrtime(start_time);
          const queryTime = (end_time[0] *  end_time[1]);
    
          return {
            success: true,
            message: "DynamoDB: Endereço criado com sucesso.",
            connection_time: this.connectionTime,
            query_time: queryTime
          };
        } 
        catch (error) 
        {
          return {
            success: false,
            message: `DynamoDB: Erro ao criar o endereço: ${error.message}`,
            connection_time: this.connectionTime
          };
        }
      }
    /*-------------------- END OF CREATE --------------------*/

    
    /*-------------------- READ ALL ADDRESSES --------------------*/
      async readAddresses()
      {
        try 
        {
          const start_time = process.hrtime();
    
          const result = await this.db.scan({
            TableName: "address",
          }).promise();

          const end_time = process.hrtime(start_time);
          const queryTime = (end_time[0] *  end_time[1]);
    
          return {
            success: true,
            message: "DynamoDB: Endereços visualizado com sucesso.",
            connection_time: this.connectionTime,
            query_time: queryTime,
            result: result.Items
          };
        } 
        catch (error) 
        {
          return {
            success: false,
            message: `DynamoDB: Erro ao visualizar os endereços: ${error.message}`,
            connection_time: this.connectionTime
          };
        }
      }
    /*-------------------- END OF READ ALL --------------------*/

    /*-------------------- READ BY ZIP CODE --------------------*/
    async readAddressByZipCode(zip_code) {
      try {
        const start_time = process.hrtime();
    
        const result = await this.db.scan({
          TableName: "address",
          FilterExpression: "#zip_code_address = :zip_code_address",
          ExpressionAttributeNames: {
            "#zip_code_address": "zip_code_address"
          },
          ExpressionAttributeValues: {
            ":zip_code_address": zip_code
          }
        }).promise();
    
        // Case Zip Code does not exist in database
          if (!(result.Items && result.Items.length)) 
          {
            let response = await axios.get(`https://viacep.com.br/ws/${zip_code}/json/`);
            let addresses = [];
      
              let address = response.data;
              addresses.push({
                zip_code_address: address.cep,
                street_address: address.logradouro,
                neighborhood_address: address.bairro,
                city_address: address.localidade,
                state_address: address.uf,
                region_address: address.regiao,
                country_address: 'Brasil'
              });

              addresses.forEach(address => 
              {
                  this.createAddress(
                    address.zip_code_address,
                    address.street_address,
                    address.neighborhood_address,
                    address.city_address,
                    address.state_address,
                    address.region_address,
                    address.country_address
                  );
              });
            }
      
          const end_time = process.hrtime(start_time);
          const queryTime = (end_time[0] *  end_time[1]);
      
          return {
            success: true,
            message: "DynamoDB: Endereços visualizados com sucesso.",
            connection_time: this.connectionTime,
            query_time: queryTime,
            result: result.Items
          };
        } catch (error) {
          return {
            success: false,
            message: `DynamoDB: Erro ao visualizar os endereços: ${error.message}`,
            connection_time: this.connectionTime
          };
        }
      }
    
    /*-------------------- END OF READ BY ZIP CODE --------------------*/

    /*-------------------- UPDATE --------------------*/
      async updateAddress(id_address,zip_code_address, street_address, neighborhood_address, city_address, state_address, region_address, country_address)
      {
        try 
        {
          const start_time = process.hrtime();

          id_address = parseInt(id_address)

          await this.db.put({
            TableName: "address",
            Key: {
              id_address: id_address
            },
            Item: 
            {
              id_address,
              zip_code_address, 
              street_address, 
              neighborhood_address, 
              city_address, 
              state_address, 
              region_address, 
              country_address
            }
          }).promise()
  
          const end_time = process.hrtime(start_time);
          const queryTime = (end_time[0] *  end_time[1]);
    
          return {
            success: true,
            message: "DynamoDB: Endereço atualizado com sucesso.",
            connection_time: this.connectionTime,
            query_time: queryTime
          };
        } 
        catch (error) 
        {
          return {
            success: false,
            message: `DynamoDB: Erro ao atualizar o endereço: ${error.message}`,
            connection_time: this.connectionTime
          };
        }
      }
    /*-------------------- END OF UPDATE --------------------*/

    /*-------------------- DELETE --------------------*/
      async deleteAddress(id_address)
      {
        try 
        {
          const start_time = process.hrtime();
    
          id_address = parseInt(id_address)

          const result = await this.db.delete({
            TableName: "address",
            Key: {
              id_address: id_address
            }
          }).promise();

          const end_time = process.hrtime(start_time);
          const queryTime = (end_time[0] *  end_time[1]);
    
          return {
            success: true,
            message: "DynamoDB: Endereço excluido com sucesso.",
            connection_time: this.connectionTime,
            query_time: queryTime,
            result: result
          };
        } 
        catch (error) 
        {
          return {
            success: false,
            message: `DynamoDB: Erro ao excluir o endereço: ${error.message}`,
            connection_time: this.connectionTime
          };
        }
      }
    /*-------------------- END OF DELETE --------------------*/


  }
  
  export default DynamoDBAddressModel;
  