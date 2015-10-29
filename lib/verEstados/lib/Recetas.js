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
            throw err;
        } else {
            // console.log('se conecto a la base de datos');
            var request = new sql.Request(connection); // or: var request = connection.request();
            //para ver si funciona el store descomentar la linea siguiente
            //request.verbose = true;
            //request.input('tipo', sql.Char(2), tipo);
            request.query('select  [dbo].[getIdReceta] (' + NroReceta + ') as IdReceta', function(err, recordset) {
                if (err) {
                    callback(err, null);
                } else {
                    //IMPORTANTE SELECCIONAR EL PRIMER ELEMNETO DEL ARRAY RECORDSET!!!
                    //console.log(recordset[0]);
                    callback(null, recordset[0]);
                }

            });

        }
    });

};
//fin obtenet idreceta

//obtiene datos de una receta para actualizarla lleva un parametro
recetaModelo.getReceta = function(idReceta, callback) {
    console.log(idReceta);
    var connection = new sql.Connection(config.conexion, function(err) {
        // ... err checks
        if (err) {
            //console.log('no se pudo concectar' + err);
            throw err;
        } else {
            // console.log('se conecto a la base de datos');
            var request = new sql.Request(connection); // or: var request = connection.request();
            //para ver si funciona el store descomentar la linea siguiente
            //request.verbose = true;
            //request.input('tipo', sql.Char(2), tipo);
            request.input('idReceta', sql.Numeric(18, 0), idReceta);
            request.execute('getReceta', function(err, recordsets, returnValue) {
                if (err) {
                    callback(err, null);
                } else {
                    //IMPORTANTE SELECCIONAR EL PRIMER ELEMNETO DEL ARRAY RECORDSET!!!
                    //console.log(recordsets[0]);
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
                    callback(err, null);
                } else {
                    //IMPORTANTE SELECCIONAR EL PRIMER ELEMNETO DEL ARRAY RECORDSET!!!
                    fs.appendFileSync('/log/logRecetas.txt', 'Cantidad de observadas que se procesaran: ' + _.size(recordsets[0]) + ' \r'); //, function(err) {

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
                    callback(err, null);
                } else {
                    //IMPORTANTE SELECCIONAR EL PRIMER ELEMNETO DEL ARRAY RECORDSET!!!
                    fs.appendFileSync('/logs/logRecetas.txt', 'Cantidad de Autorizadas que se procesaran: ' + _.size(recordsets[0]) + ' \r'); //, function(err) {
                    console.log(recordsets[0]);
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
                    callback(null, recordsets[0]);
                }

            });

        }
    });

};

