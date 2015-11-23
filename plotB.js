//import the filestream module
var fs = require('fs');

// load the data from the csv files
var data1 = fs.readFileSync('India2011.csv', 'utf8');
var data2 = fs.readFileSync('IndiaSC2011.csv', 'utf8');
var data3 = fs.readFileSync('IndiaST2011.csv', 'utf8');

// write a function to parse the data
var myParser2 = function(data,result) {
  var lines = data.trim().split("\n");
  var len = lines.length;
  for(var i=1; i < len; i = i+87) {
    var obj = {};
    var currentline = lines[i].trim().split(",");
    obj["state"] = currentline[3].trim().split("-")[1].trim().split(" ")[0];
    obj["male"] = parseInt(currentline[40]);
    obj["female"] = parseInt(currentline[41]);
    result.push(obj);
  }
}

// an empty object
var result1 = [],
    result2 = [],
    result3 = [],
    result = [];

// call our parser on data
myParser2(data1,result1);
myParser2(data2,result2);
myParser2(data3,result3);

result3.splice(2, 0, {"state" : "State - PUNJAB", "male" : 0, "female" : 0});
result3.splice(3, 0, {"state" : "State - CHANDIGARH", "male" : 0, "female" : 0});
result3.splice(5, 0, {"state" : "State - HARYANA", "male" : 0, "female" : 0});
result3.splice(6, 0, {"state" : "State - NCT OF DELHI", "male" : 0, "female" : 0});
result3.splice(33, 0, {"state" : "State - PUDUCHERRY", "male" : 0, "female" : 0});

result2.splice(11, 0, {"state" : "State - ARUNACHAL PRADESH", "male" : 0, "female" : 0});
result2.splice(12, 0, {"state" : "State - NAGALAND", "male" : 0, "female" : 0});
result2.splice(30, 0, {"state" : "State - LAKSHADWEEP", "male" : 0, "female" : 0});
result2.splice(34, 0, {"state" : "State - ANDAMAN & NICOBAR ISLANDS", "male" : 0, "female" : 0});

for(var i=0; i < 35; i++) {
  var obj = {};
  obj["state"] = result1[i].state;
  obj["male"] = result1[i].male + result2[i].male + result3[i].male;
  obj["female"] = result1[i].female + result2[i].female + result3[i].female;
  result.push(obj);

}

var jsonObj = {"grad_dist" : result};
// output file
var outputFilename = "plotB.json";

// write out result into output file
fs.writeFile(outputFilename, JSON.stringify(jsonObj, null, 4), function(err) {
  if(err) {
    console.log(err);
  }
  else {
    console.log("JSON saved to" + outputFilename);
  }
});
