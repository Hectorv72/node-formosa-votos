import fs from 'fs'

export default (name, jsonData) => {
  const filePath = `./${name}.json`;

  // Escribir los datos en el archivo
  fs.writeFile(filePath, JSON.stringify(jsonData), 'utf8', (err) => {
    if (err) {
      console.error('Error al guardar el archivo JSON:', err);
      return;
    }

    console.log('El archivo JSON se ha guardado exitosamente.');
  });
}