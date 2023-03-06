const axios = require('axios');
const cheerio = require('cheerio');

function firstHeaderText(url) {
    return new Promise((resolve, reject) => {
        axios.get(url)
            .then(function (response) {
                const $ = cheerio.load(response.data);
                resolve($('h1').first().text());
            })
            .catch(function (error) {
                reject(error);
            });
    });
} 

module.exports = firstHeaderText;