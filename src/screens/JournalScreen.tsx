import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  Alert,
  TextInput,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
// import Icon from 'react-native-vector-icons/Ionicons'; // Заменено на смайлики
import { useAppSelector } from '../hooks/useAppSelector';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { deleteEntry } from '../store/slices/journalSlice';
import { JournalEntry } from '../types';
import { Colors } from '../constants/colors';
import SimpleAnimatedView from '../components/SimpleAnimatedView';

type JournalScreenNavigationProp = StackNavigationProp<any, 'Journal'>;

const JournalScreen = () => {
  const navigation = useNavigation<JournalScreenNavigationProp>();
  const dispatch = useAppDispatch();
  const { entries } = useAppSelector((state) => state.journal);
  const [searchQuery, setSearchQuery] = useState('');

  const handleDeleteEntry = (entryId: string, entryName: string) => {
    Alert.alert(
      'Delete Entry',
      `Are you sure you want to delete "${entryName}"?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => dispatch(deleteEntry(entryId)),
        },
      ]
    );
  };

  const handleShareEntry = (entry: JournalEntry) => {
    // TODO: Implement share functionality
    Alert.alert('Share', `Sharing "${entry.activityName}" entry`);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  const formatTime = (timeString: string) => {
    return timeString;
  };

  const filteredEntries = entries.filter(entry =>
    entry.activityName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    entry.activityDescription.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderEntry = ({ item }: { item: JournalEntry }) => (
    <TouchableOpacity
      style={styles.entryCard}
      onPress={() => navigation.navigate('EntryDetails', { entryId: item.id })}
    >
      <View style={styles.entryImageContainer}>
        {item.photoUri ? (
          <Image source={{ uri: item.photoUri }} style={styles.entryImage} />
        ) : (
          <View style={styles.entryPlaceholder}>
                                <Text style={styles.entryPlaceholderEmoji}>👤</Text>
          </View>
        )}
      </View>
      
      <View style={styles.entryContent}>
        <Text style={styles.entryTitle}>{item.activityName}</Text>
        <Text style={styles.entryDescription} numberOfLines={2}>
          {item.activityDescription}
        </Text>
        <View style={styles.entryMeta}>
          <Text style={styles.entryDate}>{formatDate(item.date)}</Text>
          <Text style={styles.entryTime}>{formatTime(item.time)}</Text>
        </View>
      </View>

      <View style={styles.entryActions}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => handleShareEntry(item)}
        >
          <Image source={require('../assets/img/Share.png')} style={{width: 120, height:70}}/>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => handleDeleteEntry(item.id, item.activityName)}
        >
          <Image source={require('../assets/img/delete.png')} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <SimpleAnimatedView animation="fadeInDown" delay={0}>
        <View style={styles.header}>
          {/* <View style={styles.logoContainer}>
            <View style={styles.logoIcon}>
              <Text style={styles.logoText}>SPORT</Text>
              <Text style={styles.logoText}>UNI</Text>
              <View style={styles.logoSpheres}>
                <View style={styles.sphere} />
                <View style={styles.sphere} />
                <View style={styles.sphere} />
                <View style={styles.sphere} />
                <View style={styles.sphere} />
              </View>
              <Text style={styles.logoSubtext}>BEST JOURNAL</Text>
            </View>
          </View> */}
          <Image source={require('../assets/img/29d54cce08ef7e8421f27eb29c026dcb62c6b993.png')} style={{width: 70, height:70, borderRadius: 10, marginRight: 16}}/>
          <Text style={styles.headerTitle}>Journal</Text>
          <TouchableOpacity 
            style={styles.addButton}
            onPress={() => navigation.navigate('AddEntry')}
          >
            <Image source={require('../assets/img/SmallAdd.png')}/>
          </TouchableOpacity>
        </View>
      </SimpleAnimatedView>

      {/* Search Bar */}
      <SimpleAnimatedView animation="fadeInUp" delay={200}>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Find entry:"
            placeholderTextColor={Colors.textMuted}
          />
          <Text style={styles.searchIcon}>🔍</Text>
        </View>
      </SimpleAnimatedView>

      {/* Content */}
      {filteredEntries.length === 0 ? (
        <SimpleAnimatedView animation="fadeIn" delay={400}>
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>No entries.....</Text>
          </View>
        </SimpleAnimatedView>
      ) : (
        <FlatList
          data={filteredEntries}
          renderItem={renderEntry}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  listContainer: {
    padding: 20,
  },
  entryCard: {
    flexDirection: 'row',
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  entryImageContainer: {
    width: 60,
    height: 60,
    borderRadius: 8,
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
    marginRight: 12,
  },
  entryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 4,
  },
  entryDescription: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 8,
    lineHeight: 20,
  },
  entryMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  entryDate: {
    fontSize: 12,
    color: Colors.textMuted,
  },
  entryTime: {
    fontSize: 12,
    color: Colors.textMuted,
  },
  entryActions: {
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  actionButton: {
    // padding: 8,
    // borderRadius: 6,
    // backgroundColor: Colors.background,
    marginBottom: 4,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyStateTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text,
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateText: {
    fontSize: 16,
    color: Colors.textMuted,
    textAlign: 'center',
    lineHeight: 24,
  },
  actionEmoji: {
    fontSize: 20,
  },
  emptyStateEmoji: {
    fontSize: 80,
    marginBottom: 16,
  },
  entryPlaceholderEmoji: {
    fontSize: 24,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  logoContainer: {
    marginRight: 16,
  },
  logoIcon: {
    width: 60,
    height: 60,
    backgroundColor: Colors.surface,
    borderRadius: 8,
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: Colors.text,
    textAlign: 'center',
  },
  logoSpheres: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 2,
  },
  sphere: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: Colors.primary,
    marginHorizontal: 1,
  },
  logoSubtext: {
    fontSize: 6,
    color: Colors.primary,
    textAlign: 'center',
    fontWeight: '600',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text,
    flex: 1,
  },
  addButton: {
 


    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  addEmoji: {
    fontSize: 16,
    marginRight: 4,
  },
  addText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.background,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  searchInput: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: Colors.text,
  },
  searchIcon: {
    fontSize: 16,
    marginRight: 16,
    color: Colors.textMuted,
  },
});

export default JournalScreen;
