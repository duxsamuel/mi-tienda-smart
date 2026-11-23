export type Producto={
  id: string;
  nombre: string;
  precio: number;
  cantidad: number;
};

const API_URL = ""; // aqui va url de lambda
let mock: Producto[] = [];

export async function obtenerProductos(): Promise<Producto[]> {
  if (!API_URL) return mock;
  const r = await fetch(API_URL);
  return r.json();
}

export async function crearProducto(
  producto: Omit<Producto, "id">
): Promise<Producto> {
  if (!API_URL) {
    const nuevo = { id: crypto.randomUUID(), ...producto };
    mock = [...mock, nuevo];
    return nuevo;
  }
  const r = await fetch(API_URL, {
    method: "POST",
    body: JSON.stringify(producto),
  });
  return r.json();
}