import { useProductForm } from "@/customHooks/useProductForm";
import style from "./productForm.module.css";

export default function ProductForm() {
 
const {  handleChange, handleSubmit, isButtonDisabled, input, setInput, err, setErr} = useProductForm()
  return (
    <div className={style.formCont}>
      <div className={style.prodForm}>
        <h1>Create a new product</h1>
        <h5>Complete all fields</h5>

        <form onSubmit={handleSubmit}>
          <div className={style.fields}>
            <label>Nombre:</label>
            <input
              value={input.name}
              name="name"
              onChange={handleChange}
              type="text"
              placeholder="Name"
            />
          </div>
          <br />

          <div className={style.fields}>
            <label>OC:</label>
            <input
              value={input.OC}
              name="OC"
              onChange={handleChange}
              type="text"
              placeholder="OC"
            />
          </div>
          <br />

          <div className={style.fields}>
            <label>Estado de compra:</label>
            <input
              value={input.estado_compra}
              name="estado_compra"
              onChange={handleChange}
              type="text"
              placeholder="Estado de compra"
            />
          </div>
          <br />

          <div className={style.fields}>
            <label>Días de entrega:</label>
            <input
              value={input.dias_de_entrega}
              name="dias_de_entrega"
              onChange={handleChange}
              type="text"
              placeholder="Días de entrega"
            />
          </div>
          <br />

          <div className={style.fields}>
            <label>Fecha RDM:</label>
            <input
              value={input.fecha_RDM}
              name="fecha_RDM"
              onChange={handleChange}
              type="text"
              placeholder="Fecha RDM"
            />
          </div>
          <br />

          <div className={style.fields}>
            <label>Fecha cot:</label>
            <input
              value={input.fecha_cot}
              name="fecha_cot"
              onChange={handleChange}
              type="text"
              placeholder="Fecha cot"
            />
          </div>
          <br />

          <div className={style.fields}>
            <label>Cantidad:</label>
            <input
              value={input.cantidad}
              name="cantidad"
              onChange={handleChange}
              type="text"
              placeholder="Cantidad"
            />
          </div>
          <br />

          <div className={style.fields}>
            <label>Peso:</label>
            <input
              value={input.peso}
              name="peso"
              onChange={handleChange}
              type="text"
              placeholder="Peso"
            />
          </div>
          <br />

          <div className={style.fields}>
            <label>CBM:</label>
            <input
              value={input.CBM}
              name="CBM"
              onChange={handleChange}
              type="text"
              placeholder="CBM"
            />
          </div>
          <br />

          <div className={style.fields}>
            <label>Cajas/Rollos:</label>
            <input
              value={input.cajas_rollos}
              name="cajas_rollos"
              onChange={handleChange}
              type="text"
              placeholder="Cajas/Rollos"
            />
          </div>
          <br />

          <div className={style.fields}>
            <label>FOB:</label>
            <input
              value={input.FOB}
              name="FOB"
              onChange={handleChange}
              type="text"
              placeholder="FOB"
            />
          </div>
          <br />

          <div className={style.fields}>
            <label>CU USD FOB:</label>
            <input
              value={input.CU_USD_FOB}
              name="CU_USD_FOB"
              onChange={handleChange}
              type="text"
              placeholder="CU USD FOB"
            />
          </div>
          <br />

          <div className={style.fields}>
            <label>Adelanto proveedor:</label>
            <input
              value={input.adelanto_proveedor}
              name="adelanto_proveedor"
              onChange={handleChange}
              type="text"
              placeholder="Adelanto proveedor"
            />
          </div>
          <br />

          <div className={style.fields}>
            <label>Cuenta por pagar:</label>
            <input
              value={input.cuenta_por_pagar}
              name="cuenta_por_pagar"
              onChange={handleChange}
              type="text"
              placeholder="Cuenta por pagar"
            />
          </div>
          <br />

          <div className={style.fields}>
            <label>Pago cliente:</label>
            <input
              value={input.pago_cliente}
              name="pago_cliente"
              onChange={handleChange}
              type="text"
              placeholder="Pago cliente"
            />
          </div>
          <br />

          <div className={style.fields}>
            <label>Import:</label>
            <input
              value={input.import}
              name="import"
              onChange={handleChange}
              type="text"
              placeholder="Import"
            />
          </div>
          <br />

          <div className={style.fields}>
            <label>Client:</label>
            <input
              value={input.client}
              name="client"
              onChange={handleChange}
              type="text"
              placeholder="Client"
            />
          </div>
          <br />
          <div className={style.fields}>
            <label>Provider:</label>
            <input
              value={input.provider}
              name="provider"
              onChange={handleChange}
              type="text"
              placeholder="Provider"
            />
          </div>
          <br />

          <div className={style.fields}>
            <label>Responsable:</label>
            <input
              value={input.responsable}
              name="responsable"
              onChange={handleChange}
              type="text"
              placeholder="Responsable"
            />
          </div>
          <br />

          <div className={style.fields}>
            <label>Estado producto:</label>
            <input
              value={input.estado_producto}
              name="estado_producto"
              onChange={handleChange}
              type="text"
              placeholder="Estado producto"
            />
          </div>
          <br />

          <div className={style.fields}>
            <label>Estado entrega:</label>
            <input
              value={input.estado_entrega}
              name="estado_entrega"
              onChange={handleChange}
              type="text"
              placeholder="Estado entrega"
            />
          </div>
          <br />

          <div className={style.fields}>
            <label>Soportes proveedor:</label>
            <input
              value={input.soportes_proveedor}
              name="soportes_proveedor"
              onChange={handleChange}
              type="text"
              placeholder="Soportes proveedor"
            />
          </div>
          <br />

          <div className={style.fields}>
            <label>Soporte OC:</label>
            <input
              value={input.soporte_OC}
              name="soporte_OC"
              onChange={handleChange}
              type="text"
              placeholder="Soporte OC"
            />
          </div>
          <br />

          <div className={style.fields}>
            <label>Volumen:</label>
            <input
              value={input.volumen}
              name="volumen"
              onChange={handleChange}
              type="text"
              placeholder="Volumen"
            />
          </div>
          <br />

          <div className={style.fields}>
            <label>Swift pago recibido:</label>
            <input
              value={input.swift_pago_recibido}
              name="swift_pago_recibido"
              onChange={handleChange}
              type="text"
              placeholder="Swift pago recibido"
            />
          </div>
          <br />

          <button disabled={isButtonDisabled()} type="submit">
            Submit product
          </button>
        </form>
      </div>
    </div>
  );
}