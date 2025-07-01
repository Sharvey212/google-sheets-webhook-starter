const express = require("express");
const bodyParser = require("body-parser");
const { google } = require("googleapis");

const app = express();
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;

app.post("/webhook", async (req, res) => {
    try {
        const { message } = req.body;

        const auth = new google.auth.GoogleAuth({
            scopes: ["https://www.googleapis.com/auth/spreadsheets"]
        });
        const sheets = google.sheets({ version: "v4", auth: await auth.getClient() });

        const spreadsheetId = process.env.SHEET_ID;
        const range = "Deals!A1";

        await sheets.spreadsheets.values.append({
            spreadsheetId,
            range,
            valueInputOption: "RAW",
            requestBody: {
                values: [[new Date().toISOString(), message]],
            },
        });

        res.status(200).send("Added to sheet");
    } catch (error) {
        console.error(error);
        res.status(500).send("Failed");
    }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));