import { kv } from '@vercel/kv';

export default async function handler(request, response) {
  try {
    const historialStrings = await kv.lrange('historial_glucosa', 0, -1);
    
    const historial = historialStrings.map(itemString => {
      try {
        const dato = JSON.parse(itemString);
        
        // VALIDACIÓN: Solo devuelve el dato si es un objeto
        // con 'valor' y 'fecha'.
        if (typeof dato === 'object' && dato !== null && 'valor' in dato && 'fecha' in dato) {
          return dato;
        }
        // Si es formato antiguo (ej: "100") o inválido, devuelve null
        return null; 
      } catch (e) {
        // Si falla el JSON.parse, devuelve null
        return null; 
      }
    }).filter(item => item !== null); // Filtra todos los nulos

    // Devuelve el historial (solo con datos nuevos)
    return response.status(200).json({ historial: historial || [] });

  } catch (error) {
    return response.status(500).json({ error: error.message });
  }
}
