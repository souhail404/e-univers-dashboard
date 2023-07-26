import './styles/app.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';

// import components
import Layout from './pages/Layout'
import Navigate from './utils/Navigate'
import Login from './pages/Login'
import Home from './pages/Home'
import NoPage from './pages/NoPage'
import Customers from './pages/Customers'
import Product from './pages/Product'
import Categorys from './pages/Categorys'
import Orders from './pages/Orders'
import Settings from './pages/Settings'
import Store from './pages/Store'
import Account from './pages/Account' 
import AddProduct from './pages/AddProduct';
import AddVariants from './pages/AddVariants';
import AddImages from './pages/AddImages';
import CreateProduct from './pages/CreateProduct';


function App() {
  const {user} = useAuth();
  return (
    <div className="app" id="app">
    <BrowserRouter>    
      <Routes>
        <Route path="/" element={<Layout />}>
            <Route index element={user ? <Home /> : <Navigate to='/login' />}/>
            <Route path="login" element={!user ? <Login /> : <Navigate to='/' />} /> 
            <Route path="customers" element={user ? <Customers /> : <Navigate to='/login' />} />
            <Route path="product">
              <Route index element={user ? <Product />: <Navigate to='/login' />}/>
              <Route path="create" element={user ? <CreateProduct />: <Navigate to='/login' />} />
              <Route path="add-product" element={user ? <AddProduct />: <Navigate to='/login' />} />
              <Route path="add-variants/:productId" element={user ? <AddVariants />: <Navigate to='/login' />} />
              <Route path="add-images/:productId" element={user ? <AddImages/> : <Navigate to='/login' />} />
            </Route>
            <Route path="category" element={user ? <Categorys /> : <Navigate to='/login' />} />
            <Route path="orders" element={user ? <Orders /> : <Navigate to='/login' />} />
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


const ConnectedRoutes = ()=>{
  return(
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="customers" element={<Customers />} />
        <Route path="product" element={<Product />} />
        <Route path="category" element={<Categorys />} />
        <Route path="orders" element={<Orders />} />
        <Route path="store" element={<Store />} />
        <Route path="settings" element={<Settings />} />
        <Route path="account" element={<Account />} />
        <Route path="*" element={<NoPage />} />
      </Route>
    </Routes>
  );
}

const NotConnectedRoutes = ()=>{
  return(
    <Routes>
      <Route path="/" element={<Login />}>
        <Route index element={<Login />} />
        <Route path="*" element={<Login />} />
      </Route>
    </Routes>
  );
}

export default App;
