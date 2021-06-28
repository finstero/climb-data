import { useHistory } from 'react-router-dom';


function AddRoute() {

    const history = useHistory();


    return (
        <>
            <label for="grades">Choose a grade:</label>

            <select name="grades" id="grades">
                <option value="volvo">Volvo</option>
                <option value="saab">Saab</option>
                <option value="mercedes">Mercedes</option>
                <option value="audi">Audi</option>
            </select>
        </>
    )
}

export default AddRoute;