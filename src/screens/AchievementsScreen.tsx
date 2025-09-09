import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useAppSelector } from '../hooks/useAppSelector';
import { RootStackParamList } from '../types';
import { Colors } from '../constants/colors';
import SimpleAnimatedView from '../components/SimpleAnimatedView';
import AnimatedCard from '../components/AnimatedCard';
import ProgressBar from '../components/ProgressBar';

type AchievementsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Achievements'>;

const AchievementsScreen = () => {
  const navigation = useNavigation<AchievementsScreenNavigationProp>();
  const { achievements, unlockedAchievements } = useAppSelector((state) => state.achievements);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'streak': return '🔥';
      case 'total': return '📊';
      case 'special': return '⭐';
      case 'social': return '👥';
      default: return '🏆';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'streak': return Colors.warning;
      case 'total': return Colors.info;
      case 'special': return Colors.textAccent;
      case 'social': return Colors.secondary;
      default: return Colors.primary;
    }
  };

  const renderAchievementCard = (achievement: any, index: number) => {
    const isUnlocked = unlockedAchievements.includes(achievement.id);
    const progress = (achievement.progress / achievement.maxProgress) * 100;

    return (
      <AnimatedCard
        key={achievement.id}
        animation="fadeInUp"
        delay={index * 100}
        glow={isUnlocked}
        style={[
          styles.achievementCard,
          isUnlocked && styles.unlockedCard
        ]}
      >
        <View style={styles.achievementHeader}>
          <View style={styles.achievementIconContainer}>
            <Text style={styles.achievementIcon}>{achievement.icon}</Text>
            {isUnlocked && (
              <View style={styles.unlockedBadge}>
                <Text style={styles.unlockedBadgeText}>✓</Text>
              </View>
            )}
          </View>
          <View style={styles.achievementInfo}>
            <Text style={styles.achievementTitle}>{achievement.title}</Text>
            <Text style={styles.achievementDescription}>{achievement.description}</Text>
            <View style={styles.categoryContainer}>
              <Text style={styles.categoryIcon}>{getCategoryIcon(achievement.category)}</Text>
              <Text style={styles.categoryText}>{achievement.category.toUpperCase()}</Text>
            </View>
          </View>
        </View>
        
        <View style={styles.progressContainer}>
          <ProgressBar
            progress={progress}
            height={8}
            color={getCategoryColor(achievement.category)}
            animated={true}
            duration={1000}
          />
          <Text style={styles.progressText}>
            {achievement.progress} / {achievement.maxProgress}
          </Text>
        </View>

        {isUnlocked && achievement.unlockedAt && (
          <View style={styles.unlockedInfo}>
            <Text style={styles.unlockedText}>
              Unlocked on {new Date(achievement.unlockedAt).toLocaleDateString()}
            </Text>
          </View>
        )}
      </AnimatedCard>
    );
  };

  const unlockedCount = unlockedAchievements.length;
  const totalCount = achievements.length;

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
          <Text style={styles.headerTitle}>Achievements</Text>
          <View style={styles.headerSpacer} />
        </View>
      </SimpleAnimatedView>

      {/* Stats */}
      <SimpleAnimatedView animation="slideIn" delay={200}>
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{unlockedCount}</Text>
            <Text style={styles.statLabel}>Unlocked</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{totalCount - unlockedCount}</Text>
            <Text style={styles.statLabel}>Locked</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{Math.round((unlockedCount / totalCount) * 100)}%</Text>
            <Text style={styles.statLabel}>Complete</Text>
          </View>
        </View>
      </SimpleAnimatedView>

      {/* Achievements List */}
      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.achievementsContainer}>
          {achievements.map((achievement, index) => renderAchievementCard(achievement, index))}
        </View>
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
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: Colors.surface,
    marginHorizontal: 16,
    borderRadius: 16,
    marginBottom: 20,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.textAccent,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  scrollContainer: {
    flex: 1,
  },
  achievementsContainer: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  achievementCard: {
    marginBottom: 16,
    padding: 20,
  },
  unlockedCard: {
    borderWidth: 2,
    borderColor: Colors.textAccent,
  },
  achievementHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  achievementIconContainer: {
    position: 'relative',
    marginRight: 16,
  },
  achievementIcon: {
    fontSize: 32,
  },
  unlockedBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: Colors.success,
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  unlockedBadgeText: {
    color: Colors.text,
    fontSize: 12,
    fontWeight: 'bold',
  },
  achievementInfo: {
    flex: 1,
  },
  achievementTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 4,
  },
  achievementDescription: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 8,
  },
  categoryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryIcon: {
    fontSize: 14,
    marginRight: 6,
  },
  categoryText: {
    fontSize: 12,
    color: Colors.textMuted,
    fontWeight: '600',
  },
  progressContainer: {
    marginBottom: 8,
  },
  progressText: {
    fontSize: 12,
    color: Colors.textSecondary,
    textAlign: 'right',
    marginTop: 4,
  },
  unlockedInfo: {
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  unlockedText: {
    fontSize: 12,
    color: Colors.success,
    fontStyle: 'italic',
  },
});

export default AchievementsScreen;
