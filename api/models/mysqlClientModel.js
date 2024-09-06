class MysqlClientModel 
{
    constructor(db, connectionTime) 
    {
      this.db = db;
      this.connectionTime = connectionTime;
    }
  
   
    /*-------------------- CREATE --------------------*/
      async createClient(name_client, age_client, gender_client)
      {
        try 
        {
          const start_time = process.hrtime();
    
          const [result] = await this.db.execute(
            `INSERT INTO client (name_client, age_client, gender_client) VALUES (?, ?, ?)`,
            [name_client, age_client, gender_client]
          );
    
          const end_time = process.hrtime(start_time);
          const queryTime = (end_time[0] *  end_time[1]);
    
          return {
            success: true,
            message: "MySQL: Cliente criado com sucesso.",
            connection_time: this.connectionTime,
            query_time: queryTime
          };
        } 
        catch (error) 
        {
          return {
            success: false,
            message: `MySQL: Erro ao criar o cliente: ${error.message}`,
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
    
          const [result] = await this.db.execute(`SELECT id_client, name_client FROM client`);
    
          const end_time = process.hrtime(start_time);
          const queryTime = (end_time[0] *  end_time[1]);
    
          return {
            success: true,
            message: "MySQL: Nome dos clientes visualizado com sucesso.",
            connection_time: this.connectionTime,
            query_time: queryTime,
            result: result
          };
        } 
        catch (error) 
        {
          return {
            success: false,
            message: `MySQL: Erro ao visualizar os nomes dos clientes: ${error.message}`,
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
          let message_v = "";
          let success_v = false;
    
          const [result] = await this.db.execute('SELECT * FROM `client` WHERE id_client = ?;', [id_client.toString()]);
          
          if (result.length === 0) {throw new Error("Cliente não existe.");} 
          
          const end_time = process.hrtime(start_time);
          const queryTime = (end_time[0] *  end_time[1]);
    
          return {
            success: true,
            message: "MySQL: Cliente " + id_client + " visualizado com sucesso.",
            connection_time: this.connectionTime,
            query_time: queryTime,
            result: result
          };
        } 
        catch (error) 
        {
          return {
            success: false,
            message: `MySQL: Erro ao visualizar os dados do cliente: ${error.message}`,
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
    
          const [result] = await this.db.execute(
            `UPDATE client SET name_client = ?, age_client = ?, gender_client = ? WHERE id_client = ?`,
            [name_client, age_client, gender_client, id_client]
          );
    
          const end_time = process.hrtime(start_time);
          const queryTime = (end_time[0] *  end_time[1]);
    
          return {
            success: true,
            message: "MySQL: Cliente atualizado com sucesso.",
            connection_time: this.connectionTime,
            query_time: queryTime
          };
        } 
        catch (error) 
        {
          return {
            success: false,
            message: `MySQL: Erro ao atualizar o cliente: ${error.message}`,
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
    
          const [result] = await this.db.execute(`DELETE FROM client WHERE id_client = ?`, [id_client]);
    
          const end_time = process.hrtime(start_time);
          const queryTime = (end_time[0] *  end_time[1]);
    
          return {
            success: true,
            message: "MySQL: Cliente deletado com sucesso.",
            connection_time: this.connectionTime,
            query_time: queryTime
          };
        } 
        catch (error) 
        {
          return {
            success: false,
            message: `MySQL: Erro ao deletar o cliente: ${error.message}`,
            connection_time: this.connectionTime
          };
        }
      }
    /*-------------------- END OF DELETE --------------------*/


  }
  
  export default MysqlClientModel;
  