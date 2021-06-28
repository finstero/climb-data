import { useHistory } from 'react-router-dom';

function ClimbHome() {

    const history = useHistory();

    // move user to RoutesHome
    const handleRoutesClick = () => {
        history.push('/routes/home');
    }

    return (
        <>
            <div onClick={handleRoutesClick}>
                <h1>Routes</h1>
                <img src="https://sendedition.com/wp-content/uploads/2020/05/how-climbing-routes-are-graded.jpg" width="300" height="175"></img>
            </div>

            <div>
                <h1>Benchmarks</h1>
                <img src="http://www.erichsachs.com/wp-content/uploads/2017/08/Hangboard-1.jpg" width="300" height="175"></img>
            </div>

        </>
    )
}

export default ClimbHome;