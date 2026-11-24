"use client";

import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const entrar = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/dashboard");
  };

  return (
    <main className="login-pagina">
      <form className="login-card" onSubmit={entrar}>
        <h1>Iniciar sesión</h1>
        <p className="subtitulo">Bienvenido a MiTiendaSmart</p>

        <div className="campo">
          <label htmlFor="correo">Correo</label>
          <input id="correo" type="email" placeholder="tucorreo@ejemplo.com" />
        </div>

        <div className="campo">
          <label htmlFor="clave">Contraseña</label>
          <input id="clave" type="password" placeholder="••••••••" />
        </div>

        <button type="submit" className="btn btn-primario btn-block">
          Entrar
        </button>
      </form>
    </main>
  );
}