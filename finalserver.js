// This is the final combined project which is to be started.
const handlebars = require('handlebars');
const fs = require('fs');
const Path = require('path')  
const Axios = require('axios')
// Importing of the libraries mentioned in the Mail for task.

// Starting the 1st task of using axios 
async function downloadJSON () {  
  // URL from the task which is given in mail
  const url = 'http://samples.openweathermap.org/data/2.5/weather?q=London,uk&appid=b6907d289e10d714a6e88b30761fae22'
  const path = Path.resolve('./', 'finalwork.json') //Defines the path where the file will be stored
  const writer = fs.createWriteStream(path) //Writes the JSON file to the path with fs library

  const response = await Axios({
    url,
    method: 'GET',
    responseType: 'stream'
  })

  response.data.pipe(writer)

  // Error Handling
  return new Promise((resolve, reject) => {
    writer.on('finish', resolve)
    writer.on('error', reject)
  })
}

downloadJSON()  //Downloads the JSON file from the link in the path and the name assigned

setTimeout(task2, 5000); //Will wait for JSON file to be downloaded given 5sec gap if not working then increase the time.

// Starting 2nd task of using handlebars and fs
// Second Task if on first run its not working then comment the code below and run it again (because the above code needs time to save finalwork.json file)
function task2() {
  // get your data into a variable
  const inputJson = require('./finalwork.json');
  const outFile = './finalworkreport.html';

  // read the file and use the callback to render
  fs.readFile('./finalweatheroutput.hbs', function(err, data){
    if (!err) {
      // make the buffer into a string
      const source = data.toString();
      // call the render function
      renderToString(source, inputJson);
    } else {
      // handle file read error [currently not neccesary for this test]
    }
  });

  // this will be called after the file is read
  function renderToString(source, data) {
      const template = handlebars.compile(source);
      const outputString = template(data);
      console.log(outputString);
      fs.writeFileSync(outFile, outputString);
      console.log(`File written to ${outFile}`);
      return outputString;
  }

}