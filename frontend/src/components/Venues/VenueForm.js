import React, {useState, useContext} from 'react';
import {withRouter} from 'react-router-dom';
import Context from '../../containers/Context';
import axios from 'axios';
import {Button, Input} from 'antd';

const VenueForm = (props) => {
  const {prependNewVenue, currentUser} = useContext(Context);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [address, setAddress] = useState('');
  const [posting, setPosting] = useState(false);
  const [message, setMessage] = useState('');

  const handleClick = async (e) => {
    e.preventDefault();
    if(!currentUser){
      props.history.push('/login')
    }
    setPosting(true);
    let result;
    try{
      result = await axios.post('/venues/create', {name, description, address});
    }catch(errs){
      setPosting(false);
      return console.log(errs);
    }
    prependNewVenue([result.data]);
    setName('');
    setDescription('');
    setAddress('');
    setPosting(false);
    setMessage('success');
  }

  return(
    <form>
      <div>{message}</div>
      <label>Venue Name: 
        <Input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
        />
      </label><br/>
      <label>Description: 
        <Input
          type="text"
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
      </label><br/>
      <label>Address: 
        <Input
          type="text"
          value={address}
          onChange={e => setAddress(e.target.value)}
        />
      </label><br/>
      <Button type="submit" disabled={posting} onClick={handleClick}>Create Venue</Button>
    </form>
  )
}

export default withRouter(VenueForm);