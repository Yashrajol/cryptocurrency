import React, { useState, useEffect } from 'react';
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
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { ChartData } from '../../types/crypto';

// Register ChartJS components
ChartJS.register(
  CategoryScale, 
  LinearScale, 
  PointElement, 
  LineElement, 
  Title, 
  Tooltip, 
  Legend,
  Filler
);

interface CoinChartProps {
  chartData: ChartData;
  coinName: string;
  color?: string;
  days: number;
}

const CoinChart: React.FC<CoinChartProps> = ({ 
  chartData, 
  coinName, 
  color = '#3b82f6', 
  days 
}) => {
  const [chartOptions, setChartOptions] = useState({});
  const [chartInstance, setChartInstance] = useState<any>(null);

  useEffect(() => {
    const isDarkMode = document.documentElement.classList.contains('dark');
    const gridColor = isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)';
    const textColor = isDarkMode ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.7)';

    setChartOptions({
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          mode: 'index',
          intersect: false,
          callbacks: {
            label: function(context: any) {
              return `$ ${context.parsed.y.toLocaleString()}`;
            }
          }
        },
      },
      scales: {
        x: {
          ticks: {
            color: textColor,
            maxRotation: 0,
            autoSkip: true,
            maxTicksLimit: 6,
          },
          grid: {
            display: false,
          },
        },
        y: {
          position: 'right',
          ticks: {
            color: textColor,
            callback: function(value: any) {
              return '$ ' + value.toLocaleString();
            },
          },
          grid: {
            color: gridColor,
          },
        },
      },
      interaction: {
        mode: 'nearest',
        axis: 'x',
        intersect: false
      },
      elements: {
        line: {
          tension: 0.4
        },
        point: {
          radius: 0,
          hitRadius: 10,
          hoverRadius: 5,
        },
      },
    });
  }, []);

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    if (days <= 1) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else if (days <= 30) {
      return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
    } else {
      return date.toLocaleDateString([], { month: 'short', year: 'numeric' });
    }
  };

  const prices = chartData?.prices || [];
  const firstPrice = prices[0]?.[1] || 0;
  const lastPrice = prices[prices.length - 1]?.[1] || 0;
  const priceChange = lastPrice - firstPrice;
  const isPositive = priceChange >= 0;
  
  const gradientColor = isPositive ? color : '#ef4444';

  // Prepare chart data
  const data = {
    labels: prices.map((price) => formatDate(price[0])),
    datasets: [
      {
        label: coinName,
        data: prices.map((price) => price[1]),
        borderColor: gradientColor,
        borderWidth: 2,
        fill: true,
        backgroundColor: (context: any) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 300);
          gradient.addColorStop(0, isPositive ? 'rgba(59, 130, 246, 0.5)' : 'rgba(239, 68, 68, 0.5)');
          gradient.addColorStop(1, isPositive ? 'rgba(59, 130, 246, 0.0)' : 'rgba(239, 68, 68, 0.0)');
          return gradient;
        },
        pointBackgroundColor: gradientColor,
      },
    ],
  };

  return (
    <div className="w-full h-80">
      <Line
        options={chartOptions}
        data={data}
        ref={(reference) => setChartInstance(reference)}
      />
    </div>
  );
};

export default CoinChart;