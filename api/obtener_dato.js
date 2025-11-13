import { kv } from '@vercel/kv';

export default async function handler(request, response) {
  try {
    // OBTIENE el primer elemento (el string JSON más reciente)
    const datoRecienteString = await kv.lindex('historial_glucosa', 0);

    if (!datoRecienteString) {
      return response.status(200).json({ glucosa: '---' });
    }

    // (MODIFICADO) Analizamos el string JSON
    let glucosaValor = '---';
    try {
      const datoParseado = JSON.parse(datoRecienteString);
      glucosaValor = datoParseado.valor; // Extraemos solo el valor
    } catch (e) {
      // Si falla (es un dato antiguo), intentamos mostrarlo directamente
      glucosaValor = datoRecienteString;
    }
    
    return response.status(200).json({ "glucosa": glucosaValor});

  } catch (error) {
    return response.status(500).json({ error: error.message });
  }
}


