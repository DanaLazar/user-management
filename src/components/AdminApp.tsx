'use client';
import { Admin, Resource } from 'react-admin';
import { BrowserRouter } from 'react-router-dom';
import { dataProvider } from './dataProvider';
import { UserList } from './UsersList';
import { EditUser } from './EditUser';
import { ShowUser } from './ShowUser';

const AdminApp = () => (
  <BrowserRouter>
    <Admin dataProvider={dataProvider}>
      <Resource name="users" list={UserList} show={ShowUser} edit={EditUser} />
    </Admin>
  </BrowserRouter>
);

export default AdminApp;
