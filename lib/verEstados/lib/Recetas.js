//modulo para conectar son el server
var sql = require('mssql');
//modulo para Conectar al WS de ACES
var soap = require('soap');
//para utilizar la libreria underscore
var _ = require('underscore')._;
//para escribir el log
var fs = require('fs');
//para los colores
var colors = require('colors');

var config = require('../../config');
var url = require('../../config').urlAce;
var winston = require('winston');
var recetaTest= require('./recetaTest.js');

//configuracion de colores
colors.setTheme({
    silly: 'rainbow',
    input: 'grey',
    verbose: 'cyan',
    prompt: 'grey',
    info: 'green',
    data: 'grey',
    help: 'cyan',
    warn: 'yellow',
    debug: 'blue',
    error: 'red'
});




//paramettros de la conexion de prueba
/*
var config = {
    user: 'farmacia1',
    password: 'farma',
    server: 'CAMOYTEW98\\SQLEXPRESS',
    database: 'newFarma'
};*/
/*
var config = {
    user: 'te',
    password: 'C4m0yT3Q~20',
    server: '192.168.99.202',
    database: 'Farma'
};*/


var recetaModelo = {};
//obtener segun nroreceta su correspondiente id
recetaModelo.getIdReceta = function(NroReceta, callback) {
    var connection = new sql.Connection(config.conexion, function(err) {
        // ... err checks
        if (err) {
            //console.log('no se pudo concectar' + err);
            connection.close();
            throw err;
        } else {
            // console.log('se conecto a la base de datos');
            var request = new sql.Request(connection); // or: var request = connection.request();
            //para ver si funciona el store descomentar la linea siguiente
            //request.verbose = true;
            //request.input('tipo', sql.Char(2), tipo);
            request.query('select  [dbo].[getIdReceta] (' + NroReceta + ') as IdReceta', function(err, recordset) {
                if (err) {
                    connection.close();
                    callback(err, null);
                } else {
                    //IMPORTANTE SELECCIONAR EL PRIMER ELEMNETO DEL ARRAY RECORDSET!!!
                    //console.log(recordset[0]);
                    connection.close();
                    callback(null, recordset[0]);
                }

            });

        }
    });

};
//fin obtenet idreceta

//obtiene datos de una receta para actualizarla lleva un parametro
recetaModelo.getReceta = function(idReceta, callback) {
    //console.log(idReceta);
    var connection = new sql.Connection(config.conexion, function(err) {
        // ... err checks
        if (err) {
            console.log('no se pudo concectar' + err);
            connection.close();
           //throw err;
        } else {
            // console.log('se conecto a la base de datos');
            var request = new sql.Request(connection); // or: var request = connection.request();
            //para ver si funciona el store descomentar la linea siguiente
            request.verbose = true;
            //request.input('tipo', sql.Char(2), tipo);
            request.input('idReceta', sql.Numeric(18, 0), idReceta);
            request.execute('getReceta', function(err, recordsets, returnValue) {
                if (err) {
                    connection.close();
                    callback(err, null);
                } else {
                    //IMPORTANTE SELECCIONAR EL PRIMER ELEMNETO DEL ARRAY RECORDSET!!!
                    //console.log(recordsets[0]);
                    connection.close();
                    callback(null, recordsets[0]);
                }

            });

        }
    });

};

//obtener recetas observadas
recetaModelo.getObservadas = function(callback) {
    var connection = new sql.Connection(config.conexion, function(err) {
        // ... err checks
        if (err) {
            //console.log('no se pudo concectar' + err);
            connection.close();
            throw err;
        } else {
            // console.log('se conecto a la base de datos');
            var request = new sql.Request(connection); // or: var request = connection.request();
            //para ver si funciona el store descomentar la linea siguiente
            request.verbose = true;
            //request.input('campo', sql.Int, valor);
            //request.input('campo', sql.Int, valor);

            request.execute('getRecetasObservadas', function(err, recordsets, returnValue) {
                if (err) {
                    connection.close();
                    callback(err, null);
                } else {
                    //IMPORTANTE SELECCIONAR EL PRIMER ELEMNETO DEL ARRAY RECORDSET!!!
                    fs.appendFileSync('/log/logRecetas.txt', 'Cantidad de observadas que se procesaran: ' + _.size(recordsets[0]) + ' \r'); //, function(err) {
                    connection.close();
                    callback(null, recordsets[0]);
                }

            });

        }
    });

};
//obterner todas las recetas autorizadas

recetaModelo.getAutorizadas = function(callback) {
    var connection = new sql.Connection(config.conexion, function(err) {
        // ... err checks
        if (err) {
            //fin de recetas
            //console.log('no se pudo concectar' + err);
            connection.close();
            throw err;
        } else {
            // console.log('se conecto a la base de datos');
            var request = new sql.Request(connection); // or: var request = connection.request();
            //para ver si funciona el store descomentar la linea siguiente
            //request.verbose = true;
            //request.input('campo', sql.Int, valor);
            //request.input('campo', sql.Int, valor);

            request.execute('getRecetasAutorizadas', function(err, recordsets, returnValue) {
                if (err) {
                    connection.close();
                    callback(err, null);
                   
                } else {
                    //IMPORTANTE SELECCIONAR EL PRIMER ELEMNETO DEL ARRAY RECORDSET!!!
                    fs.appendFileSync('/logs/logRecetas.txt', 'Cantidad de Autorizadas que se procesaran: ' + _.size(recordsets[0]) + ' \r'); //, function(err) {
                    console.log(recordsets[0]);
                    connection.close();
                    callback(null, recordsets[0]);
                }

            });

        }
    });

};
//fin de las recetas autorizadas
//obtener todas las recetas pendientes osea con estado en CAMOYTE
recetaModelo.getPendientes = function(callback) {
    var connection = new sql.Connection(config.conexion, function(err) {
        // ... err checks
        if (err) {
            //console.log('no se pudo concectar' + err);
            connection.close();
            throw err;
        } else {
            // console.log('se conecto a la base de datos');
            var request = new sql.Request(connection); // or: var request = connection.request();
            //para ver si funciona el store descomentar la linea siguiente
            request.verbose = true;
            //request.input('campo', sql.Int, valor);
            //request.input('campo', sql.Int, valor);

            request.execute('getRecetasPendientes', function(err, recordsets, returnValue) {
                if (err) {
                    connection.close();
                    callback(err, null);
                } else {
                    //IMPORTANTE SELECCIONAR EL PRIMER ELEMNETO DEL ARRAY RECORDSET!!!
                    fs.appendFileSync('/log/logRecetas.txt', 'Cantidad de pendientes que se procesaran: ' + _.size(recordsets[0]) + ' \r'); //, function(err) {
                    /*    if (err) {
                                            console.log(err);
                                        } else {
                                            console.log('Se ha escrito correctamente el log');
                                        }
                                    });*/
                    //console.log(_.size(recordsets[0]));
                    connection.close();
                    callback(null, recordsets[0]);
                }

            });

        }
    });

};

