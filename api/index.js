import 'dotenv/config'; 
import express from 'express';
import morgan from 'morgan';
import DatabaseFactory from './config/DatabaseFactory.js';
import ClientRota from './rotas/clientRota.js';
import AddressRota from './rotas/addressRota.js';
import AddressOfClientRota from './rotas/addressOfClientRota.js';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 3000;

const corsOptions = 
{
    origin: ['http://127.0.0.1:5500','http://localhost:5500', 'http://localhost:8080', 'http://127.0.0.1:8080'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: ['Content-Type', 'Authorization', 'X-API-KEY', 'X-Requested-With', 'X-Custom-Header'],
    credentials: true,
    optionsSuccessStatus: 204
};

app.use(morgan('combined'));
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const database = DatabaseFactory.createDatabase(process.env);

const start_time = process.hrtime();
database.connect().then(() => 
{
    const end_time = process.hrtime(start_time);
    const connectionTime = (end_time[0] * 1e9 + end_time[1]) / 1e6; 

    console.log(`Conexão ao banco de dados estabelecida em ${connectionTime}ms`);
    const clientRoutes = new ClientRota(database);
    const addressRoutes = new AddressRota(database);
    const addressOfClientRoutes = new AddressOfClientRota(database);

    app.use('/', clientRoutes.router);
    app.use('/', addressRoutes.router);
    app.use('/', addressOfClientRoutes.router);

    app.listen(port, () =>{console.log(`Servidor rodando em localhost:${port}`);});
})
.catch((err) => 
{
    console.error('Erro ao conectar ao banco de dados:', err);
});
