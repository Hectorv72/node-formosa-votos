import parseNumericProperties from './src/utilities/parseNumericProperties.js'
import saveIntoJson from './src/utilities/saveIntoJson.js'
import concejalesJson from './FORMOSA-VOTOS-CONCEJALES.json' assert { type: 'json' }
import gobernadorJson from './FORMOSA-VOTOS-GOBERNADOR.json' assert { type: 'json' }
import diputadosJson from './FORMOSA-VOTOS-DIPUTADOS.json' assert { type: 'json' }
import intendentesJson from './FORMOSA-VOTOS-INTENDENTES.json' assert { type: 'json' }


const newJsonGobernador = parseNumericProperties(gobernadorJson)
saveIntoJson('FORMOSA-VOTOS-GOBERNADOR', newJsonGobernador)

const newJsonDiputados = parseNumericProperties(diputadosJson)
saveIntoJson('FORMOSA-VOTOS-DIPUTADOS', newJsonDiputados)

const newJsonConcejales = parseNumericProperties(concejalesJson)
saveIntoJson('FORMOSA-VOTOS-CONCEJALES', newJsonConcejales)

const newJsonIntendentes = parseNumericProperties(intendentesJson)
saveIntoJson('FORMOSA-VOTOS-INTENDENTES', newJsonIntendentes)