recetaModelo.verEstadoAces = function(DatosRecetas, callback) {
    //Modulo requerido para mapear el werbservices de aces
    var soap = require('soap');
    //esta es para testear
    var RecetaACE = recetaTest.Recetas[0].Receta5;

    //console.log('entro en metodo ws ases');

    soap.createClient(url, function(err, client) {

        if (!err) {
            var receta = {};
            receta.Usuario = config.AceUsuario;
            receta.Clave = config.AceClave;
            receta.IdRecetaFLV = DatosRecetas.idReceta;
            //console.log(client);

            client.ObtenerEstadoTramite(receta, function(err, result) {
                //console.log(receta);
                if (!err) {
                    //console.log('*************' + i.idReceta + '*********************');
                    //console.log(result.ObtenerEstadoTramiteResult.diffgram.NewDataSet);
                    var RecetaEstados = {};
                    var regWS;
                    //  console.log(_.isUndefined(result.ObtenerEstadoTramiteResult.diffgram.NewDataSet));
                    //console.log(result.ObtenerEstadoTramiteResult);
                    if (!_.isUndefined(result.ObtenerEstadoTramiteResult.diffgram.NewDataSet)) {
                        // if (_.has(result.ObtenerEstadoTramiteResult.diffgram.NewDataSet, 'Table')) {
                        console.log( _.keys(result.ObtenerEstadoTramiteResult.diffgram.NewDataSet));

                        //aca genero la receta que va a salir como callback
                        RecetaEstados['idReceta'] = result.ObtenerEstadoTramiteResult.diffgram.NewDataSet.Table.idRecetaFLV;
                        RecetaEstados['regID'] = DatosRecetas.regid;
                        regWS = result.ObtenerEstadoTramiteResult.diffgram.NewDataSet.Table.RegID;
                        RecetaEstados['wsRegId'] = regWS;
                        //console.log('este es la resp ws:' + result);

                        //descomentar en produccion
                        callback(null, result.ObtenerEstadoTramiteResult.diffgram.NewDataSet);
                        
                        //descomentar para testear
                        //callback(null, RecetaACE);

                    }



                } else {

                    //console.log('salio con error de ws aces');
                    callback(err, null);


                }

            });

            //cierra el if err del soap
        } else {
            console.log(err);
        }
    });

};
//procesar receta segun el estado
recetaModelo.procesaEstado = function(DatosReceta, callback) {
    //console.log('Se procesara: ' + DatosReceta);
    //variables que comparten todos los estados
    var connection;

    var s_Obs;
    var cant_obs;
    cant_obs = 1;
    //si existe la table2 esta observada
    if (_.has(DatosReceta, 'Table2')) {
        if (_.isArray(DatosReceta.Table2)) {
            s_Obs = _.reduce(_.pluck(DatosReceta.Table2, 'DescObservacion'), function(memo, obs) {
                cant_obs++;
                return memo + ' - ' + obs;
            });

        } else {
            s_Obs = DatosReceta.Table2.DescObservacion;
            cant_obs = 1;
        }

    } else {
        s_Obs = '';
        cant_obs = 0;

    }
    //esta linea es solo para poder linkear el archivo log
    //winston.add(winston.transports.File, {
     //   filename: './logs/logRecetas.log'
    //});
    //winston.log('debug', JSON.stringify(s_Obs));
    //winston.log('info', JSON.stringify(s_Obs));
    var s_notas;
    var cant_notas;
    cant_notas = 1;
    //si existe la table1 tiene nota
    if (_.has(DatosReceta, 'Table1')) {
        if (_.isArray(DatosReceta.Table1)) {
            s_notas = _.reduce(_.pluck(DatosReceta.Table1, 'Nota'), function(memo, nota) {
                cant_notas++;
                return memo + ' - ' + nota;
            });

        } else {
            //esto no es un array
            s_notas = DatosReceta.Table1.Nota;
            cant_notas = 1;

        }


    } else {
        s_notas = '';
        cant_notas = 0;
    }

    var fechaCamoyte;
    if (_.has(DatosReceta.Table, 'FechaCAMOyTE')) {

        fechaCamoyte = DatosReceta.Table.FechaCAMOyTE;

    } else {
        fechaCamoyte = null;
    }

    var feComunicaconDrog;
    if (_.has(DatosReceta.Table, 'FechaComunicacionDrogueria')) {

        feComunicaconDrog = DatosReceta.Table.FechaComunicacionDrogueria;

    } else {
        feComunicaconDrog = null;
    }
    var remito;
    if (_.has(DatosReceta.Table, 'Remito')) {

        remito = DatosReceta.Table.Remito;

    } else {
        remito = '';
    }

    var feremito;
    if (_.has(DatosReceta.Table, 'FechaRemito')) {

        feremito = DatosReceta.Table.FechaRemito;

    } else {
        feremito = null;
    }

    var idrechazo;
    if (_.has(DatosReceta.Table, 'idRechazo')) {

        idrechazo = DatosReceta.Table.idRechazo;

    } else {
        idrechazo = 0;
    }

    var codap;
    if (_.has(DatosReceta.Table, 'CodAp')) {

        codap = DatosReceta.Table.CodAp;

    } else {
        codap = '';
    }


    var iddrogueria;
    if (_.has(DatosReceta.Table, 'idDrogueria')) {

        iddrogueria = DatosReceta.Table.idDrogueria;

    } else {
        iddrogueria = 0;
    }


    var productos = {};
    var cantiMed;
    if (_.has(DatosReceta, 'Table4')) {
        //cantiMed = 2;
        _.each(DatosReceta.Table4, function(item, itera) {

            productos['RP' + (itera + 1)] = {
                idProducto: item.idProducto,
                Cantidad: item.Cantidad
            };

        });
    }




    var id_observacion, descrip;
    if (_.has(DatosReceta, 'Table2')) {

        descrip = DatosReceta.Table2.DescObservacion;
        id_observacion = DatosReceta.Table2.idObservacion;
        // console.log('esta es la primer obs: ' + descrip);
        //console.log('este es el codigo :' +id_observacion );


    } else {
        descrip = '';
        id_observacion = '';


    }
    //************************************************************

    //este artilugio es porque los dias y los meses en javascript arraca en 0
    //entonces le agrego el cero a los menores de 10
    function suma(numero) {
        var sale;
        sale = '0';
        if (numero < 10) {
            return sale + numero.toString();
        } else
            return numero.toString();
    }


    var fecha_c = new Date(fechaCamoyte);
    var fecha_dg = new Date(feComunicaconDrog);
    var fecha_r = new Date(feremito);
    //
    var Receta = {};

    switch (DatosReceta.Table.idEstado) {
        case '1': //validadas pendientes de autorizacion (buzon)
            Receta = {
                RegID: DatosReceta.Table.RegID,
                idRecetaFLV: DatosReceta.Table.idRecetaFLV,
                idEstado: DatosReceta.Table.idEstado.toString(),
                Estado: DatosReceta.Table.Estado.toString(),
                fe_camoyte: fecha_c


            };

            connection = new sql.Connection(config.conexion, function(err) {
                // ... err checks
                if (err) {
                    //console.log('no se pudo concectar' + err);
                    connection.close();
                    throw err;
                } else {
                    // console.log('se conecto a la base de datos');
                    var request = new sql.Request(connection); // or: var request = connection.request();
                    //para ver si funciona el store descomentar la linea siguiente
                    request.verbose = true;
                    request.input('regID', sql.NVarChar(40), Receta.RegID);
                    request.input('idReceta', sql.Numeric(18, 0), Receta.idRecetaFLV);
                    request.input('estadoEvento', sql.Int, Receta.idEstado);
                    request.input('descripEstado', sql.NVarChar(200), Receta.Estado);
                    if (fecha_c.getFullYear() == 1969) {
                        request.input('fe_camoyte', sql.NVarChar, '');

                    } else {
                        request.input('fe_camoyte', sql.NVarChar, fecha_c.getFullYear().toString() + suma(fecha_c.getMonth() + 1) + suma(fecha_c.getDate()));
                    }

                    request.output('exito', sql.Int);
                    request.execute('actualizaEstadosRecetasValidadaBuzon', function(err, recordsets, returnValue) {
                        if (err) {
                            connection.close();
                            callback(err, null);
                        } else {
                            //IMPORTANTE SELECCIONAR EL PRIMER ELEMNETO DEL ARRAY RECORDSET!!!
                            console.log('resultado de la consulta validada buzon:' + returnValue);
                            connection.close();
                            callback(null, recordsets[0]);
                        }

                    });

                }
            });

            break;
        case '2': //Validada con error
            Receta = {
                RegID: DatosReceta.Table.RegID,
                idRecetaFLV: DatosReceta.Table.idRecetaFLV,
                idEstado: DatosReceta.Table.idEstado.toString(),
                Estado: DatosReceta.Table.Estado.toString(),
                fe_camoyte: fecha_c,
                Error: DatosReceta.Table3.error
            };

            connection = new sql.Connection(config.conexion, function(err) {
                // ... err checks
                if (err) {
                    //console.log('no se pudo concectar' + err);
                    connection.close();
                    throw err;
                } else {
                    // console.log('se conecto a la base de datos');
                    var request = new sql.Request(connection); // or: var request = connection.request();
                    //para ver si funciona el store descomentar la linea siguiente
                    request.verbose = true;
                    request.input('regID', sql.NVarChar(40), Receta.RegID);
                    request.input('idReceta', sql.Numeric(18, 0), Receta.idRecetaFLV);
                    request.input('error', sql.NVarChar(150), Receta.Error);
                    request.input('estadoEvento', sql.Int, Receta.idEstado);
                    if (fecha_c.getFullYear() == 1969) {
                        request.input('fe_camoyte', sql.NVarChar, '');
                    } else {
                        request.input('fe_camoyte', sql.NVarChar, fecha_c.getFullYear().toString() + suma(fecha_c.getMonth() + 1) + suma(fecha_c.getDate()));
                    }
                    //request.input('descObservacion', sql.NVarChar(400), s_Obs);
                    request.output('exito', sql.Int);
                    request.execute('actualizaEstadosRecetasValidadaError', function(err, recordsets, returnValue) {
                        if (err) {
                            connection.close();
                            callback(err, null);
                        } else {
                            //IMPORTANTE SELECCIONAR EL PRIMER ELEMNETO DEL ARRAY RECORDSET!!!
                            console.log('resultado de la consulta validada con error :' + returnValue);
                            connection.close();
                            callback(null, recordsets[0]);
                        }

                    });

                }
            });



            break;
        case '3': //Receta previamente procesada por CAMOYTE
            Receta = {
                RegID: DatosReceta.Table.RegID,
                idRecetaFLV: DatosReceta.Table.idRecetaFLV,
                idEstado: DatosReceta.Table.idEstado.toString(),
                Estado: DatosReceta.Table.Estado.toString(),
                fe_camoyte: fecha_c

            };
            connection = new sql.Connection(config.conexion, function(err) {
                // ... err checks
                if (err) {
                    //console.log('no se pudo concectar' + err);
                    connection.close();
                    throw err;
                } else {
                    // console.log('se conecto a la base de datos');
                    var request = new sql.Request(connection); // or: var request = connection.request();
                    //para ver si funciona el store descomentar la linea siguiente
                    request.verbose = true;
                    request.input('regID', sql.NVarChar(40), Receta.RegID);
                    request.input('idReceta', sql.Numeric(18, 0), Receta.idRecetaFLV);
                    request.input('estadoEvento', sql.Int, Receta.idEstado);
                    request.input('descripEstado', sql.NVarChar(200), Receta.Estado);
                    if (fecha_c.getFullYear() == 1969) {
                        request.input('fe_camoyte', sql.NVarChar, '');

                    } else {

                        request.input('fe_camoyte', sql.NVarChar, fecha_c.getFullYear().toString() + suma(fecha_c.getMonth() + 1) + suma(fecha_c.getDate()));

                    }
                    request.output('exito', sql.Int);
                    request.execute('actualizaEstadosRecetasProcesadaPrevCamoyte', function(err, recordsets, returnValue) {
                        if (err) {
                            connection.close();
                            callback(err, null);
                        } else {
                            //IMPORTANTE SELECCIONAR EL PRIMER ELEMNETO DEL ARRAY RECORDSET!!!
                            console.log('resultado de la consulta procesada prev camoyte :' + returnValue);
                            connection.close();
                            callback(null, recordsets[0]);
                        }

                    });

                }
            });






            break;
        case '4': //SI LA RECETA FUE APROBADA
            Receta = {
                RegID: DatosReceta.Table.RegID,
                idRecetaFLV: DatosReceta.Table.idRecetaFLV,
                idEstado: DatosReceta.Table.idEstado.toString(),
                Estado: DatosReceta.Table.Estado.toString(),
                fecha_c: fecha_c,
                idConvenioFLV: DatosReceta.Table.idConvenioFLV,
                iddrogueria: iddrogueria,
                codap: codap,
                fecha_dg: fecha_dg,
                s_notas: s_notas,
                remito: remito,
                fecha_r: fecha_r,
                s_Obs: s_Obs,
                cantiMed: _.size(productos),
                productos: productos

            };
            connection = new sql.Connection(config.conexion, function(err) {
                // ... err checks
                if (err) {
                    //console.log('no se pudo concectar' + err);
                    connection.close();
                    throw err;
                } else {
                    // console.log('se conecto a la base de datos');
                    var request = new sql.Request(connection); // or: var request = connection.request();
                    //para ver si funciona el store descomentar la linea siguiente
                    request.verbose = true;
                    //cargo el convenio de la re
                    request.input('convenio', sql.Int, Receta.idConvenioFLV);
                    request.input('drogueria', sql.Int, Receta.iddrogueria);
                    request.input('codAutorizacion', sql.Char(20), Receta.codap);
                    request.input('regId', sql.NVarChar(40), Receta.RegID);
                    request.input('idReceta', sql.Numeric(18, 0), Receta.idRecetaFLV);

                    if (Receta.fecha_dg.getFullYear() == 1969) {
                        request.input('feDrogueria', sql.NVarChar, '');

                    } else {
                        request.input('feDrogueria', sql.NVarChar, Receta.fecha_dg.getFullYear().toString() + suma(Receta.fecha_dg.getMonth() + 1) + suma(Receta.fecha_dg.getDate()));


                    }

                    request.input('estadoEvento', sql.Int, Receta.idEstado);

                    //concatenar las notas porque pueden ser varias en una receta
                    request.input('nota', sql.NVarChar(400), Receta.s_notas);

                    request.input('remito', sql.NVarChar(20), Receta.remito);

                    if (Receta.fecha_r.getFullYear() == 1969) {
                        request.input('fe_remito', sql.NVarChar, '');

                    } else {
                        request.input('fe_remito', sql.NVarChar, Receta.fecha_r.getFullYear().toString() + suma(Receta.fecha_r.getMonth() + 1) + suma(Receta.fecha_r.getDate()));

                    }

                    if (Receta.fecha_c.getFullYear() == 1969) {
                        request.input('fe_camoyte', sql.NVarChar, '');

                    } else {
                        request.input('fe_camoyte', sql.NVarChar, Receta.fecha_c.getFullYear().toString() + suma(Receta.fecha_c.getMonth() + 1) + suma(Receta.fecha_c.getDate()));
                    }
                    request.input('descObservacion', sql.NVarChar(400), Receta.s_Obs);
                    request.output('exito', sql.Int);
                    request.input('cantMed', sql.Int, Receta.cantiMed);

                    request.input('idPresen1', sql.Int, (_.isUndefined(Receta.productos.RP1)) ? 0 : Receta.productos.RP1.idProducto);
                    request.input('cant1', sql.Int, (_.isUndefined(Receta.productos.RP1)) ? 0 : Receta.productos.RP1.Cantidad);
                    request.input('idPresen2', sql.Int, (_.isUndefined(Receta.productos.RP2)) ? 0 : Receta.productos.RP2.idProducto);
                    request.input('cant2', sql.Int, (_.isUndefined(Receta.productos.RP2)) ? 0 : Receta.productos.RP2.Cantidad);
                    request.execute('actualizaEstadosRecetasAprobadas', function(err, recordsets, returnValue) {
                        if (err) {
                            connection.close();
                            callback(err, null);
                        } else {
                            //IMPORTANTE SELECCIONAR EL PRIMER ELEMNETO DEL ARRAY RECORDSET!!!
                            console.log('resultado de la consulta actualizaEstadosRecetasAprobadas :' + returnValue);
                            connection.close();
                            callback(null, recordsets[0]);
                        }

                    });

                }
            });




            //fin de recetas aprobadas
            break;
        case '5': //inicio de recetas observadas
            Receta = {
                RegID: DatosReceta.Table.RegID,
                idRecetaFLV: DatosReceta.Table.idRecetaFLV,
                idEstado: DatosReceta.Table.idEstado.toString(),
                Estado: DatosReceta.Table.Estado.toString(),
                fecha_c: fecha_c,
                idConvenioFLV: DatosReceta.Table.idConvenioFLV,
                idrechazo: idrechazo,
                descrip: descrip,
                id_observacion: id_observacion,
                iddrogueria: iddrogueria,
                codap: codap,
                fecha_dg: fecha_dg,
                s_notas: s_notas,
                remito: remito,
                fecha_r: fecha_r,
                s_Obs: s_Obs,
                cant_notas: cant_notas,
                cant_obs: cant_obs

            };
            console.log('entro en el estado observadas');
            connection = new sql.Connection(config.conexion, function(err) {
                // ... err checks
                if (err) {
                    //console.log('no se pudo concectar' + err);
                    connection.close();
                    throw err;
                } else {
                    // console.log('se conecto a la base de datos');
                    var request = new sql.Request(connection); // or: var request = connection.request();
                    //para ver si funciona el store descomentar la linea siguiente
                    request.verbose = true;
                    request.input('convenio', sql.Int, Receta.idConvenioFLV);
                    request.input('regId', sql.NVarChar(40), Receta.RegID);
                    request.input('idReceta', sql.Numeric(18, 0), Receta.idRecetaFLV);
                    request.input('estadoEvento', sql.Int, Receta.idEstado);
                    request.input('codrechazo', sql.Int, Receta.idrechazo);
                    request.input('descripcionRechazo', sql.NVarChar(400), Receta.descrip);
                    request.input('codObservacion', sql.Int, Receta.id_observacion);
                    request.input('descObservacion', sql.NVarChar(400), Receta.descrip);
                    //concatenar las notas porque pueden ser varias en una receta
                    request.input('notas', sql.NVarChar(400), Receta.s_notas);
                    request.input('Observaciones', sql.NVarChar(400), Receta.s_Obs);

                    //fecha de camoyte
                    if (Receta.fecha_c.getFullYear() == 1969) {
                        request.input('fe_camoyte', sql.NVarChar, '');

                    } else {

                        request.input('fe_camoyte', sql.NVarChar, Receta.fecha_c.getFullYear().toString() + suma(Receta.fecha_c.getMonth() + 1) + suma(Receta.fecha_c.getDate()));

                    }


                    request.input('CantNotas', sql.Int, Receta.cant_notas);
                    request.input('CantObserv', sql.Int, Receta.cant_obs);
                    request.input('DescripEstado', sql.NVarChar(200), Receta.Estado);
                    request.output('exito', sql.Int);

                    request.execute('actualizaEstadosRecetasObservadas', function(err, recordsets, returnValue) {
                        if (err) {
                            connection.close();
                            callback(err, null);
                        } else {
                            //IMPORTANTE SELECCIONAR EL PRIMER ELEMNETO DEL ARRAY RECORDSET!!!
                            console.log('resultado de la consulta actualizaEstadosRecetasObservadas :' + returnValue);
                            connection.close();
                            callback(null, recordsets[0]);
                        }

                    });

                }
            });



            //fin de recetas observadas
            break;
        case '10': //Trámite inexistente          
            Receta = {
                RegID: DatosReceta.Table.RegID,
                idRecetaFLV: DatosReceta.Table.idRecetaFLV,
                idEstado: DatosReceta.Table.idEstado.toString(),
                Estado: DatosReceta.Table.Estado.toString(),
                fecha_c: fecha_c
            };
            connection = new sql.Connection(config.conexion, function(err) {
                // ... err checks
                if (err) {
                    //console.log('no se pudo concectar' + err);
                    connection.close();
                    throw err;
                } else {
                    // console.log('se conecto a la base de datos');
                    var request = new sql.Request(connection); // or: var request = connection.request();
                    //para ver si funciona el store descomentar la linea siguiente
                    request.verbose = true;
                    request.input('regID', sql.NVarChar(40), Receta.RegID);
                    request.input('idReceta', sql.Numeric(18, 0), Receta.idRecetaFLV);
                    request.input('estadoEvento', sql.Int, Receta.idEstado);
                    request.input('descripEstado', sql.NVarChar(200), Receta.Estado);
                    if (Receta.fecha_c.getFullYear() == 1969) {
                        request.input('fe_camoyte', sql.NVarChar, '');

                    } else {

                        request.input('fe_camoyte', sql.NVarChar, Receta.fecha_c.getFullYear().toString() + suma(Receta.fecha_c.getMonth() + 1) + suma(Receta.fecha_c.getDate()));

                    }
                    request.output('exito', sql.Int);
                    request.execute('actualizaEstadosRecetasTramiteInexistente', function(err, recordsets, returnValue) {
                        if (err) {
                            connection.close();
                            callback(err, null);
                        } else {
                            //IMPORTANTE SELECCIONAR EL PRIMER ELEMNETO DEL ARRAY RECORDSET!!!
                            console.log('resultado de la consulta tramite inexistente :' + returnValue);
                            connection.close();
                            callback(null, recordsets[0]);
                        }

                    });

                }
            });

            break;
        case '11': //'Trámite pendiente de validación
            Receta = {
                RegID: DatosReceta.Table.RegID,
                idRecetaFLV: DatosReceta.Table.idRecetaFLV,
                idEstado: DatosReceta.Table.idEstado.toString(),
                Estado: DatosReceta.Table.Estado.toString(),
                fecha_c: fecha_c

            };
            connection = new sql.Connection(config.conexion, function(err) {
                // ... err checks
                if (err) {
                    //console.log('no se pudo concectar' + err);
                    connection.close();
                    throw err;
                } else {
                    // console.log('se conecto a la base de datos');
                    var request = new sql.Request(connection); // or: var request = connection.request();
                    //para ver si funciona el store descomentar la linea siguiente
                    request.verbose = true;
                    request.input('regID', sql.NVarChar(40), Receta.RegID);
                    request.input('idReceta', sql.Numeric(18, 0), Receta.idRecetaFLV);
                    request.input('estadoEvento', sql.Int, Receta.idEstado);
                    request.input('descripEstado', sql.NVarChar(200), Receta.Estado);
                    if (Receta.fecha_c.getFullYear() == 1969) {
                        request.input('fe_camoyte', sql.NVarChar, '');

                    } else {

                        request.input('fe_camoyte', sql.NVarChar, Receta.fecha_c.getFullYear().toString() + suma(Receta.fecha_c.getMonth() + 1) + suma(Receta.fecha_c.getDate()));

                    }
                    //request.input('descObservacion', sql.NVarChar(400), s_Obs);
                    request.output('exito', sql.Int);
                    request.execute('actualizaEstadosRecetasPendienteValidacion', function(err, recordsets, returnValue) {
                        if (err) {
                            connection.close();
                            callback(err, null);
                        } else {
                            //IMPORTANTE SELECCIONAR EL PRIMER ELEMNETO DEL ARRAY RECORDSET!!!
                            console.log('resultado de la consulta pendiente de validacion :' + returnValue);
                            connection.close();
                            callback(null, recordsets[0]);
                        }

                    });

                }
            });


            break;
        case '12': //Receta anulada
            Receta = {
                RegID: DatosReceta.Table.RegID,
                idRecetaFLV: DatosReceta.Table.idRecetaFLV,
                idEstado: DatosReceta.Table.idEstado.toString(),
                Estado: DatosReceta.Table.Estado.toString(),
                fecha_c: fecha_c

            };
            connection = new sql.Connection(config.conexion, function(err) {
                // ... err checks
                if (err) {
                    //console.log('no se pudo concectar' + err);
                    connection.close();
                    throw err;
                } else {
                    // console.log('se conecto a la base de datos');
                    var request = new sql.Request(connection); // or: var request = connection.request();
                    //para ver si funciona el store descomentar la linea siguiente
                    request.verbose = true;
                    request.input('regID', sql.NVarChar(40), Receta.RegID);
                    request.input('idReceta', sql.Numeric(18, 0), Receta.idRecetaFLV);
                    request.input('estadoEvento', sql.Int, Receta.idEstado);
                    request.input('descripEstado', sql.NVarChar(200), Receta.Estado);
                    if (Receta.fecha_c.getFullYear() == 1969) {
                        request.input('fe_camoyte', sql.NVarChar, '');

                    } else {

                        request.input('fe_camoyte', sql.NVarChar, Receta.fecha_c.getFullYear().toString() + suma(Receta.fecha_c.getMonth() + 1) + suma(Receta.fecha_c.getDate()));

                    }
                    //request.input('descObservacion', sql.NVarChar(400), s_Obs);
                    request.output('exito', sql.Int);
                    request.execute('actualizaEstadosRecetasAnulada', function(err, recordsets, returnValue) {
                        if (err) {
                            connection.close();
                            callback(err, null);
                        } else {
                            //IMPORTANTE SELECCIONAR EL PRIMER ELEMNETO DEL ARRAY RECORDSET!!!
                            console.log('resultado de la consulta anuladas:' + returnValue);
                            connection.close();
                            callback(null, recordsets[0]);
                        }

                    });

                }
            });

            break;
        case '13': //'Aprobada administrativamente
            Receta = {
                RegID: DatosReceta.Table.RegID,
                idRecetaFLV: DatosReceta.Table.idRecetaFLV,
                idEstado: DatosReceta.Table.idEstado.toString(),
                Estado: DatosReceta.Table.Estado.toString(),
                fecha_c: fecha_c,
                idConvenioFLV: DatosReceta.Table.idConvenioFLV,
                s_notas: s_notas
            };
            connection = new sql.Connection(config.conexion, function(err) {
                // ... err checks
                if (err) {
                    //console.log('no se pudo concectar' + err);
                    connection.close();
                    throw err;
                } else {
                    // console.log('se conecto a la base de datos');
                    var request = new sql.Request(connection); // or: var request = connection.request();
                    //para ver si funciona el store descomentar la linea siguiente
                    request.verbose = true;
                    //cargo el convenio de la re
                    request.input('convenio', sql.Int, Receta.idConvenioFLV);
                    request.input('regID', sql.NVarChar(40), Receta.RegID);
                    request.input('idReceta', sql.Numeric(18, 0), Receta.idRecetaFLV);
                    request.input('estadoEvento', sql.Int, Receta.idEstado);
                    request.input('descripEstado', sql.NVarChar(200), Receta.Estado);
                    //concatenar las notas porque pueden ser varias en una receta
                    request.input('notas', sql.NVarChar(400), Receta.s_notas);
                    if (Receta.fecha_c.getFullYear() == 1969) {
                        request.input('fe_camoyte', sql.NVarChar, '');

                    } else {

                        request.input('fe_camoyte', sql.NVarChar, Receta.fecha_c.getFullYear().toString() + suma(Receta.fecha_c.getMonth() + 1) + suma(Receta.fecha_c.getDate()));

                    }
                    //request.input('descObservacion', sql.NVarChar(400), s_Obs);
                    request.output('exito', sql.Int);
                    request.execute('actualizaEstadosRecetasAprobadaAdm', function(err, recordsets, returnValue) {
                        if (err) {
                            connection.close();
                            callback(err, null);
                        } else {
                            //IMPORTANTE SELECCIONAR EL PRIMER ELEMNETO DEL ARRAY RECORDSET!!!
                            console.log('resultado de la consulta aprobadas admnistrativamente:' + returnValue);
                            connection.close();
                            callback(null, recordsets[0]);
                        }

                    });

                }
            });

            break;
        case '14': //En Tramite verificando documentacion afiliado
            connection = new sql.Connection(config.conexion, function(err) {
                Receta = {
                    RegID: DatosReceta.Table.RegID,
                    idRecetaFLV: DatosReceta.Table.idRecetaFLV,
                    idEstado: DatosReceta.Table.idEstado.toString(),
                    Estado: DatosReceta.Table.Estado.toString(),
                    fecha_c: fecha_c
                };
                // ... err checks
                if (err) {
                    //console.log('no se pudo concectar' + err);
                    connection.close();
                    throw err;
                } else {
                    // console.log('se conecto a la base de datos');
                    var request = new sql.Request(connection); // or: var request = connection.request();
                    //para ver si funciona el store descomentar la linea siguiente
                    request.verbose = true;
                    request.input('regID', sql.NVarChar(40), Receta.RegID);
                    request.input('idReceta', sql.Numeric(18, 0), Receta.idRecetaFLV);
                    request.input('estadoEvento', sql.Int, Receta.idEstado);
                    request.input('descripEstado', sql.NVarChar(200), Receta.Estado);
                    if (Receta.fecha_c.getFullYear() == 1969) {
                        request.input('fe_camoyte', sql.NVarChar, '');

                    } else {

                        request.input('fe_camoyte', sql.NVarChar, Receta.fecha_c.getFullYear().toString() + suma(Receta.fecha_c.getMonth() + 1) + suma(Receta.fecha_c.getDate()));

                    }

                    request.output('exito', sql.Int);
                    request.execute('actualizaEstadosRecetasVerificandoDocuAfil', function(err, recordsets, returnValue) {
                        if (err) {
                            connection.close();
                            callback(err, null);
                        } else {
                            //IMPORTANTE SELECCIONAR EL PRIMER ELEMNETO DEL ARRAY RECORDSET!!!
                            console.log('resultado de la consulta verificando docu afiliados:' + returnValue);
                            connection.close();
                            callback(null, recordsets[0]);
                        }

                    });

                }
            });
            break;
        case '15': //en tramite apross
            Receta = {
                RegID: DatosReceta.Table.RegID,
                idRecetaFLV: DatosReceta.Table.idRecetaFLV,
                idEstado: DatosReceta.Table.idEstado.toString(),
                Estado: DatosReceta.Table.Estado.toString(),
                fecha_c: fecha_c
            };
            connection = new sql.Connection(config.conexion, function(err) {
                // ... err checks
                if (err) {
                    //console.log('no se pudo concectar' + err);
                    connection.close();
                    throw err;
                } else {
                    // console.log('se conecto a la base de datos');
                    var request = new sql.Request(connection); // or: var request = connection.request();
                    //para ver si funciona el store descomentar la linea siguiente
                    request.verbose = true;
                    request.input('regID', sql.NVarChar(40), Receta.RegID);
                    request.input('idReceta', sql.Numeric(18, 0), Receta.idRecetaFLV);
                    request.input('estadoEvento', sql.Int, Receta.idEstado);
                    request.input('descripEstado', sql.NVarChar(200), Receta.Estado);
                    if (Receta.fecha_c.getFullYear() == 1969) {
                        request.input('fe_camoyte', sql.NVarChar, '');

                    } else {

                        request.input('fe_camoyte', sql.NVarChar, Receta.fecha_c.getFullYear().toString() + suma(Receta.fecha_c.getMonth() + 1) + suma(Receta.fecha_c.getDate()));

                    }
                    request.output('exito', sql.Int);
                    request.execute('actualizaEstadosRecetasEnTramiteApross', function(err, recordsets, returnValue) {
                        if (err) {
                            connection.close();
                            callback(err, null);
                        } else {
                            //IMPORTANTE SELECCIONAR EL PRIMER ELEMNETO DEL ARRAY RECORDSET!!!
                            console.log('resultado de la consulta tramite apross:' + returnValue);
                            connection.close();
                            callback(null, recordsets[0]);
                        }

                    });

                }
            });

            break;
        default:
            // console.log('este estado no esta contemplado:' + DatosReceta.Table.idEstado);
            callback({
                error: 'Estado receta inexistente en farmalive'
            }, null);

    }




};


