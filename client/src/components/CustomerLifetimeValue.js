// src/components/CustomerLifetimeValue.js
import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';

const CustomerLifetimeValue = () => {
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/customers/lifetime-value-cohorts`
        );

        const data = response.data;
        const labels = data.map((item) => item._id);
        const lifetimeValue = data.map((item) => parseFloat(item.lifetimeValue));

        setChartData({
          labels: labels,
          datasets: [
            {
              label: 'Customer Lifetime Value',
              data: lifetimeValue,
              backgroundColor: 'rgba(75, 192, 192, 0.6)',
            },
          ],
        });
      } catch (error) {
        console.error('Error fetching customer lifetime value data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Customer Lifetime Value by Cohorts</h2>
      <Bar data={chartData} />
    </div>
  );
};

export default CustomerLifetimeValue;
