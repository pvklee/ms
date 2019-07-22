import React, {memo, useContext} from 'react';
import {Link} from 'react-router-dom';
import Context from '../../containers/Context';
import equalityCheck from '../../util/equalityCheck';
import {Layout, Menu, Button} from 'antd';
const {Sider} = Layout;

const Navbar = memo(props=>{
  const {currentUser, setLogout} = useContext(Context);
  
  const handleSignout = () => {
    setLogout();
  }

  const greeting = currentUser ? (
    <div>
      <Button onClick={handleSignout}>Sign Out</Button>
    </div>
  ) : (
    <div>
      <Button><Link to="/login">Login</Link></Button>
      <Button><Link to="/signup">Signup</Link></Button>
    </div>
  )
  return(
    <Sider width={200} style={{ background: '#fff' }}>
      <Menu
        theme='dark'
        mode="inline"
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        style={{ height: '100%', borderRight: 0 }}
      >
        <Menu.Item key="1"><Link to="/">Venues</Link></Menu.Item>
        {greeting}
      </Menu>
    </Sider>
  )
}, equalityCheck);

export default Navbar;