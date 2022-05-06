/* Context */
import { FoodDataContextProvider } from '../../Context/foodDataContext';

/* Hooks */
import { useAuthContext } from '../../Hooks/useAuthContext';
import { useAuth } from '../../Hooks/useAuth';

/* Components */
import Login from '../Login/Login';
import NutriInFood from '../NutriInFood/NutriInFood'
import FoodList from '../FoodList/FoodList';
import Chart from '../Chart/Chart';
import Nav from '../Nav/Nav';
import LogoutBtn from '../LogoutBtn/LogoutBtn';
import FoodHistory from '../FoodHistory/FoodHistory';

/* CSS */
import './Card.css';

function Card() {

    const { user, authIsReady } = useAuthContext();


    return (
        <div className='card'>
            <FoodDataContextProvider >
                <Nav />
                {authIsReady &&
                    <>
                        {!user &&
                            <>
                                <Login />
                            </>
                        }
                        {user &&
                            <>
                                <NutriInFood />
                                 <LogoutBtn />
                                <Chart />
                                <FoodList />
                                <FoodHistory />
                            </>
                        }
                    </>
                }

            </FoodDataContextProvider>

        </div >
    )
}

export default Card