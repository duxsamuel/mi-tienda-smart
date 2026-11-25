"use client";

import { useState } from "react";
import type { Producto } from "../types/producto";

interface Props {
  onAgregar: (producto: Omit<Producto, "id">) => void;
  productoEnEdicion?: Producto | null;
  onActualizar?: (producto: Producto) => void;
  onCancelar?: () => void;
}

export default function FormularioProducto({
  onAgregar,
  productoEnEdicion = null,
  onActualizar,
  onCancelar,
}: Props) {
  const editando = productoEnEdicion !== null;

  const [nombre, setNombre] = useState(productoEnEdicion?.nombre ?? "");
  const [precio, setPrecio] = useState(
    productoEnEdicion ? String(productoEnEdicion.precio) : ""
  );
  const [cantidad, setCantidad] = useState(
    productoEnEdicion ? String(productoEnEdicion.cantidad) : ""
  );
  const [error, setError] = useState("");

  const enviar = (e: React.FormEvent) => {
    e.preventDefault();

    const p = Number(precio);
    const c = Number(cantidad);

    if (!nombre.trim() || p <= 0 || c <= 0) {
      setError("Completa todos los campos con valores válidos.");
      return;
    }

    setError("");
    const datos = { nombre: nombre.trim(), precio: p, cantidad: c };

    if (productoEnEdicion && onActualizar) {
      onActualizar({ ...productoEnEdicion, ...datos });
      return;
    }

    onAgregar(datos);
    setNombre("");
    setPrecio("");
    setCantidad("");
  };

  return (
    <form
      className={editando ? "form-producto form-producto-edicion" : "form-producto"}
      onSubmit={enviar}
    >
      <h2>{editando ? "Editar producto" : "Agregar producto"}</h2>

      {error && <p className="mensaje-error">{error}</p>}

      <div className="form-producto-fila">
        <div className="campo">
          <label htmlFor="nombre">Nombre</label>
          <input id="nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} />
        </div>
        <div className="campo">
          <label htmlFor="precio">Precio</label>
          <input id="precio" type="number" min="0" value={precio} onChange={(e) => setPrecio(e.target.value)} />
        </div>
        <div className="campo">
          <label htmlFor="cantidad">Cantidad</label>
          <input id="cantidad" type="number" min="0" value={cantidad} onChange={(e) => setCantidad(e.target.value)} />
        </div>
      </div>

      <div className="form-producto-acciones">
        <button type="submit" className="btn btn-primario">
          {editando ? "Guardar cambios" : "Agregar producto"}
        </button>
        {editando && onCancelar && (
          <button type="button" className="btn btn-secundario" onClick={onCancelar}>
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
}