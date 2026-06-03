const express = require('express');
const shipping = require('./shipping');
const inventory = require('./inventory');
const discount = require('./discount');
const cors = require('cors');

const app = express();
app.use(cors());

/**
 * Retorna a lista de produtos da loja via InventoryService
 */
app.get('/products', (req, res, next) => {
    inventory.SearchAllProducts(null, (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send({ error: 'something failed :(' });
        } else {
            res.json(data.products);
        }
    });
});

/**
 * Consulta o frete de envio no ShippingService e calcula desconto no frete
 */
app.get('/shipping/:cep', (req, res, next) => {
    shipping.GetShippingRate({ cep: req.params.cep }, (err, shippingData) => {
        if (err) {
            console.error(err);
            return res.status(500).send({ error: 'something failed :(' });
        }
        discount.GetDiscountRate({}, (err, discountData) => {
            if (err){
                console.error(err)
                return res.status(500).send({ error: 'something failed :('})
            }
            res.json({
                cep: req.params.cep,
                shipping: shippingData.value,
                discount: discountData.value,
                total: shippingData.value - discountData.value,
            });
        });
    });
});

/**
 * Inicia o router
 */
app.listen(3000, () => {
    console.log('Controller Service running on http://127.0.0.1:3000');
});
