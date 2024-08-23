"use client";
import { Box } from "@mui/system";
import { Controller, useForm } from "react-hook-form";
import {
  Button,
  FormControl,
  FormHelperText,
  TextField,
  Typography,
} from "@mui/material";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const AddUserForm = () => {
  // Minimum 8 characters, at least one uppercase letter, one lowercase letter, one number and one special character
  const passwordValidation = new RegExp(
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
  );
  const formSchema = z.object({
    name: z.string().min(1, { message: "Name is required" }),
    email: z.string(),
    username: z.string(),
    phone: z.string(),
    website: z.string(),
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
        throw new Error("Failed to add user");
      }
      router.push("/static");
    } catch (e) {
      console.log(e);
      toast.error("The user could not be saved");
    }
  };
  return (
    <>
      <Box
        component={"form"}
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        sx={{ mt: 3, display: "flex", flexDirection: "column" }}
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
              />
              <FormHelperText
                sx={{
                  color: "error.main",
                }}
              >
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
              />
              <FormHelperText
                sx={{
                  color: "error.main",
                }}
              >
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
                fullWidth
                placeholder="Johnny"
                inputRef={ref}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                error={Boolean(error)}
              />
              <FormHelperText
                sx={{
                  color: "error.main",
                }}
              >
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
                fullWidth
                placeholder="156462145273"
                inputRef={ref}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                error={Boolean(error)}
              />
              <FormHelperText
                sx={{
                  color: "error.main",
                }}
              >
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
                fullWidth
                placeholder="johndoe.com"
                inputRef={ref}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                error={Boolean(error)}
              />
              <FormHelperText
                sx={{
                  color: "error.main",
                }}
              >
                {error?.message ?? ""}
              </FormHelperText>
            </FormControl>
          )}
        />
        <Button type="submit" variant={"contained"} sx={{ mt: 2 }}>
          Submit
        </Button>
      </Box>
    </>
  );
};

export default AddUserForm;
