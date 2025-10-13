import { kv } from '@vercel/kv';

export default async function handler(request, response) {
  // Solo permitir peticiones POST
  if (request.method !== 'POST') {
    return response.status(405).json({ message: 'Solo se permite el método POST' });
  }

  try {
    const { glucosa } = request.body;
    
    // Validar que el dato 'glucosa' fue enviado
    if (glucosa === undefined) {
      return response.status(400).json({ message: 'Falta el dato de glucosa.' });
    }

    // Guardar el valor en la base de datos Vercel KV
    await kv.set('glucosa_actual', glucosa);
    
    // Responder al ESP32
    return response.status(200).json({ message: `Dato recibido: ${glucosa}` });

  } catch (error) {
    return response.status(500).json({ error: error.message });
  }
}