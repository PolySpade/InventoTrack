import mongoose from 'mongoose';

const accountSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    role: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'roles',
        required: true
    }
});

export const accountModel = mongoose.model('accounts', accountSchema);