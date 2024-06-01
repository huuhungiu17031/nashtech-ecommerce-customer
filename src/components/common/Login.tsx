import { FormEvent, useEffect, useState } from 'react';
import {
  Avatar,
  Box,
  Button,
  Container,
  CssBaseline,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useMutation } from '@tanstack/react-query';
import { login } from '@/services';
import useSignIn from 'react-auth-kit/hooks/useSignIn';
import useIsAuthenticated from 'react-auth-kit/hooks/useIsAuthenticated';
import { successfullAlert } from '../alert';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuthen } from '@/context';

const initialState = {
  email: '',
  password: '',
};

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

const Login = () => {
  const signIn = useSignIn();
  const isAuthenticated = useIsAuthenticated();
  const { container, avatar, formMargin, submitButton } = styles;
  const [form, setForm] = useState(initialState);
  const navigate = useNavigate();
  const location = useLocation();
  const { setAuth } = useAuthen();
  const mutationLogin = useMutation({
    mutationFn: async ({ email, password }: { email: string; password: string }) =>
      await login({ email, password }),
    onSuccess: data => {
      const { accessToken, type, email, userId, refreshToken } = data;
      signIn({
        auth: {
          token: accessToken,
          type,
        },
        userState: {
          email,
          userId,
        },
      });
      setAuth(accessToken, refreshToken);
      successfullAlert('Login successfully').then(() => {
        navigate('/', { replace: true, state: { from: location } });
      });
    },
  });

  useEffect(() => {
    if (isAuthenticated) return navigate('/', { replace: true, state: { from: location } });
  }, []);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    mutationLogin.mutate(form);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box sx={container}>
        <Avatar sx={avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={formMargin}>
          <TextField
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
            Sign In
          </Button>
          <Grid container>
            <Grid item>
              <Link to={'/register'}>{"Don't have an account? Sign Up"}</Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
