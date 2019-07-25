const axios = require('axios');

const petCampHeader = {
    "Authorization": "Bearer eyJvIjoie1wiaVwiOlwiQ2lhc2hvcFwiLFwiblwiOlwiSW50ZWdyYVJEXCIsXCJwXCI6XCI4ODk2OGQ1Mi00OGM4LTRiM2UtYWVkMy0yZWU2ZGRlMTc4MDBcIn0iLCJzIjoiTURPWERiWnhSQU8xakpLUmZDNVZiVEtjUFV4TVJWOTVQUnIvNE5mQTVpNWNvakh4L2VvNW0vc2xYbkFYSGFHNVN5SzJwNlVWZ3c0VTAveG5vUFo2Ym9jY0xUZjhUZTA2blIvSHZkblNqUkNqdmlLTWZ0VGlKeXZZYmFnZHFHYzBNQTh6SUUzdk04NXY4M05tbktPMVhKWE01b3lBMHkwUE4vMkh1VVQ0Y3ZjPSJ9"
};

const rdHeader = {
    "Authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJodHRwczovL2FwaS5yZC5zZXJ2aWNlcyIsInN1YiI6Im5HeEQwc0NaVHNNTFFGdWRFV2VTNEttWmVOUlY2ZDdrSXhueVdhMWpHeGNAY2xpZW50cyIsImF1ZCI6Imh0dHBzOi8vYXBwLnJkc3RhdGlvbi5jb20uYnIvYXBpL3YyLyIsImFwcF9uYW1lIjoiaW50ZWdyYVBldENhbXAiLCJleHAiOjE1NTgxNzc4NzEsImlhdCI6MTU1ODA5MTQ3MSwic2NvcGUiOiIifQ.B3kWjvRY3AUILe3vSpGLwosegtranpPp59sBB-NQ3DDugA9eSwXc27Dfhz9pXDne0uYtwksxkc_-DH3oFsZ040CxE50nD9O-bECn003ItQow1QjWIAgR9VHyw2GsS3l3eypohi0ljJ017LJvemq-krghHUgGLvYttx1hRjFKciCpEGAf3OJjI2qDlyryq0m4_Yg11Zp5oRug7No-f1dFbeSj-HpMwNw7QTJf3PMIKCluPivKR3v-3DZhP7L82Dl_ok9Ef_SOxp3YFYx-r-S04aWW5zJwPjw7poFYweH0peHn-7iyWd5A8-7jVSWzHW6fFInAyuCFKyJbcTS2Ncqq2g",
    'Content-Type': 'application/json'
};

/**
 * Obtem usuario da api da Petcamp
 */
async function getUserPetCamp(costumerId) {
    let response = await axios.get("https://www.petcamp.com.br/api/v1/customers/" + costumerId, { headers: petCampHeader });

    return response.data;
}

/**
 * Obtem venda da api da Petcamp
 */
async function getOrderPetCamp(orderId) {
    let response = await axios.get("https://www.petcamp.com.br/api/v1/orders/" + orderId, { headers: petCampHeader });

    return response.data;
}

/**
 * Obtem os produtos de uma venda na api da Petcamp
 */
async function getProductsOrderPetCamp(orderId) {
    let response = await axios.get("https://www.petcamp.com.br/api/v1/orders/" + orderId + "/orderitems", { headers: petCampHeader });
    let products = response.data.map(product => {
        return product.productId
    });

    return products;
}

/**
 * Obtem os nomes dos produtos de uma venda na api da Petcamp
 */
async function getProductNamePetCamp(productId) {
    let response = await axios.get("https://www.petcamp.com.br/api/v1/products/" + productId, { headers: petCampHeader });

    return response.data.name;
}

/**
 * Salva novo usuario na RD
 */
async function saveUserRD(costumerId) {
    const customerData = await getUserPetCamp(costumerId);
    const data = {
        event_type: "CONVERSION",
        event_family: "CDP",
        payload: {
            conversion_identifier: "petcamp_ecommerce_cadastro_completo",
            name: customerData.name,
            email: customerData.email,
            city: customerData.billingAddress.city,
            state: customerData.billingAddress.state,
            country: customerData.billingAddress.country,
            mobile_phone: customerData.phoneAreaCode + " " + customerData.phoneNumber
        }
    };

    const response = await connectToRd('post', 'https://api.rd.services/platform/events', data);

    return response;
}

/**
 * Atualiza usuario na RD
 */
async function updateUsersRd(userEmail, tags) {
    let tags_filtered = tags.map(tag => {
        return tag.toLowerCase();
    });

    try {
        const contact = await axios.get("https://api.rd.services/platform/contacts/email:" + userEmail, { headers: rdHeader });

        const data = {
            ...contact.data,
            tags: tags_filtered
        };

        const id = data.uuid;

        delete data.uuid;
        delete data.city;

        const response = await connectToRd("patch", "https://api.rd.services/platform/contacts/" + id, data);

        return response;
    } catch (error) {
        return false;
    }
}

/**
 * Conexão com a RD
 */
async function connectToRd(method, url, data) {
    let response = await axios({
        method: method,
        headers: rdHeader,
        url: url,
        data: JSON.stringify(data)
    });

    return response.data;
}

module.exports = {
    getUserPetCamp,
    getOrderPetCamp,
    getProductsOrderPetCamp,
    getProductNamePetCamp,
    saveUserRD,
    updateUsersRd,
    connectToRd
};