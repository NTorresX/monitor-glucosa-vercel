import { kv } from '@vercel/kv';

export default async function handler(request, response) {
  try {
    const datoRecienteString = await kv.lindex('historial_glucosa', 0);

    if (!datoRecienteString) {
      return response.status(200).json({ glucosa: '---' });
    }

    let glucosaValor = '---';
    
    try {
      const datoParseado = JSON.parse(datoRecienteString);
      
      // SI es un objeto (formato nuevo), extrae el valor
      if (typeof datoParseado === 'object' && datoParseado !== null && 'valor' in datoParseado) {
        glucosaValor = datoParseado.valor;
      } else {
      // SI NO es un objeto (formato antiguo, ej: "100"), usa el dato directo
        glucosaValor = datoRecienteString;
      }
    } catch (e) {
      // Si falla el parse (ej: "hola"), usa el dato directo
      glucosaValor = datoRecienteString;
    }
    
    return response.status(200).json({ "glucosa": glucosaValor});

  } catch (error) {
    return response.status(500).json({ error: error.message });
  }
}
