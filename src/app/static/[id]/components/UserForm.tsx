"use client";

"use client";

import { User } from "@/src/data/types";
import { useState } from "react";
import { TextField, Paper, Box } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import { useRouter } from "next/navigation";

interface UserFormProps {
  user: User;
}

export const UserForm = ({ user }: UserFormProps) => {
  const [editMode, setEditMode] = useState(false);
  const [editedUser, setEditedUser] = useState<Partial<User>>({});
  const router = useRouter();

  const HandleUpdate = async () => {
    if (editMode) {
      const resp = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}api/users/${user.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: user.id, ...editedUser }),
        }
      );

      if (resp.ok) {
        setEditMode(false);
        router.refresh();
      } else {
        console.error("Failed to update user");
      }
    }
  };

  const cancelEditing = () => {
    setEditMode(false);
    setEditedUser({});
  };

  const handleEditChange = (field: keyof User, value: string) => {
    setEditedUser((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <Paper sx={{ p: 5, mt: 5 }}>
      <Box
        sx={{
          display: "grid",
          gap: 1,
          gridTemplateColumns: "repeat(2, 1fr)",
        }}
      >
        <div>
          {editMode ? (
            <TextField
              value={editedUser.name ?? user.name}
              onChange={(e) => handleEditChange("name", e.target.value)}
              sx={{ mb: 5 }}
            />
          ) : (
            <h2>{user.name}</h2>
          )}
          {editMode ? (
            <TextField
              value={editedUser.username ?? user.username}
              onChange={(e) => handleEditChange("username", e.target.value)}
              sx={{ mb: 5 }}
            />
          ) : (
            <h4>{user.username}</h4>
          )}
          {editMode ? (
            <div>
              <IconButton aria-label="save" size="small" onClick={HandleUpdate}>
                <SaveIcon />
              </IconButton>
              <IconButton
                aria-label="cancel"
                size="small"
                onClick={cancelEditing}
              >
                <CancelIcon />
              </IconButton>
            </div>
          ) : (
            <div>
              <IconButton
                aria-label="edit"
                size="small"
                onClick={() => setEditMode(true)}
              >
                <EditIcon />
              </IconButton>
            </div>
          )}
        </div>
        <div>
          {editMode ? (
            <TextField
              value={editedUser.phone ?? user.phone}
              onChange={(e) => handleEditChange("phone", e.target.value)}
              sx={{ mb: 5 }}
            />
          ) : (
            <p>{user.phone}</p>
          )}
          {editMode ? (
            <TextField
              value={editedUser.email ?? user.email}
              onChange={(e) => handleEditChange("email", e.target.value)}
              sx={{ mb: 5 }}
            />
          ) : (
            <p>{user.email}</p>
          )}
          {editMode ? (
            <TextField
              value={editedUser.website ?? user.website}
              onChange={(e) => handleEditChange("website", e.target.value)}
            />
          ) : (
            <p>{user.website}</p>
          )}
        </div>
      </Box>
    </Paper>
  );
};
