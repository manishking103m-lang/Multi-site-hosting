const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

// Login
router.post('/login', (req, res) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password required' });
    }

    // Mock validation
    if (email === 'admin@example.com' && password === 'admin123') {
      const token = jwt.sign(
        { id: 1, email, role: 'admin' },
        process.env.JWT_SECRET || 'secret',
        { expiresIn: '7d' }
      );
      return res.json({ token });
    }

    res.status(401).json({ error: 'Invalid credentials' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Register
router.post('/register', (req, res) => {
  try {
    const { email, password, name } = req.body;
    
    if (!email || !password || !name) {
      return res.status(400).json({ error: 'All fields required' });
    }

    const token = jwt.sign(
      { id: Date.now(), email, name, role: 'user' },
      process.env.JWT_SECRET || 'secret',
      { expiresIn: '7d' }
    );

    res.status(201).json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
