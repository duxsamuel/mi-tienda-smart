"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { Producto } from "../types/producto";
import {
  obtenerProductos,
  crearProducto,
  actualizarProducto,
  eliminarProducto,
} from "../services/api";
import FormularioProducto from "../components/FormularioProducto";
import TablaProductos from "../components/TablaProductos";
import Indicadores from "../components/Indicadores";

export default function Dashboard() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [cargando, setCargando] = useState(true);
  const [enEdicion, setEnEdicion] = useState<Producto | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    obtenerProductos()
      .then(setProductos)
      .catch(() => setError("No se pudo cargar el inventario."))
      .finally(() => setCargando(false));
  }, []);

  const agregar = async (nuevo: Omit<Producto, "id">) => {
    try {
      const creado = await crearProducto(nuevo);
      setProductos((prev) => [...prev, creado]);
      setError("");
    } catch {
      setError("No se pudo crear el producto.");
    }
  };

  const actualizar = async (producto: Producto) => {
    try {
      const actualizado = await actualizarProducto(producto);
      setProductos((prev) =>
        prev.map((p) => (p.id === actualizado.id ? actualizado : p))
      );
      setEnEdicion(null);
      setError("");
    } catch {
      setError("No se pudo actualizar el producto.");
    }
  };

  const eliminar = async (id: string) => {
    try {
      await eliminarProducto(id);
      setProductos((prev) => prev.filter((p) => p.id !== id));
      if (enEdicion?.id === id) setEnEdicion(null);
      setError("");
    } catch {
      setError("No se pudo eliminar el producto.");
    }
  };

  return (
    <main className="dashboard-pagina">
      <header className="dashboard-header">
        <div className="contenedor">
          <h1>MiTiendaSmart - Panel de inventario</h1>
          <Link href="/" className="btn btn-secundario">Cerrar sesión</Link>
        </div>
      </header>

      <div className="contenedor dashboard-contenido">
        {error && <p className="mensaje-error">{error}</p>}

        {cargando ? (
          <p className="cargando">Cargando inventario...</p>
        ) : (
          <>
            <Indicadores productos={productos} />
            <FormularioProducto
              key={enEdicion?.id ?? "nuevo"}
              onAgregar={agregar}
              productoEnEdicion={enEdicion}
              onActualizar={actualizar}
              onCancelar={() => setEnEdicion(null)}
            />
            <TablaProductos
              productos={productos}
              onEditar={setEnEdicion}
              onEliminar={eliminar}
            />
          </>
        )}
      </div>
      <footer className="footer">Desarrollado por Breitner, Edwin, Samuel y Nicolás.<br/><br/>© 2026 MiTiendaSmart — bpds-mitiendasmart.tech<br/><br/>Contacto: saduquel@cuc.edu.co</footer>
    </main>
  );
} 