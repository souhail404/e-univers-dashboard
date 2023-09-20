import './styles/component.css';
import './styles/app.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';

// import components
import Layout from './pages/Layout'
import Navigate from './utils/Navigate'
import Login from './pages/Login'
import Home from './pages/Home'
import NoPage from './pages/NoPage'
import Customers from './pages/customers/Customers'
import Products from './pages/products/Products'
import Categories from './pages/categories/Categories'
import CreateCategory from './pages/categories/CreateCategory'
import EditCategory from './pages/categories/EditCategory'
import Orders from './pages/orders/Orders'
import Settings from './pages/Settings'
import Store from './pages/Store'
import Account from './pages/Account' 
import CreateProduct from './pages/products/CreateProduct';
import EditProduct from './pages/products/EditProduct';
import CreateOrder from './pages/orders/CreateOrder';
import EditOrder from './pages/orders/EditOrder';
import OrderDeatails from './pages/orders/OrderDeatails';
import CreateAdmin from './pages/admins/CreateAdmin';
import EditAdmin from './pages/admins/EditAdmin';
import AdminDetails from './pages/admins/AdminDetails';
import EditCustomer from './pages/customers/EditCustomer';
import CustomerDetails from './pages/customers/CustomerDetails';
import CreateCustomer from './pages/customers/CreateCustomer';


function App() {
  const {user} = useAuth();
  return (
    <div className="app" id="app">
    <BrowserRouter>    
      <Routes>
        <Route path="/" element={<Layout />}>
            <Route index element={user ? <Home /> : <Navigate to='/login' />}/>
            <Route path="login" element={!user ? <Login /> : <Navigate to='/' />} /> 
            <Route path="customers">
              <Route index element={user ? <Customers />: <Navigate to='/login' />}/>
              <Route path="create" element={user ? <CreateCustomer />: <Navigate to='/login' />} />
              <Route path=":customerId/details" element={user ? <CustomerDetails />: <Navigate to='/login' />} />
              <Route path=":customerId/edit" element={user ? <EditCustomer />: <Navigate to='/login' />} />
            </Route>
            <Route path="products">
              <Route index element={user ? <Products />: <Navigate to='/login' />}/>
              <Route path="create" element={user ? <CreateProduct />: <Navigate to='/login' />} />
              <Route path=":productId/edit" element={user ? <EditProduct />: <Navigate to='/login' />} />
            </Route>
            <Route path="categories">
              <Route index element={user ? <Categories /> : <Navigate to='/login' />}/>
              <Route path="create" element={user ? <CreateCategory />: <Navigate to='/login' />} />
              <Route path=":categoryId/edit" element={user ? <EditCategory />: <Navigate to='/login' />} />
            </Route>
            <Route path="orders">
              <Route index element={user ? <Orders /> : <Navigate to='/login' />}/>
              <Route path="create" element={user ? <CreateOrder />: <Navigate to='/login' />} />
              <Route path=":orderId/edit" element={user ? <EditOrder />: <Navigate to='/login' />} />
              <Route path=":orderId/details" element={user ? <OrderDeatails />: <Navigate to='/login' />} />
            </Route>
            <Route path="admins">
              <Route path="create" element={user ? <CreateAdmin />: <Navigate to='/login' />} />
              <Route path=":adminId/edit" element={user ? <EditAdmin />: <Navigate to='/login' />} />
              <Route path=":adminId/details" element={user ? <AdminDetails />: <Navigate to='/login' />} />
            </Route>
            <Route path="store" element={user ? <Store /> : <Navigate to='/login' />} />
            <Route path="settings" element={user ? <Settings /> : <Navigate to='/login' />} />
            <Route path="account" element={user ? <Account /> : <Navigate to='/login' />} /> 
        </Route>
        <Route path="*" element={<NoPage />} />
      </Routes>
    </BrowserRouter> 
    </div>
  );
}


export default App;
