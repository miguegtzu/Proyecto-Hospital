const mysql = require('mysql')
const conexion = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Maracaibo1',
    databse: 'clinica'
})

conexion.connect(function(error){
    if(error){
        console.log('ocurrio un error en la base de datos')
        return;
    }else{
       console.log('Conexion exitosa!!')  
    }
})

module.exports = {conexion}