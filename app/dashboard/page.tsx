"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { Producto } from "../types/producto";
import { obtenerProductos, crearProducto } from "../services/api";
import FormularioProducto from "../components/FormularioProducto";
import TablaProductos from "../components/TablaProductos";
import Indicadores from "../components/Indicadores";

export default function Dashboard() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    obtenerProductos()
      .then(setProductos)
      .finally(() => setCargando(false));
  }, []);

  const agregar = async (nuevo: Omit<Producto, "id">) => {
    const creado = await crearProducto(nuevo);
    setProductos((prev) => [...prev, creado]);
  };

  return (
    <main className="dashboard-pagina">
      <header className="dashboard-header">
        <div className="contenedor">
          <h1>Panel de inventario</h1>
          <Link href="/" className="btn btn-secundario">Volver al inicio</Link>
        </div>
      </header>

      <div className="contenedor dashboard-contenido">
        {cargando ? (
          <p className="cargando">Cargando inventario...</p>
        ) : (
          <>
            <Indicadores productos={productos} />
            <FormularioProducto onAgregar={agregar} />
            <TablaProductos productos={productos} />
          </>
        )}
      </div>
    </main>
  );
}