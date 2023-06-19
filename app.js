//Importing libs
var express = require('express');
var app = express();
var https = require('https');
var fs = require('fs');

//Importing custom class
var Day = require('./DayClass');

app.get('/', function(req, res) {
  //Get the main html content
  fs.readFile('weather.html', function(err, filedata) {

    if(err) {
      return console.log(err);
    }

    /*
      - Please make sure to change the 'app_id' to your own before publishing the project.
      - The API documentation: https://openweathermap.org/forecast5 
    */

    var url = 'https://api.openweathermap.org/data/2.5/forecast?q=toronto,ca&appid=d572465715035d423880c2c70de3b469';

    //Make http request to the api
    https.get(url, function(response) {

      let chunks = [];
      response.on('data', function(data) {
        
        chunks.push(data);

      }).on('end', function() {
        
        let data   = Buffer.concat(chunks);
        var report = JSON.parse(data);
        var allDaysHtml = "";

        for(let i=0; i < report.list.length; i++) {
          //Get every 8th data from the 'report', as every 8th item is starting with new day
          if(i%8==0 || i==0) {
            var myDay = new Day(report.list[i].dt_txt, report.list[i].main.temp, report.list[i].weather[0].description, report.list[i].weather[0].icon);
            allDaysHtml += myDay.getDayDataHtml();
          }
          
        }
        
        var page_html = filedata.toString().replace('&{rows}', allDaysHtml);
        res.set('Content-Type', 'text/html');
        res.end(page_html);
      
      });

      response.on("data", function(data) {
        
        
      });
    });
    
  });
  
});

app.listen(8080);
