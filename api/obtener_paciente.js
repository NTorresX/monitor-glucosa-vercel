import { kv } from '@vercel/kv';

export default async function handler(request, response) {
  try {
    // OBTIENE el nombre de la clave 'paciente_nombre'
    const nombre = await kv.get('paciente_nombre');
    
    // Devuelve el nombre o un valor por defecto si no se ha configurado
    return response.status(200).json({ "nombre": nombre});

  } catch (error) {
    return response.status(500).json({ error: error.message });
  }
}
