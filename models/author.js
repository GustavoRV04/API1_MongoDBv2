import mongoose from 'mongoose';

const authorSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    dataNascimento: {
        type: Date,
        required: true
    }
});

export default mongoose.model('Author', authorSchema);
