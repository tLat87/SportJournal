import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Goal } from '../../types';

interface GoalsState {
  goals: Goal[];
  isLoading: boolean;
}

const initialState: GoalsState = {
  goals: [
    {
      id: 'weekly_workouts',
      title: 'Weekly Warrior',
      description: 'Complete 5 workouts this week',
      targetValue: 5,
      currentValue: 0,
      unit: 'workouts',
      category: 'workouts',
      isCompleted: false,
    },
    {
      id: 'monthly_duration',
      title: 'Monthly Marathon',
      description: 'Exercise for 20 hours this month',
      targetValue: 1200, // 20 hours in minutes
      currentValue: 0,
      unit: 'minutes',
      category: 'duration',
      isCompleted: false,
    },
    {
      id: 'calorie_burn',
      title: 'Calorie Crusher',
      description: 'Burn 5000 calories this month',
      targetValue: 5000,
      currentValue: 0,
      unit: 'calories',
      category: 'calories',
      isCompleted: false,
    },
  ],
  isLoading: false,
};

const goalsSlice = createSlice({
  name: 'goals',
  initialState,
  reducers: {
    addGoal: (state, action: PayloadAction<Goal>) => {
      state.goals.push(action.payload);
    },
    updateGoalProgress: (state, action: PayloadAction<{ id: string; value: number }>) => {
      const goal = state.goals.find(g => g.id === action.payload.id);
      if (goal) {
        goal.currentValue = action.payload.value;
        goal.isCompleted = goal.currentValue >= goal.targetValue;
      }
    },
    completeGoal: (state, action: PayloadAction<string>) => {
      const goal = state.goals.find(g => g.id === action.payload);
      if (goal) {
        goal.isCompleted = true;
      }
    },
    deleteGoal: (state, action: PayloadAction<string>) => {
      state.goals = state.goals.filter(g => g.id !== action.payload);
    },
  },
});

export const { addGoal, updateGoalProgress, completeGoal, deleteGoal } = goalsSlice.actions;
export default goalsSlice.reducer;
