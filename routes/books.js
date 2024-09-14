const express = require('express');
const router = express.Router();
const db = require('../config/db'); 

// Mendapatkan semua buku
router.get('/', (req, res) => {
    db.query('SELECT * FROM books', (err, results) => {
        if (err) {
            console.error('Error fetching books:', err);
            return res.status(500).json({ error: 'Failed to fetch books' });
        }
        res.status(200).json(results);
    });
});

// Menambahkan buku baru
router.post('/', (req, res) => {
    const { code, title, author, stock } = req.body;
    if (!code || !title || !author || stock === undefined) {
        return res.status(400).json({ error: 'All fields are required' });
    }
    db.query('INSERT INTO books (code, title, author, stock) VALUES (?, ?, ?, ?)', [code, title, author, stock], (err, result) => {
        if (err) {
            console.error('Error adding book:', err);
            return res.status(500).json({ error: 'Failed to add book' });
        }
        res.status(201).json({ message: 'Book added successfully', bookId: result.insertId });
    });
});

// Mengupdate buku berdasarkan ID
router.put('/:code', (req, res) => {
    const { code } = req.params;
    const { title, author, stock } = req.body;
    db.query('UPDATE books SET title = ?, author = ?, stock = ? WHERE code = ?', [title, author, stock, code], (err, result) => {
        if (err) {
            console.error('Error updating book:', err);
            return res.status(500).json({ error: 'Failed to update book' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Book not found' });
        }
        res.json({ message: 'Book updated successfully' });
    });
});

// Menghapus buku berdasarkan ID
router.delete('/:code', (req, res) => {
    const { code } = req.params;
    db.query('DELETE FROM books WHERE code = ?', [code], (err, result) => {
        if (err) {
            console.error('Error deleting book:', err);
            return res.status(500).json({ error: 'Failed to delete book' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Book not found' });
        }
        res.json({ message: 'Book deleted successfully' });
    });
});

module.exports = router;
