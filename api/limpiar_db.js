// api/limpiar_db.js
import { kv } from '@vercel/kv';

export default async function handler(request, response) {
  try {
    // Borra la lista del historial
    await kv.del('historial_glucosa');
    
    // Borra el nombre del paciente
    await kv.del('paciente_nombre');
    
    return response.status(200).json({ 
      message: 'Base de datos (historial y nombre) borrada exitosamente.' 
    });

  } catch (error) {
    return response.status(500).json({ error: error.message });
  }
}
