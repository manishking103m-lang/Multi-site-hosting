const express = require('express');
const router = express.Router();
const { requireAuth, requireAdmin } = require('../middleware/auth');

// Get platform statistics
router.get('/stats', requireAdmin, (req, res) => {
  res.json({
    totalSites: 42,
    activeSites: 38,
    totalUsers: 156,
    activeUsers: 89,
    totalBandwidth: '1.2 TB',
    uptime: '99.9%'
  });
});

// Get users
router.get('/users', requireAdmin, (req, res) => {
  res.json({
    users: [
      { id: 1, name: 'User 1', email: 'user1@example.com', sites: 5 },
      { id: 2, name: 'User 2', email: 'user2@example.com', sites: 3 },
    ]
  });
});

// Get analytics
router.get('/analytics', requireAdmin, (req, res) => {
  res.json({
    daily: [{ date: new Date(), requests: 1000, bandwidth: '50 MB' }],
    topSites: [
      { name: 'Site 1', requests: 500, bandwidth: '25 MB' },
      { name: 'Site 2', requests: 300, bandwidth: '15 MB' },
    ]
  });
});

module.exports = router;
