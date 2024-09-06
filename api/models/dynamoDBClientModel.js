class DynamoDBClientModel 
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
          TableName: "client",
          ProjectionExpression: "id_client"
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
      async createClient(name_client, age_client, gender_client)
      {
        try 
        {
          const start_time = process.hrtime();
    
          const id_client = await this.createId(); 
          await this.db.put({
            TableName: "client",
            Item: 
            {
              id_client,
              name_client,
              age_client,
              gender_client
            }
          }).promise()
  
          const end_time = process.hrtime(start_time);
          const queryTime = (end_time[0] *  end_time[1]);
    
          return {
            success: true,
            message: "DynamoDB: Cliente criado com sucesso.",
            connection_time: this.connectionTime,
            query_time: queryTime
          };
        } 
        catch (error) 
        {
          return {
            success: false,
            message: `DynamoDB: Erro ao criar o cliente: ${error.message}`,
            connection_time: this.connectionTime
          };
        }
      }
    /*-------------------- END OF CREATE --------------------*/

    /*-------------------- READ ALL NAMES --------------------*/
      async readClientNames()
      {
        try 
        {
          const start_time = process.hrtime();

          const result = await this.db.scan({
            TableName: "client",
            ProjectionExpression: "id_client, name_client"
          }).promise();

          const end_time = process.hrtime(start_time);
          const queryTime = (end_time[0] *  end_time[1]);
    
          return {
            success: true,
            message: "DynamoDB: Nome dos clientes visualizados com sucesso.",
            connection_time: this.connectionTime,
            query_time: queryTime,
            result: result.Items
          };
        } 
        catch (error) 
        {
          return {
            success: false,
            message: `DynamoDB: Erro ao visualizar os nomes do cliente: ${error.message}`,
            connection_time: this.connectionTime
          };
        }
      }
    /*-------------------- END OF READ ALL NAMES --------------------*/

    /*-------------------- READ ONE --------------------*/
      async readClient(id_client)
      {
        try 
        {
          const start_time = process.hrtime();
    
          id_client = parseInt(id_client)

          const result = await this.db.get({
            TableName: "client",
            Key: {
              id_client: id_client
            }
          }).promise();

          const end_time = process.hrtime(start_time);
          const queryTime = (end_time[0] *  end_time[1]);
    
          return {
            success: true,
            message: "DynamoDB: Cliente " + id_client + " visualizado com sucesso.",
            connection_time: this.connectionTime,
            query_time: queryTime,
            result: [result.Item ]
          };
        } 
        catch (error) 
        {
          return {
            success: false,
            message: `DynamoDB: Erro ao visualizar os dados do cliente: ${error.message}`,
            connection_time: this.connectionTime
          };
        }
      }
    /*-------------------- END OF READ ONE --------------------*/

    /*-------------------- UPDATE --------------------*/
      async updateClient(id_client, name_client, age_client, gender_client)
      {
        try 
        {
          const start_time = process.hrtime();
    
          id_client = parseInt(id_client)

          await this.db.put({
            TableName: "client",
            Item: 
            {
              id_client,
              name_client,
              age_client,
              gender_client
            },
            Key:
            {
              id_client: id_client
            }
          }).promise()
  
          const end_time = process.hrtime(start_time);
          const queryTime = (end_time[0] *  end_time[1]);
    
          return {
            success: true,
            message: "DynamoDB: Cliente atualizado com sucesso.",
            connection_time: this.connectionTime,
            query_time: queryTime
          };
        } 
        catch (error) 
        {
          return {
            success: false,
            message: `DynamoDB: Erro ao atualizar o cliente: ${error.message}`,
            connection_time: this.connectionTime
          };
        }
      }
    /*-------------------- END OF UPDATE --------------------*/

    /*-------------------- DELETE --------------------*/
      async deleteClient(id_client)
      {
        try 
        {
          const start_time = process.hrtime();
    
          id_client = parseInt(id_client)

          const result = await this.db.delete({
            TableName: "client",
            Key: {
              id_client: id_client
            }
          }).promise();

          const end_time = process.hrtime(start_time);
          const queryTime = (end_time[0] *  end_time[1]);
    
          return {
            success: true,
            message: "DynamoDB: Cliente " + id_client + " excluido com sucesso.",
            connection_time: this.connectionTime,
            query_time: queryTime,
            result: result.Item 
          };
        } 
        catch (error) 
        {
          return {
            success: false,
            message: `DynamoDB: Erro ao excluir o cliente: ${error.message}`,
            connection_time: this.connectionTime
          };
        }
      }
    /*-------------------- END OF DELETE --------------------*/


  }
  
  export default DynamoDBClientModel;
  