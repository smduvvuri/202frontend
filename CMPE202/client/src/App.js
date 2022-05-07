import { BrowserRouter, Switch, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TopNav from "./components/TopNav";
import PrivateRoute from "./components/PrivateRoute";

import Home from "./booking/Home";
import Login from "./auth/Login";
import Register from "./auth/Register";
import AdminDashboard from "./user/adminDashboard";
import UserDashboard from "./user/UserDashboard";
import ModifyHotel from "./hotels/ModifyHotel";
import AddHotel from "./hotels/AddHotel";
import AllHotels from "./hotels/AllHotels";
import HotelManagement from "./user/hotelManagement";
import Profile from "./components/Profile";
import Billing from "./components/Billing";
import Booking from "./components/Booking";
import ListHotels from "./components/ListHotels";
import ListHotelByLocation from "./components/ListHotelByLocation";


function App() {
  return (
    <BrowserRouter>
      <TopNav />
      <ToastContainer position="top-center" />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <PrivateRoute exact path="/adminDashboard" component={AdminDashboard} />
        <PrivateRoute exact path="/userDashboard" component={UserDashboard} />
        {/*<PrivateRoute exact path="/dashboard/seller" component={DashboardSeller}/>*/}
        <PrivateRoute exact path="/profile" component={Profile} />
        <PrivateRoute exact path="/billing" component={Billing} />
        <PrivateRoute exact path="/booking" component={Booking} />
        <PrivateRoute exact path="/listHotels" component={ListHotels} />
        <PrivateRoute exact path="/listHotelByLocation" component={ListHotelByLocation} />
        <PrivateRoute exact path="/hotel/modify" component={ModifyHotel}/>
        <PrivateRoute exact path="/hotel/add" component={AddHotel} />
        <PrivateRoute exact path="/hotel/all" component={AllHotels} />
        <PrivateRoute exact path="/hotelNav" component={HotelManagement} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;