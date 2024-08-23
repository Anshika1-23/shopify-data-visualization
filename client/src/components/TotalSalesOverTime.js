// src/components/TotalSalesOverTime.js
import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';

const TotalSalesOverTime = ({ interval }) => {
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/orders/sales-over-time?interval=${interval}`
        );

        const data = response.data;
        const labels = data.map((item) => item._id);
        const salesData = data.map((item) => parseFloat(item.totalSales));

        setChartData({
          labels: labels,
          datasets: [
            {
              label: `Total Sales (${interval})`,
              data: salesData,
              borderColor: 'rgba(75, 192, 192, 1)',
              fill: false,
            },
          ],
        });
      } catch (error) {
        console.error('Error fetching total sales data:', error);
      }
    };

    fetchData();
  }, [interval]);

  return (
    <div>
      <h2>Total Sales Over Time ({interval})</h2>
      <Line data={chartData} />
    </div>
  );
};

export default TotalSalesOverTime;
