import { Avatar, Box, Button, Container, CssBaseline, TextField, Typography } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { FormEvent, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { register } from '@/services';
import { successfullAlert } from '../alert';
import { useNavigate } from 'react-router-dom';

const styles = {
  container: {
    marginTop: 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    m: 1,
    bgcolor: 'secondary.main',
  },
  formMargin: {
    mt: 1,
  },
  submitButton: {
    mt: 3,
    mb: 2,
  },
};

const initialState = {
  email: '',
  password: '',
};

const Register = () => {
  const [form, setForm] = useState(initialState);
  const { container, avatar, formMargin, submitButton } = styles;
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    mutationRegister.mutate(form);
  };
  const navigate = useNavigate();
  const mutationRegister = useMutation({
    mutationFn: async ({ email, password }: { email: string; password: string }) =>
      await register({ email, password }),
    onSuccess: data => {
      successfullAlert(data).then(() => {
        navigate('/login');
      });
    },
  });
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box sx={container}>
        <Avatar sx={avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Register
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={formMargin}>
          <TextField
            type="email"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={e => setForm({ ...form, email: e.target.value })}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={e => setForm({ ...form, password: e.target.value })}
          />
          <Button type="submit" fullWidth variant="contained" sx={submitButton}>
            Sign up
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Register;
