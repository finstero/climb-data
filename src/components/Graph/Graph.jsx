import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { Line } from 'react-chartjs-2';

// material ui
import Button from '@material-ui/core/Button';

function Graph() {

    const history = useHistory();
    const allGraph = useSelector(store => store.graphs.allGraph);

    const data = {
        // labels: ['1', '2', '3', '4', '5', '6'],
        datasets: [
            {
                label: '# of routes (project and sent)',
                data: allGraph,
                fill: false,
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgba(255, 99, 132, 0.2)',
            },
        ],
    };

    const options = {
        parsing: {
            xAxisKey: 'grade',
            yAxisKey: 'count'
        },
        scales: {
            yAxis: {   
                    min: 0,
                    ticks: {
                        beginAtZero: true,
                        stepSize: 1,
                    },
                },
        },
    };

    const handleBack = () => {
        history.push('/routes/list')
    }


    return (
        <>
            <h2>All Routes</h2>
            <Line data={data} options={options} />
            <Button onClick={handleBack}>Back</Button>
        </>
    )
}

export default Graph;