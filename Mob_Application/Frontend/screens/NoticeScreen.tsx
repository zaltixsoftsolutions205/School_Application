import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  SafeAreaView,
  ActivityIndicator,
  Alert,
} from 'react-native';
//import axios from 'axios';
import api from '../api/api'; //

const NoticesScreen = () => {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchNotices = async () => {
    try {
      const res = await api.get('/notices');
 // use your IP if testing on device
      setNotices(res.data);
    } catch (error) {
      console.error('❌ Error fetching notices:', error);
      Alert.alert('Error', 'Could not fetch notices');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotices();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>📢 School Notices</Text>
        {loading ? (
          <ActivityIndicator size="large" color="#1E3A8A" />
        ) : (
          <FlatList
            data={notices}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.noticeRow}>
                <Text style={styles.noticeTitle}>{item.text}</Text>
                <Text style={styles.noticeDate}>
                  📅 {new Date(item.created_at).toLocaleString()}
                </Text>
              </View>
            )}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default NoticesScreen;

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
    marginBottom: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#1E3A8A',
  },
  noticeRow: {
    paddingVertical: 12,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
  },
  noticeTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  noticeDate: {
    fontSize: 12,
    color: '#777',
    marginTop: 4,
  },
});
