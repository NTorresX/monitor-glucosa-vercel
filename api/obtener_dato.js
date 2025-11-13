import { kv } from '@vercel/kv';

export default async function handler(request, response) {
  try {
    // OBTIENE el primer elemento (que ahora es un número)
    const glucosaReciente = await kv.lindex('historial_glucosa', 0);
    
    // Obtiene el nombre
    const nombrePaciente = await kv.get('paciente_nombre');
    
    // Devuelve ambos datos
    return response.status(200).json({ 
      glucosa: glucosaReciente || '---',
      nombre: nombrePaciente || '---'
    });

  } catch (error) { 
    return response.status(500).json({ error: error.message });
  }
}

