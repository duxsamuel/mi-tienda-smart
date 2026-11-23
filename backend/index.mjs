import {DynamoDBClient } from"@aws-sdk/client-dynamodb";
import {DynamoDBDocumentClient, PutCommand, ScanCommand}from"@aws-sdk/lib-dynamodb";
import {randomUUID } from "crypto";

const db = DynamoDBDocumentClient.from(new DynamoDBClient({}));
const TABLE = "Productos";

export const handler=async(event)=>{
  const metodo = event.requestContext.http.method;

  if (metodo==="POST"){
    const{nombre, precio, cantidad } = JSON.parse(event.body);
    const item={
      id: randomUUID(),
      nombre,
      precio: Number(precio),
      cantidad: Number(cantidad),
    };
    await db.send(new PutCommand({ TableName:TABLE, Item: item }));
    return { statusCode: 200, body: JSON.stringify(item) };
  }

  const data = await db.send(new ScanCommand({ TableName:TABLE }));
  return { statusCode: 200, body: JSON.stringify(data.Items) };
};