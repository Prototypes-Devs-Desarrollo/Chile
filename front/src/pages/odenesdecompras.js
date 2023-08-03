import { Button, Card, CardBody, CardHeader, Spinner, Typography } from '@material-tailwind/react';
import React, { useEffect, useState } from 'react';
import { Squares2X2Icon, TableCellsIcon } from '@heroicons/react/24/solid';
import { useOrdenes } from '@/customHooks/useOrdenes';
import AddOrdenIA from '@/components/oredenForm/AddOrdenIA';
import AddOrdenModal from '@/components/oredenForm/AddOrdenModal';

const Odenesdecompras = () => {
  // EXPERIMENTAL
  const [addOpenIa, setAddOpenIa] = useState(false);
  const addHandleOpenIa = () => setAddOpenIa(!addOpenIa);
  // FIN EXPERIMENTAL

  const { cards, error, success, loading, ordenesOrde, onClickCards, onUseEffectOrd, setSuccess, setError } = useOrdenes();

  useEffect(() => {
    onUseEffectOrd();
  }, []);

  useEffect(() => {
    return () => {
      if (error) {
        setError('');
      }
    };
  }, [error]);

  useEffect(() => {
    return () => {
      if (success) {
        setSuccess('');
      }
    };
  }, [success]);

  const TABLE_HEAD = ['Orden N°', 'Cliente', 'Proveedor', 'Solicitante', 'Cant. Productos', 'Neto', 'IVA', 'Total'];
console.log(ordenesOrde)
  return (
    <>
    
      <div className="w-[calc(100%-256px)] h-screen overflow-y-auto p-2">
        <div className="flex justify-between items-center pb-3">
        <Button onClick={addHandleOpenIa} color="blue">
          Importar nueva orden
        </Button>
        <AddOrdenModal/>
          <Typography variant="h4">Órdenes de Compras</Typography>
          {cards ? <Squares2X2Icon className="h-9 w-9 text-black cursor-pointer" onClick={onClickCards} /> : <TableCellsIcon className="h-9 w-9 text-black cursor-pointer" onClick={onClickCards} />}
        </div>
        {loading ? (
          <div className="flex justify-center items-center h-full">
            <Spinner className="h-20 w-20 text-primary-500" />
          </div>
        ) : !cards ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pt-3">
            {ordenesOrde?.map((o, idx) => (
              <Card key={idx} color="blue">
                <CardBody>
                  <Typography className="text-center font-extrabold">Orden N° {o?.ordenCompra?.numero}</Typography>
                  <Typography>Cliente: {o.cliente?.nombreEmpresa}</Typography>
                  <Typography>Proveedor: {o.proveedor?.nombreEmpresa}</Typography>
                  <Typography>Solicitante: {o.ordenCompra?.solicitante}</Typography>
                  <Typography>Cantidad de Productos: {o.productos?.length}</Typography>
                  <Typography className="text-right font-bold">Neto: {o?.subTotal}</Typography>
                  <Typography className="text-right font-bold">IVA: {o?.iva}</Typography>
                  <Typography className="text-right font-bold">Total: {o?.total}</Typography>
                </CardBody>
              </Card>
            ))}
            <div className="col-span-full">
              <Button onClick={addHandleOpenIa} color="blue">
                Importar orden en PDF
              </Button>
            </div>
          </div>
        ) : (
          <Card className="overflow-scroll">
            <table className="w-full table-auto text-left">
              <thead>
                <tr>
                  {TABLE_HEAD.map((head, idx) => (
                    <th key={idx} className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                      <Typography variant="small" color="blue-gray" className="font-normal leading-none opacity-70">
                        {head}
                      </Typography>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {ordenesOrde?.map((o, idx) => (
                  <tr key={idx} className={idx % 2 === 0 ? 'bg-blue-gray-50' : ''}>
                    <td className="p-4">
                      <Typography variant="small" color="blue-gray" className="font-normal">
                        {o.ordenCompra?.numero}
                      </Typography>
                    </td>
                    <td className="p-4">
                      <Typography variant="small" color="blue-gray" className="font-normal">
                        {o.cliente?.nombreEmpresa}
                      </Typography>
                    </td>
                    <td className="p-4">
                      <Typography variant="small" color="blue-gray" className="font-normal">
                        {o.proveedor?.nombreEmpresa}
                      </Typography>
                    </td>
                    <td className="p-4">
                      <Typography variant="small" color="blue-gray" className="font-normal">
                        {o.ordenCompra?.solicitante}
                      </Typography>
                    </td>
                    <td className="p-4">
                      <Typography variant="small" color="blue-gray" className="font-normal">
                        {o.productos?.length}
                      </Typography>
                    </td>
                    <td className="p-4">
                      <Typography variant="small" color="blue-gray" className="font-normal">
                        {o?.subTotal}
                      </Typography>
                    </td>
                    <td className="p-4">
                      <Typography variant="small" color="blue-gray" className="font-normal">
                        {o?.iva}
                      </Typography>
                    </td>
                    <td className="p-4">
                      <Typography variant="small" color="blue-gray" className="font-normal">
                        {o?.total}
                      </Typography>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        )}
      </div>
      <div className="fixed bottom-4 right-4">

      </div>
      {addOpenIa && <AddOrdenIA addHandleOpenIa={addHandleOpenIa} addOpenIa={addOpenIa} listarOrdenes={onUseEffectOrd} />}
    </>
  );
};

export default Odenesdecompras;