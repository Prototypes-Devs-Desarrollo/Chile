import style from '../productForm/productForm.module.css'; //pongo los estilos del productForm en caso de querer usas Tailwind
import { useImportForm } from '@/customHooks/useImportForm';
import { SelectClient } from './SelectClient';

export default function ImportForm() {
   const { handleSubmit, handleChange, input, setInput } = useImportForm();

   return (
      <div className={style.formCont}>
         <div className={style.importForm}>
            <h1>Crear una nueva importación</h1>
            <h5>Complete todos los campos</h5>

            <form onSubmit={handleSubmit}>
               <div className={style.fields}>
                  <label>Nombre:</label>
                  <input value={input.name} name='name' onChange={handleChange} type='text' placeholder='Nombre' />
               </div>
               <br />

               <div className={style.fields}>
                  <label>Fecha RDM:</label>
                  <input value={input.fecha_RDM} name='fecha_RDM' onChange={handleChange} type='text' placeholder='Fecha RDM' />
               </div>
               <br />

               <div className={style.fields}>
                  <label>Fecha EDC:</label>
                  <input value={input.fecha_EDC} name='fecha_EDC' onChange={handleChange} type='text' placeholder='Fecha EDC' />
               </div>
               <br />

               <div className={style.fields}>
                  <label>Productos:</label>
                  <input value={input.productos} name='productos' onChange={handleChange} type='text' placeholder='Productos' />
               </div>
               <br />

               <div className={style.fields}>
                  <label>Responsables:</label>
                  <input value={input.responsables} name='responsables' onChange={handleChange} type='text' placeholder='Responsables' />
               </div>
               <br />

               <div className={style.fields}>
                  <label>Tipo de importación:</label>
                  <input value={input.importType} name='importType' onChange={handleChange} type='text' placeholder='Tipo de importación' />
               </div>
               <br />

               <div className={style.fields}>
                  <label>Tipo de paquete:</label>
                  <input value={input.packageType} name='packageType' onChange={handleChange} type='text' placeholder='Tipo de paquete' />
               </div>
               <br />

               <div className={style.fields}>
                  <label>Bodega:</label>
                  <input value={input.destino.bodega} name='destino.bodega' onChange={handleChange} type='text' placeholder='Bodega' />
               </div>
               <br />

               <SelectClient input={input} setInput={setInput} />

               <div className={style.fields}>
                  <label>Otro:</label>
                  <input value={input.destino.otro} name='destino.otro' onChange={handleChange} type='text' placeholder='Otro' />
               </div>
               <br />

               <div className={style.fields}>
                  <label>Contenedor:</label>
                  <input value={input.package.container} name='package.container' onChange={handleChange} type='text' placeholder='Contenedor' />
               </div>
               <br />

               <div className={style.fields}>
                  <label>Otro:</label>
                  <input value={input.package.otro} name='package.otro' onChange={handleChange} type='text' placeholder='Otro' />
               </div>
               <br />
               <button type='submit'>Enviar importación</button>
            </form>
         </div>
      </div>
   );
}
