import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from 'chart.js';
import React, { useMemo } from 'react';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);


const ChartColumn = ({ number, data }) => {
  const options = useMemo(() => (
    {
      responsive: true,
      plugins: {
        legend: {
          position: 'top' as const,
        },
        title: {
          display: true,
          text: 'Kết quả kiểm tra gần đây',
        },
      },
      scales: {
        y: {
          min: 0,
          max: number,
        },
        
      }
    }
  ), [number])

  return (
    <Bar options={options} data={{
      labels: data.label,
      datasets: [
        {
          label: 'Điểm số',
          data: data.value,
          backgroundColor: 'rgba(53, 162, 235, 0.5)',
          barThickness: 50,
          // barPercentage: 0.4
        },
      ],
    }}
    />
  )
}

export default React.memo(ChartColumn);