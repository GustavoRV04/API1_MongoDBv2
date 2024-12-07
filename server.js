import express from 'express';
import mongoose from 'mongoose';

import User from './models/user.js';
import Livro from './models/livro.js';
import Author from './models/author.js';

const app = express();
app.use(express.json());

// Usuarios
app.post('/usuarios', async (req, res) => {
    try {
        const newUser = await User.create(req.body);
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.get('/usuarios', async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.put('/usuarios/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const updatedUser = await User.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Rota para deletar um usuário
app.delete('/usuarios/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const deletedUser = await User.findByIdAndDelete(id);
        if (!deletedUser) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }
        res.status(200).json({ message: 'Usuário deletado com sucesso' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Livros

app.post('/livros', async (req, res) => {
    try {
        const { nome, autor, Status } = req.body;

        // Verificar se o autor existe
        const authorExists = await Author.findById(autor);
        if (!authorExists) {
            return res.status(400).json({ message: 'Autor não encontrado' });
        }

        // Criar o livro
        const newBook = await Livro.create({
            nome,
            autor,  // ID do autor
            Status
        });

        // Populando o autor no livro para retornar o objeto completo
        const bookWithAuthor = await Livro.findById(newBook._id).populate('autor');

        res.status(201).json(bookWithAuthor);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.get('/livros', async (req, res) => {
    try {
        // Buscar todos os livros e popular o campo "autor" com as informações do autor
        const books = await Livro.find().populate('autor');

        // Retornar os livros com as informações completas (incluindo autor)
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


//app.get('/livros', async (req, res) => {
//    try {
 //       const books = await Livro.find();
 //       res.status(200).json(books);
//    } catch (error) {
//        res.status(500).json({ error: error.message });
//    }
//});

app.put('/livros/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const updatedBook = await Livro.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedBook) {
            return res.status(404).json({ message: 'Livro não encontrado' });
        }
        res.status(200).json(updatedBook);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Rota para deletar um livro
app.delete('/livros/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const deletedLivro = await Livro.findByIdAndDelete(id);
        if (!deletedLivro) {
            return res.status(404).json({ message: 'Livro não encontrado' });
        }
        res.status(200).json({ message: 'Livro deletado com sucesso' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Criar um autor
app.post('/autores', async (req, res) => {
    try {
        const newAuthor = await Author.create(req.body);
        res.status(201).json(newAuthor);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Listar todos os autores
app.get('/autores', async (req, res) => {
    try {
        const authors = await Author.find();
        res.status(200).json(authors);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Atualizar um autor
app.put('/autores/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const updatedAuthor = await Author.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedAuthor) {
            return res.status(404).json({ message: 'Autor não encontrado' });
        }
        res.status(200).json(updatedAuthor);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Deletar um autor
app.delete('/autores/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const deletedAuthor = await Author.findByIdAndDelete(id);
        if (!deletedAuthor) {
            return res.status(404).json({ message: 'Autor não encontrado' });
        }
        res.status(200).json({ message: 'Autor deletado com sucesso' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

mongoose.connect('mongodb+srv://gustavoroviana:Mrgustavo04.@apitrab1.kipll.mongodb.net/?retryWrites=true&w=majority&appName=APITrab1')
    .then(() => console.log("Banco de dados conectado"))
    .catch(() => console.log("deu ruim"));

app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000");
});

