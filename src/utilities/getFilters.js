import getOptionsList from "./getOptionsList.js"
import getOptionsMesas from "./getOptionsMesas.js"

export const getMesas = async (codEscuela, codCircuito) => {
  const listMesas = await getOptionsMesas(codEscuela, codCircuito, ['cod_mesa', 'mesa'])
  // listMesas.length = 1
  return listMesas
}

export const getEscuelas = async (codCircuito) => {
  const listEscuelas = await getOptionsList('escuelas', codCircuito, ['cod_escuela', 'escuela'])
  // listEscuelas.length = 1
  return listEscuelas
}

export const getCircuitos = async (codCircuito) => {
  const listCircuitos = await getOptionsList('circuitos', codCircuito, ['cod_circuito', 'circuito'])
  // listCircuitos.length = 1
  return listCircuitos
}

export const getLocalidades = async (codLocalidad) => {
  const listLocalidades = await getOptionsList('localidades', codLocalidad, ['cod_localidad', 'localidad'])
  // listLocalidades.length = 1
  return listLocalidades
}

export const getDepartamentos = () => [
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