import { Line } from 'react-chartjs-2';

function Graph () {


const data = {
  labels: ['1', '2', '3', '4', '5', '6'],
  datasets: [
    {
      label: '# of routes (project and sent)',
      data: [12, 19, 3, 5, 2, 3],
      fill: false,
      backgroundColor: 'rgb(255, 99, 132)',
      borderColor: 'rgba(255, 99, 132, 0.2)',
    },
  ],
};

const options = {
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
      },
    ],
  },
};


    return(
        <>
            <h1>Graph</h1>
            <Line data={data} options={options} />
        </>
    )
}

export default Graph;