import React, {useEffect} from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
  } from 'chart.js'
  import { Line } from 'react-chartjs-2'
  
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
  )

const SalesChart = () => {
    let options = {
        responsive: true,
        bezierCurve: false,
        scales: {
            x: {
              grid: {
                display: false
              },
            },
            y: {
              grid: {
                display: false
              }
            }
          },
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
              display: true,
              text: "Sales Analytics"
          }
        }, 
      };
  
    const data = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'],
        datasets: [
            {
                label: 'Sales For 2021',
                fill:true,
                data: [3, 2, 1, 6, 8, 6, 4, 7, 1, 4, 9, 5],
                borderWidth: 2,
                borderColor: ['rgb(255, 99, 132)'],
                backgroundColor: ['rgba(255, 99, 132, 0.5)'],
                lineTension: 0.5, 
            },
            {
                label: 'Sales For 2022',
                data: [6, 4, 7, 1, 4, 3, 2, 1, 6, 8, 4, 3],
                borderWidth: 2,
                borderColor: ['rgb(53, 162, 235)'],
                backgroundColor: ['rgba(53, 162, 235, 0.5)'],
                fill: true,
                lineTension: 0.5, 
            }
        ]
    }
  return (
    <div>
        <Line data={data} options={options} />
    </div>
    );
};

export default SalesChart;
