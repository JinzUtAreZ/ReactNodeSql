var sql = require('mssql');

var express = require('express')
var app = express()

app.set('view engine', 'ejs');

//2.
var config = {
    server: 'hc-sysdev\\devel',
    database: 'EQM',
    user: 'dev',
    password: 'dev1P@ss',
    port: 8081
};

//function executeStoredProc() {
    //2.
app.get("/", function(req, res) { 
    var dbConn = new sql.ConnectionPool(config);
    dbConn.connect().then(function () {

        //3.
        var request = new sql.Request(dbConn);
        request.input('AssetID', sql.VarChar, 'A02603')
        .execute("spLoad_AssetAvailable").then(function (recordSet) {
            //4.
            console.log(recordSet);
            //res.render("data", { model: recordSet });
            res.send(recordSet);
            dbConn.close();
            
        }).catch(function (err) {
            //5.
            console.log(err);
            dbConn.close();
        });
    }).catch(function (err) {
        //6.
        console.log(err);
    });
});

//}

app.listen("4501", function() {
    
    console.log("node server listening at port : 4501");
});

//executeStoredProc();
