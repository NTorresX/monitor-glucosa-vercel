import { kv } from '@vercel/kv';

export default async function handler(request, response) {
  if (request.method !== 'POST') {
    return response.status(405).json({ message: 'Solo se permite el método POST' });
  }

  try {
    const { glucosa } = request.body;
    if (glucosa === undefined) {
      return response.status(400).json({ message: 'Falta el dato de glucosa.' });
    }

    // (NUEVO) Creamos el objeto con el valor y la fecha
    const datoConFecha = {
      valor: glucosa,
      fecha: new Date().toISOString() // Guarda la fecha actual en formato estándar ISO
    };

    // (MODIFICADO) Añade el objeto (convertido a string) al principio de la lista
    await kv.lpush('historial_glucosa', JSON.stringify(datoConFecha));
    
    // MANTIENE la lista con un máximo de 100 registros (los más recientes)
    await kv.ltrim('historial_glucosa', 0, 99);
    
    return response.status(200).json({ message: `Dato recibido: ${glucosa}` });

  } catch (error) {
    return response.status(500).json({ error: error.message });
  }
}
