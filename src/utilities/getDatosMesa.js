import fetch from 'node-fetch';
import { load } from 'cheerio';
import iconv from 'iconv-lite';

export default async (object, codDepartamento, codLocalidad, codCircuito, codEscuela) => {
  const jsonDataList = []

  const res = await fetch(`https://elecciones.formosa.gob.ar/resultados/simple/0/escrutinio/ver_resultados_escrutinio/${codDepartamento}/${codLocalidad}/${codCircuito}/${codEscuela}/0/0/escrutinio`);

  const htmlBuffer = await res.text()
  const html = iconv.decode(htmlBuffer, 'UTF-8');
  // const html = htmlBuffer;

  const $ = load(html, { decodeEntities: false });
  const result = $('table#table-avance-departamentos tbody tr');
  const filas = Array.isArray(result) ? result.slice(1) : result
  // Iterar sobre cada fila y extraer los datos requeridos

  const mesas = filas.map((index, fila) => {
    const $fila = $(fila);
    // Extraer los valores de cada columna
    const numero_mesa = $fila.find('td:nth-child(1)').text().trim();
    const electores = $fila.find('td:nth-child(2)').text().trim();
    const votos = $fila.find('td:nth-child(3)').text().trim();
    const participacion = $fila.find('td:nth-child(4) span').text().trim();
    const estado = $fila.find('td:nth-child(5) div').text().trim();

    // console.log(numero_mesa)

    // Crear un objeto con los datos extraídos
    return {
      numero_mesa,
      electores,
      votos,
      participacion,
      estado
    };
  }).get();

  for (const mesa of mesas) {
    jsonDataList.push({ ...object, ...mesa })
  }

  return jsonDataList

}