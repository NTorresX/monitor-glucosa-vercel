// api/recibir_datos.js
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
    
    // --- NUEVO: Crear el objeto de datos con timestamp ---
    const timestamp = new Date().toISOString(); // Genera la fecha/hora actual en formato ISO (UTC)
    const dataPoint = JSON.stringify({
      time: timestamp,
      value: glucosa
    });
    
    // AÑADE el objeto (como string) al principio de la lista
    await kv.lpush('historial_glucosa', dataPoint);
    
    // MANTIENE la lista con un máximo de 100 registros
    await kv.ltrim('historial_glucosa', 0, 99);

    // --- Proceso de Nombre (sin cambios) ---
    if (nombre !== undefined) {
      await kv.set('paciente_nombre', nombre);
    }
    
    return response.status(200).json({ message: `Dato recibido: ${glucosa}, Nombre: ${nombre || 'no enviado'}` });

  } catch (error) {
    return response.status(500).json({ error: error.message });
  }
}
