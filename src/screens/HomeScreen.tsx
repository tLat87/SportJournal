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
// import Icon from 'react-native-vector-icons/Ionicons'; // Заменено на смайлики
import { useAppSelector } from '../hooks/useAppSelector';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { RootStackParamList } from '../types';
import { Colors } from '../constants/colors';
import SimpleAnimatedView from '../components/SimpleAnimatedView';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'MainTabs'>;

const { width } = Dimensions.get('window');

const HomeScreen = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const dispatch = useAppDispatch();
  const { entries } = useAppSelector((state) => state.journal);

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

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <SimpleAnimatedView animation="fadeInDown" delay={0}>
        <View style={styles.header}>
          <Text style={styles.logo}>SPORT UNI BEST JOURNAL</Text>
          <TouchableOpacity style={styles.lightbulbButton} onPress={() => navigation.navigate('Information')}>
            <Image source={require('../assets/img/I.png')} />
          </TouchableOpacity>
        </View>
      </SimpleAnimatedView>

      {/* Main Image */}
      <SimpleAnimatedView animation="zoomIn" delay={200}>
        <View style={styles.imageContainer}>
            {/* <View style={styles.placeholderImage}> */}
              <Image source={require('../assets/img/ee38d184ddf2b28962e5e3140931df33c9d28014.png')} style={{width: '70%', height: 300}} resizeMode='cover'/>
          {/* </View> */}
        </View>
      </SimpleAnimatedView>

      {/* Date and Summary */}
      <SimpleAnimatedView animation="fadeInUp" delay={400}>
        <View style={styles.dateSection}>
          <Text style={styles.dateText}>{todayString}</Text>
          <Text style={styles.entriesText}>
            {todayEntries.length} {todayEntries.length === 1 ? 'entry' : 'entries'} today
          </Text>
        </View>
      </SimpleAnimatedView>

      {/* Add Entry Button */}
      <SimpleAnimatedView animation="bounceIn" delay={600}>
        <TouchableOpacity
          style={styles.addEntryButton}
          onPress={() => navigation.navigate('AddEntry')}
        >
          <Image source={require('../assets/img/BUTTON.png')}  />
        </TouchableOpacity>
      </SimpleAnimatedView>

      

      {/* Last Entries Section */}
      <SimpleAnimatedView animation="fadeInUp" delay={800}>
        <View style={styles.lastEntriesSection}>
          <View style={styles.lastEntriesHeader}>
            <Text style={styles.lastEntriesTitle}>Last entries</Text>
            <TouchableOpacity 
              style={styles.viewAllButton}
              onPress={() => navigation.navigate('Journal')}
            >
              <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
          </View>
          
          {recentEntries.length === 0 ? (
            <Text style={styles.noEntriesText}>No entries....</Text>
          ) : (
            recentEntries.map((entry, index) => (
              <SimpleAnimatedView 
                key={entry.id} 
                animation="slideInLeft" 
                delay={1000 + (index * 100)}
              >
                <TouchableOpacity
                  style={styles.entryCard}
                  onPress={() => navigation.navigate('EntryDetails', { entryId: entry.id })}
                >
                  <View style={styles.entryImageContainer}>
                    {entry.photoUri ? (
                      <Image source={{ uri: entry.photoUri }} style={styles.entryImage} />
                    ) : (
                      <View style={styles.entryPlaceholder}>
                        <Text style={styles.entryPlaceholderEmoji}>👤</Text>
                      </View>
                    )}
                  </View>
                  <View style={styles.entryContent}>
                    <Text style={styles.entryTitle}>{entry.activityName}</Text>
                    <Text style={styles.entryTime}>{getRelativeTime(entry.date)}</Text>
                  </View>
                  <Image source={require('../assets/img/Group10.png')} style={{width: 40, height: 40}}/>
                </TouchableOpacity>
              </SimpleAnimatedView>
            ))
          )}
        </View>
      </SimpleAnimatedView>
      {/* <View style={{marginBottom: 100}}/> */}
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
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.text,
  },
  lightbulbButton: {
    padding: 8,
  },
  emojiIcon: {
    fontSize: 24,
  },
  placeholderEmoji: {
    fontSize: 80,
  },
  addEntryEmoji: {
    fontSize: 24,
    marginRight: 8,
  },
  decorativeEmoji: {
    fontSize: 20,
  },
  entryPlaceholderEmoji: {
    fontSize: 20,
  },
  chevronEmoji: {
    fontSize: 16,
  },
  imageContainer: {
    // height: 300,
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 12,
    alignItems: 'center',
    overflow: 'hidden',
  },
  placeholderImage: {
    flex: 1,
    backgroundColor: Colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dateSection: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  dateText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 4,
  },
  entriesText: {
    fontSize: 16,
    color: Colors.textSecondary,
  },
  addEntryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: Colors.primary,
    marginHorizontal: 20,
    // paddingVertical: 16,
    // borderRadius: 12,
    marginBottom: 40,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  addEntryText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.background,
    marginLeft: 8,
  },
  decorativeElements: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    pointerEvents: 'none',
  },
  decorativeCircle: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.primary,
    position: 'absolute',
  },
  lastEntriesSection: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  lastEntriesHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  lastEntriesTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
  },
  viewAllButton: {
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  viewAllText: {
    fontSize: 14,
    color: Colors.primary,
    fontWeight: '600',
  },
  noEntriesText: {
    fontSize: 16,
    color: Colors.textMuted,
    fontStyle: 'italic',
  },
  entryCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  entryImageContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: 'hidden',
    marginRight: 12,
  },
  entryImage: {
    width: '100%',
    height: '100%',
  },
  entryPlaceholder: {
    flex: 1,
    backgroundColor: Colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  entryContent: {
    flex: 1,
  },
  entryTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 2,
  },
  entryTime: {
    fontSize: 14,
    color: Colors.textMuted,
  },
});

export default HomeScreen;
