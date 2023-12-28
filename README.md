# Documentación de API y Funcionalidades

Este archivo describe las funciones de llamada a API proporcionadas y cómo se utilizan en conjunto en el código proporcionado en `main.js`.

## Instalación y Ejecución

Para ejecutar este proyecto localmente:

1. Clona este repositorio.
2. Instala las dependencias con `npm install`.
3. Ejecuta el servidor con `node server.js`.

El servidor se ejecutará en `http://localhost:3001`.

## Llamada a la API

### `llamadaApi(market_id)`

Realiza una solicitud a la API para obtener datos específicos de un mercado en Buda.

- Parámetros:
  - `market_id`: ID del mercado del cual se desea obtener la información.

- Retorna:
  - Una promesa que resuelve los datos del mercado solicitado o rechaza con un error.

### `llamadaMercados()`

Realiza una solicitud a la API para obtener una lista de mercados disponibles en Buda.

- Retorna:
  - Una promesa que resuelve un array de IDs de mercados o rechaza con un error.

## Funcionamiento del Código (main.js)

El archivo `main.js` contiene un servidor Express que utiliza las funciones de las API para calcular y gestionar spreads en los mercados de Buda.

### Endpoints

- `/spread/:mercado`
  - Obtiene el spread de un mercado específico y actualiza una alerta si es necesario.

- `/spreads`
  - Obtiene los spreads de todos los mercados disponibles.

- `/alert`
  - Devuelve el valor actual de la alerta.

### Funciones Adicionales

#### `alertaMercado(newSpread)`

Actualiza el valor de la alerta.

#### `alerta(mercado, spread)`

Muestra una alerta si el spread supera o no la alerta configurada.

#### `calcularSpread(data)`

Calcula el spread de un mercado a partir de los datos de la API.

### Ejemplo de Uso

Puedes utilizar los endpoints del servidor para obtener spreads y alertas de los mercados de Buda. Por ejemplo:

- Para obtener el spread de un mercado: `GET /spread/{market_id}`
- Para obtener todos los spreads: `GET /spreads`
- Para obtener el valor actual de la alerta: `GET /alert`
- Para obtener el valor del spread y compararlo con la alerta, bastará en hacer un `Get /spread/{market_id}` y posteriormente un `Get /alert` y arrojará por consola si este valor de spread es mayor o menor al de la alerta.

Recuerda iniciar el servidor con `node main.js` y luego realizar solicitudes a los endpoints especificados.

## Detalles de los Tests de Llamadas a la API

### Descripción General

Estos tests verifican el correcto funcionamiento de las llamadas a la API de terceros utilizando Jest y `supertest`.

### Archivos de Prueba Relacionados

- `main.test.js`: Contiene pruebas para la verificación de datos obtenidos desde las APIs como las funciones que se encuentran en el archivo `main.js`.
- `callApi.test.js`: Contiene las pruebas para el correcto llamado a cada API.

### Ejecución de los Tests

Los tests de llamadas a la API verifican:

- La correcta obtención de datos de la API externa.
- Los códigos de estado de las respuestas.
- La estructura y propiedades de los datos retornados por las APIs.

### Estructura de los Tests

- Se definen pruebas separadas para cada llamada a la API.
- Utilizan `supertest` para simular las solicitudes a los endpoints de la aplicación.
- Verifican las propiedades o estructuras esperadas en las respuestas.

### Notas Adicionales

- Asegúrate de tener conexión a internet activa para ejecutar estos tests.
- Los IDs de mercado y otras variables utilizadas en las pruebas son ejemplos y deben ser ajustados con datos reales para pruebas precisas.
