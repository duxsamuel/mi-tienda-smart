import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  ScanCommand,
  PutCommand,
  UpdateCommand,
  DeleteCommand,
} from "@aws-sdk/lib-dynamodb";
import { randomUUID } from "crypto";

const db = DynamoDBDocumentClient.from(new DynamoDBClient({}));
const TABLE = process.env.TABLA_PRODUCTOS || "Productos";

const responder = (statusCode, cuerpo) => ({
  statusCode,
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(cuerpo),
});

const leerProducto = (event) => {
  const { nombre, precio, cantidad } = JSON.parse(event.body ?? "{}");
  const p = Number(precio);
  const c = Number(cantidad);
  if (!nombre || !(p > 0) || !(c > 0)) return null;
  return { nombre: String(nombre).trim(), precio: p, cantidad: c };
};

export const handler = async (event) => {
  const metodo = event.requestContext.http.method;
  const id = event.queryStringParameters?.id;

  try {
    if (metodo === "GET") {
      const data = await db.send(new ScanCommand({ TableName: TABLE }));
      return responder(200, data.Items ?? []);
    }

    if (metodo === "POST") {
      const datos = leerProducto(event);
      if (!datos) return responder(400, { error: "Datos inválidos" });
      const item = { id: randomUUID(), ...datos };
      await db.send(new PutCommand({ TableName: TABLE, Item: item }));
      return responder(201, item);
    }

    if (metodo === "PUT") {
      if (!id) return responder(400, { error: "Falta el id" });
      const datos = leerProducto(event);
      if (!datos) return responder(400, { error: "Datos inválidos" });
      const r = await db.send(
        new UpdateCommand({
          TableName: TABLE,
          Key: { id },
          UpdateExpression: "SET nombre = :n, precio = :p, cantidad = :c",
          ConditionExpression: "attribute_exists(id)",
          ExpressionAttributeValues: {
            ":n": datos.nombre,
            ":p": datos.precio,
            ":c": datos.cantidad,
          },
          ReturnValues: "ALL_NEW",
        })
      );
      return responder(200, r.Attributes);
    }

    if (metodo === "DELETE") {
      if (!id) return responder(400, { error: "Falta el id" });
      await db.send(new DeleteCommand({ TableName: TABLE, Key: { id } }));
      return responder(200, { id });
    }

    return responder(405, { error: "Método no permitido" });
  } catch (error) {
    if (error.name === "ConditionalCheckFailedException") {
      return responder(404, { error: "Producto no encontrado" });
    }
    console.error(error);
    return responder(500, { error: "Error interno" });
  }
};