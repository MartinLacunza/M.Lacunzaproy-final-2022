const express = require ('express');
const app = express();
require('dotenv').config();
const Port = server.listen(process.env.PORT || 8080);
const hbs = require('hbs');
const mysql = require('mysql2');
const path = require('path');
const nodemailer = require('nodemailer');
const { log } = require('console');
const { consumers } = require('stream');

//conexion a la base de datos
const conexion = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    port: process.env.PORTDB,
    database: process.env.DATABASE,
});



//conectamos la database
const conectar = (
    conexion.connect((error) =>{
        if(error) throw error;
        console.log('Base de Datos Conectada!!');
    })
);



//middlewars

app.use(express.json());
app.use(express.urlencoded({extended: false}));



//configuramos la vista de la aplicacion


app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
hbs.registerPartials(path.join(__dirname, 'views/partials'));




app.get('/', (req, res) =>{
    res.render('index')

});



app.get('/contacto', (req, res) =>{
    res.render('contacto')
});

app.get('/sucursales', (req, res) =>{
    res.render('sucursales')
});

app.get('/servicios', (req, res) =>{
    res.render('servicios')
});

//recibir datos
app.post('/contacto', (req, res) =>{
    console.log(req.body);
    const {nombre, telefono, correo, comentario} = req.body;


    if(nombre == "" || telefono == ""|| correo == ""|| comentario == ""){
        let validacion = 'Faltan datos para ingresar la consulta'
        res.render('contacto', {
            validacion
        })} else{
        console.log(nombre);
        console.log(telefono);
        console.log(correo);
        console.log(comentario);
        let data = {
            contacto_nombre: nombre,
            contacto_correo: correo,
            contacto_telefono: telefono,
            contacto_comentario: comentario
        };
        
        let sql = "INSERT INTO CONTACTO SET ?";
        
        let query = conexion.query(sql, data, (err, results) =>{
            if(err) throw err;
            
        });
        res.render('index')
};
});


app.listen(Port, ()=>{
    console.log(`Servidor corriendo en el puerto ${Port}`);
});

app.on('error', (error)=>{
    console.log(`Tenemos un error ${error}`);
});

