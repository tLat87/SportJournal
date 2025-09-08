import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
} from 'react-native';
import { useAppSelector } from '../hooks/useAppSelector';
import { Colors } from '../constants/colors';

const { width } = Dimensions.get('window');

const StatsScreen = () => {
  const { entries } = useAppSelector((state) => state.journal);

  // Calculate statistics
  const totalEntries = entries.length;
  const thisWeekEntries = entries.filter(entry => {
    const entryDate = new Date(entry.date);
    const now = new Date();
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    return entryDate >= weekAgo;
  }).length;

  const thisMonthEntries = entries.filter(entry => {
    const entryDate = new Date(entry.date);
    const now = new Date();
    return entryDate.getMonth() === now.getMonth() && 
           entryDate.getFullYear() === now.getFullYear();
  }).length;

  // Get most active day
  const dayCounts: { [key: string]: number } = {};
  entries.forEach(entry => {
    const day = new Date(entry.date).toLocaleDateString('en-GB', { weekday: 'long' });
    dayCounts[day] = (dayCounts[day] || 0) + 1;
  });
  const mostActiveDay = Object.keys(dayCounts).reduce((a, b) => 
    dayCounts[a] > dayCounts[b] ? a : b, 'Monday'
  );

  // Get activity types
  const activityTypes: { [key: string]: number } = {};
  entries.forEach(entry => {
    const activity = entry.activityName.toLowerCase();
    if (activity.includes('run')) {
      activityTypes['Running'] = (activityTypes['Running'] || 0) + 1;
    } else if (activity.includes('gym') || activity.includes('workout')) {
      activityTypes['Gym'] = (activityTypes['Gym'] || 0) + 1;
    } else if (activity.includes('cycle') || activity.includes('bike')) {
      activityTypes['Cycling'] = (activityTypes['Cycling'] || 0) + 1;
    } else if (activity.includes('swim')) {
      activityTypes['Swimming'] = (activityTypes['Swimming'] || 0) + 1;
    } else {
      activityTypes['Other'] = (activityTypes['Other'] || 0) + 1;
    }
  });

  const mostPopularActivity = Object.keys(activityTypes).reduce((a, b) => 
    activityTypes[a] > activityTypes[b] ? a : b, 'Running'
  );

  const StatCard = ({ title, value, subtitle, icon }: {
    title: string;
    value: string | number;
    subtitle?: string;
    icon: string;
  }) => (
    <View style={styles.statCard}>
      <View style={styles.statHeader}>
        <Text style={styles.statTitle}>{title}</Text>
        <Text style={styles.statIcon}>{icon}</Text>
      </View>
      <Text style={styles.statValue}>{value}</Text>
      {subtitle && <Text style={styles.statSubtitle}>{subtitle}</Text>}
    </View>
  );

  const ProgressBar = ({ label, value, max, color = Colors.primary }: {
    label: string;
    value: number;
    max: number;
    color?: string;
  }) => {
    const percentage = max > 0 ? (value / max) * 100 : 0;
    
    return (
      <View style={styles.progressContainer}>
        <View style={styles.progressHeader}>
          <Text style={styles.progressLabel}>{label}</Text>
          <Text style={styles.progressValue}>{value}</Text>
        </View>
        <View style={styles.progressBar}>
          <View 
            style={[
              styles.progressFill, 
              { width: `${percentage}%`, backgroundColor: color }
            ]} 
          />
        </View>
      </View>
    );
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Your Progress</Text>
        <Text style={styles.headerSubtitle}>Track your sports journey</Text>
      </View>

      {/* Overview Stats */}
      {/* <View style={styles.statsGrid}>
        <StatCard
          title="Total Entries"
          value={totalEntries}
          subtitle="All time"
          icon="📊"
        />
        <StatCard
          title="This Week"
          value={thisWeekEntries}
          subtitle="Last 7 days"
          icon="📅"
        />
        <StatCard
          title="This Month"
          value={thisMonthEntries}
          subtitle="Current month"
          icon="🗓️"
        />
        <StatCard
          title="Most Active"
          value={mostActiveDay}
          subtitle="Day of week"
          icon="🔥"
        />
      </View> */}

      {/* Activity Breakdown */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Activity Types</Text>
        <View style={styles.activityBreakdown}>
          {Object.entries(activityTypes).map(([activity, count]) => (
            <ProgressBar
              key={activity}
              label={activity}
              value={count}
              max={Math.max(...Object.values(activityTypes))}
            />
          ))}
        </View>
      </View>

      {/* Weekly Progress */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Weekly Progress</Text>
        <View style={styles.weeklyChart}>
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => {
            const dayEntries = entries.filter(entry => {
              const entryDate = new Date(entry.date);
              return entryDate.getDay() === (index + 1) % 7;
            }).length;
            
            return (
              <View key={day} style={styles.dayColumn}>
                <View 
                  style={[
                    styles.dayBar, 
                    { 
                      height: Math.max(dayEntries * 20, 4),
                      backgroundColor: dayEntries > 0 ? Colors.primary : Colors.border
                    }
                  ]} 
                />
                <Text style={styles.dayLabel}>{day}</Text>
                <Text style={styles.dayCount}>{dayEntries}</Text>
              </View>
            );
          })}
        </View>
      </View>

      {/* Achievements */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Achievements</Text>
        <View style={styles.achievementsList}>
          <View style={styles.achievement}>
            <Text style={styles.achievementIcon}>🏃‍♂️</Text>
            <View style={styles.achievementContent}>
              <Text style={styles.achievementTitle}>First Steps</Text>
              <Text style={styles.achievementDescription}>
                {totalEntries > 0 ? 'Completed!' : 'Add your first entry'}
              </Text>
            </View>
          </View>
          
          <View style={styles.achievement}>
            <Text style={styles.achievementIcon}>🔥</Text>
            <View style={styles.achievementContent}>
              <Text style={styles.achievementTitle}>Consistency</Text>
              <Text style={styles.achievementDescription}>
                {thisWeekEntries >= 3 ? 'Completed!' : 'Add 3 entries this week'}
              </Text>
            </View>
          </View>
          
          <View style={styles.achievement}>
            <Text style={styles.achievementIcon}>💪</Text>
            <View style={styles.achievementContent}>
              <Text style={styles.achievementTitle}>Dedication</Text>
              <Text style={styles.achievementDescription}>
                {totalEntries >= 10 ? 'Completed!' : 'Add 10 total entries'}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    padding: 20,
    paddingBottom: 10,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: Colors.textSecondary,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  statCard: {
    width: (width - 60) / 2,
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    marginRight: 12,
  },
  statHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  statTitle: {
    fontSize: 14,
    color: Colors.textSecondary,
    fontWeight: '600',
  },
  statIcon: {
    fontSize: 20,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 4,
  },
  statSubtitle: {
    fontSize: 12,
    color: Colors.textMuted,
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 16,
  },
  activityBreakdown: {
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: 16,
  },
  progressContainer: {
    marginBottom: 16,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  progressLabel: {
    fontSize: 16,
    color: Colors.text,
    fontWeight: '600',
  },
  progressValue: {
    fontSize: 16,
    color: Colors.primary,
    fontWeight: 'bold',
  },
  progressBar: {
    height: 8,
    backgroundColor: Colors.border,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  weeklyChart: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: 16,
    height: 120,
  },
  dayColumn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  dayBar: {
    width: 20,
    borderRadius: 10,
    marginBottom: 8,
  },
  dayLabel: {
    fontSize: 12,
    color: Colors.textMuted,
    marginBottom: 2,
  },
  dayCount: {
    fontSize: 10,
    color: Colors.textSecondary,
  },
  achievementsList: {
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: 16,
  },
  achievement: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  achievementIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  achievementContent: {
    flex: 1,
  },
  achievementTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 2,
  },
  achievementDescription: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
});

export default StatsScreen;


