import { kv } from '@vercel/kv';

export default async function handler(request, response) {
  try {
    // 1. Obtiene el string JSON más reciente
    const glucosaRecienteString = await kv.lindex('historial_glucosa', 0);
    
    // 2. Obtiene el nombre
    const nombrePaciente = await kv.get('paciente_nombre');
    
    // 3. Parsea el string para obtener el valor
    let glucosaReciente = '---';
    if (glucosaRecienteString) {
      const dataPoint = JSON.parse(glucosaRecienteString);
      glucosaReciente = dataPoint.value; // Extraemos solo el 'value'
    }
    
    // 4. Devuelve AMBOS datos
    return response.status(200).json({ 
      glucosa: glucosaReciente,
      nombre: nombrePaciente || '---'
    });

  } catch (error)
    return response.status(500).json({ error: error.message });
  }
}

