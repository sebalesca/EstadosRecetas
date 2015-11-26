module.exports = {

    "Recetas": [{ //observadas
        "Receta5": {
            "Table": {

                "idRecetaFLV": "6572429",
                "idConvenioFLV": "1",
                "idEstado": "5",
                "Estado": "Observada",
                "FechaCAMOyTE": "2014-07-03T15:31:08.757-03:00",
                "RegID": "780eb2e9-c3af-4558-a975-0def148a0088"
            },
            "Table1": [{

                "idRecetaFLV": "6572429",
                "Nota": "%Pendiente de observación – Aprob. Administrativamente."
            }],
            "Table2": [{
                "idRecetaFLV": "6572429",
                "DescObservacion": "Se requiere autorizacion previa por el Instituto mediante envio de expediente por via de excepcion, acercarse a la delegacion PAMI a tramitarlo"
            }]
        },
        //buzon 
        "Receta1": {
            "Table": {

                "idRecetaFLV": "6572429",
                "idConvenioFLV": "1",
                "idEstado": "1",
                "Estado": "validadas pendientes de autorizacion (buzon)",
                "FechaCAMOyTE": "2015-11-02T15:31:08.757-03:00",
                "RegID": "781eb2e9-c3af-4558-a975-0def148a0088"
            }
        },
        //Valdiada con error 
        "Receta2": {
            "Table": {
                "idRecetaFLV": "6572429",
                "idConvenioFLV": "1",
                "idEstado": "2",
                "Estado": "Validada con error",
                "FechaCAMOyTE": "2015-11-02T15:31:08.757-03:00",
                "RegID": "781eb2e9-c3af-4558-a975-0def148a0088"
            },
            "Table3": {
                "error": "error en la receta"
            }
        },
        //Previamente Procesada por Camoyte
        //2015110012900 reclamo edesur
        "Receta3": {
            "Table": {
                "idRecetaFLV": "6572429",
                "idConvenioFLV": "1",
                "idEstado": "3",
                "Estado": "Receta previamente Procesada por Camoyte",
                "FechaCAMOyTE": "2015-11-02T15:31:08.757-03:00",
                "RegID": "783eb2e9-c3af-4558-a975-0def148a0088"
            }
        },
        //Aprobada

        "Receta4": {
            "Table": {
                "idRecetaFLV": "6572429",
                "idConvenioFLV": "1",
                "idEstado": "4",
                "Estado": "Aprobada",
                "idDrogueria": "123",
                "FechaCAMOyTE": "2015-09-11T13:23:33.193-03:00",
                "FechaComunicacionDrogueria": "2015-09-29T13:39:14.387-03:00",
                "Remito": "0005-00048084",
                "FechaRemito": "2015-09-30T00:00:00-03:00",
                "CodAp": "0G7I2S4",
                "RegID": "9c71ab7e-f124-408d-99c0-f3bf7f16b03d"
            },
            "Table4": [{
                "idRecetaFLV": "6572429",
                "idProducto": "2043",
                "Cantidad": "2"
            }, {

                "idRecetaFLV": "6572429",
                "idProducto": "2044",
                "Cantidad": "1"
            }]
        },
        //tramite inexistente

        "Receta10": {
            "Table": {
                "idRecetaFLV": "6572429",
                "idEstado": "10",
                "Estado": "Trámite inexistente",
                "RegID": "ec3c6c34-7a64-4d72-b013-f45906ccc73d"
            }

        },
        //pendiente de validacion
        "Receta11": {
            "Table": {
                "idRecetaFLV": "6572429",
                "idEstado": "11",
                "Estado": "Trámite pendiente de validación",
                "FechaCAMOyTE": "2015-09-11T13:23:33.193-03:00",
                "RegID": "9c71ab7e-f124-408d-99c0-f3bf7f16b03d"
            }
        },
        //receta anulada
        "Receta12": {
            "Table": {
                "idRecetaFLV": "6572429",
                "idEstado": "12",
                "Estado": "Receta anulada",
                "FechaCAMOyTE": "2015-09-11T13:23:33.193-03:00",
                "RegID": "9c71ab7e-f124-408d-99c1-f3bf7f16b03d"
            }
        },
        //aprobada administrativamente
        "Receta13": {
            "Table": {
                "idRecetaFLV": "6572429",
                "idConvenioFLV": "13",
                "idEstado": "13",
                "Estado": "Trámite",
                "idDrogueria": "503",
                "FechaCAMOyTE": "2015-10-07T13:56:30.647-03:00",
                "FechaComunicacionDrogueria": "2015-10-07T21:47:22.48-03:00",
                "Remito": "0039R00292522",
                "FechaRemito": "2015-10-09T00:00:00-03:00",
                "CodAp": "1295500",
                "RegID": "78638251-f148-4aaa-9a72-518d277ebf94"
            },
            "Table1": {
                "idRecetaFLV": "6572429",
                "Nota": "Esta receta se evaluará por 2 convenios distintos."
            },
            "Table4": {
                "idRecetaFLV": "6572429",
                "idProducto": "4723",
                "Cantidad": "1"
            }
        }, //En trámite verificando documentacion afiliado
        "Receta14": {
            "Table": {
                "idRecetaFLV": "6572429",
                "idConvenioFLV": "13",
                "idEstado": "14",
                "Estado": "En trámite verificando documentacion afiliado",
                "FechaCAMOyTE": "2015-10-07T13:56:30.647-03:00",
                "RegID": "78638251-f148-4aaa-9a72-518d277ebf94"
            }
        }, //En tramite apross
        "Receta15": {
            "Table": {
                "idRecetaFLV": "6572429",
                "idConvenioFLV": "13",
                "idEstado": "15",
                "Estado": "En tramite Apross",
                "FechaCAMOyTE": "2015-10-07T13:56:30.647-03:00",
                "RegID": "78638251-f148-4aaa-9a72-518d277ebf94"
            }
        }

    }]


};