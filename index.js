//Creamos el servidor web
const { connect } = require("./src/utils/db");
const express = require("express");
const dotenv = require("dotenv");
dotenv.config();

//Conectamos con la base de datos
connect();
const app = express();
const PORT = process.env.PORT;



//Esto es para introducir limitaciones en la recepcion y envio de datos, para que no se envien datos que son de más de 5mb
app.use(express.json({ limit: '5mb'}));
app.use(express.urlencoded({ limit: '5mb', extended: false }));






//------
//Routes
//------
const CharacterRoutes = require("./src/api/routes/routes");
app.use("/api/v1/character/", CharacterRoutes)


//Esto de aquí es para cuando no metamos ninguna ruta
app.use('*', (req, res, next)=> {
    const error = new Error('Route not found');
    error.status = 404;
    return next(error);
});


//Error 500 del server
app.use((error, req, res)=>{
    return res
        .status(error.status || 500)
        .json(error.message || 'Unexpected error');

});


//--------------------------------------
//Escuchamos en el port la base de datos
//--------------------------------------

app.disable('x-powered-by');
app.listen(PORT, () => {
    console.log(`Listening on PORT http://localhost:${PORT}`);
});