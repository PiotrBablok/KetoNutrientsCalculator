/* Context */
import { FoodDataContextProvider } from '../../Context/foodDataContext';

/* Components */
import NutriInFood from '../NutriInFood/NutriInFood'
import FoodList from '../FoodList/FoodList';
import Chart from '../Chart/Chart';

/* CSS */
import './Card.css';

function Card() {
    return (
        <div className='card'>
            <FoodDataContextProvider >
                <NutriInFood />
                <FoodList />
                <Chart />
            </FoodDataContextProvider>

        </div>
    )
}

export default Card