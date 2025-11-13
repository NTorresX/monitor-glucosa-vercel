import { kv } from '@vercel/kv';

export default async function handler(request, response) {
  if (request.method !== 'POST') {
    return response.status(405).json({ message: 'Solo se permite el método POST' });
  }

  try {
    const { glucosa, nombre } = request.body;
    
    if (glucosa === undefined) {
      return response.status(400).json({ message: 'Falta el dato de glucosa.' });
    }
    
    // --- Proceso de Glucosa con Timestamp ---
    const timestamp = new Date().toISOString(); 
    const dataPoint = JSON.stringify({
      time: timestamp,
      value: glucosa
    });
    
    await kv.lpush('historial_glucosa', dataPoint);
    await kv.ltrim('historial_glucosa', 0, 99);

    // --- Proceso de Nombre ---
    if (nombre !== undefined) {
      await kv.set('paciente_nombre', nombre);
    }
    
    return response.status(200).json({ message: `Dato recibido: ${glucosa}, Nombre: ${nombre || 'no enviado'}` });

  } catch (error) {
    return response.status(500).json({ error: error.message });
  }
}

