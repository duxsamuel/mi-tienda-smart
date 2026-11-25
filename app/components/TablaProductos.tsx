"use client";

import type { Producto } from "../types/producto";

interface Props {
  productos: Producto[];
  onEditar?: (producto: Producto) => void;
  onEliminar?: (id: string) => void;
}

export default function TablaProductos({ productos, onEditar, onEliminar }: Props) {
  const hayAcciones = Boolean(onEditar || onEliminar);
  return (
    <div className="tabla-wrapper">
      <table className="tabla">
        <thead>
          <tr>
            <th>Producto</th>
            <th>Precio</th>
            <th>Cantidad</th>
            <th>Subtotal</th>
            {hayAcciones && <th>Acciones</th>}
          </tr>
        </thead>
        <tbody>
          {productos.length === 0 ? (
            <tr>
              <td colSpan={hayAcciones ? 5 : 4} className="tabla-vacia">
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
                {hayAcciones && (
                  <td className="tabla-acciones">
                    {onEditar && (
                      <button
                        type="button"
                        className="btn btn-secundario btn-chico"
                        onClick={() => onEditar(p)}
                      >
                        Editar
                      </button>
                    )}
                    {onEliminar && (
                      <button
                        type="button"
                        className="btn btn-peligro btn-chico"
                        onClick={() => {
                          if (window.confirm(`¿Eliminar "${p.nombre}"?`)) {
                            onEliminar(p.id);
                          }
                        }}
                      >
                        Eliminar
                      </button>
                    )}
                  </td>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}