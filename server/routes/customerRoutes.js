// routes/customerRoutes.js
const express = require('express');
const router = express.Router();
const Customer = require('../models/Customer');

// routes/customerRoutes.js
router.get('/new-over-time', async (req, res) => {
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
      const newCustomers = await Customer.aggregate([
        {
          $group: {
            _id: groupBy,
            count: { $sum: 1 },
          },
        },
        { $sort: { _id: 1 } },
      ]);
  
      res.json(newCustomers);
    } catch (error) {
      console.error('Error fetching new customers data:', error);
      res.status(500).send('Server Error');
    }
  });

  // routes/customerRoutes.js
router.get('/repeat-customers', async (req, res) => {
    try {
      const repeatCustomers = await Order.aggregate([
        {
          $group: {
            _id: '$customer_id',
            totalPurchases: { $sum: 1 },
          },
        },
        {
          $match: { totalPurchases: { $gt: 1 } },
        },
        {
          $count: 'repeatCustomersCount',
        },
      ]);
  
      const singlePurchaseCustomers = await Order.aggregate([
        {
          $group: {
            _id: '$customer_id',
            totalPurchases: { $sum: 1 },
          },
        },
        {
          $match: { totalPurchases: { $eq: 1 } },
        },
        {
          $count: 'singlePurchaseCustomersCount',
        },
      ]);
  
      res.json({
        repeatCustomers: repeatCustomers[0] ? repeatCustomers[0].repeatCustomersCount : 0,
        singlePurchaseCustomers: singlePurchaseCustomers[0] ? singlePurchaseCustomers[0].singlePurchaseCustomersCount : 0,
      });
    } catch (error) {
      console.error('Error fetching repeat customers data:', error);
      res.status(500).send('Server Error');
    }
  });
  // routes/customerRoutes.js
router.get('/geographical-distribution', async (req, res) => {
    try {
      const geoData = await Customer.aggregate([
        {
          $group: {
            _id: '$default_address.city',
            count: { $sum: 1 },
          },
        },
        { $sort: { count: -1 } },
      ]);
  
      res.json(geoData);
    } catch (error) {
      console.error('Error fetching geographical distribution data:', error);
      res.status(500).send('Server Error');
    }
  });
  // routes/customerRoutes.js
router.get('/lifetime-value-cohorts', async (req, res) => {
    try {
      const cohorts = await Customer.aggregate([
        {
          $lookup: {
            from: 'orders',
            localField: '_id',
            foreignField: 'customer_id',
            as: 'orders',
          },
        },
        {
          $addFields: {
            lifetimeValue: {
              $sum: '$orders.total_price_set',
            },
            cohortMonth: { $month: { date: '$created_at' } },
          },
        },
        {
          $group: {
            _id: '$cohortMonth',
            lifetimeValue: { $sum: '$lifetimeValue' },
          },
        },
        { $sort: { _id: 1 } },
      ]);
  
      res.json(cohorts);
    } catch (error) {
      console.error('Error fetching lifetime value by cohorts data:', error);
      res.status(500).send('Server Error');
    }
  });
  
  
module.exports = router;
