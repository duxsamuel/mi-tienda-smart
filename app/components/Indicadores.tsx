import type { Producto } from "../types/producto";

interface Props {
  productos: Producto[];
}

export default function Indicadores({ productos }: Props) {
  const totalProductos = productos.length;
  const totalUnidades = productos.reduce((acc, p) => acc + p.cantidad, 0);
  const valorInventario = productos.reduce((acc, p) => acc + p.precio * p.cantidad, 0);

  return (
    <div className="indicadores">
      <div className="indicador">
        <p className="indicador-titulo">Total de productos</p>
        <p className="indicador-valor">{totalProductos}</p>
      </div>
      <div className="indicador">
        <p className="indicador-titulo">Total de unidades</p>
        <p className="indicador-valor">{totalUnidades}</p>
      </div>
      <div className="indicador">
        <p className="indicador-titulo">Valor del inventario</p>
        <p className="indicador-valor">${valorInventario.toLocaleString("es-CO")}</p>
      </div>
    </div>
  );
}