import Image from "next/image";

import Link from "next/link";

const planes = [
  { nombre: "Básico", precio: "$0", items: ["Hasta 50 productos", "1 usuario", "Soporte por correo"] },
  { nombre: "Pro", precio: "$59.000", items: ["Productos ilimitados", "5 usuarios", "Reportes", "Soporte prioritario"], destacado: true },
  { nombre: "Empresa", precio: "$99.000", items: ["Todo lo del Pro", "Usuarios ilimitados", "Soporte 24/7"] },
];

export default function Home() {
  return (
    <>
      <header className="navbar">
        <div className="contenedor navbar-interno">
          <span className="logo">MiTiendaSmart</span>
          <div className="navbar-acciones">
            <Link href="/login" className="btn btn-secundario">Iniciar sesión</Link>
            <Link href="/dashboard" className="btn btn-primario">Ir al panel</Link>
          </div>
        </div>
      </header>

      <section className="hero">
        <div className="contenedor">
          <h1>Controla el inventario de tu tienda fácil</h1>
          <p>Registra productos, mira tus existencias y el valor de tu inventario en un solo lugar.</p>
          <div className="hero-botones">
            <Link href="/login" className="btn btn-primario">Comienza ya</Link>
          </div>
        </div>
      </section>

      <section className="seccion">
        <div className="contenedor">
          <h2 className="titulo-seccion">Nuestros planes</h2>
          <p className="subtitulo">Elige el que mejor se ajuste a tu negocio</p>
          <div className="grid-planes">
            {planes.map((p) => (
              <div key={p.nombre} className={`plan ${p.destacado ? "plan-destacado" : ""}`}>
                <h3>{p.nombre}</h3>
                <p className="precio">{p.precio}<small>/mes</small></p>
                <ul>
                  {p.items.map((i) => <li key={i}>{i}</li>)}
                </ul>
                <Link href="/login" className="btn btn-primario btn-block">Empezar</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="footer">Desarrollado por Breitner, Edwin, Samuel y Nicolás.<br/><br/>© 2026 MiTiendaSmart — bpds-mitiendasmart.tech<br/><br/>Contacto: saduquel@cuc.edu.co</footer>
    </>
  );
}
