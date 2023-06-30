export default (list) => {
  const newList = [...list]
  for (var i = 0; i < list.length; i++) {
    newList[i].cod_localidad = parseInt(list[i].cod_localidad);
    newList[i].cod_circuito = parseInt(list[i].cod_circuito);
    newList[i].cod_escuela = parseInt(list[i].cod_escuela);
    newList[i].cod_mesa = parseInt(list[i].cod_mesa);
    newList[i].votos = parseInt(list[i].votos);
    newList[i].porcentaje = parseFloat(list[i].porcentaje);
  }
  return newList
}