import fetch from 'node-fetch';
import { load } from 'cheerio';
import iconv from 'iconv-lite';

export default async (type, cod, keys = []) => {
  try {
    const res = await fetch(`https://elecciones.formosa.gob.ar/filtros/${cod}/0/escrutinio/${type}.html`);
    // console.log(`https://elecciones.formosa.gob.ar/filtros/${cod}/0/escrutinio/${type}.html`)
    const htmlBuffer = await res.text()
    // const html = htmlBuffer;
    const html = iconv.decode(htmlBuffer, 'UTF-8');

    const $ = load(html, { decodeEntities: false });
    const options = $('option')
    const list = []

    options.each((index, element) => {
      const value = $(element).attr('value');
      const text = $(element).text();
      if (value) {
        list.push({ [keys[0]]: value, [keys[1]]: text })
      }
    });

    return list
  } catch (error) {
    return []
  }

}