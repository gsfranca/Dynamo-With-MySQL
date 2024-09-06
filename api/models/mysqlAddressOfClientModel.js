class MysqlAddressOfClientModel 
{
    constructor(db, connectionTime) 
    {
      this.db = db;
      this.connectionTime = connectionTime;
    }
  
   
    /*-------------------- CREATE ADDRESS OF CLIENT --------------------*/
      async createAddressOfClient(
        id_client,
        id_address,
        number_address_of_client,
        complement_address_of_client
      )
      {
        try 
        {
          const start_time = process.hrtime();
    
          const [result] = await this.db.execute(
            `INSERT INTO address_of_client (id_client, id_address, number_address_of_client, complement_address_of_client) 
             VALUES (?, ?, ?, ?)`,
            [
              id_client,
              id_address,
              number_address_of_client,
              complement_address_of_client
            ]
          );
    
          const end_time = process.hrtime(start_time);
          const queryTime = (end_time[0] *  end_time[1]);
    
          return {
            success: true,
            message: "MySQL MODEL: Endereço adicionado ao cliente com sucesso.",
            connection_time: this.connectionTime,
            query_time: queryTime
          };
        } 
        catch (error) 
        {
          return {
            success: false,
            message: `MySQL MODEL: Erro ao adicionar o endereço ao cliente: ${error.message}`,
            connection_time: this.connectionTime
          };
        }
      }
    /*-------------------- END OF CREATE ADDRESS OF CLIENT --------------------*/

    /*-------------------- READ ALL ADDRESSES OF CLIENT --------------------*/
      async readAddressOfClient(id_client)
      {
        try 
        {
          const start_time = process.hrtime();
    
          const [result] = await this.db.execute(`SELECT * FROM address_of_client WHERE id_client = ? `, [id_client]);
    
          const end_time = process.hrtime(start_time);
          const queryTime = (end_time[0] *  end_time[1]);
    
          return {
            success: true,
            message: "MySQL MODEL: Endereços do cliente visualizados com sucesso.",
            connection_time: this.connectionTime,
            query_time: queryTime,
            result: result
          };
        } 
        catch (error) 
        {
          return {
            success: false,
            message: `MySQL MODEL: Erro ao visualizar os endereços do cliente: ${error.message}`,
            connection_time: this.connectionTime
          };
        }
      }
    /*-------------------- END OF READ ADDRESSES OF CLIENT --------------------*/

    /*-------------------- UPDATE ADDRESS OF CLIENT --------------------*/
      async updateAddressOfClient( 
        id_address_of_client,
        id_address,
        id_client,
        number_address_of_client,
        complement_address_of_client
      )
      {
        try  
        {
          const start_time = process.hrtime();
    
          const [result] = await this.db.execute(
            `UPDATE address_of_client 
             SET id_address = ?, id_client = ?, id_address = ?, number_address_of_client = ?, complement_address_of_client = ?
             WHERE id_address_of_client = ?`,
            [ 
              id_address,
              id_client,
              id_address,
              number_address_of_client,
              complement_address_of_client,
              id_address_of_client
            ]
          );
    
          const end_time = process.hrtime(start_time);
          const queryTime = (end_time[0] *  end_time[1]);
    
          return {
            success: true,
            message: "MySQL MODEL: Endereço do cliente atualizado com sucesso.",
            connection_time: this.connectionTime,
            query_time: queryTime
          };
        } 
        catch (error) 
        {
          return {
            success: false,
            message: `MySQL MODEL: Erro ao atualizar o endereço do cliente: ${error.message}`,
            connection_time: this.connectionTime
          };
        }
      }
    /*-------------------- END OF UPDATE ADDRESS OF CLIENT --------------------*/

    /*-------------------- DELETE ADDRESS OF CLIENT --------------------*/
      async deleteAddressOfClient(id_address_of_client)
      {
        try 
        {
          const start_time = process.hrtime();
    
          const [result] = await this.db.execute(`DELETE FROM address_of_client WHERE id_address_of_client = ?`, [id_address_of_client]);
    
          const end_time = process.hrtime(start_time);
          const queryTime = (end_time[0] *  end_time[1]);
    
          return {
            success: true,
            message: "MySQL MODEL: Endereço do cliente deletado com sucesso.",
            connection_time: this.connectionTime,
            query_time: queryTime
          };
        } 
        catch (error) 
        {
          return {
            success: false,
            message: `MySQL MODEL: Erro ao deletar o endereço: ${error.message}`,
            connection_time: this.connectionTime
          };
        }
      }
    /*-------------------- END OF DELETE ADDRESS OF CLIENT --------------------*/


  }
  
  export default MysqlAddressOfClientModel;
  