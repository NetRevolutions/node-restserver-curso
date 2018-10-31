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
//  Vencimiento del Token
//  =================================
//  60 segundos
//  60 minutos
//  24 horas
//  30 dias
process.env.CADUCIDAD_TOKEN = '48h'; //60 * 60 * 24 * 30;

//  =================================
//  SEED de autenticación
//  =================================
process.env.SEED = process.env.SEED || "este-es-el-seed-desarrollo";

//  =================================
//  Base De Datos
//  =================================
let urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/cafe'; 
} else {
    urlDB = process.env.MONGO_URI;
}
process.env.URLDB = urlDB;

//  =================================
//  Google Client ID
//  =================================

process.env.CLIENT_ID = process.env.CLIENT_ID || '879344138154-3vi7cjjog12pckcsrho73pbfaij09f42.apps.googleusercontent.com'; 