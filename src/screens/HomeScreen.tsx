import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useAppSelector } from '../hooks/useAppSelector';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { RootStackParamList } from '../types';
import { Colors } from '../constants/colors';
import SimpleAnimatedView from '../components/SimpleAnimatedView';
import GradientButton from '../components/GradientButton';
import AnimatedCard from '../components/AnimatedCard';
import ProgressBar from '../components/ProgressBar';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'MainTabs'>;

const { width } = Dimensions.get('window');

const HomeScreen = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const dispatch = useAppDispatch();
  const { entries } = useAppSelector((state) => state.journal);
  const { achievements, unlockedAchievements } = useAppSelector((state) => state.achievements);
  const { goals } = useAppSelector((state) => state.goals);
  const { unreadCount } = useAppSelector((state) => state.notifications);

  const today = new Date();
  const todayString = today.toLocaleDateString('en-GB', { 
    day: 'numeric', 
    month: 'long' 
  });

  const todayEntries = entries.filter(entry => {
    const entryDate = new Date(entry.date);
    return entryDate.toDateString() === today.toDateString();
  });

  const recentEntries = entries.slice(0, 3);

  // Calculate stats
  const totalWorkouts = entries.length;
  const currentStreak = calculateStreak(entries);
  const weeklyGoal = goals.find(g => g.id === 'weekly_workouts');
  const weeklyProgress = weeklyGoal ? (weeklyGoal.currentValue / weeklyGoal.targetValue) * 100 : 0;

  // Calculate streak
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

  const getRelativeTime = (dateString: string) => {
    const entryDate = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - entryDate.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 24) {
      return 'Today';
    } else if (diffInHours < 48) {
      return 'Yesterday';
    } else {
      return `${Math.floor(diffInHours / 24)} days ago`;
    }
  };

  const renderStatsCard = () => (
    <AnimatedCard animation="fadeIn" delay={0} glow={true}>
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{totalWorkouts}</Text>
          <Text style={styles.statLabel}>Total Workouts</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{currentStreak}</Text>
          <Text style={styles.statLabel}>Day Streak</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{todayEntries.length}</Text>
          <Text style={styles.statLabel}>Today</Text>
        </View>
      </View>
    </AnimatedCard>
  );

  const renderQuickActions = () => (
    <AnimatedCard animation="slideIn" delay={200}>
      <Text style={styles.sectionTitle}>Quick Actions</Text>
      <View style={styles.quickActionsContainer}>
        <GradientButton
          title="Add Workout"
          onPress={() => navigation.navigate('AddEntry')}
          icon="➕"
          size="medium"
          style={styles.quickActionButton}
        />
        <GradientButton
          title="View Stats"
          onPress={() => navigation.navigate('Analytics')}
          icon="📊"
          variant="secondary"
          size="medium"
          style={styles.quickActionButton}
        />
        <GradientButton
          title="Achievements"
          onPress={() => navigation.navigate('Achievements')}
          icon="🏆"
          variant="warning"
          size="medium"
          style={styles.quickActionButton}
        />
      </View>
    </AnimatedCard>
  );

  const renderWeeklyProgress = () => (
    <AnimatedCard animation="zoomIn" delay={400}>
      <Text style={styles.sectionTitle}>Weekly Progress</Text>
      <ProgressBar
        progress={weeklyProgress}
        height={12}
        label="Workouts this week"
        animated={true}
        duration={1500}
      />
      <Text style={styles.progressText}>
        {weeklyGoal?.currentValue || 0} of {weeklyGoal?.targetValue || 5} workouts completed
      </Text>
    </AnimatedCard>
  );

  const renderAchievements = () => {
    const recentAchievements = achievements.filter(a => unlockedAchievements.includes(a.id)).slice(0, 3);
    
    if (recentAchievements.length === 0) return null;

    return (
      <AnimatedCard animation="bounceIn" delay={600}>
        <View style={styles.achievementsHeader}>
          <Text style={styles.sectionTitle}>Recent Achievements</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Achievements')}>
            <Text style={styles.viewAllText}>View All</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.achievementsContainer}>
          {recentAchievements.map((achievement) => (
            <View key={achievement.id} style={styles.achievementItem}>
              <Text style={styles.achievementIcon}>{achievement.icon}</Text>
              <View style={styles.achievementInfo}>
                <Text style={styles.achievementTitle}>{achievement.title}</Text>
                <Text style={styles.achievementDescription}>{achievement.description}</Text>
              </View>
            </View>
          ))}
        </View>
      </AnimatedCard>
    );
  };

  const renderRecentEntries = () => (
    <AnimatedCard animation="fadeIn" delay={800}>
      <View style={styles.recentEntriesHeader}>
        <Text style={styles.sectionTitle}>Recent Entries</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Journal')}>
          <Text style={styles.viewAllText}>View All</Text>
        </TouchableOpacity>
      </View>
      {recentEntries.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyStateText}>No entries yet</Text>
          <Text style={styles.emptyStateSubtext}>Start your fitness journey!</Text>
        </View>
      ) : (
        <View style={styles.entriesContainer}>
          {recentEntries.map((entry) => (
            <TouchableOpacity
              key={entry.id}
              style={styles.entryItem}
              onPress={() => navigation.navigate('EntryDetails', { entryId: entry.id })}
            >
              <View style={styles.entryInfo}>
                <Text style={styles.entryTitle}>{entry.activityName}</Text>
                <Text style={styles.entryTime}>{getRelativeTime(entry.date)}</Text>
              </View>
              <Text style={styles.entryArrow}>→</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </AnimatedCard>
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <SimpleAnimatedView animation="fadeInDown" delay={0}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.logoContainer} onPress={() => navigation.navigate('Information')}>
            <Text style={styles.logo}>SPORT UNI BEST JOURNAL</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.notificationButton}
            onPress={() => navigation.navigate('Notifications')}
          >
            <Text style={styles.notificationIcon}>🔔</Text>
            {unreadCount > 0 && (
              <View style={styles.notificationBadge}>
                <Text style={styles.notificationBadgeText}>{unreadCount}</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
      </SimpleAnimatedView>

      {/* Stats Card */}
      {renderStatsCard()}

      {/* Quick Actions */}
      {renderQuickActions()}

      {/* Weekly Progress */}
      {renderWeeklyProgress()}

      {/* Achievements */}
      {renderAchievements()}

      {/* Recent Entries */}
      {renderRecentEntries()}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  logoContainer: {
    flex: 1,
  },
  logo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
    letterSpacing: 1,
  },
  notificationButton: {
    position: 'relative',
    padding: 8,
  },
  notificationIcon: {
    fontSize: 24,
  },
  notificationBadge: {
    position: 'absolute',
    top: 4,
    right: 4,
    backgroundColor: Colors.error,
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationBadgeText: {
    color: Colors.text,
    fontSize: 12,
    fontWeight: 'bold',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 20,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statNumber: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.textAccent,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: Colors.border,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 16,
  },
  quickActionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  quickActionButton: {
    flex: 1,
  },
  progressText: {
    fontSize: 14,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginTop: 8,
  },
  achievementsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  achievementsContainer: {
    gap: 12,
  },
  achievementItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  achievementIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  achievementInfo: {
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
  recentEntriesHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  viewAllText: {
    fontSize: 14,
    color: Colors.textAccent,
    fontWeight: '600',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyStateText: {
    fontSize: 18,
    color: Colors.textSecondary,
    marginBottom: 8,
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: Colors.textMuted,
  },
  entriesContainer: {
    gap: 12,
  },
  entryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: Colors.surfaceElevated,
    borderRadius: 12,
  },
  entryInfo: {
    flex: 1,
  },
  entryTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 4,
  },
  entryTime: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  entryArrow: {
    fontSize: 18,
    color: Colors.textAccent,
  },
});

export default HomeScreen;