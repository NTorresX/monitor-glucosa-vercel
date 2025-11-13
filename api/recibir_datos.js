// api/recibir_datos.js
import { kv } from '@vercel/kv';

export default async function handler(request, response) {
  if (request.method !== 'POST') {
    return response.status(405).json({ message: 'Solo se permite el método POST' });
  }

  try {
    // Extraemos ambos datos del cuerpo de la petición
    const { glucosa, nombre } = request.body;
    
    if (glucosa === undefined) {
      return response.status(400).json({ message: 'Falta el dato de glucosa.' });
    }
    
    // --- Proceso de Glucosa (sin cambios) ---
    // AÑADE el nuevo valor al principio de la lista 'historial_glucosa'
    await kv.lpush('historial_glucosa', glucosa);
    // MANTIENE la lista con un máximo de 100 registros (los más recientes)
    await kv.ltrim('historial_glucosa', 0, 99);

    // --- NUEVO: Proceso de Nombre ---
    // Si el nombre también vino en la petición, lo guardamos
    // Esto sobrescribirá el nombre anterior con el más reciente
    if (nombre !== undefined) {
      await kv.set('paciente_nombre', nombre);
    }
    
    return response.status(200).json({ message: `Dato recibido: ${glucosa}, Nombre: ${nombre || 'no enviado'}` });

  } catch (error) {
    return response.status(500).json({ error: error.message });
  }
}

