"use client";

import { Box } from "@mui/system";
import { Controller, useForm } from "react-hook-form";
import {
  Button,
  FormControl,
  FormHelperText,
  TextField,
  Typography,
  Paper,
} from "@mui/material";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { CircularLoading } from "@/src/components/static/Loading";

const AddUserForm = () => {
  const formSchema = z.object({
    name: z.string().min(1, { message: "Name is required" }),
    email: z.string().email().trim().toLowerCase().optional(),
    username: z.string().optional(),
    phone: z.string().optional(),
    website: z.string().optional(),
  });

  const { control, handleSubmit, formState } = useForm({
    mode: "onBlur",
    reValidateMode: "onBlur",
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      username: "",
      phone: "",
      website: "",
    },
  });

  type FormFields = z.infer<typeof formSchema>;
  const router = useRouter();

  const onSubmit = async (payload: FormFields) => {
    try {
      const response = await fetch(`/api/users/adduser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to add user");
      }

      router.push("/static");
    } catch (e) {
      console.error(e);
      toast.error("The user could not be saved");
    }
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
        Add New User
      </Typography>

      {formState.isSubmitting ? (
        <CircularLoading />
      ) : (
        <Box
          component={"form"}
          noValidate
          onSubmit={handleSubmit(onSubmit)}
          sx={{ display: "flex", flexDirection: "column" }}
        >
          <Controller
            name="name"
            control={control}
            render={({
              field: { value, onChange, onBlur, ref },
              fieldState: { error },
            }) => (
              <FormControl sx={{ mt: 2 }}>
                <TextField
                  name="name"
                  label="Name"
                  required
                  fullWidth
                  placeholder="John Doe"
                  inputRef={ref}
                  value={value}
                  onChange={onChange}
                  onBlur={onBlur}
                  error={Boolean(error)}
                  sx={{
                    "& .MuiInputLabel-root": {
                      color: "#518eb9",
                      fontSize: "14px",
                      fontWeight: "bold",
                    },
                  }}
                />
                <FormHelperText sx={{ color: "error.main" }}>
                  {error?.message ?? ""}
                </FormHelperText>
              </FormControl>
            )}
          />

          <Controller
            name="email"
            control={control}
            render={({
              field: { value, onChange, onBlur, ref },
              fieldState: { error },
            }) => (
              <FormControl sx={{ mt: 2 }}>
                <TextField
                  name="email"
                  label="Email"
                  placeholder="example@mail.com"
                  fullWidth
                  inputRef={ref}
                  value={value}
                  onChange={onChange}
                  onBlur={onBlur}
                  error={Boolean(error)}
                  sx={{
                    "& .MuiInputLabel-root": {
                      color: "#518eb9",
                      fontSize: "14px",
                      fontWeight: "bold",
                    },
                  }}
                />
                <FormHelperText sx={{ color: "error.main" }}>
                  {error?.message ?? ""}
                </FormHelperText>
              </FormControl>
            )}
          />

          <Controller
            name="username"
            control={control}
            render={({
              field: { value, onChange, onBlur, ref },
              fieldState: { error },
            }) => (
              <FormControl sx={{ mt: 2 }}>
                <TextField
                  name="username"
                  label="Username"
                  placeholder="Johnny"
                  fullWidth
                  inputRef={ref}
                  value={value}
                  onChange={onChange}
                  onBlur={onBlur}
                  error={Boolean(error)}
                  sx={{
                    "& .MuiInputLabel-root": {
                      color: "#518eb9",
                      fontSize: "14px",
                      fontWeight: "bold",
                    },
                  }}
                />
                <FormHelperText sx={{ color: "error.main" }}>
                  {error?.message ?? ""}
                </FormHelperText>
              </FormControl>
            )}
          />

          <Controller
            name="phone"
            control={control}
            render={({
              field: { value, onChange, onBlur, ref },
              fieldState: { error },
            }) => (
              <FormControl sx={{ mt: 2 }}>
                <TextField
                  name="phone"
                  label="Phone"
                  placeholder="156462145273"
                  fullWidth
                  inputRef={ref}
                  value={value}
                  onChange={onChange}
                  onBlur={onBlur}
                  error={Boolean(error)}
                  sx={{
                    "& .MuiInputLabel-root": {
                      color: "#518eb9",
                      fontSize: "14px",
                      fontWeight: "bold",
                    },
                  }}
                />
                <FormHelperText sx={{ color: "error.main" }}>
                  {error?.message ?? ""}
                </FormHelperText>
              </FormControl>
            )}
          />

          <Controller
            name="website"
            control={control}
            render={({
              field: { value, onChange, onBlur, ref },
              fieldState: { error },
            }) => (
              <FormControl sx={{ mt: 2 }}>
                <TextField
                  name="website"
                  label="Website"
                  placeholder="johndoe.com"
                  fullWidth
                  inputRef={ref}
                  value={value}
                  onChange={onChange}
                  onBlur={onBlur}
                  error={Boolean(error)}
                  sx={{
                    "& .MuiInputLabel-root": {
                      color: "#518eb9",
                      fontSize: "14px",
                      fontWeight: "bold",
                    },
                  }}
                />
                <FormHelperText sx={{ color: "error.main" }}>
                  {error?.message ?? ""}
                </FormHelperText>
              </FormControl>
            )}
          />

          <Button
            type="submit"
            variant={"contained"}
            sx={{
              mt: 3,
              backgroundColor: "#2a4d69",
              "&:hover": {
                backgroundColor: "#1a3c5f",
              },
            }}
          >
            Submit
          </Button>
        </Box>
      )}
    </Paper>
  );
};

export default AddUserForm;