recetaModelo.verEstadoAcesUnaReceta = function(idReceta, callback) {
    //Modulo requerido para mapear el werbservices de aces
    var soap = require('soap');

    var f = new Date();
    console.log('Entro en metodo WS Aces'.info);

    fs.appendFile('./logs/log.txt', 'FECHA:' + f.getDate() + "/" + (f.getMonth() + 1) + "/" + f.getFullYear() + ' ' + f.getHours() + ': ' + f.getMinutes() + ': ' + f.getMilliseconds() + 'entro al metodo aces \r', function(err) {
        if (err) {
            console.log(err);
        } else {
            console.log('Se ha escrito correctamente el log'.info);
        }
    });


    soap.createClient(url, function(err, client) {
        //metodo para ver el estado actual de una receta en particular
        console.log('Creo cliente'.info);
        if (!err) {
            var receta = {};

            receta.Usuario = config.AceUsuario;
            receta.Clave = config.AceClave;
            receta.IdRecetaFLV = idReceta;
            //console.log(receta);
            client.ObtenerEstadoTramite(receta, function(err, result) {
                // console.log(result.ObtenerEstadoTramiteResult);
                if (!err) {

                    //callback(null, result.ObtenerEstadoTramiteResult.diffgram.NewDataSet);
                    callback(null, result.ObtenerEstadoTramiteResult.diffgram.NewDataSet);


                } else {
                    var f = new Date();
                    fs.appendFile('./logs/log.txt', 'FECHA:' + f.getDate() + "/" + (f.getMonth() + 1) + "/" + f.getFullYear() + ' ' + f.getHours() + ': ' + f.getMinutes() + ': ' + f.getMilliseconds() + ' error al tratar de Conectar \r', function(err) {
                        if (err) {
                            console.log(err);
                        } else {
                            console.log('Se ha escrito correctamente el log'.info);
                        }
                    });
                    //console.log('salio con error de ws aces');
                    callback(err, null);


                }

            });

            //cierra el if err del soap
        } else {
            var f = new Date();
            /*
            fs.writeFile('./log.txt', 'FECHA:' + f.getDate() + "/" + (f.getMonth() + 1) + "/" + f.getFullYear() + ' ' + f.getHours() + ': ' + f.getMinutes() + ': ' + f.getMilliseconds() + ' error al tratar de Conectar ', function(err) {
                if (err) {
                    console.log(err);
                } else {
                    console.log('Se ha escrito correctamente');
                }
            });*/


            fs.appendFile('./logs/log.txt', 'FECHA:' + f.getDate() + "/" + (f.getMonth() + 1) + "/" + f.getFullYear() + ' ' + f.getHours() + ': ' + f.getMinutes() + ': ' + f.getMilliseconds() + ' error al tratar de Conectar \r', function(err) {
                if (err) {
                    console.log(err);
                } else {
                    console.log('Se ha escrito correctamente el log'.info);
                }
            });



            console.log(err);

            return callback(err, null);

        }
    });

};

