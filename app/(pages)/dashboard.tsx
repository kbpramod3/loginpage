import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { router, Router } from 'expo-router';

// Simple Card Component
const Card = ({ title, value }: { title: string; value: string }) => (
  <View style={styles.card}>
    <Text style={styles.cardTitle}>{title}</Text>
    <Text style={styles.cardValue}>{value}</Text>
  </View>
);

const DashboardPage = () => {
  return (
    <ScrollView style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Dashboard</Text>
      </View>

      <View style={styles.quickActions}>
        <Text style={styles.quickActionsTitle}>Quick Actions</Text>
        </View>

      {/* Stats Section */}
      <View style={styles.statsContainer}>
        <Card title="Total Users" value="1,230" />
        <Card title="Active Sessions" value="50" />
        <Card title="Revenue" value="$15,000" />
      </View>

      {/* Quick Actions */}
      <View style={styles.quickActions}>
        <Text style={styles.quickActionsTitle}>Quick Actions</Text>
        <TouchableOpacity style={styles.quickActionButton} onPress={() => router.navigate('/(pages)/camera')}>
          <Text style={styles.quickActionText}>Camera</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.quickActionButton}>
          <Text style={styles.quickActionText}>Generate Report</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.quickActionButton}>
          <Text style={styles.quickActionText}>Send Notification</Text>
        </TouchableOpacity>
      </View>

      {/* Recent Activities Section */}
      <View style={styles.activities}>
        <Text style={styles.activitiesTitle}>Recent Activities</Text>
        <View style={styles.activityItem}>
          <Text>John Doe registered</Text>
          <Text style={styles.activityTime}>10 minutes ago</Text>
        </View>
        <View style={styles.activityItem}>
          <Text>Jane Smith completed a purchase</Text>
          <Text style={styles.activityTime}>30 minutes ago</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#6200ea',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 20,
  },
  card: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    width: '28%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  cardValue: {
    fontSize: 18,
    color: '#6200ea',
  },
  quickActions: {
    marginTop: 30,
    paddingHorizontal: 20,
  },
  quickActionsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  quickActionButton: {
    backgroundColor: '#6200ea',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginBottom: 10,
  },
  quickActionText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
  activities: {
    marginTop: 30,
    paddingHorizontal: 20,
  },
  activitiesTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  activityItem: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  activityTime: {
    fontSize: 12,
    color: 'gray',
  },
});

export default DashboardPage;
