"use strict";
/*
Aca los posibles valores de los cortes de los archivos!!

yy - last two digits of the current year e.g. 14 for 2014
yyyy - year (4 digits) e.g. 2014
M - unpadded month e.g. 1 for January, 12 for December
MM - padded month (starting from 1) e.g. 01 for January, 12 for December
d - unpadded day of a month e.g. 1 for 1st, 10 for 10th
dd - padded day of a month e.g. 01 for 1st, 10 for 10th
H - unpadded hour e.g. 1 for 1 AM
HH - padded hour e.g. 01 for 1 AM
m - unpadded minute e.g. 0, 1, 2, ... 58, 59
mm - padded minute e.g. 00, 01, 02, ... 58, 59
*/
var winston = require('winston'),
    path = require('path'),
    transports = [];

//para autoarchivar los logs en carpetas
/*var archiveFile = require('winston-archivefile');


var options = {
    filename: "logRecetas.log",
    archivedir: "archivados"
};
var trans = new archiveFile(options);
var logger = new winston.Logger({
    transports: [trans]
});*/

//**********************

transports.push(new winston.transports.DailyRotateFile({
    name: 'file',
    datePattern: '.yyyy-MM-ddTHH',
    filename: path.join(__dirname, "logs", "logRecetas.log")
}));

var logger = new winston.Logger({
    transports: transports
});

// ... and logging
logger.info("log information", {
    extraData: 'somve_value'
});

module.exports = require('./lib/helpers');