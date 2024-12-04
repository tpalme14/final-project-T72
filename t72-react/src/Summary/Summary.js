import React, { useState, useEffect, useRef } from 'react';
import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

function Summary() {
  const [chartData, setChartData] = useState(null);
  const chartRef = useRef(null);

  useEffect(() => {
    // Fetch the data from your API endpoint
    const fetchData = async () => {
      try {
        const response = await fetch('http://142.93.3.229:3000/api/summary');
        const data = await response.json();
        setChartData(data); // Store the fetched chart data in state
      } catch (error) {
        console.error('Error fetching chart data:', error);
      }
    };

    fetchData(); // Call the fetch function
  }, []);

  if (!chartData) return <div>Loading...</div>; // Wait for data to load

  return (
    <div>
      <h2>Total sales of new EVs</h2>
      <div className="bar-chart-container">
      <Bar
          ref={chartRef}
          data={chartData}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                display: false,
              },
            },
            scales: {
              y: {
                beginAtZero: true,
                title: {
                  display: true,
                  text: 'Total sales of new EVs',
                },
              },
              x: {
                title: {
                  display: true,
                  text: 'Year',
                },
              },
            },
          }}
        /> {}
      <p>
      The data presented in the chart shows the significant growth in U.S. electric vehicle (EV) sales over a five-year period, from 2019 to 2023. Sales began at 244,569 units in 2019 and steadily rose each year, with a sharp increase in 2021 and 2022, culminating in 873,082 units in 2023. This growth reflects a broader trend toward mass adoption of electric vehicles in the U.S., as highlighted in an article titled "10 Charts That Sum Up 2023’s Clean Energy Progress." The article emphasizes that the U.S. EV market is thriving, with sales surpassing the 1 million mark for the first time in 2023. This milestone is driven by factors like federal and state incentives, price reductions from automakers, and increasing consumer awareness, making EVs increasingly competitive with traditional gasoline-powered vehicles.
      </p>
      <p>
        Source: Cox Automotive
      </p>
      </div>
    </div>
  );
};

export default Summary;