const API = require('../requestsgenerator.js'); //@bsaqqa/requestsgenerator

API.setUrl('http://example.com/api/');

API.http.getProjects({page: 1})
.then(response => response.json())
.then(resp => {
    console.log(resp);
}).catch(err => {
    throw new Error('Response is inncorrect.');
});