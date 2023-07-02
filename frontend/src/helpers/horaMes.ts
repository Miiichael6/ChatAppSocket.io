import moment from "moment";

export const horaMes = (fecha: Date) => {
  const hoy = moment(fecha);
  return hoy.format("HH:mm a | MMMM Do")
}