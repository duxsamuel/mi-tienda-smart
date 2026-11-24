"use client";

import { useState } from "react";
import type { Producto } from "../types/producto";

interface Props {
  onAgregar: (producto: Omit<Producto, "id">) => void;
}

export default function FormularioProducto({ onAgregar }: Props) {
  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState("");
  const [cantidad, setCantidad] = useState("");
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
    onAgregar({ nombre: nombre.trim(), precio: p, cantidad: c });
    setNombre("");
    setPrecio("");
    setCantidad("");
  };

  return (
    <form className="form-producto" onSubmit={enviar}>
      <h2>Agregar producto</h2>

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

      <button type="submit" className="btn btn-primario">
        Agregar producto
      </button>
    </form>
  );
}