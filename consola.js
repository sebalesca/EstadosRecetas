var readline = require('readline');
var estado = require('./lib/verEstados');
var colors = require('colors');
var Receta = require('./lib/verEstados/lib/actualizarReceta');
var recetaTest = require('./lib/verEstados/lib/recetaTest.js');
var timer = require('timers');


//var actualiza = require('./actualizarReceta');
var actRecetas = require('./lib/verEstados/lib/Recetas');
var _ = require('underscore')._;
var fs = require('fs');

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


function opciones() {
    console.log(' 1- Consultar Receta'.help);
    console.log(' 2- Consultar ETADOS Recetas Pendientes por Farmacia'.help);
    console.log(' 3- Actualizar Receta'.help);
    console.log(' 4- Actualizar Cola'.help);
    //console.log(' 4- Actualizar Autorizadas'.help);
    //console.log(' 5- Actualizar Observadas'.help);
    console.log(' 6- Salir'.help);
    rl.prompt();
}


rl = readline.createInterface(process.stdin, process.stdout);

rl.setPrompt('FarmaLive> ');

opciones();

rl.on('line', function(line) {
    switch (line) {
        case '1':
            //MUESTRA LOS DATOS DE LA RECETA
            rl.question("Introduzca el IdReceta a consultar: ", function(idreceta) {
                estado.verEstado(idreceta, function(error, Receta) {
                    console.log('Detalle Receta'.yellow);
                    console.log('Estado de la Receta: '.help + Receta.imprimir.estado);
                    console.log(Receta.imprimir);
                    opciones();
                });
                //opciones();  
            });

            break;
        case '2':
            rl.question("Introduzca el Codigo de la Farmacia a consultar: ", function(idFarmacia) {
                    estado.verEstadoByFarmacia(idFarmacia, function(err, recetas) {
                        console.log(recetas);
                        opciones();

                    });

                }

            );
            //console.log('En desarrollo Muchachio....coming soon!');


            /*
             */
            break;
        case '3':
            //ACTUALIZA UNA RECETA SEGUN EL IDRECETA
            rl.question("Ingrese el ID de la receta Que desea ACTUALIZAR: ".info, function(idReceta) {

                Receta.actualizarReceta(idReceta);
                opciones();
            });
            break;
        case '4':
            rl.question('Desea Ejecutar el Demonio? ', function(pregunta) {
                if (pregunta == 'S') {
                    //son 20 minutos 1200000
                    setInterval(function() {
                        var cola = [8711714,
                            8723010,
                            8724074,
                            8729068,
                            8729757,
                            8738609,
                            8739129,
                            8741175,
                            8753165,
                            8760330,
                            8771166,
                            8775701,
                            8776116,
                            8778534,
                            8781803,
                            8787123,
                            8788467,
                            8788824,
                            8789868,
                            8793086,
                            8796390,
                            8796600,
                            8800219,
                            8800657,
                            8800758,
                            8802204,
                            8803009,
                            8803146,
                            8810612,
                            8811290,
                            8811292,
                            8814444,
                            8821960,
                            8822824,
                            8827951,
                            8830743,
                            8832669,
                            8834173,
                            8838144,
                            8838562,
                            8841299,
                            8842459,
                            8844597,
                            8854225,
                            8865946,
                            8868633,
                            8869328,
                            8872073,
                            8872771,
                            8873121,
                            8877188,
                            8888219,
                            8889547,
                            8902501,
                            8919208,
                            8925113,
                            8925392,
                            8925830,
                            8932526,
                            8943127,
                            8944274,
                            8947867,
                            8947970,
                            8948800,
                            8955045,
                            8956650,
                            8960600,
                            8960792,
                            8961620,
                            8962370,
                            8962693
                        ];

                        _.each(cola, function(recetaFLV, n) {
                            console.log(recetaFLV + 'numero:' + n);
                            Receta.actualizarReceta(recetaFLV);
                        });
                    }, 1000);
                } else {
                    opciones();

                }


                //actRecetas.getPendientes(function(error, pendientes) {
                //  Receta.actualizarReceta(idReceta);

                //});

                //setIntervar(Receta.actualizarReceta(idReceta), 1200000);

            });
            break;
        case '5':
            //console.log('En desarrollo Muchachio....coming soon!');
            //opciones();

            console.log('Se Actualizaran las Recetas Pendientes!');

            //var cant_sinprocesar;
            //var cant_procesadas;

            actRecetas.getPendientes(function(error, Pendientes) {

                if (!error) {
                    //chequeo por cada una el estado en el web service de aces
                    console.log('encontro las pendientes');
                    _.each(Pendientes, function(recetaFLV, n) {
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
                    });
                    fs.appendFileSync('logRecetas.txt', 'Cantidad de pendientes que se procesaron:  y estaban igual:   \r'); //, function(err) {
                    /*if (err) {
                                            console.log(err);
                                        } else {
                                            console.log('Se ha escrito correctamente el log');
                                        }
                                    });*/ //fin del each
                } else {
                    console.log('Error al tratar de actualizar Pendientes');
                }
                // opciones();

            }); //fin getPendientes



            break;
        case '6':
            console.log('En desarrollo Muchachio....coming soon!');
            opciones();
            /*
              //autorizadas
               console.log('Se Acrualizaran las Recetas autorizadas!');
              
            
               actRecetas.getAutorizadas(function(error,Autorizadas){
               if (!error) {
                    console.log('entro autorizadas');
                    //chequeo por cada una el estado en el web service de aces
                    _.each(Autorizadas, function(recetaFLV, n) {
                             actRecetas.verEstadoAces(recetaFLV, function(err, recetaAces) {
                                  if (!err){

                                                 if (recetaAces.Table.RegID == recetaFLV.regid) {
                                                   
                                                //    console.log('**********************ESTADOS**************************************');
                                                //    console.log('estado igual no se procesa');
                                                //    console.log('CODIGO FLV:' + recetaFLV.regid);
                                                //    console.log('CODIGO ACES:' + recetaAces.Table.RegID);
                                                //    console.log('**********************CAMPOS DE LA RECETA ACES*******************************');
                                                //    console.log('***********************FIN RECETA ACES***********************');
                                                } else {
                                                    //SI CAMBIO EL REG ID DEBO PROCESAR LA RECETA Y ACTUALIZAR EL ESTADO EN FLV
                                                    console.log('El Estado CAMBIO se procesara');
                                                    console.log('CODIGO FLV:' + recetaFLV.regid);
                                                    console.log('CODIGO ACES:' + recetaAces.Table.RegID);
                                                   
                                                    actRecetas.procesaEstado(recetaAces, function(err) {
                                                        if (!err) {

                                                            console.log('se proceso OK RECETA:' + recetaAces.Table.idRecetaFLV);
                                                        } else {
                                                            console.log('algo ha fallado RECETA: ' + recetaAces.Table.idRecetaFLV);
                                                        }

                                                    });//fin procesa estado

                                                }
                                            }//fin err verEstados
                                                             
                             });//fin ver estados
                        });//fin del each
                        fs.appendFile('logRecetas.txt', 'Cantidad de autorizadas que se procesaron:  y estaban igual: ', function(err) {
                                        if (err) {
                                            console.log(err);
                                        } else {
                                            console.log('Se ha escrito correctamente el log');
                                        }
                                    });
                }
                opciones();
            });//fin getPendientes
            */
            break;
        case '7':
            console.log('En desarrollo Muchachio....coming soon!');
            opciones();
            /*
              console.log('Se Actualizaran las Recetas Observadas!');
            actRecetas.getObservadas(function(error,Observadas){
               if (!error) {
                    //chequeo por cada una el estado en el web service de aces
                    _.each(Observadas, function(recetaFLV, n) {
                             actRecetas.verEstadoAces(recetaFLV, function(err, recetaAces) {
                                  if (!err){

                                                 if (recetaAces.Table.RegID == recetaFLV.regid) {
                                                //    console.log('**********************ESTADOS**************************************');
                                                //    console.log('estado igual no se procesa');
                                                //    console.log('CODIGO FLV:' + recetaFLV.regid);
                                                //    console.log('CODIGO ACES:' + recetaAces.Table.RegID);
                                                //    console.log('**********************CAMPOS DE LA RECETA ACES*******************************');
                                                //    console.log('***********************FIN RECETA ACES***********************');
                                                } else {
                                                    //SI CAMBIO EL REG ID DEBO PROCESAR LA RECETA Y ACTUALIZAR EL ESTADO EN FLV
                                                    console.log('El Estado CAMBIO se procesara');
                                                    console.log('CODIGO FLV:' + recetaFLV.regid);
                                                    console.log('CODIGO ACES:' + recetaAces.Table.RegID);

                                                    actRecetas.procesaEstado(recetaAces, function(err) {
                                                        if (!err) {

                                                            console.log('se proceso OK RECETA:' + recetaAces.Table.idRecetaFLV);
                                                        } else {
                                                            console.log('algo ha fallado RECETA: ' + recetaAces.Table.idRecetaFLV);
                                                        }

                                                    });//fin procesa estado

                                                }
                                            }//fin err verEstados
                                                             
                             });//fin ver estados
                        });//fin del each
                }
                  opciones();
            });//fin getobservadas
          */
            break;
        case '8':

            rl.close();
            break;
        default:
            console.log('Este no es un parametro valido verifica las opciones disponibles');
            //muestro las opcione nuevamente
            opciones();
            break;

    }

    // rl.prompt();
}).on('close', function() {
    console.log('Hasta luego MUCHACHO!!!');
    process.exit(0);
});