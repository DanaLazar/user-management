"use client";

import { User } from "@/src/data/types";
import { useState } from "react";
import { TextField, Paper, Box, Typography, IconButton } from "@mui/material";
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
    <Paper
      sx={{
        p: 4,
        mt: 5,
        maxWidth: "600px",
        mx: "auto",
        boxShadow: "0px 0px 15px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Typography
        variant="h4"
        component="h1"
        sx={{ mb: 4, textAlign: "center", color: "#2a4d69" }}
      >
        User Profile
      </Typography>
      <Box
        sx={{
          display: "grid",
          gap: 2,
          gridTemplateColumns: "repeat(2, 1fr)",
        }}
      >
        <div>
          {editMode ? (
            <TextField
              label="Name"
              value={editedUser.name ?? user.name}
              onChange={(e) => handleEditChange("name", e.target.value)}
              fullWidth
              sx={{
                mb: 2,
                "& .MuiInputLabel-root": {
                  color: "#518eb9",
                  fontSize: "14px",
                  fontWeight: "bold",
                },
              }}
            />
          ) : (
            <Typography variant="h6" sx={{ color: "#333" }}>
              {user.name}
            </Typography>
          )}
          {editMode ? (
            <TextField
              label="Username"
              value={editedUser.username ?? user.username}
              onChange={(e) => handleEditChange("username", e.target.value)}
              fullWidth
              sx={{
                mb: 2,
                "& .MuiInputLabel-root": {
                  color: "#518eb9",
                  fontSize: "14px",
                  fontWeight: "bold",
                },
              }}
            />
          ) : (
            <Typography variant="subtitle1" sx={{ color: "#555" }}>
              {user.username}
            </Typography>
          )}
          {editMode ? (
            <Box sx={{ display: "flex", gap: 1 }}>
              <IconButton
                aria-label="save"
                size="small"
                onClick={HandleUpdate}
                sx={{ color: "#1976d2" }}
              >
                <SaveIcon />
              </IconButton>
              <IconButton
                aria-label="cancel"
                size="small"
                onClick={cancelEditing}
                sx={{ color: "#d32f2f" }}
              >
                <CancelIcon />
              </IconButton>
            </Box>
          ) : (
            <Box sx={{ display: "flex", gap: 1 }}>
              <IconButton
                aria-label="edit"
                size="small"
                onClick={() => setEditMode(true)}
                sx={{ color: "#1976d2" }}
              >
                <EditIcon />
              </IconButton>
            </Box>
          )}
        </div>
        <div>
          {editMode ? (
            <TextField
              label="Phone"
              value={editedUser.phone ?? user.phone}
              onChange={(e) => handleEditChange("phone", e.target.value)}
              fullWidth
              sx={{
                mb: 2,
                "& .MuiInputLabel-root": {
                  color: "#518eb9",
                  fontSize: "14px",
                  fontWeight: "bold",
                },
              }}
            />
          ) : (
            <Typography variant="body1" sx={{ color: "#666" }}>
              {user.phone}
            </Typography>
          )}
          {editMode ? (
            <TextField
              label="Email"
              value={editedUser.email ?? user.email}
              onChange={(e) => handleEditChange("email", e.target.value)}
              fullWidth
              sx={{
                mb: 2,
                "& .MuiInputLabel-root": {
                  color: "#518eb9",
                  fontSize: "14px",
                  fontWeight: "bold",
                },
              }}
            />
          ) : (
            <Typography variant="body1" sx={{ color: "#666" }}>
              {user.email}
            </Typography>
          )}
          {editMode ? (
            <TextField
              label="Website"
              value={editedUser.website ?? user.website}
              onChange={(e) => handleEditChange("website", e.target.value)}
              fullWidth
              sx={{
                "& .MuiInputLabel-root": {
                  color: "#518eb9",
                  fontSize: "14px",
                  fontWeight: "bold",
                },
              }}
            />
          ) : (
            <Typography variant="body1" sx={{ color: "#666" }}>
              {user.website}
            </Typography>
          )}
        </div>
      </Box>
    </Paper>
  );
};
