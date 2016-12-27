var graphicConfig = require('./graphic_config.js');
var xlsx = require('xlsx');

var makeCopyData = function(path) {
    var workbook = xlsx.readFile(path);
    var sheetNameList = workbook.SheetNames;

    var data = {};
    sheetNameList.forEach(function(name) {
        var sheet = workbook.Sheets[name];

        if (sheet['A1']['v'] === 'key' && sheet['B1']['v'] === 'value') {
            var sheetObj = {}

            for (address in sheet) {            
                if (address[0] === 'B' && address[1] > 1) { 
                    var value = sheet[address]['v'];
                    var keyAddress = 'A' + address[1];
                    var key = sheet[keyAddress]['v'];

                    sheetObj[key] = value;
                }
            }
            data[name] = sheetObj;    
        } else {
            data[name] = xlsx.utils.sheet_to_json(sheet);    
        }
    });

    return data;
}

var makeContext = function(path) {
    context = {
        COPY: makeCopyData(path),
        CONFIG: graphicConfig
    }

    return context;
}

exports.makeContext = makeContext;