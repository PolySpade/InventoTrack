import mongoose from 'mongoose';

const expenseSchema = new mongoose.Schema({
    timestamp: {
        type: Date,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    currency: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'currencies',
        required: true
    },
    expensestype: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'expensestypes',
        required: true
    },
    description: {
        type: String,
        default: 'No remarks added...'
    }
});

export const expenseModel = mongoose.model('expenses', expenseSchema);