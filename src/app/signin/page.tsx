import { Container, Typography } from "@mui/material";
import { Box } from "@mui/system";
import SignInForm from "@/src/app/signin/components/SignInForm";

const SignInPage = () => {
  return (
    <Container maxWidth={"xs"}>
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <SignInForm />
      </Box>
    </Container>
  );
};

export default SignInPage;
