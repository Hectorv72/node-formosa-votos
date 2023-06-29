import fetch from 'node-fetch';
import { load } from 'cheerio';
import iconv from 'iconv-lite';


export const getVotosGobernador = async (codDepartamento, codLocalidad, codCircuito, codEscuela, codMesa) => {

  try {
    const res = await fetch(`https://elecciones.formosa.gob.ar/resultados/simple/0/provinciales/ver_gobernador/${codDepartamento}/${codLocalidad}/${codCircuito}/${codEscuela}/${codMesa}/0/3`);

    const htmlBuffer = await res.text()
    // const html = htmlBuffer;
    const html = iconv.decode(htmlBuffer, 'UTF-8');

    const $ = load(html, { decodeEntities: false });
    $('head meta[charset]').attr('content', 'text/html; charset=UTF-8');
    const divs = $('.d-flex.mb-2');
    const results = [];

    divs.each((index, element) => {
      const div = $(element);
      const partido = div.find('.activity-progress').contents().filter((_, el) => el.nodeType === 3).eq(0).text().trim();
      const nombres = div.find('.activity-progress small').eq(0).text().trim().split('  ')
      const gobernador = nombres[0];
      const vicegobernador = nombres[1];
      const porcentaje = div.find('.activity-progress small').eq(1).text().trim().split(' ')[2]
      // div.find('.activity-progress small').eq(1).text().trim();
      const votos = div.find('.activity-progress .text-muted').text().trim().split(':')[1].trim();
      const imagen = div.find('.avatar-lg > a > img').attr('src');
      const color = div.find('.avatar-lg').css('background-color');

      results.push({
        partido,
        gobernador,
        vicegobernador,
        votos,
        porcentaje,
        imagen,
        color
      });
    });

    return results
  } catch (error) {
    return []
  }

}


export const getVotosDiputados = async (codDepartamento, codLocalidad, codCircuito, codEscuela, codMesa) => {

  try {
    //  https://elecciones.formosa.gob.ar/resultados/simple/0/provinciales/ver_diputados_provinciales/294/3995/151/426/1350/0/3
    const res = await fetch(`https://elecciones.formosa.gob.ar/resultados/simple/0/provinciales/ver_diputados_provinciales/${codDepartamento}/${codLocalidad}/${codCircuito}/${codEscuela}/${codMesa}/0/3`);

    const htmlBuffer = await res.text()
    // const html = htmlBuffer;
    const html = iconv.decode(htmlBuffer, 'UTF-8');

    const $ = load(html, { decodeEntities: false });
    $('head meta[charset]').attr('content', 'text/html; charset=UTF-8');
    const divs = $('.d-flex.mb-2');
    const results = [];

    divs.each((index, element) => {
      const div = $(element);
      const partido = div.find('.activity-progress').contents().filter((_, el) => el.nodeType === 3).eq(0).text().trim();
      const nombres = div.find('.activity-progress small').eq(0).text().trim().split('  ')
      const diputado = nombres[0];
      const porcentaje = div.find('.activity-progress small').eq(1).text().trim().split(' ')[2]
      // div.find('.activity-progress small').eq(1).text().trim();
      const votos = div.find('.activity-progress .text-muted').text().trim().split(':')[1].trim();
      const imagen = div.find('.avatar-lg > a > img').attr('src');
      const color = div.find('.avatar-lg').css('background-color');

      results.push({
        partido,
        diputado,
        votos,
        porcentaje,
        imagen,
        color
      });
    });

    return results
  } catch (error) {
    return []
  }

}