exports.llamadaApi = function (market_id) {
  const url = `https://www.buda.com/api/v2/markets/${market_id}/ticker`;

  return fetch(url)
      .then(response => {
          if (!response.ok) {
              throw new Error(`Error en la solicitud: ${response.status}`);
          }
          return response.json();
      })
      .then(data => {
          return data;  // Devuelve los datos resueltos de la promesa
      })
      .catch(error => {
          console.error('Error al realizar la solicitud:', error);
          throw error;  // Vuelve a lanzar el error para que pueda ser manejado en el código que usa la promesa
      });
}


exports.llamadaMercados = function() {

    const url = 'https://www.buda.com/api/v2/markets';

    return fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error en la solicitud de mercados ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            if (Array.isArray(data.markets)) {
                // Si data es un array de objetos, puedes mapear los id's de los mercados
                const idMercados = data.markets.map(mercado => mercado.id);
                return idMercados;
            } else if (typeof data === 'object') {
                // Si data es un solo objeto, devolver directamente su nombre
                return data.id;
            } else {
                throw new Error('La respuesta no es un array ni un objeto individual');
            }
        })
        .catch(error => {
            console.error('Error al realizar la solicitud', error);
            throw error;
        });
}