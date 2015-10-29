var recetaModelo = require('Recetas');
var _ = require('underscore')._;
var fs = require('fs');

function actualizar(id) {
    recetaModelo.getReceta(id, function(err, r) {
        console.log('esta es la receta consultada' + r.idReceta);

        if (!err) {
            //chequeo por cada una el estado en el web service de aces
            console.log(r);
            _.each(r, function(recetaFLV, n) {


                recetaModelo.verEstadoAces(recetaFLV, function(err, recetaAces) {

                    if (!err) {

                        if (recetaAces.Table.RegID == recetaFLV.regid) {
                            //console.log('**********************ESTADOS**************************************');
                            console.log('estado igual no se procesa');


                            //console.log('***********************FIN RECETA ACES***********************');
                        } else {
                            //SI CAMBIO EL REG ID DEBO PROCESAR LA RECETA Y ACTUALIZAR EL ESTADO EN FLV
                            //if (!_.isUndefined(recetaAces.Table)) {
                            console.log('estado CAMBIO se procesa');
                            //console.log('CODIGO FLV:' + recetaFLV.regid);
                            //console.log('CODIGO ACES:' + recetaAces.Table.RegID);

                            recetaModelo.procesaEstado(recetaAces, function(err) {
                                var f = new Date();
                                if (!err) {
                                    fs.appendFile('./logs/logRecetas.txt', 'idreceta: ' + recetaAces.Table.idRecetaFLV + 'exito:' + ' FECHA:' + f.getDate() + "/" + (f.getMonth() + 1) + "/" + f.getFullYear() + ' ' + f.getHours() + ': ' + f.getMinutes(), function(err) {
                                        if (err) {
                                            console.log(err);
                                        } else {
                                            console.log('Se ha escrito correctamente el log');
                                        }
                                    });
                                    console.log('se proceso OK RECETA:' + recetaAces.Table.idRecetaFLV);
                                } else {
                                    console.log('algo ha fallado RECETA: ' + recetaAces.Table.idRecetaFLV);
                                    fs.appendFile('./logs/logRecetas.txt', 'idreceta: ' + recetaAces.Table.idRecetaFLV + 'error:' + err + ' FECHA:' + f.getDate() + "/" + (f.getMonth() + 1) + "/" + f.getFullYear() + ' ' + f.getHours() + ': ' + f.getMinutes(), function(err) {
                                        if (err) {
                                            console.log(err);
                                        } else {
                                            console.log('Se ha escrito correctamente el log');
                                        }
                                    });
                                }

                            });

                        }
                    } else {

                        console.log(err);
                    }

                    //fin verEstadosAces
                });
                //console.log(n);
            });
        } else {

            console.log(err);

        }
    });
}
module.exports = {
    actualizarReceta: actualizar
};