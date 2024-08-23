// src/components/NewCustomersOverTime.js
import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';

const NewCustomersOverTime = ({ interval }) => {
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/customers/new-over-time?interval=${interval}`
        );

        const data = response.data;
        const labels = data.map((item) => item._id);
        const customerData = data.map((item) => item.count);

        setChartData({
          labels: labels,
          datasets: [
            {
              label: `New Customers (${interval})`,
              data: customerData,
              backgroundColor: 'rgba(54, 162, 235, 0.6)',
            },
          ],
        });
      } catch (error) {
        console.error('Error fetching new customers data:', error);
      }
    };

    fetchData();
  }, [interval]);

  return (
    <div>
      <h2>New Customers Over Time ({interval})</h2>
      <Bar data={chartData} />
    </div>
  );
};

export default NewCustomersOverTime;
