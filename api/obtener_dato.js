// api/obtener_dato.js
import { kv } from '@vercel/kv';

export default async function handler(request, response) {
  try {
    // OBTIENE el primer elemento de la lista (el más reciente)
    const glucosaReciente = await kv.lindex('historial_glucosa', 0);
    
    // NUEVO: Obtiene el nombre del paciente guardado
    const nombrePaciente = await kv.get('paciente_nombre');
    
    // Devuelve ambos datos en un solo JSON
    return response.status(200).json({ 
      glucosa: glucosaReciente || '---',
      nombre: nombrePaciente || '---' // Devuelve '---' si aún no se ha guardado
    });

  } catch (error) {
    return response.status(500).json({ error: error.message });
  }
}


