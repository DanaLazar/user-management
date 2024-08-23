import { Datagrid, EditButton, EmailField, List, ShowButton, TextField } from 'react-admin';

export const UserList = () => (
  <List>
    <Datagrid>
      <TextField source="name" />
      <TextField source="username" />
      <EmailField source="email" />
      <>
        <ShowButton />
        <EditButton />
      </>
    </Datagrid>
  </List>
);
