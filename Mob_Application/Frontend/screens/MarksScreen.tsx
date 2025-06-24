import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  SafeAreaView,
  Alert,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../api/api'; // ✅ Ensure this points to axios instance

const calculateGrade = (percentage: number) => {
  if (percentage >= 90) return 'A+';
  if (percentage >= 80) return 'A';
  if (percentage >= 70) return 'B';
  if (percentage >= 60) return 'C';
  return 'D';
};

const MarksScreen = () => {
  const [selectedExamId, setSelectedExamId] = useState('');
  const [exams, setExams] = useState([]);
  const [marks, setMarks] = useState([]);
  const [studentId, setStudentId] = useState('');

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const gmail = await AsyncStorage.getItem('gmail');
        if (!gmail) return;

        const studentRes = await api.get(`/student/${gmail}`);
        if (studentRes.data.length > 0) {
          const sid = studentRes.data[0].Sid;
          setStudentId(sid);
          console.log('📌 Student ID:', sid);
        }

        const examRes = await api.get('/exam_types');
        console.log('🧪 Exams:', examRes.data);
        setExams(examRes.data);

        if (examRes.data.length > 0) {
          setSelectedExamId(examRes.data[0].exam_id.toString());
        }
      } catch (error: any) {
        console.error('❌ Init Error:', error.message);
        Alert.alert('Error', 'Failed to load data');
      }
    };

    fetchInitialData();
  }, []);

  useEffect(() => {
    if (selectedExamId && studentId) {
      console.log(`📤 Fetching marks for Sid=${studentId}, Exam=${selectedExamId}`);
      api
        .get(`/marks/student/${studentId}/exam/${selectedExamId}`)
        .then((res) => {
          console.log('✅ Marks:', res.data);
          setMarks(res.data);
        })
        .catch((err) => {
          console.error('❌ Fetch Marks Error:', err.message);
          Alert.alert('Error', 'Failed to fetch marks');
        });
    }
  }, [selectedExamId, studentId]);

  const total = marks.reduce((sum, item) => sum + parseFloat(item.marks), 0);
  const max = marks.reduce((sum, item) => sum + parseFloat(item.max_marks), 0);
  const percentage = max > 0 ? (total / max) * 100 : 0;
  const grade = calculateGrade(percentage);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.pickerContainer}>
        <Text style={styles.termLabel}>Select Exam:</Text>
        <Picker
          selectedValue={selectedExamId}
          onValueChange={(val) => setSelectedExamId(val)}
          style={styles.picker}
        >
          {exams.map((exam) => (
            <Picker.Item
              key={exam.exam_id}
              label={exam.exam_name}
              value={exam.exam_id.toString()}
            />
          ))}
        </Picker>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Subject-wise Marks</Text>
        <FlatList
          data={marks}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.markRow}>
              <Text style={styles.subject}>{item.subject_name}</Text>
              <Text style={styles.marks}>
                {item.marks} / {item.max_marks}
              </Text>
            </View>
          )}
        />
      </View>

      <View style={styles.totalCard}>
        <Text style={styles.totalText}>Total Marks: <Text style={styles.totalValue}>{total}</Text></Text>
        <Text style={styles.totalText}>Percentage: <Text style={styles.totalValue}>{percentage.toFixed(2)}%</Text></Text>
        <Text style={styles.totalText}>Grade: <Text style={styles.totalValue}>{grade}</Text></Text>
      </View>
    </SafeAreaView>
  );
};

export default MarksScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E6F0FF',
    padding: 16,
  },
  pickerContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 16,
    padding: 10,
    elevation: 2,
  },
  termLabel: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
    color: '#333',
  },
  picker: {
    width: '100%',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    elevation: 4,
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#333',
  },
  markRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
  },
  subject: {
    fontSize: 14,
    color: '#333',
  },
  marks: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2986F6',
  },
  totalCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    elevation: 3,
    alignItems: 'flex-start',
    gap: 8,
  },
  totalText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#444',
  },
  totalValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1E3A8A',
  },
});