//metodo para usar el metodo de aces de las recetas que cambian

recetaModelo.verCambiosEstadosRecetas = function(callback) {
    //Modulo requerido para mapear el werbservices de aces
    var soap = require('soap');

    var f = new Date();
    console.log('entro en metodo ws ases');

    fs.appendFile('./logs/log.txt', 'FECHA:' + f.getDate() + "/" + (f.getMonth() + 1) + "/" + f.getFullYear() + ' ' + f.getHours() + ': ' + f.getMinutes() + ': ' + f.getMilliseconds() + 'entro al metodo aces \r', function(err) {
        if (err) {
            console.log(err);
        } else {
            console.log('Se ha escrito correctamente el log');
        }
    });


    soap.createClient(url, function(err, client) {
        //metodo para ver el estado actual de una receta en particular
        console.log('creo cliente');
        if (!err) {
            var receta = {};

            receta.Usuario = config.AceUsuario;
            receta.Clave = config.AceClave;
            receta.IdRecetaFLV = idReceta;

            //console.log(receta);
            //cambiar nombre de metodo
            client.ObtenerEstadoTramite(receta, function(err, result) {
                //console.log(receta);
                if (!err) {

                    //ver el resultado que trae los idrecetas
                    callback(null, result.ObtenerEstadoTramiteResult.diffgram.NewDataSet);


                } else {
                    var f = new Date();
                    fs.appendFile('./logs/log.txt', 'FECHA:' + f.getDate() + "/" + (f.getMonth() + 1) + "/" + f.getFullYear() + ' ' + f.getHours() + ': ' + f.getMinutes() + ': ' + f.getMilliseconds() + ' error al tratar de Conectar \r', function(err) {
                        if (err) {
                            console.log(err);
                        } else {
                            console.log('Se ha escrito correctamente el log');
                        }
                    });
                    //console.log('salio con error de ws aces');
                    callback(err, null);


                }

            });

            //cierra el if err del soap
        } else {
            var f = new Date();
            fs.appendFile('./logs/log.txt', 'FECHA:' + f.getDate() + "/" + (f.getMonth() + 1) + "/" + f.getFullYear() + ' ' + f.getHours() + ': ' + f.getMinutes() + ': ' + f.getMilliseconds() + ' error al tratar de Conectar \r', function(err) {
                if (err) {
                    console.log(err);
                } else {
                    console.log('Se ha escrito correctamente el log');
                }
            });
            console.log(err);
        }
    });

};


