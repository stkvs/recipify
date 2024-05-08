const fs = require('fs');
const path = require('path');

const datasetFolder = path.join(__dirname, 'Datasets');
const outputFilePath = path.join(__dirname, 'IngredientsJSON.json');

// Read the JSON files
const file1 = fs.readFileSync(path.join(datasetFolder, '1_ingredientList.json'), 'utf8');
const file2 = fs.readFileSync(path.join(datasetFolder, '2_ingredientList.json'), 'utf8');
const file3 = fs.readFileSync(path.join(datasetFolder, '3_ingredientList.json'), 'utf8');

// Parse the JSON data
const data1 = JSON.parse(file1);
const data2 = JSON.parse(file2);
const data3 = JSON.parse(file3);

// Combine all the data into a single array
const combinedData = [...data1, ...data2, ...data3];

// Convert all values to lowercase
const lowercasedData = combinedData.map(item => item.toLowerCase());

// Remove co-existing values
const uniqueData = [...new Set(lowercasedData)];

// Create a new JSON file with the unique list items
fs.writeFileSync(outputFilePath, JSON.stringify(uniqueData, null, 2));

console.log('IngredientsJSON.json file created with unique list items.');