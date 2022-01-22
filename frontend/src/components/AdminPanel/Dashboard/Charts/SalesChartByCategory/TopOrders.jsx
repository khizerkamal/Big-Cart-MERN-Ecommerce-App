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
    Filler,
    ArcElement
  } from 'chart.js'
  import { Doughnut } from 'react-chartjs-2'
  
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler,
    ArcElement
  )

const TopOrders = () => {
    let options = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
        }, 
      };
  
    const data = {
        labels: ['Laptops', 'Cloths', 'cosmetics', 'food', 'sports'],
        datasets: [
            {
                label: 'Sales For 2021',
                fill:true,
                data: [3, 2, 1, 6, 8],
                borderWidth: 2,
                // borderColor: ['rgb(255, 99, 132)'],
                backgroundColor: [
                    'rgba(250, 82, 82)',
                    'rgba(255, 189, 94)',
                    'rgba(60, 218, 187)',
                    'rgba(255, 99, 132)',
                    'rgba(77, 160, 255)',
                ],
                lineTension: 0.5, 
            }
        ]
    }
  return (
    <div>
        <Doughnut data={data} options={options} />
    </div>
    );
};

export default TopOrders;
