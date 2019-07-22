import React, {useState, memo, useEffect} from 'react';
import { HashRouter, Route } from 'react-router-dom';
import axios from 'axios';
import equalityCheck from '../util/equalityCheck';
import Context from './Context';
import {Login, Signup} from '../components/Authentication/LoginSignup';
import Venues from '../components/Venues/Venues';
import VenueDetail from '../components/Venues/VenueDetail';
import Navbar from '../components/Navbar/Navbar';
import {AuthRoute} from '../util/routeUtil';
import {merge} from 'lodash';
import {Layout} from 'antd';
const {Header, Content, Sider, Footer} = Layout;

const App = memo(props => {
  const {Provider} = Context;
  const [venues, setVenues] = useState([]);
  const [venueDetails, setVenueDetails] = useState({});
  const [reservations, setReservations] = useState([]);
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    if (sessionStorage.user) {
      const {email, token} = JSON.parse(sessionStorage.user);
      setLogin(email, token);
    }
  }, [])

  const setAuthHeader = token => {
    axios.defaults.headers.common['Authorization'] = token;
  }

  const setLogin = (email, token) => {
    setAuthHeader(token);
    setCurrentUser({email, token});
    sessionStorage.setItem("user", JSON.stringify({email, token}));
  }

  const setLogout = () => {
    setAuthHeader(false);
    setCurrentUser(null);
    sessionStorage.removeItem("user");
  }

  const prependNewVenue = (data) => {
    setVenues(data.concat(venues));
  }

  const mergeVenueDetails = (data) => {
    setVenueDetails(merge({}, venueDetails, data));
  }

  const mergeReservations = (data) => {
    setReservations(merge({}, reservations, data));
  }

  return(
    <Provider value={{
        venues,
        setVenues,
        prependNewVenue,
        venueDetails,
        mergeVenueDetails,
        reservations,
        mergeReservations,
        currentUser,
        setLogin,
        setLogout
      }}>
      <HashRouter>
        <div className="venues-app">
          <Layout>
            <Navbar/>
            <Layout>
              <Content>
                <AuthRoute path="/login" component={Login}/>
                <AuthRoute path="/signup" component={Signup}/>
                <Route exact path="/" component={Venues}/>
                <Route path="/venues/:venueId" component={VenueDetail}/>
              </Content>
            </Layout>
          </Layout>
        </div>
      </HashRouter>
    </Provider>
  )
}, equalityCheck);

export default App;
