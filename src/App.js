
import './App.css';
import { Outlet } from 'react-router-dom';


import NavBar from './componentes/navBar';


function App() {
  return (
    <div >

      <NavBar>
        <Outlet></Outlet>
      </NavBar>




    </div>
  );
}

export default App;
