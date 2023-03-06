const a = require('./charCount');

a("Monday").then(data => {
    console.log(data);
})
.catch(console.error);