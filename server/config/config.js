//  =================================
//  Puerto
//  =================================
process.env.PORT = process.env.PORT || 3000;


//  =================================
//  Entorno
//  La variable process.env.NODE_ENV la establece heroku, 
//  por eso sino viene nada por defecto es 'dev'
//  =================================
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';


//  =================================
//  Base De Datos
//  =================================
let urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/cafe'; 
} else {
    urlDB = "mongodb://cafe-user:Cafe2018@ds127132.mlab.com:27132/cafe";
}
process.env.URLDB = urlDB;