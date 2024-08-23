import { EmailField, Show, SimpleShowLayout, TextField } from 'react-admin';

export const ShowUser = () => (
  <Show>
    <SimpleShowLayout>
      <TextField source="id" />
      <TextField source="name" />
      <TextField source="username" />
      <EmailField source="email" />
      <TextField source="phone" />
      <TextField source="website" />
    </SimpleShowLayout>
  </Show>
);
