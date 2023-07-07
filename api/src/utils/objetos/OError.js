class OError extends Error {
  constructor(
    description = 'Sin Descripcion de Error',
    msg = 'Mensaje de Respuesta',
    res = {},
    con = false
  ) {
    super(description)
    this.description = description; //DESCRIPCION DE ERROR CUSTOMIZADO
    this.msg = msg; //MENSAJES
    this.res = res; //RESULTADO EJEMPLO {} | [] | VARIABLE
    this.con = con; //CONFIRMACION DE CONSULTA
  }

  getResult = () => {
    return { msg: this.msg, res: this.res, con: this.con };
  };
}

module.exports = OError