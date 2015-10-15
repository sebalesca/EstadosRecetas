var request = require('supertest-as-promised');
var api = require('../../server.js');
// var host = process.env.API_TEST_HOST || api;
var host = 'http://localhost:4200/api';
request = request(host);

module.exports.createNote = function createNote(recruiter) {
    console.log('crea recruiter');
    var sample = {
        
            "reclutador": {
                "username": "leancura",
                "pass": "lean",
                "fullname": "leandro Cura",
                "email": "leancura@gmail.com",
                "ismanager": {
                    "type": "Buffer",
                    "data": [
                        0
                    ]
                },
                "enabled": {
                    "type": "Buffer",
                    "data": [
                        0
                    ]
                }
            }
        
    };

    recruiter = recruiter || sample;

    return request
        .post('/recruiter')
        .set('Accept', 'application/json')
        .send(receta)
        .expect(201)
        .expect('Content-Type', /application\/json/)
        .then(function getRecruiter(res) {
            this.recruiter = res.body.recruiter;
            this.id = res.body.recruiter.id;
        }.bind(this));
}