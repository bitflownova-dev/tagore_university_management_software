import { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Alert,
  Container,
  Avatar,
  InputAdornment,
  IconButton,
} from '@mui/material';
import { Visibility, VisibilityOff, School } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../stores/authStore';
import { authAPI } from '../../services/api';

export default function LoginPage() {
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await authAPI.login(username, password);
      const { user, accessToken, refreshToken } = response.data;
      
      setAuth(user, accessToken, refreshToken);
      
      // Redirect based on role
      const roleRedirects: Record<number, string> = {
        1: '/director',
        2: '/principal',
        4: '/teacher',
        5: '/student',
        6: '/parent',
        7: '/hr',
        8: '/accountant',
      };
      
      navigate(roleRedirects[user.roleId] || '/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        background: 'linear-gradient(135deg, #1565C0 0%, #0D47A1 100%)',
      }}
    >
      <Container maxWidth="sm">
        <Card elevation={8} sx={{ borderRadius: 4 }}>
          <CardContent sx={{ p: 5 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 4 }}>
              <Avatar sx={{ width: 80, height: 80, bgcolor: 'primary.main', mb: 2 }}>
                <School sx={{ fontSize: 48 }} />
              </Avatar>
              <Typography variant="h4" fontWeight="bold" gutterBottom>
                Tagore University
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Management System
              </Typography>
            </Box>

            {error && (
              <Alert severity="error" sx={{ mb: 3 }}>
                {error}
              </Alert>
            )}

            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                margin="normal"
                required
                autoFocus
                disabled={loading}
              />

              <TextField
                fullWidth
                label="Password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                margin="normal"
                required
                disabled={loading}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <Button
                fullWidth
                type="submit"
                variant="contained"
                size="large"
                sx={{ mt: 3, py: 1.5 }}
                disabled={loading}
              >
                {loading ? 'Logging in...' : 'Login'}
              </Button>
            </form>

            <Box sx={{ mt: 3, textAlign: 'center' }}>
              <Typography variant="caption" color="text.secondary">
                © 2025 Tagore Group of Colleges. All rights reserved.
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}
