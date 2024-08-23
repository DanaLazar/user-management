'use client';
import { Box } from '@mui/system';
import { Controller, useForm } from 'react-hook-form';
import { Button, Container, FormControl, FormHelperText, TextField, Typography } from '@mui/material';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import axios, { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

const SignInForm = () => {
  // Minimum 8 characters, at least one uppercase letter, one lowercase letter, one number and one special character
  const passwordValidation = new RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/);
  const formSchema = z.object({
    email: z.string().min(1, { message: 'Email is required' }).email().trim().toLowerCase(),
    password: z.string().min(1),
  });

  const { control, handleSubmit, formState } = useForm({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  type FormFields = z.infer<typeof formSchema>;
  const router = useRouter();
  const onSubmit = async (payload: FormFields) => {
    try {
      const response = await axios.post('/api/auth/login', payload);
      router.push('/');
    } catch (e) {
      const error = e as AxiosError;
      console.log(error.message);
      toast.error('Unauthorized');
    }
  };

  return (
    <>
      {formState.isSubmitting ? (
        <Box>
          <Typography variant={'h4'} color={'blue'} sx={{ mt: 6 }}>
            Loading...
          </Typography>
        </Box>
      ) : (
        <Box
          component={'form'}
          noValidate
          onSubmit={handleSubmit(onSubmit)}
          sx={{ mt: 3, display: 'flex', flexDirection: 'column' }}
        >
          <Controller
            name="email"
            control={control}
            render={({ field: { value, onChange, onBlur, ref }, fieldState: { error } }) => (
              <FormControl sx={{ mt: 2 }}>
                <TextField
                  name="email"
                  label="Email"
                  placeholder="example@mail.com"
                  required
                  fullWidth
                  inputRef={ref}
                  value={value}
                  onChange={onChange}
                  onBlur={onBlur}
                  error={Boolean(error)}
                />
                <FormHelperText
                  sx={{
                    color: 'error.main',
                  }}
                >
                  {error?.message ?? ''}
                </FormHelperText>
              </FormControl>
            )}
          />
          <Controller
            name="password"
            control={control}
            render={({ field: { value, onChange, onBlur, ref }, fieldState: { error } }) => (
              <FormControl sx={{ mt: 2 }}>
                <TextField
                  name="password"
                  label="Password"
                  required
                  fullWidth
                  placeholder="password"
                  inputRef={ref}
                  value={value}
                  onChange={onChange}
                  onBlur={onBlur}
                  error={Boolean(error)}
                />
                <FormHelperText
                  sx={{
                    color: 'error.main',
                  }}
                >
                  {error?.message ?? ''}
                </FormHelperText>
              </FormControl>
            )}
          />
          <Button type="submit" variant={'contained'} sx={{ mt: 2 }}>
            Submit
          </Button>
        </Box>
      )}
    </>
  );
};

export default SignInForm;
