const express = require('express');
// Llamado a las apis por separado
const { llamadaApi, llamadaMercados } = require('./callApi.js');

const app = express();
let spreadAlerta = 1000;

function alertaMercado(newSpread){
    spreadAlerta = newSpread;
    console.log("Alerta actualizada")
}

// Endpoint para obtener un spread en especifico con el mercado//

app.get('/spread/:mercado', (req, res) => {
    const mercado = req.params.mercado;
    llamadaApi(mercado)
        .then(data => {
            const spread = calcularSpread(data);
            VerificarAlerta(mercado, spread)
            alertaMercado(spread)
            res.json({mercado, spread});
        })
        .catch(error => {
            res.status(500).send(`Error al calcular el spread para el mercado ${mercado}: ${error.message}`)
        })
});

// Endpoint para obtener todos los spread del mercado //

app.get('/spreads', (req, res) => {
    llamadaMercados()
        .then(mercados => {
            const promises = mercados.map(mercado => {
                return llamadaApi(mercado)
                    .then(data => {
                        const spread = calcularSpread(data);
                        return { mercado, spread };
                    })
                    .catch(error => {
                        return { mercado, error: `Error al calcular el spread: ${error.message}` };
                    });
            });

            Promise.all(promises)
                .then(results => {
                    res.json(results);
                })
                .catch(error => {
                    res.status(500).send(`Error al obtener los spreads: ${error.message}`);
                });
        })
        .catch(error => {
            res.status(500).send(`Error al obtener los mercados: ${error.message}`);
        });
});

app.get('/alert', (req, res) => {
    res.json({spreadAlerta})
})

function VerificarAlerta(mercado, spread){
    if (spread > spreadAlerta){
        console.log(`¡Alerta! el spread para el mercado ${mercado} es mayor a la alerta`)
    } else if (spread < spreadAlerta) {
        console.log(`¡Alerta! el spread para el mercado ${mercado} es menor a la alerta`)
    }
}

function calcularSpread(data) {
    // Verificar si existen las propiedades necesarias

    const maxBid = parseFloat(data.ticker.max_bid[0]);
    const minAsk = parseFloat(data.ticker.min_ask[0]);

    if (!isNaN(maxBid) && !isNaN(minAsk)){
        return minAsk-maxBid
    }
    return null;
}


module.exports = app;