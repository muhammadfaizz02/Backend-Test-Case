const express = require('express');
const router = express.Router();
const db = require('../config/db'); 

// Mendapatkan semua member
router.get('/', (req, res) => {
    db.query('SELECT * FROM members', (err, results) => {
        if (err) {
            console.error('Error fetching members:', err);
            return res.status(500).json({ error: 'Failed to fetch members' });
        }
        res.status(200).json(results);
    });
});

// Menambahkan member baru
router.post('/', (req, res) => {
    const { code, name } = req.body;
    if (!code || !name) {
        return res.status(400).json({ error: 'All fields are required' });
    }
    db.query('INSERT INTO members (code, name) VALUES (?, ?)', [code, name], (err, result) => {
        if (err) {
            console.error('Error adding member:', err);
            return res.status(500).json({ error: 'Failed to add member' });
        }
        res.status(201).json({ message: 'Member added successfully', memberId: result.insertId });
    });
});

// Mengupdate member berdasarkan ID
router.put('/:code', (req, res) => {
    const { code } = req.params;
    const { name } = req.body;
    db.query('UPDATE members SET name = ? WHERE code = ?', [name, code], (err, result) => {
        if (err) {
            console.error('Error updating member:', err);
            return res.status(500).json({ error: 'Failed to update member' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Member not found' });
        }
        res.json({ message: 'Member updated successfully' });
    });
});

// Menghapus member berdasarkan ID
router.delete('/:code', (req, res) => {
    const { code } = req.params;
    db.query('DELETE FROM members WHERE code = ?', [code], (err, result) => {
        if (err) {
            console.error('Error deleting member:', err);
            return res.status(500).json({ error: 'Failed to delete member' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Member not found' });
        }
        res.json({ message: 'Member deleted successfully' });
    });
});

module.exports = router;
