import mongoose from 'mongoose';

const currencySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
});

export const currencyModel = mongoose.model('currencies', currencySchema);