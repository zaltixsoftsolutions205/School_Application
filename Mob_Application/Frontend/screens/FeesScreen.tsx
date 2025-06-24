import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ActivityIndicator } from 'react-native';
import api from '../api/api';
import { useRoute } from '@react-navigation/native';

const FeesScreen = () => {
  const route = useRoute<any>();
  const selectedStudent = route.params?.student;

  const [fees, setFees] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!selectedStudent?.Sid) return;
    fetchFees();
  }, [selectedStudent]);

  const fetchFees = async () => {
    try {
      const res = await api.get(`/fees/${selectedStudent.Sid}`);
      setFees(res.data);
    } catch (err) {
      console.error('Error fetching fees:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading || !fees) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color="#1E3A8A" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Total Fees</Text>
        <View style={styles.feeBreakdown}>
          <View style={styles.feeBlock}>
            <Text style={styles.feeAmount}>₹ {fees.total_fees}</Text>
            <Text style={styles.feeLabel}>Total</Text>
          </View>
          <View style={styles.feeBlock}>
            <Text style={styles.feeAmount}>₹ {fees.fee_paid}</Text>
            <Text style={styles.feeLabel}>Paid</Text>
          </View>
          <View style={styles.feeBlock}>
            <Text style={[styles.feeAmount, { color: '#2986F6' }]}>₹ {fees.due_amount}</Text>
            <Text style={styles.feeLabel}>Due</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default FeesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E6F0FF',
    padding: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#333',
  },
  feeBreakdown: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  feeBlock: {
    alignItems: 'center',
    flex: 1,
  },
  feeAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  feeLabel: {
    fontSize: 12,
    color: '#777',
    marginTop: 4,
  },
});
