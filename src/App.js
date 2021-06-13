import { React, useState, useEffect } from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import { AuthContext } from './context';
import { getMe } from './WebAPIs';
import { getAuthToken } from './utils';
import NavBoostrap from './components/NavBoostrap';
import HomePage from './pages/HomePage';
import MenuPage from './pages/MenuPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ReservePage from './pages/ReservePage';
import MyReserve from './pages/MyReserve';
import AdminMenuPage from './pages/AdminMenuPage';
import AdminReserve from './pages/AdminReserve';
import Footer from './components/Footer';

function App() {
  const [user, setUser] = useState(null);
  const [userId, setUserId] = useState(null);
  useEffect(() => {
    if(getAuthToken())
      getMe().then((response) => {
        if(response.ok) {
          setUser(response.authData.data);
          setUserId(response.authData.id)
        };
      })
  }, [user, userId]);

  return (
    <AuthContext.Provider value={{user, setUser, userId, setUserId}}>
      <Router>
        <NavBoostrap />
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route exact path="/menu">
            <MenuPage />
          </Route>
          <Route exact path="/login">
            <LoginPage />
          </Route>
          <Route exact path="/register">
            <RegisterPage />
          </Route>
          <Route exact path="/reserve">
            <ReservePage />
          </Route>
          <Route exact path="/reserve/user">
            <MyReserve />
          </Route>
          <Route exact path="/admin/menu">
            <AdminMenuPage />
          </Route>
          <Route exact path="/admin/reserve">
            <AdminReserve />
          </Route>
        </Switch>
        <Footer />
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
