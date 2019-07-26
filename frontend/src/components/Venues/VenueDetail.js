import React, {useContext, memo, useEffect, useState} from 'react';
import {withRouter} from 'react-router-dom';
import Context from '../../containers/Context';
import equalityCheck from '../../util/equalityCheck';
import axios from 'axios';
import {Helmet} from 'react-helmet';
import { Spin, Calendar, Button } from 'antd';
import moment from 'moment';

const VenueDetail = memo((props) => {
  const {match: {params: {venueId}}} = props;
  const {venueDetails, mergeVenueDetails, reservations, mergeReservations, currentUser} = useContext(Context);
  const [loading, setLoading] = useState(false);
  const [reservingMessage, setReservingMessage] = useState('');
  const [date, setDate] = useState(()=>{
    let d = new Date();
    d.setHours(0,0,0,0);
    return d;
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchVenueDetail = async ()=> {
      setLoading(true);
      let res;
      try {
        res = await axios.get(`/venues/${venueId}`);
      } catch(err){
        console.log(err);
      }
      let newReservations = {};
      res.data.reservations.forEach(reservation => {
        newReservations[new Date(reservation.resDate).toDateString()] = reservation;
      })
      mergeVenueDetails({[venueId]: res.data.venue});
      mergeReservations({[venueId]: newReservations});
      setLoading(false);
    }
    if(!venueDetails[venueId]) fetchVenueDetail();
  }, []);

  const errorHandler = errs => {
    setErrors(errs);
  }

  const handleReserve = async (e) => {
    e.preventDefault();
    if(!currentUser){
      props.history.push('/login')
    }
    setReservingMessage('Reserving...');
    let reservationData;
    try{
      reservationData = await axios.post('/reservations/', {venue: venueId, resDate: date});
    } catch (err) {
      setReservingMessage('');
      return errorHandler(err.response.data);
    }
    let reservation = reservationData.data;
    let newReservation = {[new Date(reservation.resDate).toDateString()]: reservation}
    mergeReservations({[venueId]: newReservation});
    setReservingMessage('Reserved');
    setErrors([]);
  }

  const onCalendarSelect = (value) => {
    setDate(value._d);
  }

  let details;
  if(venueDetails[venueId]){
    const {name, description, address, owner: {id, email}} = venueDetails[venueId];
    const venueReservations = reservations[venueId];
    const reserved = venueReservations ? !!venueReservations[date.toDateString()] : null;
    details = (
      <div>
        <div>
          {name}<br/>
          {description}<br/>
          {address}<br/>
          {email}
        </div>
        <div style={{ width: 300, border: '1px solid #d9d9d9', borderRadius: 4 }}>
          <Calendar value={moment(date)} fullscreen={false} onSelect={onCalendarSelect} />
        </div>
        <form>
          {date.toDateString()}
          {reserved ? 'Already reserved'
            : <Button type="submit" onClick={handleReserve}>Reserve</Button>
          }
        </form>
        {reservingMessage}
        {errors.date}
        {errors.session}
      </div>
    )
  } else {
    details = null;
  }

  return(
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Venues</title>
      </Helmet>
      <div>
        {loading ? <Spin /> : details}
      </div>
    </div>
  )
}, equalityCheck);

export default VenueDetail;