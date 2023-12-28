const { llamadaApi, llamadaMercados } = require('./callApi');

describe('API Tests', () => {
    test('Llamada a la API individual', async () => {
        const marketId = 'BTC-COP'; // Prueba para cada Id del mercado
        const data = await llamadaApi(marketId);
        expect(data).toBeDefined(); // verificacion que no sean undefined
        // verifica que sean reales los datos
        expect(data).toHaveProperty('ticker.last_price');
    });

  test('Llamada a la API de mercados', async () => {
    const mercadoIds = await llamadaMercados();
    expect(mercadoIds).toBeDefined(); // verifica que no sean undefined los mercados
    // verifica la estructura de los datos extraidos
    expect(Array.isArray(mercadoIds)).toBe(true);
  });
});