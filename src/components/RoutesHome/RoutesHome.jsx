import { useHistory } from 'react-router-dom';

function RoutesHome() {

    const history = useHistory();

    const handleAdd = () => {
        history.push('/routes/add')
    }

    return (
        <>
            <div onClick={handleAdd}>
                <h1>ADD</h1>
                <img src="https://karstclimbingkrabi.com/wp-content/uploads/2019/10/Railay_Rock_Climbing_Lead_Course-1024x683.jpg" width="300" height="175"></img>
            </div>
            <div>
                <h1>VIEW ROUTES</h1>
                <img src="https://thumbs.cartowall.com/api/image/69d4be50-26bb-11e8-8912-afb644dc7dac.jpg" width="300" height="175"></img>
            </div>
        </>
    )
}

export default RoutesHome;