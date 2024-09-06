class MysqlAddressModel 
{
    constructor(db, connectionTime) 
    {
      this.db = db;
      this.connectionTime = connectionTime;
    }
  
   
    /*-------------------- CREATE ADDRESS --------------------*/
    async createAddress(zip_code_address) 
    {
      try 
      {
        const [existingAddresses] = await this.db.execute(
          `SELECT * FROM address WHERE zip_code_address = ?`,
          [zip_code_address]
        );
    
        if (existingAddresses.length > 0) 
        {
          return {
            success: true,
            message: "MySQL: Endereço já existe.",
            address: existingAddresses[0],
            connection_time: this.connectionTime
          };
        }
    
        const response = await axios.get(`https://viacep.com.br/ws/${zip_code_address}/json/`);
        const {logradouro, bairro, localidade, uf, regiao } = response.data;
    
        let street_address = logradouro;
        let neighborhood_address = bairro;
        let city_address = localidade;
        let state_address = uf;
        let region_address = regiao;
        let country_address = "Brasil"; // Definindo um valor padrão para country_address
    
        // Insere um novo endereço no banco de dados MySQL
        const start_time = process.hrtime();
    
        await this.db.execute(
          `INSERT INTO address (zip_code_address, street_address, neighborhood_address, city_address, state_address, region_address, country_address) 
           VALUES (?, ?, ?, ?, ?, ?, ?)`,
          [
            zip_code_address,
            street_address,
            neighborhood_address,
            city_address,
            state_address,
            region_address,
            country_address
          ]
        );
    
        const end_time = process.hrtime(start_time);
        const queryTime = (end_time[0] * 1e9 + end_time[1]); // Convertendo para nanosegundos
    
        return {
          success: true,
          message: "MySQL: Endereço criado com sucesso.",
          connection_time: this.connectionTime,
          query_time: queryTime
        };
      } 
      catch (error) 
      {
        return {
          success: false,
          message: `MySQL: Erro ao criar o endereço: ${error.message}`,
          connection_time: this.connectionTime
        };
      }
    }
    
    /*-------------------- END OF CREATE ADDRESS --------------------*/

    /*-------------------- READ ALL ADDRESSES --------------------*/
      async readAddresses()
      {
        try 
        {
          const start_time = process.hrtime();
    
          const [result] = await this.db.execute(`SELECT * FROM address `);
    
          const end_time = process.hrtime(start_time);
          const queryTime = (end_time[0] *  end_time[1]);
    
          return {
            success: true,
            message: "MySQL MODEL: Endereços visualizados com sucesso.",
            connection_time: this.connectionTime,
            query_time: queryTime,
            result: result
          };
        } 
        catch (error) 
        {
          return {
            success: false,
            message: `MySQL MODEL: Erro ao visualizar os endereços: ${error.message}`,
            connection_time: this.connectionTime
          };
        }
      }
    /*-------------------- END OF READ ADDRESSES --------------------*/

    /*-------------------- UPDATE --------------------*/
      async updateAddress( 
        id_address,
        zip_code_address,
        street_address,
        neighborhood_address,
        city_address,
        state_address,
        region_address,
        country_address)
      {
        try 
        {
          const start_time = process.hrtime();
    
          const [result] = await this.db.execute(
            `UPDATE address 
             SET zip_code_address = ?, street_address = ?, neighborhood_address = ?, city_address = ?, state_address = ?, region_address = ?, country_address = ?
             WHERE id_address = ?`,
            [ 
              zip_code_address,
              street_address,
              neighborhood_address,
              city_address,
              state_address,
              region_address,
              country_address,
              id_address
            ]
          );
    
          const end_time = process.hrtime(start_time);
          const queryTime = (end_time[0] *  end_time[1]);
    
          return {
            success: true,
            message: "MySQL MODEL: Endereço atualizado com sucesso.",
            connection_time: this.connectionTime,
            query_time: queryTime
          };
        } 
        catch (error) 
        {
          return {
            success: false,
            message: `MySQL MODEL: Erro ao atualizar o endereço: ${error.message}`,
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
    
          const [result] = await this.db.execute(`DELETE FROM address WHERE id_address = ?`, [id_address]);
    
          const end_time = process.hrtime(start_time);
          const queryTime = (end_time[0] *  end_time[1]);
    
          return {
            success: true,
            message: "MySQL MODEL: Endereço deletado com sucesso.",
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
    /*-------------------- END OF DELETE --------------------*/


  }
  
  export default MysqlAddressModel;
  