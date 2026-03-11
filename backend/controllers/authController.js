const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../db');

exports.register = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // Check if user exists
        const userExist = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        if (userExist.rows.length > 0) {
            return res.status(400).json({ error: 'User already exists' });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create user
        const newUser = await pool.query(
            'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING user_id, name, email',
            [name, email, hashedPassword]
        );

        const token = jwt.sign({ id: newUser.rows[0].user_id }, process.env.JWT_SECRET || 'secret', { expiresIn: '1d' });

        res.status(201).json({ user: newUser.rows[0], token });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error during registration' });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        if (user.rows.length === 0) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.rows[0].password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user.rows[0].user_id }, process.env.JWT_SECRET || 'secret', { expiresIn: '1d' });

        res.json({
            user: {
                user_id: user.rows[0].user_id,
                name: user.rows[0].name,
                email: user.rows[0].email
            },
            token
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error during login' });
    }
};
