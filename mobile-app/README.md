# Tagore University Mobile App

React Native mobile application for Tagore University Management System with three role-based portals: Teacher, Student, and Parent.

## Features

### Teacher Portal
- **Dashboard**: View today's classes, student count, pending marks, and attendance stats
- **Attendance Marking**: Mark attendance for classes with Present/Absent/Late options
- **Marks Entry**: Enter internal assessment and exam marks for students
- **Profile**: View personal and academic details

### Student Portal
- **Dashboard**: View attendance %, CGPA, fee status, and semester info
- **Attendance Tracker**: Calendar view and list view of attendance records
- **Marks**: Subject-wise marks breakdown with grades and CGPA calculation
- **Fee Management**: View fee breakdown, payment history, and make online payments
- **Profile**: View academic and personal information

### Parent Portal
- **Dashboard**: Monitor child's performance with multi-child support
- **Children**: View detailed information for all enrolled children
- **Notifications**: Real-time alerts for absence, marks, fees, and announcements
- **Profile**: Manage notification preferences and contact information

## Tech Stack

- **Framework**: React Native (Expo SDK 50)
- **Language**: TypeScript
- **UI Library**: React Native Paper (Material Design 3)
- **Navigation**: React Navigation v6 (Stack + Bottom Tabs)
- **State Management**: Zustand
- **API Client**: Axios with React Query
- **Charts**: React Native Chart Kit
- **Storage**: AsyncStorage
- **Notifications**: Expo Notifications
- **Camera**: Expo Camera (for face recognition attendance)
- **Location**: Expo Location (for geo-fenced attendance)

## Prerequisites

- Node.js 18+ and npm/yarn
- Expo CLI: `npm install -g expo-cli`
- For iOS: macOS with Xcode 14+
- For Android: Android Studio with SDK 33+
- Expo Go app on your mobile device (for development)

## Installation

1. **Clone the repository**
   ```bash
   cd d:\Bitflow\Tagore\mobile-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment**
   
   Create `.env` file in the root directory:
   ```env
   API_BASE_URL=http://localhost:3000/api
   EXPO_PUBLIC_API_URL=http://localhost:3000/api
   ```

4. **Configure Firebase (for Push Notifications)**
   
   - Download `google-services.json` from Firebase Console
   - Place it in the `mobile-app/` directory
   - Update `app.json` with your Firebase project details

## Running the App

### Development Mode

1. **Start Expo Development Server**
   ```bash
   npm start
   ```

2. **Run on Android Emulator**
   ```bash
   npm run android
   ```

3. **Run on iOS Simulator** (macOS only)
   ```bash
   npm run ios
   ```

4. **Run on Physical Device**
   - Install "Expo Go" app from Play Store/App Store
   - Scan the QR code shown in terminal

### Production Build

1. **Android APK**
   ```bash
   eas build --platform android --profile preview
   ```

2. **iOS Build** (requires Apple Developer Account)
   ```bash
   eas build --platform ios --profile preview
   ```

## Demo Credentials

### Teacher Login
- Username: `teacher1`
- Password: `password123`

### Student Login
- Username: `student1`
- Password: `password123`

### Parent Login
- Username: `parent1`
- Password: `password123`

## Project Structure

```
mobile-app/
├── src/
│   ├── screens/
│   │   ├── auth/
│   │   │   └── LoginScreen.tsx
│   │   ├── teacher/
│   │   │   ├── DashboardScreen.tsx
│   │   │   ├── AttendanceScreen.tsx
│   │   │   ├── MarksScreen.tsx
│   │   │   └── ProfileScreen.tsx
│   │   ├── student/
│   │   │   ├── DashboardScreen.tsx
│   │   │   ├── AttendanceScreen.tsx
│   │   │   ├── MarksScreen.tsx
│   │   │   ├── FeesScreen.tsx
│   │   │   └── ProfileScreen.tsx
│   │   └── parent/
│   │       ├── DashboardScreen.tsx
│   │       ├── ChildrenScreen.tsx
│   │       ├── NotificationsScreen.tsx
│   │       └── ProfileScreen.tsx
│   ├── navigation/
│   │   └── AppNavigator.tsx
│   ├── store/
│   │   └── authStore.ts
│   └── theme.ts
├── App.tsx
├── app.json
├── package.json
└── tsconfig.json
```

## Features Implementation Status

### ✅ Completed
- [x] Authentication with role-based routing
- [x] Teacher Portal (4 tabs)
- [x] Student Portal (5 tabs)
- [x] Parent Portal (4 tabs)
- [x] Bottom tab navigation
- [x] Material Design UI components
- [x] Mock data for all screens
- [x] Offline storage with AsyncStorage
- [x] Charts for data visualization

### 🚧 To Be Integrated
- [ ] Backend API integration with Axios
- [ ] Firebase Cloud Messaging for push notifications
- [ ] Camera for attendance via face recognition
- [ ] Location services for geo-fenced attendance
- [ ] Payment gateway integration (Razorpay/Stripe)
- [ ] Biometric authentication
- [ ] Offline mode with data sync

## API Integration

Replace mock data with actual API calls:

```typescript
// Example: Fetch student attendance
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token interceptor
api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Use in components
const { data } = await api.get('/attendance/student/123');
```

## Push Notifications Setup

1. **Configure Expo Notifications**
   ```bash
   expo install expo-notifications expo-device expo-constants
   ```

2. **Request Permissions**
   ```typescript
   import * as Notifications from 'expo-notifications';
   
   const { status } = await Notifications.requestPermissionsAsync();
   const token = await Notifications.getExpoPushTokenAsync();
   ```

3. **Send to Backend**
   Send the push token to backend to store in user profile.

## Troubleshooting

### Metro Bundler Issues
```bash
npx expo start -c
```

### Dependency Conflicts
```bash
rm -rf node_modules package-lock.json
npm install
```

### Android Build Errors
```bash
cd android
./gradlew clean
cd ..
npx expo run:android
```

### iOS Build Errors
```bash
cd ios
pod install
cd ..
npx expo run:ios
```

## Performance Optimization

- Use `React.memo` for expensive components
- Implement `FlatList` for long lists
- Enable Hermes JavaScript engine
- Use `useMemo` and `useCallback` hooks
- Optimize images with `expo-image`

## Security Best Practices

- Store sensitive data in secure storage (Expo SecureStore)
- Implement certificate pinning for API calls
- Use biometric authentication
- Enable code obfuscation for production builds
- Implement session timeout

## Contributing

1. Create feature branch from `develop`
2. Follow React Native best practices
3. Write unit tests for components
4. Test on both iOS and Android
5. Submit pull request

## License

Copyright © 2024 Tagore University. All rights reserved.

## Support

For issues and feature requests:
- Email: support@tagore.edu.in
- GitHub Issues: [Create Issue](https://github.com/tagore/mobile-app/issues)
