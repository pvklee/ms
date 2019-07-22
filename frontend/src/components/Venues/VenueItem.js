import React, {memo} from 'react';
import {Link} from 'react-router-dom';
import equalityCheck from '../../util/equalityCheck';

const VenueItem = memo(({venue}) => {
  return(
    <div>
      <Link to={`/venues/${venue._id}`}>
        {venue.name}<br/>
        {venue.address}
      </Link>
    </div>
  )
}, equalityCheck);

export default VenueItem;