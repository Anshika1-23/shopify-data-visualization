// src/components/CustomerGeography.js
import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import axios from 'axios';

const CustomerGeography = () => {
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/customers/geographical-distribution`
        );

        const data = response.data;
        const labels = data.map((item) => item._id);
        const customerCount = data.map((item) => item.count);

        setChartData({
          labels: labels,
          datasets: [
            {
              data: customerCount,
              backgroundColor: [
                'rgba(255, 99, 132, 0.6)',
                'rgba(54, 162, 235, 0.6)',
                'rgba(255, 206, 86, 0.6)',
                'rgba(75, 192, 192, 0.6)',
                'rgba(153, 102, 255, 0.6)',
                'rgba(255, 159, 64, 0.6)',
              ],
            },
          ],
        });
      } catch (error) {
        console.error('Error fetching geographical distribution data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Customer Geographical Distribution</h2>
      <Pie data={chartData} />
    </div>
  );
};

export default CustomerGeography;
