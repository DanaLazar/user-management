import { Container, Box } from "@mui/material";
import { UserForm } from "./components/UserForm";
import { GenericPageProps } from "@/src/data/types";
import { GoToButton } from "@/src/components/static/GoToButton";

const fetchUser = async (id: string) => {
  const resp = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}api/users/${id}`,
    {
      method: "GET",
    }
  );

  if (resp.ok) {
    try {
      const data = await resp.json();
      console.log("Fetched User Data:", data);
      return data.data;
    } catch (error) {
      console.error("Failed to parse JSON:", error);
      const text = await resp.text();
      console.error("Response was:", text);
    }
  } else {
    console.error("HTTP Error:", resp.status);
    const text = await resp.text();
    console.error("Response was:", text);
  }
  return null;
};

const UserPage = async ({ params }: GenericPageProps) => {
  const { id } = params;

  const user = await fetchUser(id);
  console.log("user in page", user);

  return (
    <Container>
      {user ? <UserForm user={user} /> : <div>User not found</div>}
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

export default UserPage;
