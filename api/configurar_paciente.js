import { kv } from '@vercel/kv';

export default async function handler(request, response) {
  // Solo permite peticiones POST
  if (request.method !== 'POST') {
    return response.status(405).json({ message: 'Solo se permite el método POST' });
  }

  try {
    // Extrae el "nombre" del JSON que envíes
    const { nombre } = request.body; 
    if (!nombre) {
      return response.status(400).json({ message: 'Falta el dato de nombre.' });
    }

    // Guarda el nombre en una clave simple llamada 'paciente_nombre'
    await kv.set('paciente_nombre', nombre);
    
    return response.status(200).json({ message: `Nombre del paciente actualizado: ${nombre}` });

  } catch (error) {
    return response.status(500).json({ error: error.message });
  }
}