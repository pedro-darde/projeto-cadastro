import { Sequelize } from 'sequelize';
import databaseConfig from '../config/database.js'
import {initRegister} from '../models/Register'
import {initProduto} from '../models/produtos'
import {initProdutoImage} from '../models/produtoimage'

const models = [initRegister, initProduto, initProdutoImage];

class Database {

    //private connection = new Sequelize(databaseConfig.development);

    constructor() {
        //console.log(process.env.NODE_ENV)

        let connection = new Sequelize(databaseConfig.development);

        models.map(model => model(connection));
    }
}

export default new Database();