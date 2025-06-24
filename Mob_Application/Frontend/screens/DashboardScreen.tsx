import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
  Animated,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../api/api';
import type { RootStackParamList } from '../navigation/AppNavigator';

const SCREEN_WIDTH = Dimensions.get('window').width;

type DashboardNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Dashboard'>;

const DashboardScreen = () => {
  const navigation = useNavigation<DashboardNavigationProp>();
  const [students, setStudents] = useState<any[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<any>(null);
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const sidebarAnim = useState(new Animated.Value(-SCREEN_WIDTH * 0.6))[0];

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const gmail = await AsyncStorage.getItem('gmail');
        if (!gmail) {
          console.warn('No Gmail found in AsyncStorage');
          return;
        }

        const response = await api.get(`/student/${gmail}`);
        console.log('✅ Student data:', response.data);

        if (response.data.length > 0) {
          setStudents(response.data);
          setSelectedStudent(response.data[0]);
        } else {
          console.warn('No students found for this Gmail');
        }
      } catch (error: any) {
        console.error('❌ Error fetching student data:', error.message);
        Alert.alert('Error', 'Unable to fetch student data');
      }
    };

    fetchStudentData();
  }, []);

  const toggleSidebar = () => {
    Animated.timing(sidebarAnim, {
      toValue: sidebarVisible ? -SCREEN_WIDTH * 0.6 : 0,
      duration: 250,
      useNativeDriver: false,
    }).start(() => {
      setSidebarVisible(!sidebarVisible);
    });
  };

  const handleLogout = async () => {
    await AsyncStorage.clear();
    Alert.alert('Logged Out', 'You have been logged out.', [
      { text: 'OK', onPress: () => navigation.replace('Login') },
    ]);
  };

  const handleSelectStudent = (student: any) => {
    setSelectedStudent(student);
    setDropdownVisible(false);
  };

  return (
    <View style={styles.container}>
      {/* Sidebar */}
      <Animated.View style={[styles.sidebar, { left: sidebarAnim }]}>
        <TouchableOpacity style={styles.sidebarItem} onPress={() => navigation.navigate('StudentInfo')}>
          <Text style={styles.sidebarText}>Student Info</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.sidebarItem} onPress={handleLogout}>
          <Text style={styles.sidebarText}>Logout</Text>
        </TouchableOpacity>
      </Animated.View>

      {/* Menu Icon */}
      <TouchableOpacity style={styles.menuIcon} onPress={toggleSidebar}>
        <Image source={require('../assets/menu.jpg')} style={styles.menuImage} />
      </TouchableOpacity>

      {/* Profile Info with Dropdown */}
      {selectedStudent && (
        <>
          <TouchableOpacity style={styles.profileCard} onPress={() => setDropdownVisible(!dropdownVisible)}>
            <Image
              source={{ uri: 'https://i.pravatar.cc/100?img=5' }}
              style={styles.avatar}
            />
            <View>
              <Text style={styles.name}>{selectedStudent.name}</Text>
              <Text style={styles.classText}>
                Class {selectedStudent.class} - {selectedStudent.section}
              </Text>
            </View>
            <Text style={{ marginLeft: 'auto', fontSize: 18, color: 'black' }}>
              {dropdownVisible ? '▲' : '▼'}
            </Text>
          </TouchableOpacity>

          <View style={{ position: 'relative', zIndex: 10 }}>
            {dropdownVisible && (
              <View style={styles.dropdown}>
                {students
                  .filter((s) => s.Sid !== selectedStudent.Sid)
                  .map((student) => (
                    <TouchableOpacity
                      key={student.Sid}
                      style={styles.childOption}
                      onPress={() => handleSelectStudent(student)}
                    >
                      <Image
                        source={{ uri: 'https://i.pravatar.cc/100?img=6' }}
                        style={styles.childAvatar}
                      />
                      <View>
                        <Text style={styles.name}>{student.name}</Text>
                        <Text style={styles.classText}>
                          Class {student.class} - {student.section}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  ))}
              </View>
            )}
          </View>
        </>
      )}

      {/* Grid Cards */}
      <View style={styles.grid}>
        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate('Attendance', { student: selectedStudent })}
        >
          <Text style={styles.cardLabel}>Attendance</Text>
          <Text style={styles.cardValue}>Know more</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Fees', { student: selectedStudent })} style={styles.card}>
          <Text style={styles.cardLabel}>Fee</Text>
          <Text style={styles.cardValue}>DUE</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Marks', { student: selectedStudent })} style={styles.card}>
          <Text style={styles.cardLabel}>Marks</Text>
          <Text style={styles.cardValue}>See more</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate('Notice', { student: selectedStudent })}

        >
          <Text style={styles.cardLabel}>📢 Notices</Text>
          <Text style={styles.cardValue}>View</Text>
        </TouchableOpacity>

      </View>
    </View>
  );
};

export default DashboardScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3B82F6',
    paddingHorizontal: 20,
    paddingTop: 60,
  },
  menuIcon: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 100,
  },
  menuImage: {
    width: 28,
    height: 28,
    tintColor: 'black',
  },
  sidebar: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: SCREEN_WIDTH * 0.35,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 70,
    elevation: 10,
    zIndex: 99,
  },
  sidebarItem: {
    paddingVertical: 12,
  },
  sidebarText: {
    fontSize: 16,
    color: '#1E3A8A',
    fontWeight: '600',
  },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
    marginTop: 10,
    zIndex: 20,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
  },
  classText: {
    color: '#666',
    fontSize: 14,
  },
  dropdown: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    marginTop: 5,
    elevation: 5,
    zIndex: 10,
    position: 'absolute',
    width: '100%',
  },
  childOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 0,
    borderBottomColor: '#ddd',
  },
  childAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: 15,
    marginTop: 20,
    zIndex: 0,
  },
  card: {
    backgroundColor: '#fff',
    width: '48%',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 10,
  },
  cardLabel: {
    fontSize: 14,
    color: '#555',
    marginBottom: 4,
  },
  cardValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1E3A8A',
  },
});
