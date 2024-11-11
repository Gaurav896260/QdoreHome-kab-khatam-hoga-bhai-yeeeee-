import React from "react";
import "./App.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Home from "./pages/Home";
import ContactUs from "./pages/ContactUs";
import B2B from "./pages/B2B";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import OurStory from "./pages/OurStory";
import ShopAll from "./pages/OurCollection/ShopAll.jsx";
import Furniture from "./pages/ProductList/Furniture";
import Decor from "./pages/ProductList/Decor";
import PlantersAndVases from "./pages/PlantersAndVases/PlantersAndVases.jsx";
import Auth from "./pages/Auth";
import SideTable from "./pages/Furniture/SideTable.jsx";
import SideTableProduct from "./pages/Furniture/SideTableProduct.jsx";
import Cart from "./pages/Cart.jsx";
import OrderAddress from "./pages/OrderAddress.jsx";
import Checkout from "./pages/Checkout.jsx";
import Admin from "./pages/Admin.jsx";
import WoodenCollection from "./pages/Wooden/WoodenProduct.jsx";
import MyProfile from "./pages/MyProfile.jsx";
import CandleHolder from "./pages/Decor/CandleHolder.jsx";
import CandleHolderProduct from "./pages/Decor/CandleHolderProduct.jsx";
import ObjectDecor from "./pages/Decor/ObjectDecor.jsx";
import ObjectDecorProduct from "./pages/Decor/ObjectDecorProducts.jsx";
import MercuryCollection from "./pages/Mercury/MercuryProduct.jsx";
import MercuryProductDesc from "./pages/Mercury/MercuryProductDesc.jsx";
import WoodenProductDesc from "./pages/Wooden/WoodenProductsDesc.jsx";
import Videos from "./pages/Videos.jsx";
import PlantersAndVasesDesc from "./pages/PlantersAndVases/PlantersAndVasesDesc.jsx";
import ServewareProduct from "./pages/Serveware/ServewareProduct.jsx";
import ServewaresDesc from "./pages/Serveware/ServewareProductDesc.jsx";
import PrivacyPolicy from "./pages/PrivacyPolicy.jsx";
import TermsAndConditions from "./pages/TermsAndConditions.jsx";
import CompleteProfile from "./pages/CompleteProfile.jsx";
import AddPhone from "./pages/AddPhone.jsx";
import OrderDetailPage from "./pages/OrderDetailsPage.jsx";
import TrackOrderPage from "./pages/TrackOrder.jsx";
import ReturnOrderPage from "./pages/ReturnPageOrder.jsx";
import AddressSelection from "./pages/AddressSelection.jsx";
import AddressForm from "./pages/AddressForm.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";
import ShippingPolicy from "./pages/ShippingPolicy.jsx";
import ReturnPolicy from "./pages/ReturnPolicy.jsx";
import PhoneVerification from "./pages/OTPbeforecheckout.jsx";
import ChangePassword from "./pages/ChangePassword";
import ForgotPassword from "./pages/ForgotPassword";
import Checko from "./pages/Check.jsx";
const PrivateRoute = ({ element: Component }) => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  if (!userInfo) {
    // Redirect to auth page if user is not logged in
    return <Navigate to="/auth" replace />;
  }

  return Component;
};

const App = () => {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/ourStory" element={<OurStory />} />
        <Route path="/contactUs" element={<ContactUs />} />
        <Route path="/b2b" element={<B2B />} />
        <Route path="/ourCollection" element={<ShopAll />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/furniture" element={<Furniture />} />
        <Route path="/decor" element={<Decor />} />
        <Route path="/servewares" element={<ServewareProduct />} />
        <Route path="/servewares/:productId" element={<ServewaresDesc />} />
        <Route path="/plantersandvases" element={<PlantersAndVases />} />
        <Route path="/privacypolicy" element={<PrivacyPolicy />} />
        <Route path="/termsandconditions" element={<TermsAndConditions />} />
        <Route path="/shippingpolicy" element={<ShippingPolicy />} />
        <Route path="/returnpolicy" element={<ReturnPolicy />} />
        <Route path="/videos" element={<Videos />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />

        {/* Protected Routes - Require Authentication */}
        <Route
          path="/completeProfile"
          element={<PrivateRoute element={<CompleteProfile />} />}
        />
        <Route
          path="/addPhone"
          element={<PrivateRoute element={<AddPhone />} />}
        />
        <Route
          path="/select-address"
          element={<PrivateRoute element={<AddressSelection />} />}
        />
        <Route
          path="/add-address"
          element={<PrivateRoute element={<AddressForm />} />}
        />
        <Route
          path="/otp"
          element={<PrivateRoute element={<PhoneVerification />} />}
        />
        <Route
          path="/changepassword"
          element={<PrivateRoute element={<ChangePassword />} />}
        />
        <Route path="/cart" element={<PrivateRoute element={<Cart />} />} />
        <Route
          path="/orderAddress"
          element={<PrivateRoute element={<OrderAddress />} />}
        />
        <Route
          path="/checkout"
          element={<PrivateRoute element={<Checko />} />}
        />
        <Route path="/admin" element={<PrivateRoute element={<Admin />} />} />
        <Route
          path="/profile"
          element={<PrivateRoute element={<MyProfile />} />}
        />
        <Route
          path="/order/:orderId"
          element={<PrivateRoute element={<OrderDetailPage />} />}
        />
        <Route
          path="/track-order/:orderId"
          element={<PrivateRoute element={<TrackOrderPage />} />}
        />
        <Route
          path="/return-order/:orderId"
          element={<PrivateRoute element={<ReturnOrderPage />} />}
        />

        {/* Product Routes - These could be either public or protected based on your needs */}
        <Route path="/woodenCollection" element={<WoodenCollection />} />
        <Route
          path="/woodenCollection/:productId"
          element={<WoodenProductDesc />}
        />
        <Route path="/mercuryCollection" element={<MercuryCollection />} />
        <Route
          path="/mercuryCollection/:productId"
          element={<MercuryProductDesc />}
        />
        <Route path="/furniture/side-table" element={<SideTable />} />
        <Route
          path="/furniture/side-table/:productId"
          element={<SideTableProduct />}
        />
        <Route path="/decor/candleDecor" element={<CandleHolder />} />
        <Route
          path="/decor/candleDecor/:productId"
          element={<CandleHolderProduct />}
        />
        <Route path="/decor/objectDecor" element={<ObjectDecor />} />
        <Route
          path="/decor/objectDecor/:productId"
          element={<ObjectDecorProduct />}
        />
        <Route
          path="/plantersandvases/:productId"
          element={<PlantersAndVasesDesc />}
        />
      </Routes>
    </Router>
  );
};

export default App;
