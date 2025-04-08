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
import Deposit from './Pages/Deposit';
import Withdraw from './Pages/Withdraw';
import WithdrawSuccess from './Pages/WithdrawSuccess';
import Team from './Pages/Team';
import MyTeam from './Pages/MyTeam';
import TeamDetail from './Pages/TeamDetail';
import Detail from './Pages/Detail';
import Invest from './Pages/Invest';
import InvestSuccess from './Pages/InvestSuccess';

function App() {


  const location = useLocation();
  const showHeaderRoutes = ["/home", "/","/deposit", "/withdraw", "/invite", "/my-team", "/team-detail" ];
  const showBottomNavRoutes = ["/home", "/", "/invite", "/my-team", "/team-detail"];
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
            <Route path="/home" element={<Home />} />
            <Route path="/deposit" element={<Deposit />} />
            <Route path="/withdraw" element={<Withdraw />} />
            <Route path="/withdraw-sucess" element={<WithdrawSuccess />} />
            <Route path="/invite" element={<Team />} />
            <Route path="/my-team" element={<MyTeam/>} />
            <Route path="/team-detail" element={<TeamDetail/>} />
            <Route path="/detail" element={<Detail/>} />
            <Route path="/invest" element={<Invest/>} />
            <Route path="/invest-success" element={<InvestSuccess/>} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      {shouldShowBottomNav && <BottomNav />}
    </>
  );
}

export default App;
