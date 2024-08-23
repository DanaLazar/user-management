import { Edit, SimpleForm, TextInput } from 'react-admin';

export const EditUser = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="name" name={'name'} />
      <TextInput source="username" name={'username'} />
      <TextInput source="email" name={'email'} />
      <TextInput source="phone" name={'phone'} />
      <TextInput source="website" name={'website'} />
    </SimpleForm>
  </Edit>
);
