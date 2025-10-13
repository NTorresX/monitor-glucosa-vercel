import { kv } from '@vercel/kv';

export default async function handler(request, response) {
  try {
    // Obtener el valor de la base de datos
    const glucosa = await kv.get('glucosa_actual');
    
    // Responder con el dato en formato JSON
    return response.status(200).json({ glucosa: glucosa || '---' });

  } catch (error) {
    return response.status(500).json({ error: error.message });
  }
}