import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useAppSelector } from '../hooks/useAppSelector';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { addGoal } from '../store/slices/goalsSlice';
import { RootStackParamList, Goal } from '../types';
import { Colors } from '../constants/colors';
import SimpleAnimatedView from '../components/SimpleAnimatedView';
import AnimatedCard from '../components/AnimatedCard';
import ProgressBar from '../components/ProgressBar';
import GradientButton from '../components/GradientButton';

type GoalsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Goals'>;

const GoalsScreen = () => {
  const navigation = useNavigation<GoalsScreenNavigationProp>();
  const dispatch = useAppDispatch();
  const { goals } = useAppSelector((state) => state.goals);
  
  const [showAddForm, setShowAddForm] = useState(false);
  const [newGoal, setNewGoal] = useState({
    title: '',
    description: '',
    targetValue: '',
    unit: '',
    category: 'workouts' as const,
  });

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'workouts': return '🏃‍♀️';
      case 'duration': return '⏱️';
      case 'calories': return '🔥';
      case 'streak': return '🔥';
      default: return '🎯';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'workouts': return Colors.primary;
      case 'duration': return Colors.info;
      case 'calories': return Colors.warning;
      case 'streak': return Colors.secondary;
      default: return Colors.textAccent;
    }
  };

  const handleAddGoal = () => {
    if (!newGoal.title || !newGoal.targetValue) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    const goal: Goal = {
      id: Date.now().toString(),
      title: newGoal.title,
      description: newGoal.description,
      targetValue: parseInt(newGoal.targetValue),
      currentValue: 0,
      unit: newGoal.unit,
      category: newGoal.category,
      isCompleted: false,
    };

    dispatch(addGoal(goal));
    setNewGoal({ title: '', description: '', targetValue: '', unit: '', category: 'workouts' });
    setShowAddForm(false);
  };

  const renderGoalCard = (goal: Goal, index: number) => {
    const progress = (goal.currentValue / goal.targetValue) * 100;
    const isCompleted = goal.isCompleted;

    return (
      <AnimatedCard
        key={goal.id}
        animation="fadeInUp"
        delay={index * 100}
        glow={isCompleted}
        style={[
          styles.goalCard,
          isCompleted && styles.completedCard
        ]}
      >
        <View style={styles.goalHeader}>
          <View style={styles.goalIconContainer}>
            <Text style={styles.goalIcon}>{getCategoryIcon(goal.category)}</Text>
            {isCompleted && (
              <View style={styles.completedBadge}>
                <Text style={styles.completedBadgeText}>✓</Text>
              </View>
            )}
          </View>
          <View style={styles.goalInfo}>
            <Text style={styles.goalTitle}>{goal.title}</Text>
            <Text style={styles.goalDescription}>{goal.description}</Text>
            <View style={styles.goalMeta}>
              <Text style={styles.goalTarget}>
                {goal.currentValue} / {goal.targetValue} {goal.unit}
              </Text>
              <Text style={styles.goalCategory}>{goal.category.toUpperCase()}</Text>
            </View>
          </View>
        </View>
        
        <View style={styles.progressContainer}>
          <ProgressBar
            progress={progress}
            height={10}
            color={getCategoryColor(goal.category)}
            animated={true}
            duration={1000}
          />
          <Text style={styles.progressText}>
            {Math.round(progress)}% Complete
          </Text>
        </View>

        {isCompleted && (
          <View style={styles.completedInfo}>
            <Text style={styles.completedText}>🎉 Goal Completed!</Text>
          </View>
        )}
      </AnimatedCard>
    );
  };

  const renderAddForm = () => (
    <AnimatedCard animation="slideIn" delay={0}>
      <Text style={styles.formTitle}>Add New Goal</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Goal title"
        placeholderTextColor={Colors.textMuted}
        value={newGoal.title}
        onChangeText={(text) => setNewGoal({ ...newGoal, title: text })}
      />
      
      <TextInput
        style={styles.input}
        placeholder="Description (optional)"
        placeholderTextColor={Colors.textMuted}
        value={newGoal.description}
        onChangeText={(text) => setNewGoal({ ...newGoal, description: text })}
      />
      
      <View style={styles.inputRow}>
        <TextInput
          style={[styles.input, styles.inputHalf]}
          placeholder="Target value"
          placeholderTextColor={Colors.textMuted}
          value={newGoal.targetValue}
          onChangeText={(text) => setNewGoal({ ...newGoal, targetValue: text })}
          keyboardType="numeric"
        />
        
        <TextInput
          style={[styles.input, styles.inputHalf]}
          placeholder="Unit (e.g., workouts, minutes)"
          placeholderTextColor={Colors.textMuted}
          value={newGoal.unit}
          onChangeText={(text) => setNewGoal({ ...newGoal, unit: text })}
        />
      </View>

      <View style={styles.formButtons}>
        <GradientButton
          title="Cancel"
          onPress={() => setShowAddForm(false)}
          variant="secondary"
          size="medium"
          style={styles.formButton}
        />
        <GradientButton
          title="Add Goal"
          onPress={handleAddGoal}
          size="medium"
          style={styles.formButton}
        />
      </View>
    </AnimatedCard>
  );

  const completedGoals = goals.filter(g => g.isCompleted).length;
  const totalGoals = goals.length;

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
          <Text style={styles.headerTitle}>Goals</Text>
          <TouchableOpacity 
            style={styles.addButton}
            onPress={() => setShowAddForm(!showAddForm)}
          >
            <Text style={styles.addIcon}>➕</Text>
          </TouchableOpacity>
        </View>
      </SimpleAnimatedView>

      {/* Stats */}
      <SimpleAnimatedView animation="slideIn" delay={200}>
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{completedGoals}</Text>
            <Text style={styles.statLabel}>Completed</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{totalGoals - completedGoals}</Text>
            <Text style={styles.statLabel}>Active</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{totalGoals > 0 ? Math.round((completedGoals / totalGoals) * 100) : 0}%</Text>
            <Text style={styles.statLabel}>Success Rate</Text>
          </View>
        </View>
      </SimpleAnimatedView>

      {/* Add Form */}
      {showAddForm && renderAddForm()}

      {/* Goals List */}
      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.goalsContainer}>
          {goals.length === 0 ? (
            <AnimatedCard animation="fadeIn" delay={400}>
              <View style={styles.emptyState}>
                <Text style={styles.emptyStateText}>No goals yet</Text>
                <Text style={styles.emptyStateSubtext}>Set your first goal to start tracking progress!</Text>
                <GradientButton
                  title="Create First Goal"
                  onPress={() => setShowAddForm(true)}
                  icon="🎯"
                  style={styles.emptyStateButton}
                />
              </View>
            </AnimatedCard>
          ) : (
            goals.map((goal, index) => renderGoalCard(goal, index))
          )}
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
  addButton: {
    padding: 8,
  },
  addIcon: {
    fontSize: 24,
    color: Colors.textAccent,
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
  goalsContainer: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  goalCard: {
    marginBottom: 16,
    padding: 20,
  },
  completedCard: {
    borderWidth: 2,
    borderColor: Colors.success,
  },
  goalHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  goalIconContainer: {
    position: 'relative',
    marginRight: 16,
  },
  goalIcon: {
    fontSize: 32,
  },
  completedBadge: {
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
  completedBadgeText: {
    color: Colors.text,
    fontSize: 12,
    fontWeight: 'bold',
  },
  goalInfo: {
    flex: 1,
  },
  goalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 4,
  },
  goalDescription: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 8,
  },
  goalMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  goalTarget: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.textAccent,
  },
  goalCategory: {
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
  completedInfo: {
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  completedText: {
    fontSize: 14,
    color: Colors.success,
    fontWeight: '600',
    textAlign: 'center',
  },
  formTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 16,
  },
  input: {
    backgroundColor: Colors.surfaceElevated,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: Colors.text,
    marginBottom: 12,
  },
  inputRow: {
    flexDirection: 'row',
    gap: 12,
  },
  inputHalf: {
    flex: 1,
  },
  formButtons: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 8,
  },
  formButton: {
    flex: 1,
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
    textAlign: 'center',
    marginBottom: 20,
  },
  emptyStateButton: {
    paddingHorizontal: 32,
  },
});

export default GoalsScreen;
