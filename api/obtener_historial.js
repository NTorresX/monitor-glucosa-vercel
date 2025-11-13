import { kv } from '@vercel/kv';

export default async function handler(request, response) {
  try {
    // OBTIENE todos los elementos (que ahora son solo números)
    const historial = await kv.lrange('historial_glucosa', 0, -1);
    
    // Devuelve el historial como un array de números
    return response.status(200).json({ historial: historial || [] });

  } catch (error) {
    return response.status(500).json({ error: error.message });
  }
}



