import { useAuth } from '../../Hooks/useAuth';

/* CSS */
import './LogoutBtn.css';

function LogoutBtn() {
    const { logout } = useAuth();

    return (
        <button className='logoutBtn' onClick={() => logout()}>Logout</button>
    )
}

export default LogoutBtn