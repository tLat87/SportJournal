import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';
import { useAppSelector } from '../hooks/useAppSelector';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { deleteEntry } from '../store/slices/journalSlice';
import { RootStackParamList } from '../types';
import { Colors } from '../constants/colors';

type EntryDetailsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'EntryDetails'>;
type EntryDetailsScreenRouteProp = RouteProp<RootStackParamList, 'EntryDetails'>;

const EntryDetailsScreen = () => {
  const navigation = useNavigation<EntryDetailsScreenNavigationProp>();
  const route = useRoute<EntryDetailsScreenRouteProp>();
  const dispatch = useAppDispatch();
  const { entries } = useAppSelector((state) => state.journal);

  const { entryId } = route.params;
  const entry = entries.find(e => e.id === entryId);

  if (!entry) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Entry not found</Text>
      </View>
    );
  }

  const handleDelete = () => {
    Alert.alert(
      'Delete Entry',
      `Are you sure you want to delete "${entry.activityName}"?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            dispatch(deleteEntry(entry.id));
            navigation.goBack();
          },
        },
      ]
    );
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Check out my activity: ${entry.activityName} - ${entry.activityDescription}`,
        title: entry.activityName,
      });
    } catch (error) {
      Alert.alert('Error', 'Failed to share entry');
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header Actions */}
      <View style={styles.headerActions}>
        {/* <TouchableOpacity style={{}} onPress={handleShare}>
          <Image source={require('../assets/img/Share.png')} style={{width: 120, height:70}}/>
        </TouchableOpacity> */}
        <TouchableOpacity  onPress={handleDelete}>
        <Image source={require('../assets/img/delete.png')} />
        </TouchableOpacity>
      </View>

      {/* Photo */}
      {entry.photoUri && (
        <View style={styles.photoContainer}>
          <Image source={{ uri: entry.photoUri }} style={styles.photo} />
        </View>
      )}

      {/* Content */}
      <View style={styles.content}>
        <Text style={styles.title}>{entry.activityName}</Text>
        
        <View style={styles.metaInfo}>
          <View style={styles.metaItem}>
          <Image source={require('../assets/img/Vector.png')} />
            <Text style={styles.metaText}>{formatDate(entry.date)}</Text>
          </View>
          <View style={styles.metaItem}>
            <Image source={require('../assets/img/time.png')} />
            <Text style={styles.metaText}>{entry.time}</Text>
          </View>
        </View>

        {entry.activityDescription && (
          <View style={styles.descriptionContainer}>
            <Text style={styles.descriptionLabel}>Description</Text>
            <Text style={styles.descriptionText}>{entry.activityDescription}</Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  headerActions: {
    flexDirection: 'row',
    paddingTop: 60,
    alignItems: 'center',
    // gap: 80,
    justifyContent: 'space-between',
    // justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  actionButton: {
    padding: 12,
    marginLeft: 12,
    borderRadius: 8,
    backgroundColor: Colors.surface,
  },
  photoContainer: {
    height: 250,
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 12,
    overflow: 'hidden',
  },
  photo: {
    width: '100%',
    height: '100%',
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 20,
  },
  metaInfo: {
    marginBottom: 24,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  metaText: {
    fontSize: 16,
    color: Colors.text,
    marginLeft: 12,
  },
  descriptionContainer: {
    marginTop: 8,
  },
  descriptionLabel: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 8,
  },
  descriptionText: {
    fontSize: 16,
    color: Colors.textSecondary,
    lineHeight: 24,
  },
  errorText: {
    fontSize: 18,
    color: Colors.error,
    textAlign: 'center',
    marginTop: 50,
  },
});

export default EntryDetailsScreen;
