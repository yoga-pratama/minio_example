require('dotenv').config();


const express = require("express");
const bodyParser = require("body-parser");
const port = process.env.PORT || 3000;

const uploadRoutes = require("./routes/upload-routes");


const app = express();
app.use(bodyParser.json());


app.use('/api' , uploadRoutes);



app.use((req, res, next) => {
    const error = new HttpError("Could not find this route.", 404);
    throw error;
});

app.listen(process.env.PORT || 3000);