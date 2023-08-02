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
import Customers from './pages/Customers'
import Products from './pages/products/Products'
import Categories from './pages/categories/Categories'
import CreateCategory from './pages/categories/CreateCategory'
import EditCategory from './pages/categories/EditCategory'
import Orders from './pages/Orders'
import Settings from './pages/Settings'
import Store from './pages/Store'
import Account from './pages/Account' 
import CreateProduct from './pages/products/CreateProduct';
import EditProduct from './pages/products/EditProduct';


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


export default App;
