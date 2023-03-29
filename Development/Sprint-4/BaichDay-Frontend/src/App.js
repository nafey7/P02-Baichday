// import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Login from './components/Login';
import Product from './components/Product';
import UserHome from './components/UserHome';
import Navbar from './components/Navbar';
import AddProduct from './components/AddProduct';
import AboutUs from './components/AboutUs';
import ContactUs from './components/ContactUs';
import Footer from './components/Footer';
import AdminHome from './components/AdminHome.js';
import CustomerProfile from './components/CustomerProfile';
import History from './components/History';
import ChatBot from './components/ChatBot';
import AdminNavbar from './components/AdminNavbar';
import Payment from './components/Payment';
import Wallet from './components/Wallet';
import UserChat from './components/UserChat';
import ChatList from './components/ChatList';
import PinAuthentication from './components/PinAuthentication';
import SellerHistory from './components/SellerHistory';
import Userlist from './components/Userlist';
import Productlist from './components/Productlist';

function App() {
  return (
    <Router>
      <div className="App" style={{backgroundColor:"#c8c8c8", backgroundRepeat: 'repeat', position:"relative", width:"100%", backgroundSize: "auto", minHeight: "100vh"}}>
        <Routes>
          <Route path="/" element={<> <Navbar/> <UserHome title="Featured Products"/><ChatBot/><Footer/> </>}/>
          <Route path="/collectibles" element={<> <Navbar/> <UserHome title="Collectibles"/><ChatBot/><Footer/> </>}/>
          <Route path="/sporting" element={<> <Navbar/> <UserHome title="Sporting"/><ChatBot/><Footer/> </>}/>
          <Route path="/electronics" element={<> <Navbar/> <UserHome title="Electronics"/><ChatBot/><Footer/> </>}/>
          <Route path="/fashion" element={<> <Navbar/> <UserHome title="Fashion"/><ChatBot/><Footer/> </>}/>
          <Route path="/toy" element={<> <Navbar/> <UserHome title="Toy"/><ChatBot/><Footer/> </>}/>
          <Route path="/music" element={<> <Navbar/> <UserHome title="Music"/><ChatBot/><Footer/> </>}/>
          <Route path="/cars" element={<> <Navbar/> <UserHome title="Cars"/><ChatBot/><Footer/> </>}/>
          <Route path="/other" element={<> <Navbar/> <UserHome title="Other"/><ChatBot/><Footer/> </>}/>
          <Route path='/login' element={ <Login/> }/>
          <Route path='/wallet' element={<><Navbar/><Wallet/> <Footer/> </>}/>
          <Route path='/product' element={<><Navbar/> <Product/><ChatBot/><Footer/> </>}/>
          <Route path='/AddProduct' element={<><Navbar/> <AddProduct/><ChatBot/><Footer/> </>}/>
          <Route path='/AboutUs' element={<><Navbar/> <AboutUs/><ChatBot/><Footer/> </>}/>
          <Route path='/ContactUs' element={<><Navbar/> <ContactUs/><Footer/> </>}/>
          <Route path='/CustomerProfile' element={<><Navbar/><CustomerProfile/><ChatBot/><Footer/></>}/>
          <Route path='/Admin' element={<><AdminNavbar/><AdminHome/></>}/>
          <Route path='/userlist' element={<><AdminNavbar/><Userlist/></>}/>
          <Route path='/productlist' element={<><AdminNavbar/><Productlist/></>}/>
          <Route path='/history' element={<><Navbar/><History/><ChatBot/></>}/>
          <Route path='/myproducts' element={<><Navbar/><SellerHistory/><ChatBot/></>}/>
          <Route path='/payment' element={<><Navbar/><Payment/><Footer/></>}/>
          <Route path='/chatlist' element={<><Navbar/><ChatList/></>}/>
          <Route path='/userchat' element={<><Navbar/><UserChat/></>}/>
          <Route path='/pinauthentication' element={<><PinAuthentication/></>}/>

        </Routes>
      </div>
    </Router>
  );
}

export default App;
