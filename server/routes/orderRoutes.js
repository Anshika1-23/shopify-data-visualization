// routes/orderRoutes.js
const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

// Example route: Total Sales Over Time
// routes/orderRoutes.js
router.get('/sales-over-time', async (req, res) => {
    const interval = req.query.interval || 'monthly';
  
    let groupBy;
    switch (interval) {
      case 'daily':
        groupBy = { $dayOfMonth: '$created_at' };
        break;
      case 'monthly':
        groupBy = { $month: '$created_at' };
        break;
      case 'quarterly':
        groupBy = { $concat: [{ $month: '$created_at' }, 'Q'] };
        break;
      case 'yearly':
        groupBy = { $year: '$created_at' };
        break;
      default:
        groupBy = { $month: '$created_at' };
    }
  
    try {
      const salesData = await Order.aggregate([
        {
          $group: {
            _id: groupBy,
            totalSales: { $sum: '$total_price_set' },
          },
        },
        { $sort: { _id: 1 } },
      ]);
  
      res.json(salesData);
    } catch (error) {
      console.error('Error fetching total sales data:', error);
      res.status(500).send('Server Error');
    }
  });
  
  // routes/orderRoutes.js
router.get('/sales-growth-rate', async (req, res) => {
    const interval = req.query.interval || 'monthly';
  
    let groupBy;
    switch (interval) {
      case 'daily':
        groupBy = { $dayOfMonth: '$created_at' };
        break;
      case 'monthly':
        groupBy = { $month: '$created_at' };
        break;
      case 'quarterly':
        groupBy = { $concat: [{ $month: '$created_at' }, 'Q'] };
        break;
      case 'yearly':
        groupBy = { $year: '$created_at' };
        break;
      default:
        groupBy = { $month: '$created_at' };
    }
  
    try {
      const salesData = await Order.aggregate([
        {
          $group: {
            _id: groupBy,
            totalSales: { $sum: '$total_price_set' },
          },
        },
        { $sort: { _id: 1 } },
      ]);
  
      const growthRates = salesData.map((data, index, array) => {
        if (index === 0) return { _id: data._id, growthRate: 0 };
        const previous = array[index - 1].totalSales;
        const current = data.totalSales;
        const growthRate = ((current - previous) / previous) * 100;
        return { _id: data._id, growthRate };
      });
  
      res.json(growthRates);
    } catch (error) {
      console.error('Error fetching sales growth rate data:', error);
      res.status(500).send('Server Error');
    }
  });
  

module.exports = router;
