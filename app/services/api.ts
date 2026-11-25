import type { Producto } from "../types/producto";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const JSON_HEADERS = { "Content-Type": "application/json" };

let mock: Producto[] = [
  { id: "1", nombre: "Arroz 1kg", precio: 4500, cantidad: 20 },
  { id: "2", nombre: "Aceite 1L", precio: 12000, cantidad: 10 },
];

function urlConId(base: string, id: string): string {
  const url = new URL(base);
  url.searchParams.set("id", id);
  return url.toString();
}

export async function obtenerProductos(): Promise<Producto[]> {
  if (!API_URL) return mock;
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error("Error al obtener productos");
  return res.json();
}

export async function crearProducto(
  nuevo: Omit<Producto, "id">
): Promise<Producto> {
  if (!API_URL) {
    const creado: Producto = { ...nuevo, id: String(Date.now()) };
    mock = [...mock, creado];
    return creado;
  }
  const res = await fetch(API_URL, {
    method: "POST",
    headers: JSON_HEADERS,
    body: JSON.stringify(nuevo),
  });
  if (!res.ok) throw new Error("Error al crear producto");
  return res.json();
}

export async function actualizarProducto(
  producto: Producto
): Promise<Producto> {
  const { id, ...datos } = producto;
  if (!API_URL) {
    mock = mock.map((p) => (p.id === id ? producto : p));
    return producto;
  }
  const res = await fetch(urlConId(API_URL, id), {
    method: "PUT",
    headers: JSON_HEADERS,
    body: JSON.stringify(datos),
  });
  if (!res.ok) throw new Error("Error al actualizar producto");
  return res.json();
}

export async function eliminarProducto(id: string): Promise<void> {
  if (!API_URL) {
    mock = mock.filter((p) => p.id !== id);
    return;
  }
  const res = await fetch(urlConId(API_URL, id), { method: "DELETE" });
  if (!res.ok) throw new Error("Error al eliminar producto");
}