import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons'

import './App.css';
import Password from './Components/Password';
import AddToCart from './Components/AddToCart/AddToCart';

function App() {
  return (
    <div className="App">
      {/* <Password /> */}
      <AddToCart />
    </div>
  );
}

export default App;
