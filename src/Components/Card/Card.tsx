/* Context */
import { FoodDataContextProvider } from '../../Context/foodDataContext';

/* Hooks */
import { useAuthContext } from '../../Hooks/useAuthContext';
import { useAuth } from '../../Hooks/useAuth';

/* Components */
import Login from '../Login/Login';
import Register from '../Register/Register';
import NutriInFood from '../NutriInFood/NutriInFood'
import FoodList from '../FoodList/FoodList';
import Chart from '../Chart/Chart';
import Nav from '../Nav/Nav';

/* CSS */
import './Card.css';

function Card() {

    const { user, authIsReady } = useAuthContext();
    const { logout } = useAuth();

    console.log(user, authIsReady);

    return (
        <div className='card'>
            <FoodDataContextProvider >
                <Nav />
                {authIsReady &&
                    <>
                        {!user &&
                            <>
                                <Login />
                                <Register />
                            </>
                        }
                        {user &&
                            <>
                                <NutriInFood />
                                <FoodList />
                                <Chart />
                            </>
                        }
                    </>
                }
                <button onClick={() => logout()}>LOGOUT</button>
            </FoodDataContextProvider>

        </div >
    )
}

export default Card