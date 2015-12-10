var recetaModelo = require('./Recetas');
var _ = require('underscore')._;
var fs = require('fs');
var winston = require('winston');

function actualizar(id, callback) {

    recetaModelo.getReceta(id, function(err, recetaFLV) {
        //console.log('esta es la receta consultada' + r.idReceta);
        var receta={};
        receta=recetaFLV;
        if (err) {
            console.log('error');
            console.dir(err);
            return callback(err, null);
        }

        //chequeo por cada una el estado en el web service de aces
        //console.log(r);
        if (_.isUndefined(recetaFLV)) {
            console.log('No se encontro la Receta:', id);
            return callback({
                error: 'error'
            }, null);
            /* winston.level = 'debug';                
                winston.add(winston.transports.File, {
                    filename: './logs/logRecetas.log'
                });
                winston.log('debug', 'Now my debug messages are written to console!');*/
            //console.log('Nada que actualizar');
        }
        //_.each(r, function(recetaFLV, n) {


            //console.log(recetaFLV+'_');

        recetaModelo.verEstadoAces(receta[0], function(err, recetaAces) {
            if (err) {
                console.log('dio error al verEstadoAces');
                return callback(err, null);
            }
           //console.log(recetaFLV);
            if (recetaAces.Table.RegID != recetaFLV.regid) {
                console.log('estado igual no se procesa');
            } else {
                //SI CAMBIO EL REG ID DEBO PROCESAR LA RECETA Y ACTUALIZAR EL ESTADO EN FLV
                console.log('estado CAMBIO se procesa'+recetaFLV.regid);
                recetaModelo.procesaEstado(recetaAces, function(err, salida) {
                    var f = new Date();
                    if (err) {
                        console.log('algo ha fallado RECETA: ' + recetaAces.Table.idRecetaFLV);
                        fs.appendFile('./logs/logRecetas.txt', 'idreceta: ' + recetaAces.Table.idRecetaFLV + 'error:' + err + ' FECHA:' + f.getDate() + "/" + (f.getMonth() + 1) + "/" + f.getFullYear() + ' ' + f.getHours() + ': ' + f.getMinutes(), function(err) {
                            if (err) {
                                console.log(err);
                            } else {
                                console.log('Se ha escrito correctamente el log');
                            }
                        });
                        return callback(err, null);
                    }

                    fs.appendFile('./logs/logRecetas.txt', 'idreceta: ' + recetaAces.Table.idRecetaFLV + 'exito:' + ' FECHA:' + f.getDate() + "/" + (f.getMonth() + 1) + "/" + f.getFullYear() + ' ' + f.getHours() + ': ' + f.getMinutes(), function(err) {
                        if (err) {
                            console.log(err);
                        } else {
                            console.log('Se ha escrito correctamente el log');
                        }
                    });
                    console.log('se proceso OK RECETA:' + recetaAces.Table.idRecetaFLV);
                    callback(null, salida);


                });

            }


            //fin verEstadosAces
        });
        //console.log(n);
        // });//fin foreach

    });
}
module.exports = {
    actualizarReceta: actualizar
};