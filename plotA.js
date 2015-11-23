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
  for(var j=0; j < 29; j++) {
    var litpop = 0;
    var obj = {};
    for(var i=j+1; i < len; i = i+87) {
      var currentline = lines[i].trim().split(",");
      var age = currentline[5];
      var litpop = litpop + parseInt(currentline[12]);
    }
    obj["age_group"] = age;
    obj["litpop"] = litpop;
    result.push(obj);
  }
};

// an empty object
var result1 = [],
    result2 = [],
    result3 = [],
    result = [];

// call our parser on data
myParser(data1,result1);
myParser(data2,result2);
myParser(data3,result3);

for(var i=0; i < 29; i++) {
  var obj = {};
  obj["age_group"] = result3[i].age_group;
  obj["litpop"] = result1[i].litpop + result2[i].litpop + result3[i].litpop;
  result.push(obj);
}

var jsonObj = {"age_dist" : result};
// output file
var outputFilename = "plotA.json";

// write out result into output file
fs.writeFile(outputFilename, JSON.stringify(jsonObj, null, 4), function(err) {
  if(err) {
    console.log(err);
  }
  else {
    console.log("JSON saved to" + outputFilename);
  }
});
