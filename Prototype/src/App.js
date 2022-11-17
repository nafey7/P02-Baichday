import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Login from './components/Login';
import Product from './components/Product';
import UserHome from './components/UserHome';
import Navbar from './components/Navbar';
import AddProduct from './components/AddProduct';

function App() {
  return (
    <Router>
      <div className="App" style={{height:"100%", backgroundColor:"white", position:"relative", width:"100%", backgroundSize: "cover"}}>
        <Routes>
          <Route path="/" element={<> <Navbar/> <UserHome title="Featured Products"/> </>}/>
          <Route path="/home" element={<> <Navbar/> <UserHome title="Featured Products"/> </>}/>
          <Route path='/login' element={ <Login/> }/>
          <Route path='/product' element={<><Navbar/> <Product/> </>}/>
          <Route path='/AddProduct' element={<><Navbar/> <AddProduct/> </>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
