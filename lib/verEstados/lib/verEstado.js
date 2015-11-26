var readline = require('readline');
var colors = require('colors');
//var url =
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

//*****************************************
//Modulo requerido para mapear el werbservices de aces
var soap = require('soap');
//url del webservices
//var url = 'http://www.acessa.com.ar/wscamoyte/service.asmx?wsdl';

var recetaModelo = require('./Recetas');

var _ = require('underscore')._;



function trim(string) {
    return string.replace(/^\s*|\s*$/g, '');
}

var fs = require('fs');
//console.log('arranco');

function verEstadoReceta(idReceta, callback) {
    var winston = require('winston');
    var salida = {};
    var detalle = {};
    winston.add(winston.transports.File, {
        filename: './logs/logAce.log'
    });

    recetaModelo.verEstadoAcesUnaReceta(idReceta, function(err, recetaAces) {
        if (err) {

            winston.log('debug', JSON.stringify(recetaAces));
            winston.log('info', JSON.stringify(recetaAces));
            return callback(err, null);

        } else {

            /*
            Para llevar el control de las recetas de ace
            */
            winston.log('debug', JSON.stringify(recetaAces));
            winston.log('info', JSON.stringify(recetaAces));

            salida.RecetaAces = recetaAces;

            //receta completa
            //console.log(recetaAces);

            /*if (_.has(recetaAces, 'Resultados')) {
                return callback(null, recetaAces);

            } else {
                return callback(, null);
            }*/


            var s_Obs;
            var cant_obs;
            cant_obs = 1;

            //si existe la table2 esta OBSERVACIONES
            if (_.has(recetaAces, 'Table2')) {
                if (_.isArray(recetaAces.Table2)) {
                    s_Obs = _.reduce(_.pluck(recetaAces.Table2, 'DescObservacion'), function(memo, obs) {
                        cant_obs++;
                        //console.log(obs);
                        return memo + ' - ' + obs;
                    });

                } else {
                    s_Obs = recetaAces.Table2.DescObservacion;
                    cant_obs = 1;
                }

            } else {
                s_Obs = '';
                cant_obs = 0;

            }

            var s_notas;
            var cant_notas;
            cant_notas = 0;

            //si existe la table1 tiene NOTA
            if (_.has(recetaAces, 'Table1')) {
                if (_.isArray(recetaAces.Table1)) {
                    s_notas = _.reduce(_.pluck(recetaAces.Table1, 'Nota'), function(memo, nota) {
                        cant_notas++;
                        return memo + ' - ' + nota;
                    });

                } else {
                    //esto no es un array
                    s_notas = recetaAces.Table1.Nota;
                    cant_notas = 1;

                }


            } else {
                s_notas = '';
            }


            // var propiedades = {};
            // propiedades = _.keys(recetaAces.Table2);
            /* if (_.has(recetaAces.Table, 'Remito')) {
                console.log('tiene remito'.debug);
            } else {
                // console.log('No tiene remito'.debug);

            }*/

            var fechaCamoyte;
            if (_.has(recetaAces.Table, 'FechaCAMOyTE')) {

                fechaCamoyte = recetaAces.Table.FechaCAMOyTE;
            } else {
                fechaCamoyte = '';
            }

            var feComunicaconDrog;
            if (_.has(recetaAces.Table, 'FechaComunicacionDrogueria')) {

                feComunicaconDrog = recetaAces.Table.FechaComunicacionDrogueria;

            } else {
                feComunicaconDrog = '';
            }
            var remito;
            if (_.has(recetaAces.Table, 'Remito')) {

                remito = recetaAces.Table.Remito;

            } else {
                remito = '';
            }

            var feremito;
            if (_.has(recetaAces.Table, 'FechaRemito')) {

                feremito = recetaAces.Table.FechaRemito;

            } else {
                feremito = '';
            }

            var codap;
            if (_.has(recetaAces.Table, 'CodAp')) {

                codap = recetaAces.Table.CodAp;

            } else {
                codap = '';
            }

            var idrechazo;
            if (_.has(recetaAces.Table, 'idRechazo')) {

                idrechazo = recetaAces.Table.idRechazo;

            } else {
                idrechazo = '';
            }

            var iddrogueria;
            if (_.has(recetaAces.Table, 'idDrogueria')) {

                iddrogueria = recetaAces.Table.idDrogueria;

            } else {
                iddrogueria = '';
            }

            var productos = {};

            //Table4 son RP
            if (_.has(recetaAces, 'Table4')) {
                if (_.isArray(recetaAces.Table4)) {
                    _.each(recetaAces.Table4, function(item, itera) {
                        productos['RP' + (itera + 1)] = item.idProducto;
                        productos['cantidad' + (itera + 1)] = item.Cantidad;

                    });

                } else {
                    productos['RP1'] = recetaAces.Table4.idProducto;
                    productos['cantidad1'] = recetaAces.Table4.Cantidad;
                    //console.log('creo un producto');
                }


            } else {
                productos['RP1'] = 0;
                productos['cantidad1'] = 0;
            }



            var id_observacion, descrip;
            if (_.has(recetaAces, 'Table2')) {
                id_observacion = recetaAces.Table2.DescObservacion;
                descrip = recetaAces.Table2.idObservacion;

                //console.log('esta es la primer obs: ' + id_observacion);
                //console.log('este es el codigo :' + descrip);


            } else {
                descrip = '';
                id_observacion = '';


            }


            var desc_estado;
            if (_.has(recetaAces.Table, 'Estado')) {
                desc_estado = recetaAces.Table.Estado;

            }


            detalle.estado = desc_estado;
            detalle.cant_obs = cant_obs;

            detalle.cant_notas = cant_notas;
            detalle.regId = recetaAces.Table.RegID;
            detalle.productos = productos;
            //detalle.RP1 =  productos.RP1;

            //detalle.cantidad1 = productos.cantidad1;

            //detalle.RP2 = productos.RP2;

            //detalle.cantidad2 = productos.cantidad2;


            detalle.fechaCamoyte = fechaCamoyte;

            detalle.comunicacionDrog = feComunicaconDrog;

            detalle.remito = remito;

            detalle.feremito = feremito;

            detalle.codAp = codap;

            detalle.idDrogueria = iddrogueria;

            detalle.observaciones = s_Obs;

            detalle.notas = s_notas;

            salida.imprimir = detalle;

            return callback(null, salida);
            /*

                    console.log('cantidad de observaciones: '.data + colors.info(cant_obs));
                    console.log('cantidad de notas: '.data + colors.info(cant_notas));
                    console.log('este es rp1: '.data + colors.info(productos.RP1));
                    console.log('esta es la cantidad de rp1: '.data + colors.info(productos.cantidad1));
                    console.log('este es rp2: '.data + colors.info(productos.RP2));
                    console.log('esta es la cantidad de rp2: '.data + colors.info(productos.cantidad2));
                    console.log('fechaCamoyte: '.data + colors.info(fechaCamoyte));
                    console.log('fecha com drogueria: '.data + colors.info(feComunicaconDrog));
                    console.log('Remito: '.data + colors.info(remito));
                    console.log('fecha Remito: '.data + colors.info(feremito));
                    console.log('codap: '.data+ colors.info(codap));
                    console.log('iddrogueria: '.data + colors.info(iddrogueria));
                  //  console.log('estas son las propiedades: ' + propiedades);
                    console.log('******************* Observaciones *******************************'.info);
                    console.log('esta es la concatenacion de la observacion: '.data + colors.info(s_Obs));
                    console.log('**************************************************************'.info);
                    console.log('*******************  Notas *******************************'.info);
                    console.log('esta es la concatenacion de las Notas: '.data + colors.info(s_notas));
                    console.log('********************************************* *****************'.info);
                    */
        }

    });

}

function verEstadoByFarmacia(idFarmacia, callback) {
    recetaModelo.getRecetasPendientesByFamacia(idFarmacia, function(err, Recetas) {
        //console.log()
        if (err) {
            callback(err, null);
        }

        callback(null, Recetas);

    });

}
module.exports = {
    verEstado: verEstadoReceta,
    verEstadoByFarmacia: verEstadoByFarmacia

};
//