const fs = require('fs');
const csvParser = require('csv-parser');
const path = require('path');

exports.getPrice = async (req, res) => {
    const { crop, state } = req.body;

    if (!crop || !state) {
        return res.status(400).json({ error: 'Crop, state, and monthYear are required.' });
    }

    const Crop = crop.replace(/\s+/g, ' ');
    const State = state.replace(/\s+/g, ' ');
    const MonthYear = monthYear.trim();
    console.log(`Searching for crop: ${Crop}, state: ${State}, monthYear: ${MonthYear}`);

    try {
        let foundPrice;
        const datapath = path.join(__dirname, '../data', `output_prediction.csv`);
        const csvStream = fs.createReadStream(datapath).pipe(csvParser());

        csvStream.on('data', (row) => {
            if (row['state'] === State && column['crop'] === Crop) {
                foundPrice = row[Crop];
                console.log(`Found price: ${foundPrice} for ${State} in ${MonthYear}`);
            }
        });

        csvStream.on('end', () => {
            if (foundPrice !== undefined) {
                res.json({
                    crop: Crop,
                    state: State,
                    monthYear: MonthYear,
                    price: foundPrice
                });
            } else {
                res.status(404).json({ error: `No data found for ${State} in ${MonthYear}` });
            }
        });

        csvStream.on('error', (err) => {
            console.error(err);
            res.status(500).json({ error: 'Error reading data file' });
        });

    } catch (err) {
        console.error('Error opening CSV file:', err);
        res.status(500).json({ error: 'Error accessing data file' });
    }
};
