import { IItem } from '../../../../lib/components/compositions/autocomplete/types/types';
import { demoItems } from '../types/types';

interface FakeServiceOptions {
  /** El retraso en milisegundos para simular la latencia de la red. */
  delay?: number;
  /** Si es `true`, la promesa será rechazada para simular un error. */
  willFail?: boolean;
  /** El mensaje de error personalizado cuando `willFail` es `true`. */
  errorMessage?: string;
  /** Si es `true`, devuelve un array vacío, incluso si hay coincidencias. */
  forceEmpty?: boolean;
  /** Limita el número de resultados devueltos. */
  limit?: number;
  /** Si es `true`, la búsqueda distinguirá entre mayúsculas y minúsculas. */
  caseSensitive?: boolean;
  getAllItemsForEmptyValue?: boolean;
}

/**
 * Simula una llamada a una API para buscar en una lista de items.
 * @param query El término de búsqueda del usuario.
 * @param options Opciones para configurar el comportamiento de la simulación.
 * @returns Una promesa que se resuelve con la lista de items filtrados.
 */
export const fakeApiService = (query: string, options: FakeServiceOptions = {}): Promise<IItem[]> => {
  const {
    delay = 500, // Un retraso de 500ms por defecto
    willFail = false,
    errorMessage = 'Error simulado del servidor',
    forceEmpty = false,
    limit,
    caseSensitive = false,
    getAllItemsForEmptyValue = false,
  } = options;

  console.log(`Fake API: Buscando "${query}" con opciones:`, options);

  return new Promise((resolve, reject) => {
    // La función que contiene la lógica de filtrado y resolución.
    const execute = () => {
      // 1. Simular un error
      if (willFail) {
        console.error('Fake API: Se está simulando un error.');
        return reject(new Error(errorMessage));
      }

      // 2. Forzar un resultado vacío
      if (forceEmpty) {
        console.log('Fake API: Forzando un resultado vacío.');
        return resolve([]);
      }

      // 3. Lógica de filtrado
      const formattedQuery = caseSensitive ? query.trim() : query.trim().toLowerCase();

      // Si la consulta está vacía, no devolvemos nada para simular APIs que requieren un término de búsqueda.
      if (!formattedQuery) {
        return getAllItemsForEmptyValue ? resolve(demoItems) : resolve([]);
      }

      const results = demoItems.filter((item) => {
        const formattedLabel = caseSensitive ? item.label : item.label.toLowerCase();
        return formattedLabel.includes(formattedQuery);
      });

      // 4. Limitar los resultados
      const limitedResults = limit ? results.slice(0, limit) : results;
      console.log(`Fake API: Se encontraron ${limitedResults.length} resultados.`);
      return resolve(limitedResults);
    };

    // 5. Aplicar el retraso
    if (delay > 0) {
      setTimeout(execute, delay);
    } else {
      execute();
    }
  });
};
