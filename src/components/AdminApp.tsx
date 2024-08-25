"use client";
import { Admin, Resource } from "react-admin";
import { BrowserRouter } from "react-router-dom";
import { dataProvider } from "./dataProvider";
import { UserList } from "./UsersList";
import { EditUser } from "./EditUser";
import { ShowUser } from "./ShowUser";
import { Box } from "@mui/material";

import { GoToButton } from "./static/GoToButton";

const AdminApp = () => (
  <BrowserRouter>
    <Admin dataProvider={dataProvider}>
      <Resource name="users" list={UserList} show={ShowUser} edit={EditUser} />
    </Admin>
    <Box
      sx={{
        textAlign: "right",
        marginTop: 2,
        marginBottom: 2,
        position: "absolute",
        bottom: 3,
        right: 3,
        zIndex: 500,
      }}
    >
      <GoToButton href="/static" text="Go to static page" />
    </Box>
  </BrowserRouter>
);

export default AdminApp;
