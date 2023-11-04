const mysql = require("mysql2")
const express = require("express");
const { listen } = require("express/lib/application");

const app = express();
const PORT = 8001

const myConnection = mysql.createConnection(
    {
        host: '127.0.0.1',
        port:'3306',
        user: 'root',
        password:'admin',
        database:'club_lectura'
    }
);

myConnection.connect((err) => {
    if (err) {
        console.error('Error de conexión a la base de datos:');
        return;
    }
    console.log('Conexión a la base de datos establecida');
});


app.listen(PORT, function() 
    {
        console.log("Aplicación funcionando en el puerto: " + PORT);
    }
);

//Rutas para las distintas operaciones del CRUD:

//( R ) Consultar todos los registros:
//con el método get manejamos el listado de todos los regitros de la tabla
// tiene dos objetos el req (request), y el resp (response):

//127.0.0.1:8001/list


//Funcion GET para obtener la base de datos de los usuarios  
app.get(    "/list",  (req, resp)  => {

    myConnection.query("select * from usuarios"  , (err, results) =>
    {
        if(err)
        {
            console.error("Error conectándose a la base de datos",err);
            resp.status(500).send("Error consultando los registros hola")
        }
        resp.send(results);
        //Funcion ejemplo donde se muestra todos los datos de los usuarios
    });
});



//Funcion GET donde se obtienen los datos de un usuario atraves de su correo (Por ejemplo para autentificar su usuario)
app.get(    "/list/:id",  (req, resp)  => {

    const correo = req.params.id;

    myConnection.query("select * from usuarios where correo = ?",[correo] , (err, results) =>
    {
        if(err)
        {
            console.error("Error conectándose a la base de datos",err);
            resp.status(500).send("Error consultando los registros hola")
        }
        resp.send(results);
        //Funcion donde haria la combrobacion con los datos ingresados por el usuario y la base de datos para porder autentificarse con la pagina 
    });
});





//Funcion GET donde se obtienen los datos de un libro atravez de su id
app.get(    "/libro/:id",  (req, resp)  => {

    const id_libro = req.params.id;

    myConnection.query("select * from usuarios where id_libro = ?",[id_libro] , (err, results) =>
    {
        if(err)
        {
            console.error("Error conectándose a la base de datos",err);
            resp.status(500).send("Error consultando los registros hola")
        }
        resp.send(results);
        
    });
});



