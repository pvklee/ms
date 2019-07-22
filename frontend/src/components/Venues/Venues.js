import React, {useContext, memo, useEffect, useState} from 'react';
import Context from '../../containers/Context';
import equalityCheck from '../../util/equalityCheck';
import axios from 'axios';
import VenueItem from './VenueItem';
import VenueForm from './VenueForm';
import {Helmet} from 'react-helmet';
import {Spin} from 'antd';

const Venues = memo(props => {
  const {venues, setVenues, mergeVenueDetails, currentUser} = useContext(Context);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchVenues = async () => {
      setLoading(true);
      let res;
      try {
        res = await axios.get('/venues/');
      } catch(err){
        console.log(err);
      }
      setVenues(res.data);
      let details = {};
      res.data.forEach(venue => details[venue._id] = venue);
      mergeVenueDetails(details);
      setLoading(false);
    }
    fetchVenues();
  }, []);

  const venuesList = venues.length ? (
    venues.map(venue => <VenueItem key={venue._id} venue={venue} />)
  ) : null;

  return(
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Venues</title>
      </Helmet>
      <div>
        <VenueForm />
        {loading ? <Spin/> : venuesList}
      </div>
    </div>
  )
}, equalityCheck);

export default Venues;