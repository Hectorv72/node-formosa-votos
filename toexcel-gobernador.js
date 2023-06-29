import fs from 'fs';
import json2xls from 'json2xls';

// Lee el archivo JSON
const jsonData = fs.readFileSync('FORMOSA-VOTOS-GOBERNADOR.json', 'utf8');

// Convierte el JSON a un objeto JavaScript
const data = JSON.parse(jsonData);

// Convierte el objeto JavaScript a formato Excel
const xls = json2xls(data);

// Guarda el archivo Excel
fs.writeFileSync('FORMOSA-VOTOS-GOBERNADOR.xlsx', xls, 'binary');

console.log('Archivo Excel creado con éxito.');