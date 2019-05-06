import React from 'react';
import { Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const MenuAdminPage = () => (
  <Menu>
    <Link to="users">
      <Menu.Item>Users</Menu.Item>
    </Link>
    <Link to="contact">
      <Menu.Item>Contact</Menu.Item>
    </Link>
  </Menu>
);

export default MenuAdminPage;
