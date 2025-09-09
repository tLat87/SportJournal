import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useAppSelector } from '../hooks/useAppSelector';
import { RootStackParamList } from '../types';
import { Colors } from '../constants/colors';
import SimpleAnimatedView from '../components/SimpleAnimatedView';
import AnimatedCard from '../components/AnimatedCard';
import ProgressBar from '../components/ProgressBar';

type AnalyticsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Analytics'>;

const { width } = Dimensions.get('window');

const AnalyticsScreen = () => {
  const navigation = useNavigation<AnalyticsScreenNavigationProp>();
  const { entries } = useAppSelector((state) => state.journal);
  const { goals } = useAppSelector((state) => state.goals);

  // Calculate analytics
  const totalWorkouts = entries.length;
  const currentStreak = calculateStreak(entries);
  const weeklyWorkouts = getWeeklyWorkouts(entries);
  const monthlyWorkouts = getMonthlyWorkouts(entries);
  const averageWorkoutsPerWeek = getAverageWorkoutsPerWeek(entries);
  const mostActiveDay = getMostActiveDay(entries);
  const totalDuration = entries.reduce((sum, entry) => sum + (entry.duration || 0), 0);
  const totalCalories = entries.reduce((sum, entry) => sum + (entry.calories || 0), 0);

  function calculateStreak(entries: any[]) {
    if (entries.length === 0) return 0;
    
    const sortedEntries = entries.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    let streak = 0;
    let currentDate = new Date();
    
    for (const entry of sortedEntries) {
      const entryDate = new Date(entry.date);
      const daysDiff = Math.floor((currentDate.getTime() - entryDate.getTime()) / (1000 * 60 * 60 * 24));
      
      if (daysDiff === streak) {
        streak++;
        currentDate = entryDate;
      } else {
        break;
      }
    }
    
    return streak;
  }

  function getWeeklyWorkouts(entries: any[]) {
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    return entries.filter(entry => new Date(entry.date) >= oneWeekAgo).length;
  }

  function getMonthlyWorkouts(entries: any[]) {
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
    return entries.filter(entry => new Date(entry.date) >= oneMonthAgo).length;
  }

  function getAverageWorkoutsPerWeek(entries: any[]) {
    if (entries.length === 0) return 0;
    const firstEntry = new Date(Math.min(...entries.map(e => new Date(e.date).getTime())));
    const weeks = Math.max(1, Math.ceil((Date.now() - firstEntry.getTime()) / (1000 * 60 * 60 * 24 * 7)));
    return Math.round((entries.length / weeks) * 10) / 10;
  }

  function getMostActiveDay(entries: any[]) {
    if (entries.length === 0) return 'No data';
    
    const dayCounts: { [key: string]: number } = {};
    entries.forEach(entry => {
      const day = new Date(entry.date).toLocaleDateString('en-US', { weekday: 'long' });
      dayCounts[day] = (dayCounts[day] || 0) + 1;
    });
    
    return Object.keys(dayCounts).reduce((a, b) => dayCounts[a] > dayCounts[b] ? a : b);
  }

  const renderOverviewCard = () => (
    <AnimatedCard animation="fadeInDown" delay={0} glow={true}>
      <Text style={styles.sectionTitle}>Overview</Text>
      <View style={styles.overviewGrid}>
        <View style={styles.overviewItem}>
          <Text style={styles.overviewNumber}>{totalWorkouts}</Text>
          <Text style={styles.overviewLabel}>Total Workouts</Text>
        </View>
        <View style={styles.overviewItem}>
          <Text style={styles.overviewNumber}>{currentStreak}</Text>
          <Text style={styles.overviewLabel}>Current Streak</Text>
        </View>
        <View style={styles.overviewItem}>
          <Text style={styles.overviewNumber}>{weeklyWorkouts}</Text>
          <Text style={styles.overviewLabel}>This Week</Text>
        </View>
        <View style={styles.overviewItem}>
          <Text style={styles.overviewNumber}>{monthlyWorkouts}</Text>
          <Text style={styles.overviewLabel}>This Month</Text>
        </View>
      </View>
    </AnimatedCard>
  );

  const renderProgressCard = () => (
    <AnimatedCard animation="slideIn" delay={200}>
      <Text style={styles.sectionTitle}>Progress Tracking</Text>
      <View style={styles.progressContainer}>
        <View style={styles.progressItem}>
          <Text style={styles.progressLabel}>Weekly Average</Text>
          <Text style={styles.progressValue}>{averageWorkoutsPerWeek} workouts/week</Text>
        </View>
        <View style={styles.progressItem}>
          <Text style={styles.progressLabel}>Most Active Day</Text>
          <Text style={styles.progressValue}>{mostActiveDay}</Text>
        </View>
        <View style={styles.progressItem}>
          <Text style={styles.progressLabel}>Total Duration</Text>
          <Text style={styles.progressValue}>{Math.round(totalDuration / 60)} hours</Text>
        </View>
        <View style={styles.progressItem}>
          <Text style={styles.progressLabel}>Calories Burned</Text>
          <Text style={styles.progressValue}>{totalCalories.toLocaleString()}</Text>
        </View>
      </View>
    </AnimatedCard>
  );

  const renderGoalsProgress = () => {
    const activeGoals = goals.filter(g => !g.isCompleted);
    
    if (activeGoals.length === 0) return null;

    return (
      <AnimatedCard animation="zoomIn" delay={400}>
        <Text style={styles.sectionTitle}>Active Goals</Text>
        <View style={styles.goalsContainer}>
          {activeGoals.map((goal) => {
            const progress = (goal.currentValue / goal.targetValue) * 100;
            return (
              <View key={goal.id} style={styles.goalItem}>
                <View style={styles.goalHeader}>
                  <Text style={styles.goalTitle}>{goal.title}</Text>
                  <Text style={styles.goalProgress}>{Math.round(progress)}%</Text>
                </View>
                <ProgressBar
                  progress={progress}
                  height={8}
                  animated={true}
                  duration={1000}
                />
                <Text style={styles.goalDetails}>
                  {goal.currentValue} / {goal.targetValue} {goal.unit}
                </Text>
              </View>
            );
          })}
        </View>
      </AnimatedCard>
    );
  };

  const renderWeeklyChart = () => {
    const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const weeklyData = getWeeklyData(entries);
    const maxWorkouts = Math.max(...weeklyData, 1);

    return (
      <AnimatedCard animation="bounceIn" delay={600}>
        <Text style={styles.sectionTitle}>Weekly Activity</Text>
        <View style={styles.chartContainer}>
          {weekDays.map((day, index) => {
            const height = (weeklyData[index] / maxWorkouts) * 100;
            return (
              <View key={day} style={styles.chartItem}>
                <View style={styles.chartBarContainer}>
                  <View 
                    style={[
                      styles.chartBar, 
                      { height: `${height}%` }
                    ]} 
                  />
                </View>
                <Text style={styles.chartLabel}>{day}</Text>
                <Text style={styles.chartValue}>{weeklyData[index]}</Text>
              </View>
            );
          })}
        </View>
      </AnimatedCard>
    );
  };

  function getWeeklyData(entries: any[]) {
    const data = [0, 0, 0, 0, 0, 0, 0];
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    
    entries
      .filter(entry => new Date(entry.date) >= oneWeekAgo)
      .forEach(entry => {
        const day = new Date(entry.date).getDay();
        const adjustedDay = day === 0 ? 6 : day - 1; // Convert Sunday to last day
        data[adjustedDay]++;
      });
    
    return data;
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <SimpleAnimatedView animation="fadeInDown" delay={0}>
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backIcon}>←</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Analytics</Text>
          <View style={styles.headerSpacer} />
        </View>
      </SimpleAnimatedView>

      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {/* Overview */}
        {renderOverviewCard()}

        {/* Progress */}
        {renderProgressCard()}

        {/* Goals Progress */}
        {renderGoalsProgress()}

        {/* Weekly Chart */}
        {renderWeeklyChart()}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  backButton: {
    padding: 8,
    marginRight: 12,
  },
  backIcon: {
    fontSize: 24,
    color: Colors.text,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text,
    flex: 1,
  },
  headerSpacer: {
    width: 40,
  },
  scrollContainer: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 16,
  },
  overviewGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  overviewItem: {
    width: '48%',
    alignItems: 'center',
    paddingVertical: 16,
    backgroundColor: Colors.surfaceElevated,
    borderRadius: 12,
    marginBottom: 12,
  },
  overviewNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.textAccent,
    marginBottom: 4,
  },
  overviewLabel: {
    fontSize: 12,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
  progressContainer: {
    gap: 16,
  },
  progressItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  progressLabel: {
    fontSize: 16,
    color: Colors.text,
  },
  progressValue: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.textAccent,
  },
  goalsContainer: {
    gap: 16,
  },
  goalItem: {
    paddingVertical: 8,
  },
  goalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  goalTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
  },
  goalProgress: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.textAccent,
  },
  goalDetails: {
    fontSize: 12,
    color: Colors.textSecondary,
    textAlign: 'right',
    marginTop: 4,
  },
  chartContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 120,
    paddingHorizontal: 8,
  },
  chartItem: {
    flex: 1,
    alignItems: 'center',
  },
  chartBarContainer: {
    height: 80,
    justifyContent: 'flex-end',
    marginBottom: 8,
  },
  chartBar: {
    backgroundColor: Colors.textAccent,
    borderRadius: 4,
    minHeight: 4,
    width: '80%',
    alignSelf: 'center',
  },
  chartLabel: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginBottom: 4,
  },
  chartValue: {
    fontSize: 12,
    fontWeight: 'bold',
    color: Colors.text,
  },
});

export default AnalyticsScreen;
