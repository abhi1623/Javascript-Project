//import the filestream module
var fs = require('fs');

// load the data from the csv files
var data1 = fs.readFileSync('India2011.csv', 'utf8');
var data2 = fs.readFileSync('IndiaSC2011.csv', 'utf8');
var data3 = fs.readFileSync('IndiaST2011.csv', 'utf8');

// write a function to parse the data
var myParser = function(data,result) {
  var lines = data.trim().split("\n");
  var len = lines.length;
  var headers = lines[0].trim().split(",");

  for(var j=15; j < 43; j = j + 3) {
    var obj = {};
    obj["education"] = headers[j];
    var pop = 0;
    for(var i=1; i < len; i = i+87) {
      var currentline = lines[i].trim().split(",");
      pop = pop + parseInt(currentline[j]);
    }
    obj["population"] = pop;
    result.push(obj);
  }
}

// an empty object
var result1 = [],
    result2 = [],
    result3 = [],
    result = [];

// call our parser on data
myParser(data1,result1);
myParser(data2,result2);
myParser(data3,result3);

for(var i=0; i < 10; i++) {
  var obj = {};
  obj["education"] = result1[i].education;
  obj["population"] = result1[i].population + result2[i].population + result3[i].population;
  result.push(obj);

}

var jsonObj = {"Education" : result};
// output file
var outputFilename = "plotC.json";

// write out result into output file
fs.writeFile(outputFilename, JSON.stringify(jsonObj, null, 4), function(err) {
  if(err) {
    console.log(err);
  }
  else {
    console.log("JSON saved to" + outputFilename);
  }
});
