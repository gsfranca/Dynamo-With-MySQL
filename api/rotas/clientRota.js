import express from 'express';
import ClientController from '../controllers/clientController.js';

class ClientRota 
{
    constructor(database) 
    {
        this.router = express.Router();
        this.controller = new ClientController(database);
        this.setupRoutes();
    }

    setupRoutes() 
    {
        this.router.post('/client/create', (req, res) => {this.controller.storeClient(req, res)});
        this.router.get('/client/read/:id_client', (req, res) => this.controller.getClient(req, res));
        this.router.get('/client/readNames', (req, res) => this.controller.getClientNames(req, res));
        this.router.put('/client/update/:id_client', (req, res) => this.controller.setClient(req, res));
        this.router.delete('/client/delete/:id_client', (req, res) => this.controller.destroyClient(req, res));
    }
}

export default ClientRota;
