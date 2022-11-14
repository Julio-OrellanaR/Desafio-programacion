import config from "../config";
import mysql from "promise-mysql"

const connection = mysql.createConnection({
    host: config.HOST,
    database: config.DATABASE, 
    user: config.USER,
    password: config.PASSWORD,
    port: config.PORT
})

/**
 * debuelve la conexion con mysql
 * @returns connnection retornara la conexion cereada con mysql
 */
const getConnection =()=>{
    return connection
}

module.exports = {
    getConnection
}