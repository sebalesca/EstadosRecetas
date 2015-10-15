var readline = require('readline');
var estado = require('verEstados');
var colors = require('colors');


//var actualiza = require('./actualizarReceta');
//var actRecetas=require('Recetas');
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
    console.log(' 2- Consultar Recetas Pendientes por Farmacia'.help);
    //console.log(' 2- Actualizar Receta'.help);
    //console.log(' 3- Actualizar Pendientes'.help);
    //console.log(' 4- Actualizar Autorizadas'.help);
    //console.log(' 5- Actualizar Observadas'.help);
    console.log(' 6- Salir'.help);
    rl.prompt();
}


rl = readline.createInterface(process.stdin, process.stdout);
rl.setPrompt('FarmaLive> ');
opciones();


rl.on('line', function(line) {
    


    switch (line.trim()) {
        case '1':
            //MUESTRA LOS DATOS DE LA RECETA
            rl.question("Introduzca el IdReceta a consultar: ",function(idreceta){
              estado.verEstado(idreceta,function(error,Receta){
               console.log('Receta ACES'.yellow);
               console.dir(Receta);
               console.log('Detalle Receta'.yellow);
               //console.log(Receta.imprimir);
               opciones();
              });
            //opciones();  
            });
            
            break;
        case '2':
            rl.question("Introduzca el Codigo de la Farmacia a consultar: ",function(idFarmacia){
              estado.verEstadoByFarmacia(idFarmacia,function(err,recetas){
                console.log(recetas);
                 opciones();

              });

              }

          );
            //console.log('En desarrollo Muchachio....coming soon!');
           
            //ACTUALIZA UNA RECETA SEGUN EL IDRECETA
            /*
            rl.question("Introduzca el id de la receta: ".input, function(idReceta) {
                actualiza.actualizarReceta(idReceta);
               
                
                opciones();

            });*/
            break;
        case '3':
             console.log('En desarrollo Muchachio....coming soon!');
             opciones();
        /*
            console.log('Se Actualizaran las Recetas Pendientes!');
              
                //var cant_sinprocesar;
                //var cant_procesadas;
                        
            actRecetas.getPendientes(function(error,Pendientes){
                              
               if (!error) {
                    //chequeo por cada una el estado en el web service de aces
                    console.log('encontro las pendientes');
                    _.each(Pendientes, function(recetaFLV, n) {
                             actRecetas.verEstadoAces(recetaFLV, function(err, recetaAces) {
                                  if (!err){

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

                                                    });//fin procesa estado

                                                }
                                            }//fin err verEstados
                                                             
                             });//fin ver estados
                        });
                         fs.appendFileSync('logRecetas.txt', 'Cantidad de pendientes que se procesaron:  y estaban igual:   \r');//, function(err) {
                                        /*if (err) {
                                            console.log(err);
                                        } else {
                                            console.log('Se ha escrito correctamente el log');
                                        }
                                    });*///fin del each
              /*  }else{
                        console.log('Error al tratar de actualizar Pendientes');
                }
                   // opciones();

            });//fin getPendientes
        

            */
            break;

        case '4':
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
        case '5':
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
        case '6':
            
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