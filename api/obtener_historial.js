import { kv } from '@vercel/kv';

export default async function handler(request, response) {
  try {
    // OBTIENE todos los elementos de la lista (que ahora son strings JSON)
    const historialStrings = await kv.lrange('historial_glucosa', 0, -1);
    
    // (MODIFICADO) Convierte cada string JSON de nuevo a un objeto.
    // Usamos try/catch por si acaso hay datos antiguos (sin formato JSON)
    const historial = historialStrings.map(itemString => {
      try {
        return JSON.parse(itemString);
      } catch (e) {
        // Si falla (dato antiguo), lo filtramos
        return null; 
      }
    }).filter(item => item !== null); // Filtra los nulos

    // Devuelve el historial como un array JSON de objetos
    return response.status(200).json({ historial: historial || [] });

  } catch (error) {
    return response.status(500).json({ error: error.message });
  }
}
