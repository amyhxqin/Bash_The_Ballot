var express = require('express');
var app = express();
var router = express.Router();
var port = process.env.PORT || 1337;

var bodyParser = require('body-parser');  
app.use(bodyParser.json());  
app.use(bodyParser.urlencoded({ extended: false }));

var sql = require("mssql");
// Create connection to database
var config = 
   {
     user: process.env.DBLogin, // update me
     password: process.env.DBPass, // update me
     server: 'bashtheballot.database.windows.net', // update me
     database: 'BashtheBallotDB',
     encrypt: true,
     options: {
	     database: 'BashtheBallotDB',
	     encrypt: true
     }
   }

app.get('/index', function (req, res){
	res.send(myvar);
})

app.get('/candidates', function (req, res, next) {
	console.log('Reading from candidates');
	var query;
   	sql.connect(config, function (err) {
    
        if (err) {
        	sql.close();
        	console.log(err);
        }

        // create Request object
        var request = new sql.Request();
           
        // query to the database and get the records
        request.query('SELECT * FROM candidates', function (err, recordset) {
            
            if (err) console.log(err)

            // send records as a response
            res.send(recordset.recordsets[0]);
            res.end();
            next();
        });
    });   
}, function (req, res){
	sql.close();
})

function queryEligible(id)
   { console.log('Reading row from the eligible');

       // Read all rows from table
     request = new Request(
          ("SELECT firstName, lastName FROM eligible WHERE voterId=" + id),
             function(err, rowCount, rows) 
                {
                    console.log("rowCount: " + rowCount);
                    process.exit();
                }
            );

     request.on('row', function(columns) {
        columns.forEach(function(column) {
            console.log("%s\t%s", column.metadata.colName, column.value);
         });
             });
     connection.execSql(request);
   }

function addVoter()
   { console.log('Adding voter to table');

       // Read all rows from table
     request = new Request(
          "INSERT INTO eligible (firstName, lastName, submitted, address, location, phone) VALUES ()",
             function(err, rowCount, rows) 
                {
                    console.log(rowCount + ' row(s) returned');
                    process.exit();
                }
            );

     request.on('row', function(columns) {
        columns.forEach(function(column) {
            console.log("%s\t%s", column.metadata.colName, column.value);
         });
             });
     connection.execSql(request);
   }

function changeVoter()
	{ console.log('Reading rows from the Table...');

	   // Read all rows from table
	 request = new Request(
	      "UPDATE eliible SET firstName='dsadsadsad' WHERE voterId = ",
	         function(err, rowCount, rows) 
	            {
	                console.log(rowCount + ' row(s) returned');
	                process.exit();
	            }
	        );

	 request.on('row', function(columns) {
	    columns.forEach(function(column) {
	        console.log("%s\t%s", column.metadata.colName, column.value);
	     });
	         });
	 connection.execSql(request);
	}

//voterId, firstName, lastName, submitted, address, location, phone

app.post('/userInfo', function (req, res, next){
	// if(!req.body)
	// 	return res.status(400).send('No text uploaded');

	name = req.body.name;
	phone = req.body.phone_number;
	id = req.body.id;
	address = req.body.address;
	location = req.body.location;
	console.log("fdsfdsf");
	next();
	
}, function (req, res){
	console.log(name + phone + id + address + location);
	res.end();
})


var server = app.listen(port, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port)
})
