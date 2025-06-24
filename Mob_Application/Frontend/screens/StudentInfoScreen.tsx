import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../api/api'; // ✅ Use centralized Axios instance

const StudentInfoScreen = () => {
  const [student, setStudent] = useState<any>(null);

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const gmail = await AsyncStorage.getItem('gmail');
        if (!gmail) return;

        const res = await api.get(`/student/${gmail}`); // ✅ Relative path from baseURL
        if (res.data && res.data.length > 0) {
          setStudent(res.data[0]);
        } else {
          Alert.alert('No student found');
        }
      } catch (err) {
        console.error('❌ Error fetching student info:', err);
        Alert.alert('Error', 'Could not fetch student info');
      }
    };

    fetchStudent();
  }, []);

  const handleEditPhoto = () => {
    Alert.alert('Edit Photo', 'Here you can trigger image picker logic.');
  };

  if (!student) {
    return <Text style={{ padding: 20 }}>Loading student info...</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Student Information</Text>
      <View style={styles.card}>
        <View style={styles.avatarContainer}>
          <Image source={{ uri: student.photo || 'https://i.pravatar.cc/150?img=1' }} style={styles.avatar} />
          <TouchableOpacity style={styles.editIcon} onPress={handleEditPhoto}>
            <Text style={styles.editText}>Edit</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.label}>Name:</Text>
          <Text style={styles.value}>{student.name}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.label}>Parent Name:</Text>
          <Text style={styles.value}>{student.parent_name}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.label}>Class:</Text>
          <Text style={styles.value}>
            Class {student.class} - {student.section}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default StudentInfoScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E6F0FF',
    padding: 16,
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1E3A8A',
    marginBottom: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  editIcon: {
    marginTop: 8,
    backgroundColor: '#3B82F6',
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  editText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  label: {
    fontWeight: '600',
    fontSize: 16,
    width: 120,
    color: '#1E3A8A',
  },
  value: {
    fontSize: 16,
    color: '#334155',
  },
});
