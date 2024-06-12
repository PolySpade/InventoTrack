import mongoose from 'mongoose';

const accountSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
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