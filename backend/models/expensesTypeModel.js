import mongoose from 'mongoose';

const expensesTypeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
});

export const expensesTypeModel = mongoose.model('expensestypes', expensesTypeSchema);