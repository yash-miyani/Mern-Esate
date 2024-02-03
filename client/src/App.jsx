import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Components/Header";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Profile from "./Pages/Profile";
import SignIn from "./Pages/SignIn";
import SignUp from "./Pages/SignUp";
import PrivateProvider from "./Components/PrivateProvider";
import CreatingListing from "./Pages/CreatingListing";
import UpdateListing from "./Pages/UpdateListing";
import Listing from "./Pages/Listing";
import Search from "./Pages/Search";

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/listing/:listingId" element={<Listing />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/search" element={<Search />} />

        <Route element={<PrivateProvider />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/createlisting" element={<CreatingListing />} />
          <Route path="/updateListing/:listingId" element={<UpdateListing />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
