var express = require('express');
var app = express();
var router = express.Router();
var port = process.env.PORT || 80;

var bodyParser = require('body-parser');  
app.use(bodyParser.json());  
app.use(bodyParser.urlencoded({ extended: false }));

var sql = require("mssql");
// Create connection to database
var config = 
   {
     user: 'bash', // update me
     password: 'ballot-1234', // update me
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
        	res.json(recordset.recordsets[0]);
            console.log(recordset.recordsets[0]);
            next();
        });
    });   
}, function (req, res){
	sql.close();
})

var alreadyVoted = false;
var voterId = 0;
app.post('/vote', function (req, res, next) {
	console.log(req.body.address);
	console.log('Submitting Vote');
	sql.connect(config, function (err) {
    
        if (err) {
        	sql.close();
        	console.log(err);
        }

        // create Request object
        var request = new sql.Request();
           
        // query to the database and get the records
        request.query('SELECT * FROM eligible WHERE address = \''+ req.body.address +'\'', function (err, recordset) { 
            if (err) console.log(err);
     		if (recordset.recordsets[0].length == 0){
     			console.log(recordset);
     			alreadyVoted = false;
     		}
     		else{
     			console.log(recordset);
     			alreadyVoted = true;
     		}
     		next();
        });
    });
}, function (req, res, next){
	sql.close();
	sql.connect(config, function (err) {
        if (err) {
        	sql.close();
        	console.log(err);
        }
        var request = new sql.Request();
		if(alreadyVoted){
			console.log("alreadyVoted");
			request.query("UPDATE eligible SET firstName='"+req.body.first+"', lastName='"+req.body.last+"', submitted=1, address='"+
				req.body.address+"', location='"+req.body.location+"', phone='"+req.body.phone+"' WHERE address='"+req.body.address+"'", function (err) { 
	            if (err) console.log(err);
	     		next();
	        });
		}
		else{
			console.log("newVoter");
		 	request.query('INSERT INTO eligible (firstName, lastName, submitted, address, location, phone) VALUES (\''+
	        req.body.first +'\', \''+
	        req.body.last +'\', '+
	        req.body.submitted +', \''+
	        req.body.address +'\', \''+
	        req.body.location +'\', \''+
	        req.body.phone +'\')', function (err) { 
	            if (err) console.log(err);
	     		next();
	        });
		}
    });
}, function (req, res, next){
	sql.close();
	sql.connect(config, function (err) {
        if (err) {
        	sql.close();
        	console.log(err);
        }
		var request = new sql.Request();
			console.log("getting voterId");
			request.query("SELECT voterId FROM eligible WHERE address='"+req.body.address+"'", function (err, recordset) { 
	            if (err) console.log(err);
	     		voterId = recordset.recordset[0].voterId;
	     		console.log(recordset.recordset[0].voterId);
	     		console.log(voterId);
	     		next();
	        });
    });
}, function (req, res, next){
	sql.close();
	sql.connect(config, function (err) {
        if (err) {
        	sql.close();
        	console.log(err);
        }
		var request = new sql.Request();
			if(alreadyVoted){
				console.log("alreadyVoted");
				request.query("UPDATE ballot SET candidateID='"+req.body.candidate+"' WHERE voterId='"+voterId+"'", function (err) { 
		            if (err) console.log(err);
		     		next();
		        });
			}
			else{
				console.log("newVoter");
			 	request.query('INSERT INTO ballot (voterId, candidateID) VALUES (\''+
		        voterId +'\', \''+
		        req.body.candidate +'\')', function (err) { 
		            if (err) console.log(err);
		     		next();
		        });
			}
	});
}, function (req, res){
	sql.close();
	res.end();
})

app.get('/count', function (req, res, next){
	sql.connect(config, function (err) {
	console.log("newVoter");

	    var request = new sql.Request();
	 	request.query('SELECT candidates.firstName, candidates.lastName, voteSum.totalVotes FROM candidates, (SELECT COUNT(candidateId) AS totalVotes, candidateId FROM ballot GROUP BY candidateId) AS voteSum WHERE voteSum.candidateId=candidates.id;', function (err, recordset) { 
	    	    if (err) console.log(err);
	 			res.json(recordset.recordset);
	 			next();
	    });
 	});
}, function (req, res){
	sql.close();
})

app.post('/vote2', function (req, res, next){
	
	sql.connect(config, function (err) {
	console.log("newVoter");

    var request = new sql.Request();
 	request.query('INSERT INTO eligible (firstName, lastName, submitted, address, location, phone) VALUES (\''+
    req.body.first +'\', \''+
    req.body.last +'\', '+
    req.body.submitted +', \''+
    req.body.address +'\', \''+
    req.body.location +'\', \''+
    req.body.phone +'\')', function (err) { 
        if (err) console.log(err);
 		res.end();
 		next();
    });
 });
}, function (req, res, next){
	sql.close();
})

app.post('/removeCandidate', function (req, res, next){
	
	sql.connect(config, function (err) {
	console.log("removing Candidate from ballot");

    var request = new sql.Request();
 	request.query('DELETE FROM ballot WHERE ballot.candidateId = '+req.body.candidate.toString(), function (err) { 
        if (err) console.log(err);
 		next();
    	});
 	});
}, function (req, res, next){
	sql.close();
	sql.connect(config, function (err) {
	console.log("removing Candidate from candidates");

    var request = new sql.Request();
 	request.query('DELETE FROM candidates WHERE candidates.id = '+req.body.candidate.toString(), function (err) { 
        if (err) console.log(err);
 		next();
    	});
 	});
}, function (req, res, next){
	sql.close();
	res.end();
})

var server = app.listen(port, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("App listening at http://%s:%s", host, port)
})
