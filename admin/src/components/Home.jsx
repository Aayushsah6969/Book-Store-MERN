import { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register the necessary components with Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Home = () => {
  const [bookCount, setBookCount] = useState(0);
  const [userCount, setUserCount] = useState(0);
  const token = localStorage.getItem('token');  // Assuming JWT is saved in localStorage

  // Fetch book and user counts
  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const bookResponse = await axios.get('http://localhost:3000/book/getbook');
        const userResponse = await axios.get('http://localhost:3000/user/getusers', {
          headers: { Authorization: `Bearer ${token}` }});

        // Set the counts in the state
        setBookCount(bookResponse.data.length);
        setUserCount(userResponse.data.length);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchCounts();
  }, []);

  // Data for the chart
  const data = {
    labels: ['Books', 'Users'], // X-axis labels
    datasets: [
      {
        label: 'Total Count',
        data: [bookCount, userCount], // Data for each label
        backgroundColor: ['rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)'],
        borderColor: ['rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)'],
        borderWidth: 1,
      },
    ],
  };

  // Configuration options for the chart
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top', // Position of the legend
      },
      title: {
        display: true,
        text: 'Book and User Stats', // Title of the chart
      },
    },
  };

  return (
    <div className="container mx-auto my-10 p-5  rounded-lg shadow-md dark:bg-gray-700">
      <h1 className="text-2xl font-bold text-center mb-8 dark:text-white">Admin Dashboard</h1>
      <div className="chart-container mx-auto" style={{ width: '80%', height: '400px' }}>
        {/* Render the Bar chart */}
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default Home;
