import { projectAuth } from '../DataBase/config';

/* Hooks */
import { useAuthContext } from './useAuthContext';

export const useAuth = () => {

    const { dispatch } = useAuthContext();

    const login = async (email: string, password: string) => {
        try {
            const res = await projectAuth.signInWithEmailAndPassword(email, password);
            dispatch({ type: 'LOGIN', payload: res.user });
        } catch (error) {
            console.log(error);
        }
    }

    const register = async (email: string, password: string) => {
        try {
            const res = await projectAuth.createUserWithEmailAndPassword(email, password);
            dispatch({ type: 'LOGIN', payload: res.user });
        } catch (error) {
            console.log(error);
        }
    }

    const logout = async () => {
        try {
            await projectAuth.signOut();

            dispatch({ type: 'LOGOUT' });
        } catch (error) {
            console.log(error);
        }
    }

    return { login, register, logout };
}

