var request = require('supertest-as-promised');
var api = require('../server.js');
var host = process.env.API_TEST_HOST || api;
//var mongoose = require('mongoose');
//var host = 'http://localhost:3000';

var _ = require('lodash');

request = request(host);

//describe('Coleccion de Recetas [/recruiters]', function() {
/*before(function(done) {
    mongoose.connect('mongodb://localhost/anotamela-test', done);
  });

  after(function(done) {
    mongoose.disconnect(done);
    mongoose.models = {};
  });*/





describe('POST', function() {
    /*  describe('obstener Idrecta', function() {
        it('deberia obtener un idrecruiter', function(done) {

            function getId() {

            }
            done();

        });

    });*/
    /**/

    it('deberia cear un reclutador', function(done) {
        var data = {
            "reclutador": {
                "id": 1,
                "username": "sebalesca",
                "pass": "pepona",
                "fullname": "sebastian oscar lescano",
                "email": "sebalesca83o@gmail.com",
                "ismanager": {
                    "type": "Buffer",
                    "data": [
                        1
                    ]
                },
                "enabled": {
                    "type": "Buffer",
                    "data": [
                        1
                    ]
                }
            }
        };

        request
            .post('/recruiter')
            .set('Accept', 'application/json')
            .send(data)
            .expect(201)
            .expect('Content-Type', /application\/json/)
            .end(function(err, res) {
                var recruiter;

                var body = res.body;
                // console.log('body', body);

                // Nota existe
                expect(body).to.have.property('recruiter');
                recruiter = body.recruiter;

                // Propiedades
                expect(recruiter).to.have.property('NroReceta', '131072522512 ');
                expect(recruiter).to.have.property('NroAfiliado', '09562193821800');
                expect(recruiter).to.have.property('NombreAfiliado', 'ABADIE OFELIA ERMINDA');
                expect(recruiter).to.have.property('FechaReceta', '2014-08-11T00:00:00.000Z');
                expect(recruiter).to.have.property('idReceta', recruiter.idReceta);

                done(err);
            });
    });
});

describe('GET /recruiter/:id', function() {
    it('deberia obtener una recruiter existente', function(done) {
        var id;
        id = 6825087;
        request
            .get('/recruiters/' + id)
            .set('Accept', 'application/json')
            .send()
            .expect(200)
            .expect('Content-Type', /application\/json/)
            .then(function assertions(res) {
                var recruiter;
                var body = res.body;
                // recruiter existe
                expect(body).to.have.property('recruiter');
                recruiter = body.recruiter;

                // Propiedades
                expect(recruiter).to.have.property('idReceta', id);
                expect(recruiter).to.have.property('NroReceta', '131072522512 ');
                expect(recruiter).to.have.property('NombreAfiliado', 'ABADIE OFELIA ERMINDA');
                expect(recruiter).to.have.property('NroAfiliado', '09562193821800');
                expect(recruiter).to.have.property('FechaReceta', '2014-08-11T00:00:00.000Z');
                expect(recruiter).to.have.property('FechaCargaReceta', '2014-09-11T14:07:35.420Z');
                expect(recruiter).to.have.property('Estado', 3);
                expect(recruiter).to.have.property('UltimoEvento', '2014-09-11T14:07:35.420Z');

            });
        done();
    });
});


