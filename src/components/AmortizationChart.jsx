import React from 'react';
import styled from 'styled-components';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Chart } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const ChartContainer = styled.div`
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  margin: 2rem 0;
`;

const AmortizationChart = ({ payments }) => {
  const labels = payments.map(payment => payment.number);
  const principalData = payments.map(payment => payment.principal);
  const interestData = payments.map(payment => payment.interest);
  const balanceData = payments.map(payment => payment.balance);

  const options = {
    responsive: true,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    scales: {
      y: {
        type: 'linear',
        display: true,
        position: 'left',
        title: {
          display: true,
          text: 'Principal & Interest ($)',
        },
        ticks: {
          callback: (value) => '$' + value.toLocaleString()
        }
      },
      y1: {
        type: 'linear',
        display: true,
        position: 'right',
        title: {
          display: true,
          text: 'Remaining Balance ($)',
        },
        grid: {
          drawOnChartArea: false,
        },
        ticks: {
          callback: (value) => '$' + value.toLocaleString()
        }
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: function(context) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed.y !== null) {
              label += '$' + context.parsed.y.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
              });
            }
            return label;
          }
        }
      }
    }
  };

  const data = {
    labels,
    datasets: [
      {
        type: 'bar',
        label: 'Principal',
        data: principalData,
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
        yAxisID: 'y',
      },
      {
        type: 'bar',
        label: 'Interest',
        data: interestData,
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        yAxisID: 'y',
      },
      {
        type: 'line',
        label: 'Remaining Balance',
        data: balanceData,
        borderColor: 'rgb(75, 192, 192)',
        borderWidth: 2,
        fill: false,
        yAxisID: 'y1',
      },
    ],
  };

  return (
    <ChartContainer>
      <Chart type="bar" options={options} data={data} />
    </ChartContainer>
  );
};

export default AmortizationChart;
