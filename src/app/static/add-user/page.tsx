import AddUserForm from "./components/AddUserForm";
import { Container, Box } from "@mui/material";
import { GoToButton } from "@/src/components/static/GoToButton";

const AddUserPage = () => {
  return (
    <Container>
      <AddUserForm />
      <Box
        sx={{
          textAlign: "center",
          marginTop: 2,
          marginBottom: 2,
        }}
      >
        <GoToButton href="/static" text="Go to all users" />
      </Box>
    </Container>
  );
};

export default AddUserPage;
