const request = require('supertest');
const app = require('./main');

describe('Endpoints Tests', () => {
  test('GET /spread/:mercado endpoint', async () => {
    const mercadoId = 'BTC-CLP'; // Ingresa un ID válido de mercado para realizar la prueba
    const response = await request(app).get(`/spread/${mercadoId}`);
    expect(response.status).toBe(200); // Verifica si la solicitud fue exitosa
    expect(response.body).toHaveProperty('mercado');
    expect(response.body).toHaveProperty('spread');
  });

  test('GET /spreads endpoint', async () => {
    const response = await request(app).get('/spreads');
    expect(response.status).toBe(200); // Verifica si la solicitud fue exitosa
    expect(Array.isArray(response.body)).toBe(true);
  });

  test('GET /alert endpoint', async () => {
    const response = await request(app).get('/alert');
    expect(response.status).toBe(200); // Verifica si la solicitud fue exitosa
    expect(response.body).toHaveProperty('spreadAlerta');
  });
});