//NUEVO METODO DE RECETAS MODIFICADAS



recetaModelo.recetasModificadas = function(callback) {
    //Modulo requerido para mapear el werbservices de aces
    var soap = require('soap');

    var f = new Date();
    console.log('entro en metodo ws ases');
    /*
    fs.appendFile('./log.txt', 'FECHA:' + f.getDate() + "/" + (f.getMonth() + 1) + "/" + f.getFullYear() + ' ' + f.getHours() + ': ' + f.getMinutes() + ': ' + f.getMilliseconds() + 'entro al metodo aces \r', function(err) {
        if (err) {
            console.log(err);
        } else {
            console.log('Se ha escrito correctamente el log');
        }
    });
    */
    //empieza metodo que trae las recetas que se han cambiado





    soap.createClient(url, function(err, client) {
        //metodo para ver recetas cambiadas
        console.log('creo cliente');
        if (!err) {
            var receta = {};
            receta.Usuario = config.AceUsuario;
            receta.Clave = config.AceClave;

            //console.log(receta);  


            client.ObtenerRecetasAConsultar(function(err, result) {
                // console.log(result.ObtenerEstadoTramiteResult);
                if (!err) {

                    var f = new Date();
                    fs.appendFile('./log2.txt', 'FECHA:' + f.getDate() + "/" + (f.getMonth() + 1) + "/" + f.getFullYear() + ' ' + f.getHours() + ': ' + f.getMinutes() + ': ' + f.getMilliseconds() + JSON.stringify(result), function(err) {
                        if (err) {
                            console.log(err);
                        } else {
                            console.log('Se ha escrito correctamente el log');
                        }
                    });

                    //console.log(_.uniq(result.ObtenerRecetasAConsultarResult.diffgram.RecetasaConsultar));
                    var recetas;
                    recetas = _.reduce(result.ObtenerRecetasAConsultarResult.diffgram, function(lista, receta) {
                        console.log(receta);
                        return lista + ' - ' + receta;
                    }, 0);
                    console.log(recetas);
                    callback(null, result.ObtenerRecetasAConsultarResult.diffgram);


                } else {
                    var f2 = new Date();
                    fs.appendFile('./logs/log2.txt', 'FECHA:' + f2.getDate() + "/" + (f2.getMonth() + 1) + "/" + f2.getFullYear() + ' ' + f2.getHours() + ': ' + f2.getMinutes() + ': ' + f2.getMilliseconds() + ' error metodo \r', function(err) {
                        if (err) {
                            console.log(err);
                        } else {
                            console.log('Se ha escrito correctamente el log');
                        }
                    });
                    //console.log('salio con error de ws aces');
                    callback(err, null);


                }

            });

            //cierra el if err del soap
        } else {
            var f = new Date();

            fs.appendFile('./logs/log2.txt', 'FECHA:' + f.getDate() + "/" + (f.getMonth() + 1) + "/" + f.getFullYear() + ' ' + f.getHours() + ': ' + f.getMinutes() + ': ' + f.getMilliseconds() + ' error al tratar de Conectar  \r', function(err) {
                if (err) {
                    console.log(err);
                } else {
                    console.log('Se ha escrito correctamente el log');
                }
            });

            console.log(err);
        }
    });
    //fin metodo recetas cambiadas






    /* CUANDO GUARDE LAS RECETAS MODIFICADAS EMPIEZO A PROCESARLAS
    soap.createClient(url, function(err, client) {
        //metodo para ver el estado actual de una receta en particular
        console.log('creo cliente');
        if (!err) {
            var receta = {};
             receta.Usuario = config.AceUsuario;
            receta.Clave = config.AceClave;
            receta.IdRecetaFLV = DatosRecetas.idReceta;
            receta.IdRecetaFLV = idReceta;
            //console.log(receta);
            client.ObtenerEstadoTramite(receta, function(err, result) {
                // console.log(result.ObtenerEstadoTramiteResult);
                if (!err) {

                    //callback(null, result.ObtenerEstadoTramiteResult.diffgram.NewDataSet);
                    callback(null, result.ObtenerEstadoTramiteResult.diffgram.NewDataSet);


                } else {
                    var f = new Date();
                    fs.appendFile('./log.txt', 'FECHA:' + f.getDate() + "/" + (f.getMonth() + 1) + "/" + f.getFullYear() + ' ' + f.getHours() + ': ' + f.getMinutes() + ': ' + f.getMilliseconds() + ' error al tratar de Conectar \r', function(err) {
                        if (err) {
                            console.log(err);
                        } else {
                            console.log('Se ha escrito correctamente el log');
                        }
                    });
                    //console.log('salio con error de ws aces');
                    callback(err, null);


                }

            });

            //cierra el if err del soap
        } else {
            var f = new Date();

            fs.appendFile('./log.txt', 'FECHA:' + f.getDate() + "/" + (f.getMonth() + 1) + "/" + f.getFullYear() + ' ' + f.getHours() + ': ' + f.getMinutes() + ': ' + f.getMilliseconds() + ' error al tratar de Conectar \r', function(err) {
                if (err) {
                    console.log(err);
                } else {
                    console.log('Se ha escrito correctamente el log');
                }
            });

            console.log(err);
        }
    });*/

};

