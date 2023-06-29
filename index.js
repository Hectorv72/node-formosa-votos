import getDatosMesa from "./src/utilities/getDatosMesa.js"
import getOptionsList from "./src/utilities/getOptionsList.js"
import saveIntoJson from "./src/utilities/saveIntoJson.js"

let globalList = []

const departamentos = [
  { departamento: 'BERMEJO', cod_departamento: 294 },
  { departamento: 'FORMOSA', cod_departamento: 288 },
  { departamento: 'LAISHÍ', cod_departamento: 289 },
  { departamento: 'MATACOS', cod_departamento: 295 },
  { departamento: 'PATIÑO', cod_departamento: 293 },
  { departamento: 'PILAGÁS', cod_departamento: 292 },
  { departamento: 'PILCOMAYO', cod_departamento: 290 },
  { departamento: 'PIRANÉ', cod_departamento: 291 },
  { departamento: 'RAMÓN LISTA', cod_departamento: 296 },
]

const getEscuelas = async (object, codCircuito) => {
  const listEscuelas = await getOptionsList('escuelas', codCircuito, ['cod_escuela', 'escuela'])
  // listEscuelas.length = 1
  for (const escuela of listEscuelas) {
    const { cod_departamento, cod_localidad, cod_circuito } = object
    const { cod_escuela } = escuela

    const newObject = { ...object, ...escuela }
    const listDatos = await getDatosMesa(newObject, cod_departamento, cod_localidad, cod_circuito, cod_escuela)
    globalList = [...globalList, ...listDatos]
    // console.log(listDatos)
    // globalList.push(newObject)
  }
  // console.log(codCircuito, listEscuelas)
}

const getCircuitos = async (object, codCircuito) => {
  const listCircuitos = await getOptionsList('circuitos', codCircuito, ['cod_circuito', 'circuito'])
  // listCircuitos.length = 1
  for (const circuito of listCircuitos) {
    const newObject = { ...object, ...circuito }
    await getEscuelas(newObject, circuito.cod_circuito)
  }
  // console.log(codCircuito, listCircuitos)
}

const getLocalidades = async (object, codLocalidad) => {
  const listLocalidades = await getOptionsList('localidades', codLocalidad, ['cod_localidad', 'localidad'])
  // listLocalidades.length = 1
  for (const localidad of listLocalidades) {
    const newObject = { ...object, ...localidad }
    await getCircuitos(newObject, localidad.cod_localidad)
  }
}

const saveAll = async () => {
  for (const departamento of departamentos) {
    console.log(departamento.departamento)
    await getLocalidades(departamento, departamento.cod_departamento)
  }

  saveIntoJson('FORMOSA-VOTOS', globalList)
}

saveAll()