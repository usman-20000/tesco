import './App.css';
import { Routes, Route, useLocation } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Main from './Pages/Main';
import SignUp from './Pages/SignUp';
import SignIn from './Pages/SignIn';
import Header from './components/Header';
import BottomNav from './components/BottomNav';
import Home from './Pages/Home';
import PrivateRoute from './components/PrivateRoute';
import NotFound from './Pages/NotFound';

function App() {


  const location = useLocation();
  const showHeaderRoutes = ["/home", "/",];
  const showBottomNavRoutes = ["/home", "/","*"];
  const shouldShowBottomNav = showBottomNavRoutes.includes(location.pathname);
  const shouldShowHeader = showHeaderRoutes.includes(location.pathname);

  return (
    <>
      {shouldShowHeader && <Header />}
      <main className='pt-[10%]'>
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<SignIn />} />
          <Route element={<PrivateRoute />}>
            <Route path="/" element={<Home />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      {shouldShowBottomNav && <BottomNav />}
    </>
  );
}

export default App;