//Obtiene una lista de las recetas a Comaprar
recetaModelo.getRecetasPendientesByFamacia = function(idFarmacia, callback) {
    //console.log(idFarmacia);
    var connection = new sql.Connection(config.conexion, function(err) {
        // ... err checks
        if (err) {
            //console.log('no se pudo concectar' + err);
            connection.close();
            throw err;
        } else {
            // console.log('se conecto a la base de datos');
            var request = new sql.Request(connection); // or: var request = connection.request();
            //para ver si funciona el store descomentar la linea siguiente
            request.verbose = true;
            //request.input('tipo', sql.Char(2), tipo);
            request.input('idFarmacia', sql.Char(14), idFarmacia);

            //ATENCION QUE ESTA COMENTADO EN EL STORE QUE LA FECHA ESTE DENTRO DE LOS 90 DIAS!!!

            request.execute('SP_getRecetasPendientesbyFarmacia', function(err, recordsets, returnValue) {
                if (err) {
                    connection.close();
                    callback(err, null);
                } else {
                    //IMPORTANTE SELECCIONAR EL PRIMER ELEMNETO DEL ARRAY RECORDSET!!!

                    /* _.each(recordsets[0], function(recetaFLV, n) {
                        actRecetas.verEstadoAces(recetaFLV, function(err, recetaAces) {
                            if (!err) {

                                if (recetaAces.Table.RegID == recetaFLV.regid) {
                                    contar_sinprocesar();
                                    // console.log('**********************ESTADOS**************************************');
                                    // console.log('estado igual no se procesa');
                                    //  console.log('CODIGO FLV:' + recetaFLV.regid);
                                    //  console.log('CODIGO ACES:' + recetaAces.Table.RegID);
                                    //  console.log('**********************CAMPOS DE LA RECETA ACES*******************************');
                                    //  console.log('***********************FIN RECETA ACES***********************');
                                } else {
                                    //SI CAMBIO EL REG ID DEBO PROCESAR LA RECETA Y ACTUALIZAR EL ESTADO EN FLV
                                    contar_Procesadas();
                                    console.log('El Estado CAMBIO se procesara');
                                    console.log('CODIGO FLV:' + recetaFLV.regid);
                                    console.log('CODIGO ACES:' + recetaAces.Table.RegID);

                                    actRecetas.procesaEstado(recetaAces, function(err) {
                                        if (!err) {

                                            console.log('se proceso OK RECETA:' + recetaAces.Table.idRecetaFLV);
                                        } else {
                                            console.log('algo ha fallado RECETA: ' + recetaAces.Table.idRecetaFLV);
                                        }

                                    }); //fin procesa estado

                                }
                            } //fin err verEstados

                        }); //fin ver estados
                    });*/

                    //console.log(recordsets[0]);
                    connection.close();
                    callback(null, recordsets[0]);
                }

            });

        }
    });

};



//importante para poder usar los metodos es obligatorio exportarlo
module.exports = recetaModelo;