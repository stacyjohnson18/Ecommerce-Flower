// App.jsx
import React from 'react';
import Home from './pages/Home';
// import ProductsDetail from "./components/ProductsDetail";
// import Checkout from "./pages/Checkout";
// import Orders from "./pages/Orders";
// import Wishlist from "./pages/Wishlist";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Contactus from "./pages/Contactus";
import Terms from "./pages/Terms";
// import Flowerguide from "./pages/Flowerguide";
import Cart from "./components/Cart";

// import Products from './components/Products'

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SingleProduct from './components/SingleProduct';

import Dashboard from './user/Dashboard';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PageNotFound from './pages/PageNotFound';
import { AuthProvider } from './context/auth';

import { PrivateRoute } from './components/Routes/Private'
import { AdminRoute } from './components/Routes/AdminRoute';
import AdminDashboard from './pages/Admin/AdminDashboard';
import AddCategory from './pages/Admin/AddCategory';
import AddProduct from './pages/Admin/AddProduct';
import Products from './pages/Admin/Products';
import Users from './pages/Admin/Users';


import Profile from './user/Profile';
import Order from './user/Order';
import UpdateProduct from './pages/Admin/UpdateProduct';
import { CartProvider } from "./context/cart";
import AdminOrders from './pages/Admin/AdminOrders';
import Shop from './pages/Shop';
import ProductCategory from './pages/ProductCategory';
function App() {

  return (
    <>
      <AuthProvider>
        <CartProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              {/* <Route path='productsdetail' element={<ProductsDetail />}></Route> */}
              {/* <Route path='checkout' element={<Checkout />}></Route> */}
              {/* <Route path='orders' element={<Orders />}></Route> */}
              {/* <Route path='wishlist' element={<Wishlist />}></Route> */}

              <Route path='signup' element={<Signup />}></Route>
              <Route path='signin' element={<Signin />}></Route>

              {/* User Dashaboard routes protected  */}

              <Route path='/dashboard' element={<PrivateRoute />}>
                <Route path='user' element={<Dashboard />} />
                <Route path='user/profile' element={<Profile />} />
                <Route path='user/orders' element={<Order />} />

              </Route>


              {/* admin Routes */}

              <Route path="/dashboard" element={<AdminRoute />}>
                <Route path='admin' element={<AdminDashboard />} />
                <Route path='admin/create-category' element={<AddCategory />} />
                <Route path='admin/create-product' element={<AddProduct />} />
                <Route path='admin/product/:slug' element={<UpdateProduct />} />
                <Route path='admin/products' element={<Products />} />
                <Route path='admin/orders' element={<AdminOrders />} />

                <Route path='admin/users' element={<Users />} />
              </Route>
              <Route path='/shop' element={<Shop />}></Route>
              <Route path='/product-category/:slug' element={<ProductCategory/>}></Route>
              <Route path='contactus' element={<Contactus />}></Route>
              <Route path='terms' element={<Terms />}></Route>
              {/* <Route path='flowerguide' element={<Flowerguide />}></Route> */}
              <Route path='cart' element={<Cart />}></Route>
              {/* 404 page route */}
              <Route path='*' element={<PageNotFound />}></Route>


              <Route path="/products/:slug/" element={<SingleProduct />}></Route>

            </Routes>
          </BrowserRouter>
        </CartProvider>
      </AuthProvider>

      <ToastContainer />

    </>

  );
}

export default App;


