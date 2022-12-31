// import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Login from './components/Login';
import Product from './components/Product';
import UserHome from './components/UserHome';
import Navbar from './components/Navbar';
import AddProduct from './components/AddProduct';
import AboutUs from './components/AboutUs';
import Footer from './components/Footer';
import AdminHome from './components/AdminHome.js';
import CustomerProfile from './components/CustomerProfile';
import History from './components/History';

function App() {
  return (
    <Router>
      <div className="App" style={{height:"100%", backgroundColor:"white", position:"relative", width:"100%", backgroundSize: "cover"}}>
        <Routes>
          <Route path="/" element={<> <Navbar/> <UserHome title="Featured Products"/><Footer/> </>}/>
          <Route path="/category" element={<> <Navbar/> <UserHome title="Browse"/><Footer/> </>}/>
          <Route path='/login' element={ <Login/> }/>
          <Route path='/product' element={<><Navbar/> <Product/><Footer/> </>}/>
          <Route path='/AddProduct' element={<><Navbar/> <AddProduct/><Footer/> </>}/>
          <Route path='/AboutUs' element={<><Navbar/> <AboutUs/><Footer/> </>}/>
          <Route path='/CustomerProfile' element={<><Navbar/><CustomerProfile/><Footer/></>}/>
          <Route path='/Admin' element={<AdminHome/>}/>
          <Route path='/history' element={<><Navbar/><History/><Footer/></>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
