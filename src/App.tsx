import './App.css';

/* Components */
import Card from './Components/Card/Card';

/* Context */
import { AuthContextProvider } from './Context/authContext';

function App() {
  return (
    <AuthContextProvider>
      <Card />
    </AuthContextProvider>

  );
}

export default App;
