import React, { useState, useEffect, useRef } from 'react';
import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

function Reports() {
  const [ReportChartData, setReportChartData] = useState(null);
  const ReportChartRef = useRef(null);

  useEffect(() => {
    // Fetch the data from your API endpoint
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/report');
        const data = await response.json();
        setReportChartData(data); // Store the fetched chart data in state
      } catch (error) {
        console.error('Error fetching chart data:', error);
      }
    };

    fetchData(); // Call the fetch function
  }, []);

  if (!ReportChartData) return <div>Loading...</div>; // Wait for data to load

    return (
      <div>
        <h2>Levelized Cost of U.S. Energy Sources in 2024</h2>
      <div className="bar-chart-container">
      <Bar
          ref={ReportChartRef}
          data={ReportChartData}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                display: false,
              },
              tooltip: {
                callbacks: {
                  label: function(tooltipItem) {
                    return tooltipItem.raw + " $/MWh";
                  }
                }
              }
            },
            scales: {
              y: {
                beginAtZero: true,
                title: {
                  display: true,
                  text: 'Cost in $/MWh',
                },
              },
              x: {
                title: {
                  display: true,
                  text: 'Energy Sources',
                },
              },
            },
          }}
        /> {}
      <p>
      The chart displays the levelized cost of energy (LCOE) for various energy sources in the U.S., as reported by Lazard's 2024 Levelized Cost of Energy Report. The LCOE is a metric used to compare the cost of generating electricity from different sources on a consistent basis, accounting for both capital and operational costs over the lifetime of the energy generation technology.
      </p>
      <p>
      In this chart, the costs are represented in $/MWh for each energy source. The data shows that solar ($61/MWh) and wind ($50/MWh) are the least expensive sources of new electricity generation in the U.S., reaffirming their role as the most affordable clean energy options. Nuclear ($182/MWh) and coal ($118/MWh) are among the more expensive sources, while gas combined cycle and gas peaking plants fall in between with costs of $76/MWh and $169/MWh, respectively. Geothermal energy, at $85/MWh, also provides a relatively low-cost option for power generation compared to fossil fuels and nuclear energy.
      </p>
      <p>
      The article, "The Latest Statistics & Trends on U.S. Clean Energy," highlights the growing trend of lower costs for renewable energy sources, positioning solar and wind as the most economically viable options for new energy projects.
      </p>
      </div>
      </div>
    );
  }
  
  export default Reports;