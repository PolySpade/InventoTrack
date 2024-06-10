import mongoose from 'mongoose';

const roleSchema = new mongoose.Schema({
    roleName: {
        type: String,
        required: true
    },
    permissions: {
        type: [String],
        required: true
    }
});

export const roleModel = mongoose.model('roles', roleSchema);