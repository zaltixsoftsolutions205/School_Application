// navigation/AppNavigator.tsx
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import DashboardScreen from '../screens/DashboardScreen';
import AttendanceScreen from '../screens/AttendanceScreen';
import FeesScreen from '../screens/FeesScreen';
import MarksScreen from '../screens/MarksScreen';
import NoticeScreen from '../screens/NoticeScreen';
import StudentInfoScreen from '../screens/StudentInfoScreen';
export type RootStackParamList = {
  Login: undefined;
  Dashboard: { gmail: string };
  Attendance: undefined;
  Fees: undefined;
  Marks: undefined;
  Notice: undefined;
  StudentInfo: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Dashboard" component={DashboardScreen} />
      <Stack.Screen name="Attendance" component={AttendanceScreen} />
       <Stack.Screen name="Fees" component={FeesScreen} />
       <Stack.Screen name="Marks" component={MarksScreen} />
       <Stack.Screen name="Notice" component={NoticeScreen} />
       <Stack.Screen name="StudentInfo" component={StudentInfoScreen} />

    </Stack.Navigator>
  );
};

export default AppNavigator;
