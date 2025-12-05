import React, { useState } from 'react';
import { View, StyleSheet, Image, KeyboardAvoidingView, Platform } from 'react-native';
import { TextInput, Button, Text, HelperText } from 'react-native-paper';
import { useAuthStore } from '../../store/authStore';

export default function LoginScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuthStore();

  const handleLogin = async () => {
    setError('');
    
    if (!username || !password) {
      setError('Please enter username and password');
      return;
    }

    try {
      setLoading(true);
      await login(username, password);
    } catch (err: any) {
      setError(err.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.content}>
        {/* Logo */}
        <View style={styles.logoContainer}>
          <Text variant="headlineLarge" style={styles.title}>
            Tagore University
          </Text>
          <Text variant="bodyMedium" style={styles.subtitle}>
            Mobile Management System
          </Text>
        </View>

        {/* Login Form */}
        <View style={styles.form}>
          <TextInput
            label="Username"
            value={username}
            onChangeText={setUsername}
            mode="outlined"
            autoCapitalize="none"
            autoComplete="username"
            style={styles.input}
          />

          <TextInput
            label="Password"
            value={password}
            onChangeText={setPassword}
            mode="outlined"
            secureTextEntry={!showPassword}
            autoCapitalize="none"
            autoComplete="password"
            right={
              <TextInput.Icon
                icon={showPassword ? 'eye-off' : 'eye'}
                onPress={() => setShowPassword(!showPassword)}
              />
            }
            style={styles.input}
          />

          {error ? (
            <HelperText type="error" visible={!!error}>
              {error}
            </HelperText>
          ) : null}

          <Button
            mode="contained"
            onPress={handleLogin}
            loading={loading}
            disabled={loading}
            style={styles.button}
          >
            Login
          </Button>

          {/* Demo Credentials */}
          <View style={styles.demoContainer}>
            <Text variant="labelSmall" style={styles.demoTitle}>
              Demo Credentials:
            </Text>
            <Text variant="labelSmall" style={styles.demoText}>
              Teacher: teacher1 / password123
            </Text>
            <Text variant="labelSmall" style={styles.demoText}>
              Student: student1 / password123
            </Text>
            <Text variant="labelSmall" style={styles.demoText}>
              Parent: parent1 / password123
            </Text>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1565C0',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    color: '#E3F2FD',
  },
  form: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
  },
  input: {
    marginBottom: 12,
  },
  button: {
    marginTop: 16,
    paddingVertical: 6,
  },
  demoContainer: {
    marginTop: 24,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  demoTitle: {
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#757575',
  },
  demoText: {
    color: '#757575',
    marginBottom: 4,
  },
});
