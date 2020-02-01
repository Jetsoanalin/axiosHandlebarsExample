const handlebars = require('handlebars');
const fs = require('fs');
const Path = require('path')  
const Axios = require('axios')


async function downloadJSON () {  
  const url = 'http://samples.openweathermap.org/data/2.5/weather?q=London,uk&appid=b6907d289e10d714a6e88b30761fae22'
  const path = Path.resolve('./', 'finalwork.json')
  const writer = fs.createWriteStream(path)

  const response = await Axios({
    url,
    method: 'GET',
    responseType: 'stream'
  })

  response.data.pipe(writer)

  return new Promise((resolve, reject) => {
    writer.on('finish', resolve)
    writer.on('error', reject)
  })
}

downloadJSON()  




// get your data into a variable
const inputJson = require('./finalwork.json');
const outFile = './finalworkreport.html';

// read the file and use the callback to render
fs.readFile('./weather.hbs', function(err, data){
  if (!err) {
    // make the buffer into a string
    const source = data.toString();
    // call the render function
    renderToString(source, inputJson);
  } else {
    // handle file read error
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

