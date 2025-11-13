import { kv } from '@vercel/kv';

export default async function handler(request, response) {
  try {
    // OBTIENE todos los elementos de la lista (de 0 a -1 significa "todos")
    const historial = await kv.lrange('historial_glucosa', 0, -1);
    
    // Devuelve el historial como un array JSON
    return response.status(200).json({ historial: historial || [] });

  } catch (error) {
    return response.status(500).json({ error: error.message });
  }
}

