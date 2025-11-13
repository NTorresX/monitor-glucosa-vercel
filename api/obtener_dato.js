// api/obtener_dato.js
import { kv } from '@vercel/kv';

export default async function handler(request, response) {
  try {
    // OBTIENE el primer elemento (un string JSON)
    const glucosaRecienteString = await kv.lindex('historial_glucosa', 0);
    
    // Obtiene el nombre
    const nombrePaciente = await kv.get('paciente_nombre');
    
    // NUEVO: Parsea el string para obtener el valor
    let glucosaReciente = '---';
    if (glucosaRecienteString) {
      const dataPoint = JSON.parse(glucosaRecienteString);
      glucosaReciente = dataPoint.value; // Extraemos solo el 'value'
    }
    
    // Devuelve ambos datos en un solo JSON
    return response.status(200).json({ 
      glucosa: glucosaReciente,
      nombre: nombrePaciente || '---'
    });

  } catch (error) {
    return response.status(500).json({ error: error.message });
  }
}
