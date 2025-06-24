import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { useRoute } from '@react-navigation/native';
import api from '../api/api';

interface AttendanceRecord {
  date: string;
  status: 'Present' | 'Absent' | 'Holiday';
}

const AttendanceScreen = () => {
  const route = useRoute<any>();
  const selectedStudent = route.params?.student;

  const [attendanceData, setAttendanceData] = useState<AttendanceRecord[]>([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [loading, setLoading] = useState(true);
  const [weeklyPercent, setWeeklyPercent] = useState(0);
  const [monthlyPercent, setMonthlyPercent] = useState(0);

  useEffect(() => {
    if (!selectedStudent?.Sid) return;
    fetchAttendance();
  }, [selectedStudent]);

  const fetchAttendance = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/attendance/${selectedStudent.Sid}`);
      const records: AttendanceRecord[] = response.data || [];
      setAttendanceData(records);
      if (records.length > 0) {
        setSelectedDate(records[0].date);
      }
      calculatePercentages(records);
    } catch (err) {
      console.error('Error fetching attendance:', err);
    } finally {
      setLoading(false);
    }
  };

  const calculatePercentages = (data: AttendanceRecord[]) => {
    const today = new Date();
    const todayStr = today.toISOString().split('T')[0];
    const currentMonthStr = todayStr.slice(0, 7); // 'YYYY-MM'

    const currentWeekStart = new Date(today);
    currentWeekStart.setDate(today.getDate() - today.getDay());
    const currentWeekStartStr = currentWeekStart.toISOString().split('T')[0];

    let weekTotal = 0;
    let weekPresent = 0;
    let monthTotal = 0;
    let monthPresent = 0;

    data.forEach(({ date, status }) => {
      if (date.startsWith(currentMonthStr)) {
        monthTotal++;
        if (status === 'Present') monthPresent++;
      }

      if (date >= currentWeekStartStr && date <= todayStr) {
        weekTotal++;
        if (status === 'Present') weekPresent++;
      }
    });

    setWeeklyPercent(weekTotal ? Math.round((weekPresent / weekTotal) * 100) : 0);
    setMonthlyPercent(monthTotal ? Math.round((monthPresent / monthTotal) * 100) : 0);
  };

  const markedDates = attendanceData.reduce((acc, item) => {
    acc[item.date] = {
      selected: item.date === selectedDate,
      selectedColor:
        item.status === 'Present'
          ? '#4ade80'
          : item.status === 'Absent'
          ? '#f87171'
          : '#fbbf24',
      marked: true,
    };
    return acc;
  }, {} as any);

  const selectedStatus = attendanceData.find((a) => a.date === selectedDate)?.status;

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Attendance</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#1E3A8A" />
      ) : (
        <>
          <View style={styles.card}>
            <Calendar
              onDayPress={(day) => setSelectedDate(day.dateString)}
              markedDates={markedDates}
              theme={{
                selectedDayBackgroundColor: '#3B82F6',
                todayTextColor: '#3B82F6',
              }}
            />
          </View>

          <View style={styles.card}>
            <Text style={styles.subHeading}>Attendance Status</Text>
            {selectedStatus ? (
              <View style={styles.attendanceRow}>
                <Text style={styles.dateText}>Date: {selectedDate}</Text>
                <Text
                  style={[
                    styles.status,
                    {
                      color:
                        selectedStatus === 'Present'
                          ? '#16a34a'
                          : selectedStatus === 'Absent'
                          ? '#dc2626'
                          : '#d97706',
                    },
                  ]}
                >
                  Status: {selectedStatus}
                </Text>
              </View>
            ) : (
              <Text style={styles.status}>No Record</Text>
            )}
          </View>

          <View style={styles.percentGrid}>
            <View style={styles.card}>
              <Text style={styles.percentLabel}>Weekly Attendance</Text>
              <Text style={styles.percentValue}>{weeklyPercent}%</Text>
            </View>
            <View style={styles.card}>
              <Text style={styles.percentLabel}>Monthly Attendance</Text>
              <Text style={styles.percentValue}>{monthlyPercent}%</Text>
            </View>
          </View>
        </>
      )}
    </View>
  );
};

export default AttendanceScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F1F5F9',
  },
  heading: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1E3A8A',
    marginBottom: 16,
  },
  subHeading: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
    color: '#1E3A8A',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  attendanceRow: {
    marginTop: 10,
  },
  dateText: {
    fontSize: 16,
    marginBottom: 8,
    color: '#1e293b',
  },
  status: {
    fontSize: 16,
    fontWeight: '600',
  },
  percentGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  percentLabel: {
    fontSize: 14,
    color: '#555',
    marginBottom: 6,
    fontWeight: '500',
  },
  percentValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1E3A8A',
  },
});