/* comentado porque hasta ahora no se modifican
describe('PUT', function() {
    it('deberia actualizar una recruiter existente', function(done) {
        var id;
        var data = {
            "recruiter": {
                "NroReceta": "131072522512",
                "NroAfiliado": "09562193821800",
                "NombreAfiliado": "ABADIE OFELIA ERMINDA",
                "FechaReceta": "2014-08-11T00:00:00.000Z"
            }

        };

        request
            .post('/recruiters')
            .set('Accept', 'application/json')
            .send(data)
            .expect(201)
            .expect('Content-Type', /application\/json/)
            .then(function getReceta(res) {
                var update = {
                    "recruiter": {
                        "idReceta": res.body.recruiter.idReceta,
                        "NroReceta": "131072522512",
                        "NroAfiliado": "09562193821800",
                        "NombreAfiliado": "ABADIE OFELIA ERMINDA",
                        "FechaReceta": "2014-08-11T00:00:00.000Z"
                    }
                };

                id = res.body.recruiter.idReceta;

                return request.put('/recruiters/' + id)
                    .set('Accept', 'application/json')
                    .send(update)
                    .expect(200)
                    .expect('Content-Type', /application\/json/)
            }, done)
            .then(function assertions(res) {
                var recruiter;
                var body = res.body;

                // recruiter existe
                expect(body).to.have.property('recruiter');
                expect(body.recruiter).to.be.an('array')
                    .and.to.have.length(1);
                recruiter = body.recruiter[0];

                // Propiedades
                expect(recruiter).to.have.property('idReceta', id);
                expect(recruiter).to.have.property('NroReceta', '131072522512');
                expect(recruiter).to.have.property('NroAfiliado', '09562193821800');
                expect(recruiter).to.have.property('NombreAfiliado', 'ABADIE OFELIA ERMINDA');
                expect(recruiter).to.have.property('FechaReceta', '2014-08-11T00:00:00.000Z');
                done();
            }, done);

    });
});

*/
describe('DELETE', function() {
    it('deberia eliminar una recruiter existente', function(done) {
        var id;
        id = 6825087;
        request
            .delete('/recruiter/' + id)
            .set('Accept', 'application/json')
            .expect(204)
            .then(function assertions(res) {
                var recruiter;
                var body = res.body;
                console.log('entro en la aseveracion');
                // Respuesta vacia
                expect(body).to.be.empty;
                // Probamos que de verdad no exista
                return request.get('/recruiters/' + id)
                    .set('Accept', 'application/json')
                    .send()
                    .expect(400)
                    .then(function confirmation(res) {
                        var body = res.body;
                        expect(body).to.be.empty;



                    });
            });
    });
});

describe('GET /recruiters/', function() {
    it('deberia obtener todas las recruiters existentes', function(done) {
        request
            .get('/recruiters/')
            .expect(200)
            .expect('Content-Type', /application\/json/)
            .then(function(resp) {
                //obtengo la respuesta de la peticion get
                var body = resp.body;

                expect(body).to.have.property('recruiters');
                expect(body).to.have.property('success');
                expect(body).to.have.property('total');
                expect(body.recruiters).to.be.an('array')
                    .and.to.have.length.above(0);
                //console.log(body.recruiters);


            });
        done();


    });
});







/*PRUEBA ORIGINAL DEL CURSO
describe('GET /recruiters/:id', function() {
    it('deberia obtener una recruiter existente', function(done) {
        var id;
        var data = {
            "recruiter": {
                "NroReceta": "131072522512",
                "NombreAfiliado": "ABADIE OFELIA ERMINDA",
                "NroAfiliado": "09562193821800",
                "FechaReceta": "2014-08-11T00:00:00.000Z",
                "FechaCargaReceta": "2014-08-14T11:02:30.616Z",
                "Estado": 3,
                "UltimoEvento": "2014-08-21T15:21:41.866Z",
            }

        };
        request
            .post('/recruiters')
            .set('Accept', 'application/json')
            .send(data)
            .expect(201)
            .expect('Content-Type', /application\/json/)
            .then(function getReceta(res) {
                id = res.body.recruiter.idReceta;

                return request.get('/recruiters/' + id)
                    .set('Accept', 'application/json')
                    .send()
                    .expect(200)
                    .expect('Content-Type', /application\/json/)
            }, done)
            .then(function assertions(res) {
                var recruiter;
                var body = res.body;
                // Nota existe
                expect(body).to.have.property('recruiter');
                recruiter = body.recruiter;

                // Propiedades
                expect(recruiter).to.have.property('idReceta', id);
                expect(recruiter).to.have.property('NroReceta', '131072522512');
                expect(recruiter).to.have.property('NombreAfiliado', 'ABADIE OFELIA ERMINDA');
                expect(recruiter).to.have.property('NroAfiliado', '09562193821800');
                expect(recruiter).to.have.property('FechaReceta', '2014-08-11T00:00:00.000Z');
                expect(recruiter).to.have.property('FechaCargaReceta', '2014-08-14T11:02:30.616Z');
                expect(recruiter).to.have.property('Estado', 3);
                expect(recruiter).to.have.property('UltimoEvento', '2014-08-21T15:21:41.866Z');
                done();
            }, done);

    });
});
*/