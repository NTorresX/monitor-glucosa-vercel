import { kv } from '@vercel/kv';

export default async function handler(request, response) {
  if (request.method !== 'POST') {
    return response.status(405).json({ message: 'Solo se permite el método POST' });
  }

  try {
    const { glucosa } = request.body;
    const { nombre } = request.body;
    if (glucosa === undefined) {
      return response.status(400).json({ message: 'Falta el dato de glucosa.' });
    }
    
    // AÑADE el nuevo valor al principio de la lista 'historial_glucosa'
    await kv.lpush('historial_glucosa', glucosa);
    
    // MANTIENE la lista con un máximo de 100 registros (los más recientes)
    await kv.ltrim('historial_glucosa', 0, 99);
    
    return response.status(200).json({ message: `Dato recibido: ${glucosa}` });

  } catch (error) {
    return response.status(500).json({ error: error.message });
  }
}
