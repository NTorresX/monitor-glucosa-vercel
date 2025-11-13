// api/obtener_historial.js
import { kv } from '@vercel/kv';

export default async function handler(request, response) {
  try {
    // OBTIENE todos los elementos (que ahora son strings JSON)
    const stringHistorial = await kv.lrange('historial_glucosa', 0, -1);
    
    // NUEVO: Parsea cada string JSON para convertirlo en un objeto
    const parsedHistorial = (stringHistorial || []).map(item => JSON.parse(item));
    
    // Devuelve el historial como un array de objetos
    return response.status(200).json({ historial: parsedHistorial });

  } catch (error) {
    return response.status(500).json({ error: error.message });
  }
}