recetaModelo.verEstadoAces = function(DatosRecetas, callback) {
    //Modulo requerido para mapear el werbservices de aces
    var soap = require('soap');


    //console.log('entro en metodo ws ases');

    soap.createClient(url, function(err, client) {

        if (!err) {
            var receta = {};
            receta.Usuario = config.AceUsuario;
            receta.Clave = config.AceClave;
            receta.IdRecetaFLV = DatosRecetas.idReceta;
            console.log(client);

            client.ObtenerEstadoTramite(receta, function(err, result) {
                console.log(receta);
                if (!err) {
                    //console.log('*************' + i.idReceta + '*********************');
                    //console.log(result.ObtenerEstadoTramiteResult.diffgram.NewDataSet);
                    var RecetaEstados = {};
                    var regWS;
                    //  console.log(_.isUndefined(result.ObtenerEstadoTramiteResult.diffgram.NewDataSet));
                    //console.log(result.ObtenerEstadoTramiteResult);
                    if (!_.isUndefined(result.ObtenerEstadoTramiteResult.diffgram.NewDataSet)) {
                        // if (_.has(result.ObtenerEstadoTramiteResult.diffgram.NewDataSet, 'Table')) {
                        //console.log('keys del objeto' + _.keys(result.ObtenerEstadoTramiteResult.diffgram.NewDataSet));

                        //aca genero la receta que va a salir como callback
                        RecetaEstados['idReceta'] = result.ObtenerEstadoTramiteResult.diffgram.NewDataSet.Table.idRecetaFLV;
                        RecetaEstados['regID'] = DatosRecetas.regid;
                        regWS = result.ObtenerEstadoTramiteResult.diffgram.NewDataSet.Table.RegID;
                        RecetaEstados['wsRegId'] = regWS;
                        //console.log('este es la resp ws:' + result);
                        callback(null, result.ObtenerEstadoTramiteResult.diffgram.NewDataSet);
                        //EstadoRecetas.push(JSON.stringify(RecetaEstados));
                        //console.log('RecetaEstados:' + EstadoRecetas);
                        //console.log('**************************************************');

                    }
                    /* else {
                        console.log('****************************************************************************');
                        console.log('no esta propiedades el objeto: ' + _.keys(result.ObtenerEstadoTramiteResult.schema.element.attributes));
                        console.log('no esta valores el objeto: ' + _.values(result.ObtenerEstadoTramiteResult.schema.element.attributes));
                        console.log('****************************************************************************');



                    }*/


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
    cant_obs = 0;
    //si existe la table2 esta observada
    if (_.has(DatosReceta, 'Table2')) {
        if (_.isArray(DatosReceta.Table2)) {
            s_Obs = _.reduce(_.pluck(DatosReceta.Table2, 'DescObservacion'), function(memo, obs) {
                cant_obs++;
                return memo + ' - ' + obs;
            }, 1);

        } else {
            s_Obs = DatosReceta.Table2.DescObservacion;
            cant_obs = 1;
        }

    } else {
        s_Obs = '';

    }

    var s_notas;
    var cant_notas;
    cant_notas = 0;
    //si existe la table1 tiene nota
    if (_.has(DatosReceta, 'Table1')) {
        if (_.isArray(DatosReceta.Table1)) {
            s_notas = _.reduce(_.pluck(DatosReceta.Table1, 'Nota'), function(memo, nota) {
                cant_notas++;
                return memo + ' - ' + nota;
            }, 1);

        } else {
            //esto no es un array
            s_notas = DatosReceta.Table1.Nota;
            cant_notas = 1;

        }


    } else {
        s_notas = '';
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
        if (_.isArray(DatosReceta.Table4)) {
            cantiMed = 2;
            _.each(DatosReceta.Table4, function(item, itera) {
                productos['RP' + (itera + 1)] = item.idProducto;
                productos['cantidad' + (itera + 1)] = item.Cantidad;

            });

        } else {
            cantiMed = 1;
            productos['RP1'] = DatosReceta.Table4.idProducto;
            productos['cantidad1'] = DatosReceta.Table4.Cantidad;

        }


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


    switch (DatosReceta.Table.idEstado) {
        case '1': //validadas pendientes de autorizacion (buzon)

            connection = new sql.Connection(config.conexion, function(err) {
                // ... err checks
                if (err) {
                    //console.log('no se pudo concectar' + err);
                    throw err;
                } else {
                    // console.log('se conecto a la base de datos');
                    var request = new sql.Request(connection); // or: var request = connection.request();
                    //para ver si funciona el store descomentar la linea siguiente
                    request.verbose = true;
                    //cargo el convenio de la re
                    //request.input('convenio', sql.Int, DatosReceta.Table.idConvenioFLV);
                    //request.input('drogueria', sql.Int, iddrogueria.toString());
                    //request.input('codAutorizacion', sql.Char(20), DatosReceta.Table.CodAp);
                    request.input('regID', sql.NVarChar(40), DatosReceta.Table.RegID);
                    request.input('idReceta', sql.Numeric(18, 0), DatosReceta.Table.idRecetaFLV);

                    /*if (fecha_dg.getFullYear() == 1969) {
                        request.input('feDrogueria', sql.NVarChar, '');

                    } else {
                        request.input('feDrogueria', sql.NVarChar, fecha_dg.getFullYear().toString() + suma(fecha_dg.getMonth() + 1) + suma(fecha_dg.getDate()));


                    }*/

                    request.input('estadoEvento', sql.Int, DatosReceta.Table.idEstado.toString());
                    request.input('descripEstado', sql.NVarChar(200), DatosReceta.Table.Estado.toString());

                    //concatenar las notas porque pueden ser varias en una receta
                    //request.input('nota', sql.NVarChar(400), s_notas);

                    //request.input('remito', sql.NVarChar(20), remito);

                    /*if (fecha_r.getFullYear() == 1969) {
                        request.input('fe_remito', sql.NVarChar, '');

                    } else {
                        request.input('fe_remito', sql.NVarChar, fecha_r.getFullYear().toString() + suma(fecha_r.getMonth() + 1) + suma(fecha_r.getDate()));


                    }*/

                    if (fecha_c.getFullYear() == 1969) {
                        request.input('fe_camoyte', sql.NVarChar, '');

                    } else {

                        request.input('fe_camoyte', sql.NVarChar, fecha_c.getFullYear().toString() + suma(fecha_c.getMonth() + 1) + suma(fecha_c.getDate()));

                    }
                    //request.input('descObservacion', sql.NVarChar(400), s_Obs);
                    request.output('exito', sql.Int);
                    request.execute('actualizaEstadosRecetasValidadaBuzon', function(err, recordsets, returnValue) {
                        if (err) {
                            callback(err, null);
                        } else {
                            //IMPORTANTE SELECCIONAR EL PRIMER ELEMNETO DEL ARRAY RECORDSET!!!
                            console.log('resultado de la consulta validada buzon:' + returnValue);
                            callback(null, recordsets[0]);
                        }

                    });

                }
            });

            break;
        case '2'://Validada con error
            
            connection = new sql.Connection(config.conexion, function(err) {
                // ... err checks
                if (err) {
                    //console.log('no se pudo concectar' + err);
                    throw err;
                } else {
                    // console.log('se conecto a la base de datos');
                    var request = new sql.Request(connection); // or: var request = connection.request();
                    //para ver si funciona el store descomentar la linea siguiente
                    request.verbose = true;
                    //cargo el convenio de la re
                    //request.input('convenio', sql.Int, DatosReceta.Table.idConvenioFLV);
                    //request.input('drogueria', sql.Int, iddrogueria.toString());
                    //request.input('codAutorizacion', sql.Char(20), DatosReceta.Table.CodAp);
                    request.input('regID', sql.NVarChar(40), DatosReceta.Table.RegID);
                    request.input('idReceta', sql.Numeric(18, 0), DatosReceta.Table.idRecetaFLV);
                    request.input('error', sql.NVarChar(150), DatosReceta.Table3.Error);

                    /*if (fecha_dg.getFullYear() == 1969) {
                        request.input('feDrogueria', sql.NVarChar, '');

                    } else {
                        request.input('feDrogueria', sql.NVarChar, fecha_dg.getFullYear().toString() + suma(fecha_dg.getMonth() + 1) + suma(fecha_dg.getDate()));


                    }*/

                    request.input('estadoEvento', sql.Int, DatosReceta.Table.idEstado.toString());
                    //request.input('descripEstado', sql.NVarChar(40), DatosReceta.Table.Estado.toString());

                    //concatenar las notas porque pueden ser varias en una receta
                    //request.input('nota', sql.NVarChar(400), s_notas);

                    //request.input('remito', sql.NVarChar(20), remito);

                    /*if (fecha_r.getFullYear() == 1969) {
                        request.input('fe_remito', sql.NVarChar, '');

                    } else {
                        request.input('fe_remito', sql.NVarChar, fecha_r.getFullYear().toString() + suma(fecha_r.getMonth() + 1) + suma(fecha_r.getDate()));


                    }*/

                    if (fecha_c.getFullYear() == 1969) {
                        request.input('fe_camoyte', sql.NVarChar, '');

                    } else {

                        request.input('fe_camoyte', sql.NVarChar, fecha_c.getFullYear().toString() + suma(fecha_c.getMonth() + 1) + suma(fecha_c.getDate()));

                    }
                    //request.input('descObservacion', sql.NVarChar(400), s_Obs);
                    request.output('exito', sql.Int);
                    request.execute('actualizaEstadosRecetasValidadaError', function(err, recordsets, returnValue) {
                        if (err) {
                            callback(err, null);
                        } else {
                            //IMPORTANTE SELECCIONAR EL PRIMER ELEMNETO DEL ARRAY RECORDSET!!!
                            console.log('resultado de la consulta validada con error :' + returnValue);
                            callback(null, recordsets[0]);
                        }

                    });

                }
            });



            break;
        case '3'://Receta previamente procesada por CAMOYTE
            
            connection = new sql.Connection(config.conexion, function(err) {
                // ... err checks
                if (err) {
                    //console.log('no se pudo concectar' + err);
                    throw err;
                } else {
                    // console.log('se conecto a la base de datos');
                    var request = new sql.Request(connection); // or: var request = connection.request();
                    //para ver si funciona el store descomentar la linea siguiente
                    request.verbose = true;
                    //cargo el convenio de la re
                    //request.input('convenio', sql.Int, DatosReceta.Table.idConvenioFLV);
                    //request.input('drogueria', sql.Int, iddrogueria.toString());
                    //request.input('codAutorizacion', sql.Char(20), DatosReceta.Table.CodAp);
                    request.input('regID', sql.NVarChar(40), DatosReceta.Table.RegID);
                    request.input('idReceta', sql.Numeric(18, 0), DatosReceta.Table.idRecetaFLV);
                    //request.input('error', sql.NVarChar(150), DatosReceta.Table3.Error);

                    /*if (fecha_dg.getFullYear() == 1969) {
                        request.input('feDrogueria', sql.NVarChar, '');

                    } else {
                        request.input('feDrogueria', sql.NVarChar, fecha_dg.getFullYear().toString() + suma(fecha_dg.getMonth() + 1) + suma(fecha_dg.getDate()));


                    }*/

                    request.input('estadoEvento', sql.Int, DatosReceta.Table.idEstado.toString());
                    request.input('descripEstado', sql.NVarChar(200), DatosReceta.Table.Estado.toString());

                    //concatenar las notas porque pueden ser varias en una receta
                    //request.input('nota', sql.NVarChar(400), s_notas);

                    //request.input('remito', sql.NVarChar(20), remito);

                    /*if (fecha_r.getFullYear() == 1969) {
                        request.input('fe_remito', sql.NVarChar, '');

                    } else {
                        request.input('fe_remito', sql.NVarChar, fecha_r.getFullYear().toString() + suma(fecha_r.getMonth() + 1) + suma(fecha_r.getDate()));


                    }*/

                    if (fecha_c.getFullYear() == 1969) {
                        request.input('fe_camoyte', sql.NVarChar, '');

                    } else {

                        request.input('fe_camoyte', sql.NVarChar, fecha_c.getFullYear().toString() + suma(fecha_c.getMonth() + 1) + suma(fecha_c.getDate()));

                    }
                    //request.input('descObservacion', sql.NVarChar(400), s_Obs);
                    request.output('exito', sql.Int);
                    request.execute('actualizaEstadosRecetasProcesadaPrevCamoyte', function(err, recordsets, returnValue) {
                        if (err) {
                            callback(err, null);
                        } else {
                            //IMPORTANTE SELECCIONAR EL PRIMER ELEMNETO DEL ARRAY RECORDSET!!!
                            console.log('resultado de la consulta procesada prev camoyte :' + returnValue);
                            callback(null, recordsets[0]);
                        }

                    });

                }
            });






            break;
        case '4': //SI LA RECETA FUE APROBADA
            /*console.log('es fecha' + _.isDate(fecha_c) + ' fecha: ' + fecha_c.getYear() + fecha_c.getMonth() + fecha_c.getDay());
            console.log('fechaCamoyte: ' + fechaCamoyte);
            console.log('fecha com drogueria: ' + feComunicaconDrog);
            console.log('Remito: ' + remito);
            console.log('fecha Remito: ' + feremito);
            console.log('codap: ' + codap);
            console.log('iddrogueria: ' + iddrogueria);*/
            //llama al store de aprobadas para actualizar el estado de las recetas
            connection = new sql.Connection(config.conexion, function(err) {
                // ... err checks
                if (err) {
                    //console.log('no se pudo concectar' + err);
                    throw err;
                } else {
                    // console.log('se conecto a la base de datos');
                    var request = new sql.Request(connection); // or: var request = connection.request();
                    //para ver si funciona el store descomentar la linea siguiente
                    request.verbose = true;
                    //cargo el convenio de la re
                    request.input('convenio', sql.Int, DatosReceta.Table.idConvenioFLV);
                    request.input('drogueria', sql.Int, iddrogueria);
                    request.input('codAutorizacion', sql.Char(20), codap);
                    request.input('regId', sql.NVarChar(40), DatosReceta.Table.RegID);
                    request.input('idReceta', sql.Numeric(18, 0), DatosReceta.Table.idRecetaFLV);

                    if (fecha_dg.getFullYear() == 1969) {
                        request.input('feDrogueria', sql.NVarChar, '');

                    } else {
                        request.input('feDrogueria', sql.NVarChar, fecha_dg.getFullYear().toString() + suma(fecha_dg.getMonth() + 1) + suma(fecha_dg.getDate()));


                    }

                    request.input('estadoEvento', sql.Int, DatosReceta.Table.idEstado.toString());

                    //concatenar las notas porque pueden ser varias en una receta
                    request.input('nota', sql.NVarChar(400), s_notas);

                    request.input('remito', sql.NVarChar(20), remito);

                    if (fecha_r.getFullYear() == 1969) {
                        request.input('fe_remito', sql.NVarChar, '');

                    } else {
                        request.input('fe_remito', sql.NVarChar, fecha_r.getFullYear().toString() + suma(fecha_r.getMonth() + 1) + suma(fecha_r.getDate()));


                    }

                    if (fecha_c.getFullYear() == 1969) {
                        request.input('fe_camoyte', sql.NVarChar, '');

                    } else {

                        request.input('fe_camoyte', sql.NVarChar, fecha_c.getFullYear().toString() + suma(fecha_c.getMonth() + 1) + suma(fecha_c.getDate()));

                    }
                    request.input('descObservacion', sql.NVarChar(400), s_Obs);
                    request.output('exito', sql.Int);
                    request.input('cantMed', sql.Int, cantiMed);
                    request.input('idPresen1', sql.Int, productos.RP1);
                    request.input('cant1', sql.Int, productos.cantidad1);
                    request.input('idPresen2', sql.Int, productos.RP2);
                    request.input('cant2', sql.Int, productos.cantidad2);
                    request.execute('actualizaEstadosRecetasAprobadas', function(err, recordsets, returnValue) {
                        if (err) {
                            callback(err, null);
                        } else {
                            //IMPORTANTE SELECCIONAR EL PRIMER ELEMNETO DEL ARRAY RECORDSET!!!
                            console.log('resultado de la consulta actualizaEstadosRecetasAprobadas :' + returnValue);
                            callback(null, recordsets[0]);
                        }

                    });

                }
            });




            //fin de recetas aprobadas
            break;
        case '5': //inicio de recetas observadas
            console.log('entro en el estado observadas');
            // var fecha_c = new Date(fechaCamoyte);

            connection = new sql.Connection(config.conexion, function(err) {
                // ... err checks
                if (err) {
                    //console.log('no se pudo concectar' + err);
                    throw err;
                } else {
                    // console.log('se conecto a la base de datos');
                    var request = new sql.Request(connection); // or: var request = connection.request();
                    //para ver si funciona el store descomentar la linea siguiente
                    request.verbose = true;
                    //cargo el convenio de la re
                    request.input('convenio', sql.Int, DatosReceta.Table.idConvenioFLV);
                    //request.input('drogueria', sql.Int, iddrogueria.toString());
                    //request.input('codAutorizacion', sql.Char(20), DatosReceta.Table.CodAp);
                    request.input('regId', sql.NVarChar(40), DatosReceta.Table.RegID);
                    request.input('idReceta', sql.Numeric(18, 0), DatosReceta.Table.idRecetaFLV);
                    request.input('estadoEvento', sql.Int, DatosReceta.Table.idEstado.toString());
                    request.input('codrechazo', sql.Int, idrechazo);
                    request.input('descripcionRechazo', sql.NVarChar(400), descrip);
                    request.input('codObservacion', sql.Int, id_observacion);
                    request.input('descObservacion', sql.NVarChar(400), descrip);
                    //concatenar las notas porque pueden ser varias en una receta
                    request.input('notas', sql.NVarChar(400), s_notas.toString());
                    request.input('Observaciones', sql.NVarChar(400), s_Obs);

                    //fecha de camoyte
                    if (fecha_c.getFullYear() == 1969) {
                        request.input('fe_camoyte', sql.NVarChar, '');

                    } else {

                        request.input('fe_camoyte', sql.NVarChar, fecha_c.getFullYear().toString() + suma(fecha_c.getMonth() + 1) + suma(fecha_c.getDate()));

                    }


                    request.input('CantNotas', sql.Int, cant_notas);
                    request.input('CantObserv', sql.Int, cant_obs);
                    request.input('DescripEstado', sql.NVarChar(200), DatosReceta.Table.Estado.toString());
                    request.output('exito', sql.Int);

                    request.execute('actualizaEstadosRecetasObservadas', function(err, recordsets, returnValue) {
                        if (err) {
                            callback(err, null);
                        } else {
                            //IMPORTANTE SELECCIONAR EL PRIMER ELEMNETO DEL ARRAY RECORDSET!!!
                            console.log('resultado de la consulta actualizaEstadosRecetasObservadas :' + returnValue);
                            callback(null, recordsets[0]);
                        }

                    });

                }
            });



            //fin de recetas observadas
            break;
        case '10'://Trámite inexistente
            

            connection = new sql.Connection(config.conexion, function(err) {
                // ... err checks
                if (err) {
                    //console.log('no se pudo concectar' + err);
                    throw err;
                } else {
                    // console.log('se conecto a la base de datos');
                    var request = new sql.Request(connection); // or: var request = connection.request();
                    //para ver si funciona el store descomentar la linea siguiente
                    request.verbose = true;
                    //cargo el convenio de la re
                    //request.input('convenio', sql.Int, DatosReceta.Table.idConvenioFLV);
                    //request.input('drogueria', sql.Int, iddrogueria.toString());
                    //request.input('codAutorizacion', sql.Char(20), DatosReceta.Table.CodAp);
                    request.input('regID', sql.NVarChar(40), DatosReceta.Table.RegID);
                    request.input('idReceta', sql.Numeric(18, 0), DatosReceta.Table.idRecetaFLV);
                    //request.input('error', sql.NVarChar(150), DatosReceta.Table3.Error);

                    /*if (fecha_dg.getFullYear() == 1969) {
                        request.input('feDrogueria', sql.NVarChar, '');

                    } else {
                        request.input('feDrogueria', sql.NVarChar, fecha_dg.getFullYear().toString() + suma(fecha_dg.getMonth() + 1) + suma(fecha_dg.getDate()));


                    }*/

                    request.input('estadoEvento', sql.Int, DatosReceta.Table.idEstado.toString());
                    request.input('descripEstado', sql.NVarChar(200), DatosReceta.Table.Estado.toString());

                    //concatenar las notas porque pueden ser varias en una receta
                    //request.input('nota', sql.NVarChar(400), s_notas);

                    //request.input('remito', sql.NVarChar(20), remito);

                    /*if (fecha_r.getFullYear() == 1969) {
                        request.input('fe_remito', sql.NVarChar, '');

                    } else {
                        request.input('fe_remito', sql.NVarChar, fecha_r.getFullYear().toString() + suma(fecha_r.getMonth() + 1) + suma(fecha_r.getDate()));


                    }*/

                    if (fecha_c.getFullYear() == 1969) {
                        request.input('fe_camoyte', sql.NVarChar, '');

                    } else {

                        request.input('fe_camoyte', sql.NVarChar, fecha_c.getFullYear().toString() + suma(fecha_c.getMonth() + 1) + suma(fecha_c.getDate()));

                    }
                    //request.input('descObservacion', sql.NVarChar(400), s_Obs);
                    request.output('exito', sql.Int);
                    request.execute('actualizaEstadosRecetasTramiteInexistente', function(err, recordsets, returnValue) {
                        if (err) {
                            callback(err, null);
                        } else {
                            //IMPORTANTE SELECCIONAR EL PRIMER ELEMNETO DEL ARRAY RECORDSET!!!
                            console.log('resultado de la consulta tramite inexistente :' + returnValue);
                            callback(null, recordsets[0]);
                        }

                    });

                }
            });

            break;
        case '11'://'Trámite pendiente de validación
            
            connection = new sql.Connection(config.conexion, function(err) {
                // ... err checks
                if (err) {
                    //console.log('no se pudo concectar' + err);
                    throw err;
                } else {
                    // console.log('se conecto a la base de datos');
                    var request = new sql.Request(connection); // or: var request = connection.request();
                    //para ver si funciona el store descomentar la linea siguiente
                    request.verbose = true;
                    //cargo el convenio de la re
                    //request.input('convenio', sql.Int, DatosReceta.Table.idConvenioFLV);
                    //request.input('drogueria', sql.Int, iddrogueria.toString());
                    //request.input('codAutorizacion', sql.Char(20), DatosReceta.Table.CodAp);
                    request.input('regID', sql.NVarChar(40), DatosReceta.Table.RegID);
                    request.input('idReceta', sql.Numeric(18, 0), DatosReceta.Table.idRecetaFLV);
                    //request.input('error', sql.NVarChar(150), DatosReceta.Table3.Error);

                    /*if (fecha_dg.getFullYear() == 1969) {
                        request.input('feDrogueria', sql.NVarChar, '');

                    } else {
                        request.input('feDrogueria', sql.NVarChar, fecha_dg.getFullYear().toString() + suma(fecha_dg.getMonth() + 1) + suma(fecha_dg.getDate()));


                    }*/

                    request.input('estadoEvento', sql.Int, DatosReceta.Table.idEstado.toString());
                    request.input('descripEstado', sql.NVarChar(200), DatosReceta.Table.Estado.toString());

                    //concatenar las notas porque pueden ser varias en una receta
                    //request.input('nota', sql.NVarChar(400), s_notas);

                    //request.input('remito', sql.NVarChar(20), remito);

                    /*if (fecha_r.getFullYear() == 1969) {
                        request.input('fe_remito', sql.NVarChar, '');

                    } else {
                        request.input('fe_remito', sql.NVarChar, fecha_r.getFullYear().toString() + suma(fecha_r.getMonth() + 1) + suma(fecha_r.getDate()));


                    }*/

                    if (fecha_c.getFullYear() == 1969) {
                        request.input('fe_camoyte', sql.NVarChar, '');

                    } else {

                        request.input('fe_camoyte', sql.NVarChar, fecha_c.getFullYear().toString() + suma(fecha_c.getMonth() + 1) + suma(fecha_c.getDate()));

                    }
                    //request.input('descObservacion', sql.NVarChar(400), s_Obs);
                    request.output('exito', sql.Int);
                    request.execute('actualizaEstadosRecetasPendienteValidacion', function(err, recordsets, returnValue) {
                        if (err) {
                            callback(err, null);
                        } else {
                            //IMPORTANTE SELECCIONAR EL PRIMER ELEMNETO DEL ARRAY RECORDSET!!!
                            console.log('resultado de la consulta pendiente de validacion :' + returnValue);
                            callback(null, recordsets[0]);
                        }

                    });

                }
            });


            break;
        case '12'://Receta anulada
            
            connection = new sql.Connection(config.conexion, function(err) {
                // ... err checks
                if (err) {
                    //console.log('no se pudo concectar' + err);
                    throw err;
                } else {
                    // console.log('se conecto a la base de datos');
                    var request = new sql.Request(connection); // or: var request = connection.request();
                    //para ver si funciona el store descomentar la linea siguiente
                    request.verbose = true;
                    //cargo el convenio de la re
                    //request.input('convenio', sql.Int, DatosReceta.Table.idConvenioFLV);
                    //request.input('drogueria', sql.Int, iddrogueria.toString());
                    //request.input('codAutorizacion', sql.Char(20), DatosReceta.Table.CodAp);
                    request.input('regID', sql.NVarChar(40), DatosReceta.Table.RegID);
                    request.input('idReceta', sql.Numeric(18, 0), DatosReceta.Table.idRecetaFLV);
                    //request.input('error', sql.NVarChar(150), DatosReceta.Table3.Error);

                    /*if (fecha_dg.getFullYear() == 1969) {
                        request.input('feDrogueria', sql.NVarChar, '');

                    } else {
                        request.input('feDrogueria', sql.NVarChar, fecha_dg.getFullYear().toString() + suma(fecha_dg.getMonth() + 1) + suma(fecha_dg.getDate()));


                    }*/

                    request.input('estadoEvento', sql.Int, DatosReceta.Table.idEstado.toString());
                    request.input('descripEstado', sql.NVarChar(200), DatosReceta.Table.Estado.toString());

                    //concatenar las notas porque pueden ser varias en una receta
                    //request.input('nota', sql.NVarChar(400), s_notas);

                    //request.input('remito', sql.NVarChar(20), remito);

                    /*if (fecha_r.getFullYear() == 1969) {
                        request.input('fe_remito', sql.NVarChar, '');

                    } else {
                        request.input('fe_remito', sql.NVarChar, fecha_r.getFullYear().toString() + suma(fecha_r.getMonth() + 1) + suma(fecha_r.getDate()));


                    }*/

                    if (fecha_c.getFullYear() == 1969) {
                        request.input('fe_camoyte', sql.NVarChar, '');

                    } else {

                        request.input('fe_camoyte', sql.NVarChar, fecha_c.getFullYear().toString() + suma(fecha_c.getMonth() + 1) + suma(fecha_c.getDate()));

                    }
                    //request.input('descObservacion', sql.NVarChar(400), s_Obs);
                    request.output('exito', sql.Int);
                    request.execute('actualizaEstadosRecetasAnulada', function(err, recordsets, returnValue) {
                        if (err) {
                            callback(err, null);
                        } else {
                            //IMPORTANTE SELECCIONAR EL PRIMER ELEMNETO DEL ARRAY RECORDSET!!!
                            console.log('resultado de la consulta anuladas:' + returnValue);
                            callback(null, recordsets[0]);
                        }

                    });

                }
            });

            break;
        case '13'://'Aprobada administrativamente
            
            connection = new sql.Connection(config.conexion, function(err) {
                // ... err checks
                if (err) {
                    //console.log('no se pudo concectar' + err);
                    throw err;
                } else {
                    // console.log('se conecto a la base de datos');
                    var request = new sql.Request(connection); // or: var request = connection.request();
                    //para ver si funciona el store descomentar la linea siguiente
                    request.verbose = true;
                    //cargo el convenio de la re
                    request.input('convenio', sql.Int, DatosReceta.Table.idConvenioFLV);
                    //request.input('drogueria', sql.Int, iddrogueria.toString());
                    //request.input('codAutorizacion', sql.Char(20), DatosReceta.Table.CodAp);
                    request.input('regID', sql.NVarChar(40), DatosReceta.Table.RegID);
                    request.input('idReceta', sql.Numeric(18, 0), DatosReceta.Table.idRecetaFLV);
                    //request.input('error', sql.NVarChar(150), DatosReceta.Table3.Error);

                    /*if (fecha_dg.getFullYear() == 1969) {
                        request.input('feDrogueria', sql.NVarChar, '');

                    } else {
                        request.input('feDrogueria', sql.NVarChar, fecha_dg.getFullYear().toString() + suma(fecha_dg.getMonth() + 1) + suma(fecha_dg.getDate()));


                    }*/

                    request.input('estadoEvento', sql.Int, DatosReceta.Table.idEstado.toString());
                    request.input('descripEstado', sql.NVarChar(200), DatosReceta.Table.Estado.toString());

                    //concatenar las notas porque pueden ser varias en una receta
                    request.input('notas', sql.NVarChar(400), s_notas);

                    //request.input('remito', sql.NVarChar(20), remito);

                    /*if (fecha_r.getFullYear() == 1969) {
                        request.input('fe_remito', sql.NVarChar, '');

                    } else {
                        request.input('fe_remito', sql.NVarChar, fecha_r.getFullYear().toString() + suma(fecha_r.getMonth() + 1) + suma(fecha_r.getDate()));


                    }*/

                    if (fecha_c.getFullYear() == 1969) {
                        request.input('fe_camoyte', sql.NVarChar, '');

                    } else {

                        request.input('fe_camoyte', sql.NVarChar, fecha_c.getFullYear().toString() + suma(fecha_c.getMonth() + 1) + suma(fecha_c.getDate()));

                    }
                    //request.input('descObservacion', sql.NVarChar(400), s_Obs);
                    request.output('exito', sql.Int);
                    request.execute('actualizaEstadosRecetasAprobadaAdm', function(err, recordsets, returnValue) {
                        if (err) {
                            callback(err, null);
                        } else {
                            //IMPORTANTE SELECCIONAR EL PRIMER ELEMNETO DEL ARRAY RECORDSET!!!
                            console.log('resultado de la consulta aprobadas admnistrativamente:' + returnValue);
                            callback(null, recordsets[0]);
                        }

                    });

                }
            });

            break;
        case '14'://En Tramite verificando documentacion afiliado
            
            connection = new sql.Connection(config.conexion, function(err) {
                // ... err checks
                if (err) {
                    //console.log('no se pudo concectar' + err);
                    throw err;
                } else {
                    // console.log('se conecto a la base de datos');
                    var request = new sql.Request(connection); // or: var request = connection.request();
                    //para ver si funciona el store descomentar la linea siguiente
                    request.verbose = true;
                    //cargo el convenio de la re
                    //request.input('convenio', sql.Int, DatosReceta.Table.idConvenioFLV);
                    //request.input('drogueria', sql.Int, iddrogueria.toString());
                    //request.input('codAutorizacion', sql.Char(20), DatosReceta.Table.CodAp);
                    request.input('regID', sql.NVarChar(40), DatosReceta.Table.RegID);
                    request.input('idReceta', sql.Numeric(18, 0), DatosReceta.Table.idRecetaFLV);
                    //request.input('error', sql.NVarChar(150), DatosReceta.Table3.Error);

                    /*if (fecha_dg.getFullYear() == 1969) {
                        request.input('feDrogueria', sql.NVarChar, '');

                    } else {
                        request.input('feDrogueria', sql.NVarChar, fecha_dg.getFullYear().toString() + suma(fecha_dg.getMonth() + 1) + suma(fecha_dg.getDate()));


                    }*/

                    request.input('estadoEvento', sql.Int, DatosReceta.Table.idEstado.toString());
                    request.input('descripEstado', sql.NVarChar(200), DatosReceta.Table.Estado.toString());

                    //concatenar las notas porque pueden ser varias en una receta
                    //request.input('nota', sql.NVarChar(400), s_notas);

                    //request.input('remito', sql.NVarChar(20), remito);

                    /*if (fecha_r.getFullYear() == 1969) {
                        request.input('fe_remito', sql.NVarChar, '');

                    } else {
                        request.input('fe_remito', sql.NVarChar, fecha_r.getFullYear().toString() + suma(fecha_r.getMonth() + 1) + suma(fecha_r.getDate()));


                    }*/

                    if (fecha_c.getFullYear() == 1969) {
                        request.input('fe_camoyte', sql.NVarChar, '');

                    } else {

                        request.input('fe_camoyte', sql.NVarChar, fecha_c.getFullYear().toString() + suma(fecha_c.getMonth() + 1) + suma(fecha_c.getDate()));

                    }
                    //request.input('descObservacion', sql.NVarChar(400), s_Obs);
                    request.output('exito', sql.Int);
                    request.execute('actualizaEstadosRecetasVerificandoDocuAfil', function(err, recordsets, returnValue) {
                        if (err) {
                            callback(err, null);
                        } else {
                            //IMPORTANTE SELECCIONAR EL PRIMER ELEMNETO DEL ARRAY RECORDSET!!!
                            console.log('resultado de la consulta verificando docu afiliados:' + returnValue);
                            callback(null, recordsets[0]);
                        }

                    });

                }
            });
            break;
        case '15'://en tramite apross
            
            connection = new sql.Connection(config.conexion, function(err) {
                // ... err checks
                if (err) {
                    //console.log('no se pudo concectar' + err);
                    throw err;
                } else {
                    // console.log('se conecto a la base de datos');
                    var request = new sql.Request(connection); // or: var request = connection.request();
                    //para ver si funciona el store descomentar la linea siguiente
                    request.verbose = true;
                    //cargo el convenio de la re
                    //request.input('convenio', sql.Int, DatosReceta.Table.idConvenioFLV);
                    //request.input('drogueria', sql.Int, iddrogueria.toString());
                    //request.input('codAutorizacion', sql.Char(20), DatosReceta.Table.CodAp);
                    request.input('regID', sql.NVarChar(40), DatosReceta.Table.RegID);
                    request.input('idReceta', sql.Numeric(18, 0), DatosReceta.Table.idRecetaFLV);
                    //request.input('error', sql.NVarChar(150), DatosReceta.Table3.Error);

                    /*if (fecha_dg.getFullYear() == 1969) {
                        request.input('feDrogueria', sql.NVarChar, '');

                    } else {
                        request.input('feDrogueria', sql.NVarChar, fecha_dg.getFullYear().toString() + suma(fecha_dg.getMonth() + 1) + suma(fecha_dg.getDate()));


                    }*/

                    request.input('estadoEvento', sql.Int, DatosReceta.Table.idEstado.toString());
                    request.input('descripEstado', sql.NVarChar(200), DatosReceta.Table.Estado.toString());

                    //concatenar las notas porque pueden ser varias en una receta
                    //request.input('nota', sql.NVarChar(400), s_notas);

                    //request.input('remito', sql.NVarChar(20), remito);

                    /*if (fecha_r.getFullYear() == 1969) {
                        request.input('fe_remito', sql.NVarChar, '');

                    } else {
                        request.input('fe_remito', sql.NVarChar, fecha_r.getFullYear().toString() + suma(fecha_r.getMonth() + 1) + suma(fecha_r.getDate()));


                    }*/

                    if (fecha_c.getFullYear() == 1969) {
                        request.input('fe_camoyte', sql.NVarChar, '');

                    } else {

                        request.input('fe_camoyte', sql.NVarChar, fecha_c.getFullYear().toString() + suma(fecha_c.getMonth() + 1) + suma(fecha_c.getDate()));

                    }
                    //request.input('descObservacion', sql.NVarChar(400), s_Obs);
                    request.output('exito', sql.Int);
                    request.execute('actualizaEstadosRecetasEnTramiteApross', function(err, recordsets, returnValue) {
                        if (err) {
                            callback(err, null);
                        } else {
                            //IMPORTANTE SELECCIONAR EL PRIMER ELEMNETO DEL ARRAY RECORDSET!!!
                            console.log('resultado de la consulta tramite apross:' + returnValue);
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
                    callback(null, recordsets[0]);
                }

            });

        }
    });

};



//importante para poder usar los metodos es obligatorio exportarlo
module.exports = recetaModelo;