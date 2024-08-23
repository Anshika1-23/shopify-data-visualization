// src/components/RepeatCustomers.js
import React, { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import axios from 'axios';

const RepeatCustomers = () => {
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/customers/repeat-customers`
        );

        const data = response.data;
        const labels = ['Repeat Customers', 'Single Purchase Customers'];
        const repeatCustomers = data[0].count;
        const singlePurchaseCustomers = data[1] ? data[1].count : 0;

        setChartData({
          labels: labels,
          datasets: [
            {
              data: [repeatCustomers, singlePurchaseCustomers],
              backgroundColor: [
                'rgba(255, 99, 132, 0.6)',
                'rgba(255, 206, 86, 0.6)',
              ],
            },
          ],
        });
      } catch (error) {
        console.error('Error fetching repeat customers data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Repeat Customers</h2>
      <Doughnut data={chartData} />
    </div>
  );
};

export default RepeatCustomers;
