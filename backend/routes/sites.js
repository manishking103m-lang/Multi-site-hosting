const express = require('express');
const router = express.Router();
const { requireAuth } = require('../middleware/auth');

// Get all sites
router.get('/', async (req, res) => {
  try {
    res.json({
      sites: [
        { id: 1, name: 'Site 1', domain: 'site1.local', status: 'active' },
        { id: 2, name: 'Site 2', domain: 'site2.local', status: 'active' },
      ]
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create new site
router.post('/', requireAuth, async (req, res) => {
  try {
    const { name, domain, template } = req.body;
    
    if (!name || !domain) {
      return res.status(400).json({ error: 'Name and domain are required' });
    }

    res.status(201).json({
      id: Date.now(),
      name,
      domain,
      template: template || 'blank',
      status: 'creating',
      createdAt: new Date()
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get site details
router.get('/:id', async (req, res) => {
  try {
    res.json({
      id: req.params.id,
      name: 'Sample Site',
      domain: 'sample.local',
      status: 'active',
      createdAt: new Date()
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update site
router.put('/:id', requireAuth, async (req, res) => {
  try {
    const { name, settings } = req.body;
    res.json({
      id: req.params.id,
      name: name || 'Updated Site',
      settings: settings || {},
      updatedAt: new Date()
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete site
router.delete('/:id', requireAuth, async (req, res) => {
  try {
    res.json({ success: true, message: 'Site deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
