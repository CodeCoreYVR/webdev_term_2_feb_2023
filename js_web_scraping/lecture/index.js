const cheerio = require('cheerio');
const axios = require('axios');

axios.get(
    "https://en.wikipedia.org/wiki/Provinces_and_territories_of_Canada")
    .then(response => {
        const $ = cheerio.load(response.data);
        // console.log(response.data);
        $('table.wikitable tr').each((index, e) => {
            let row  = $(e).html();
            console.log(row);
        });
    });