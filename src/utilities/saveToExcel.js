import fs from 'fs';
import json2xls from 'json2xls';

export default (nombre) => {
  // const nombre = 'FORMOSA-VOTOS-DIPUTADOS'

  // Lee el archivo JSON
  const jsonData = fs.readFileSync(`${nombre}.json`, 'utf8');

  // Convierte el JSON a un objeto JavaScript
  const data = JSON.parse(jsonData);

  // Convierte el objeto JavaScript a formato Excel
  const xls = json2xls(data);

  // Guarda el archivo Excel
  fs.writeFileSync(`${nombre}.xlsx`, xls, 'binary');

  console.log('Archivo Excel creado con éxito.');
}