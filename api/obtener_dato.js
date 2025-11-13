import { kv } from '@vercel/kv';

export default async function handler(request, response) {
  try {
    // OBTIENE el primer elemento (el string JSON más reciente)
    const datoRecienteString = await kv.lindex('historial_glucosa', 0);

    if (!datoRecienteString) {
      return response.status(200).json({ glucosa: '---' });
    }

    // (MODIFICADO) Analizamos el string JSON
    let glucosaObjeto = null; // Cambiamos el nombre de la variable
    try {
      const datoParseado = JSON.parse(datoRecienteString);
      glucosaObjeto = datoParseado; // <-- AHORA GUARDAS EL OBJETO COMPLETO
    } catch (e) {
      // Si falla, creamos un objeto por defecto
      glucosaObjeto = { valor: datoRecienteString || '---', fecha: new Date().toISOString() };
    }
    
    // (MODIFICADO) Devolvemos el objeto completo
    return response.status(200).json({ glucosa: glucosaObjeto });

  } catch (error) {
    return response.status(500).json({ error: error.message });
  }
}

