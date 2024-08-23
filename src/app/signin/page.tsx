import { Container, Typography } from '@mui/material';
import { Box } from '@mui/system';
import SignInForm from './../../app/signin/components/SignInForm';

const SignInPage = () => {
  return (
    <Container maxWidth={'xs'}>
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant={'h2'}>
          Sign in
        </Typography>
        <SignInForm />
      </Box>
    </Container>
  );
};

export default SignInPage;
