class DynamoDBAddressOfClientModel 
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
          TableName: "address_of_client",
          ProjectionExpression: "id_address_of_client"
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
      async createAddressOfClient(id_client, id_address, number_address_of_client, complement_address_of_client)
      {
        try 
        {
          const start_time = process.hrtime();
    
          const id_address_of_client = await this.createId(); 
          

          await this.db.put({
            TableName: "address_of_client",
            Item: 
            {
              id_address_of_client,
              id_client, 
              id_address, 
              number_address_of_client, 
              complement_address_of_client
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

    /*-------------------- READ ADDRESSES OF CLIENT --------------------*/
      async readAddressOfClient(id_client)
      {
        try 
        {
          const start_time = process.hrtime();

          const result = await this.db.scan(
          {
            TableName: "address_of_client",
            FilterExpression: "id_client = :id_client",
            ExpressionAttributeValues: 
            {
              ":id_client": id_client 
            },
          }).promise();

          const end_time = process.hrtime(start_time);
          const queryTime = (end_time[0] *  end_time[1]);
    
          return {
            success: true,
            message: "DynamoDB: Endereços do cliente "+ id_client +" visualizado com sucesso.",
            connection_time: this.connectionTime,
            query_time: queryTime,
            result: result.Items
          };
        }
        catch (error) 
        {
          return {
            success: false,
            message: `DynamoDB: Erro ao visualizas os endereços do usuario: ${error.message}`,
            connection_time: this.connectionTime
          };
        }
      }
    /*-------------------- END OF READ ADDRESSES OF CLIENT --------------------*/

    /*-------------------- UPDATE --------------------*/
      async updateAddressOfClient(id_address_of_client,)
      {
        try 
        {
          const start_time = process.hrtime();

          id_address_of_client = parseInt(id_address_of_client)

          await this.db.put({
            TableName: "address_of_client",
            Key: {
              id_address_of_client: id_address_of_client
            },
            Item: 
            {
              id_address_of_client,

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
      async deleteAddressOfClient(id_address_of_client)
      {
        try 
        {
          const start_time = process.hrtime();
    
          id_address_of_client = parseInt(id_address_of_client)

          const result = await this.db.delete({
            TableName: "address_of_client",
            Key: {
              id_address_of_client: id_address_of_client
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
  
  export default DynamoDBAddressOfClientModel;
  