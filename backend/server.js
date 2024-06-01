import express from 'express';
import {PORT, mongodbURL} from "./config.js";
import mongoose from "mongoose";

const app = express();

app.use(express.json());

mongoose.connect(mongodbURL)
.then(() => {
    console.log("Connected to InventotrackDB Database");
    app.listen(PORT, () => {
        console.log(`PORT ${PORT} is active`);
    });
})
.catch((err) => {
    console.log(err);
});