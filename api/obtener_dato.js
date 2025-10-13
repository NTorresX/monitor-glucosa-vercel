import { kv } from '@vercel/kv';

export default async function handler(request, response) {
  try {
    // OBTIENE el primer elemento de la lista (el más reciente)
    const glucosaReciente = await kv.lindex('historial_glucosa', 0);
    
    return response.status(200).json({ glucosa: glucosaReciente || '---' });

  } catch (error) {
    return response.status(500).json({ error: error.message });
  }
}
