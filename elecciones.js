import { getVotosDiputados, getVotosGobernador } from "./src/utilities/getEleccionesProvinciales.js"
import { getMesas, getEscuelas, getCircuitos, getDepartamentos, getLocalidades } from "./src/utilities/getFilters.js"
import saveIntoJson from "./src/utilities/saveIntoJson.js"

let globalList = []

const findVotosGobernador = async (object) => {
  // console.log(object)
  const { cod_departamento, cod_localidad, cod_circuito, cod_escuela, cod_mesa } = object
  const listVotosGobernador = await getVotosGobernador(cod_departamento, cod_localidad, cod_circuito, cod_escuela, cod_mesa)

  const listDatos = []

  for (const votos of listVotosGobernador) {
    const newObject = { ...object, ...votos }
    listDatos.push(newObject)
  }
  globalList = [...globalList, ...listDatos]
}

const findVotosDiputados = async (object) => {
  // console.log(object)
  const { cod_departamento, cod_localidad, cod_circuito, cod_escuela, cod_mesa } = object
  const listVotosDiputados = await getVotosDiputados(cod_departamento, cod_localidad, cod_circuito, cod_escuela, cod_mesa)

  const listDatos = []

  for (const votos of listVotosDiputados) {
    const newObject = { ...object, ...votos }
    listDatos.push(newObject)
  }
  globalList = [...globalList, ...listDatos]
}

const findMesas = async (object, codEscuela, codCircuito) => {
  const listMesas = await getMesas(codEscuela, codCircuito)

  for (const mesa of listMesas) {
    const newObject = { ...object, ...mesa }
    // findVotosGobernador(newObject)
    await findVotosDiputados(newObject)
  }
}

const findEscuelas = async (object, codCircuito) => {
  const listEscuelas = await getEscuelas(codCircuito)
  // listEscuelas.length = 1
  for (const escuela of listEscuelas) {
    const { cod_escuela } = escuela

    const newObject = { ...object, ...escuela }
    await findMesas(newObject, cod_escuela, codCircuito)
    // globalList = [...globalList, ...listDatos]
  }
  // console.log(codCircuito, listEscuelas)
}

const findCircuitos = async (object, getLocalidad) => {
  const listCircuitos = await getCircuitos(getLocalidad)
  // listCircuitos.length = 1
  for (const circuito of listCircuitos) {
    const newObject = { ...object, ...circuito }
    await findEscuelas(newObject, circuito.cod_circuito)
  }
  // console.log(codCircuito, listCircuitos)
}

const findLocalidades = async (object, codDepartamento) => {
  const listLocalidades = await getLocalidades(codDepartamento)
  // console.log(listLocalidades)
  // listLocalidades.length = 1
  for (const localidad of listLocalidades) {
    const newObject = { ...object, ...localidad }
    await findCircuitos(newObject, localidad.cod_localidad)
  }
}

const findAll = async () => {
  const departamentos = getDepartamentos()
  for (const departamento of departamentos) {
    console.log(departamento)
    await findLocalidades(departamento, departamento.cod_departamento)
  }
  // saveIntoJson('FORMOSA-VOTOS-GOBERNADOR', globalList)
  saveIntoJson('FORMOSA-VOTOS-DIPUTADOS', globalList)
}

findAll()

// findMesas({}, 426, 151)