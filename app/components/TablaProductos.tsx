import type { Producto } from "../types/producto";

interface Props {
  productos: Producto[];
}

export default function TablaProductos({ productos }: Props) {
  return (
    <div className="tabla-wrapper">
      <table className="tabla">
        <thead>
          <tr>
            <th>Producto</th>
            <th>Precio</th>
            <th>Cantidad</th>
            <th>Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {productos.length === 0 ? (
            <tr>
              <td colSpan={4} className="tabla-vacia">
                Aún no hay productos
              </td>
            </tr>
          ) : (
            productos.map((p) => (
              <tr key={p.id}>
                <td>{p.nombre}</td>
                <td>${p.precio.toLocaleString("es-CO")}</td>
                <td>{p.cantidad}</td>
                <td>${(p.precio * p.cantidad).toLocaleString("es-CO")}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}