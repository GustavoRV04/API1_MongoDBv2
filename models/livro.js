import mongoose from "mongoose";
import Author from "./author.js";

const bookSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    autor: {
        type: mongoose.Schema.Types.ObjectId, // Referência ao modelo Author
        ref: "Author", // O nome do modelo que estamos referenciando
        required: true
    },

    Dtregistro: {
        type: Date,
        default: Date.now()
    },
    Status: {
        type: String,
        required: true
    }
})

export default mongoose.model('Book', bookSchema)