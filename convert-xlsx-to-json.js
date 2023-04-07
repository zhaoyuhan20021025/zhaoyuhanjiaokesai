const xlsx = require('xlsx');
const fs = require('fs')
export function convertExcelFileToJsonUsingXlsx() {

    // Read the file using pathname
    const file = xlsx.readFile('./序号含经纬度.xlsx');
  
    // Grab the sheet info from the file
    const sheetNames = file.SheetNames;
    const totalSheets = sheetNames.length;
  
    // Variable to store our data
    let parsedData = [];
  
    // Loop through sheets
    for (let i = 0; i < totalSheets; i++) {
  
        // Convert to json using xlsx
        const tempData = xlsx.utils.sheet_to_json(file.Sheets[sheetNames[i]]);
  
        // Skip header row which is the colum names
        tempData.shift();
  
        // Add the sheet's json to our data array
        parsedData.push(...tempData);
    }
  
   // call a function to save the data in a json file
    const outputJson =  generateJSONFile(parsedData);
    const outputJsonContent = JSON.stringify(outputJson,null,'\t');
    fs.writeFileSync('./data/test1.json',outputJsonContent,'utf-8');
}

  /**
   * 
   * @param { {'得分':number,'经度':number,'纬度':number}[]} parsedData
   * @returns {{properties:{},geometry:{type:number,coordinates:[number,number]}}[]} 
   */
  function generateJSONFile(parsedData){
        return parsedData.map(item => {
            return {
                properties:{},
                geometry:{
                    type:item["得分"],
                    coordinates:[ item['经度'],item['纬度']]

                }
            }
        })
  }
