import { NextResponse } from "next/server";
const path = require('path');
const fs = require("fs");
const csv = require('csv-parser');
export async function POST(request) {
    try {
        // console.log('__________________________________________________________________________');
        const data = await parseCSV();
        // Object.entries(data).forEach(([key, value]) => {
        //   console.log(Column ${key}: ${value});
        // });
        // console.log('+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++', data);
        return NextResponse.json({ data });
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
    }
}

const parseCSV = () => {
    const csvPromise = new Promise((resolve, reject) => {
        let data = [];
        const filePath = path.join(process.cwd(), 'Electric_Vehicle_Population_Data.csv');
        const readStream = fs.createReadStream(filePath);
        // Create a CSV parser
        const csvParser = csv();

        // Counter to keep track of the number of rows read
        let rowCount = 0;

        // Listen for 'data' event to process each row
        csvParser.on('data', (row) => {
            // Increment the row count
            rowCount++;

            // Process the row data (replace this with your logic)
            // console.log(row);
            data.push(row);
            // console.log('row', row);
            // console.log(rowCount);
            // Check if the desired number of rows has been reached
            if (rowCount === 300) {
                // Stop parsing further rows
                readStream.destroy();
                resolve(data);
            }
        });

        // Listen for 'end' event to know when parsing is complete
        csvParser.on('end', () => {
            console.log('CSV parsing complete');
            resolve(data);
        });

        // Listen for 'error' event to handle any errors during parsing
        csvParser.on('error', (error) => {
            console.error('Error parsing CSV:', error);
            // return NextResponse.json({ error: 'Error' });
            reject();

        });

        // Pipe the CSV stream through the parser
        readStream.pipe(csvParser);
    });
    return csvPromise;
}