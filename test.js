const handlebars = require('handlebars');
const fs = require('fs');

// get your data into a variable
const fooJson = require('./test.json');
const outFile = './test.html';

// read the file and use the callback to render
fs.readFile('./test.hbs', function(err, data){
  if (!err) {
    // make the buffer into a string
    const source = data.toString();
    // call the render function
    renderToString(source, fooJson);
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