import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
// import Icon from 'react-native-vector-icons/Ionicons'; // Заменено на смайлики
import { launchImageLibrary, ImagePickerResponse, MediaType } from 'react-native-image-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { addEntry } from '../store/slices/journalSlice';
import { JournalEntry } from '../types';
import { Colors } from '../constants/colors';
import SimpleAnimatedView from '../components/SimpleAnimatedView';

type AddEntryScreenNavigationProp = StackNavigationProp<any, 'AddEntry'>;

const AddEntryScreen = () => {
  const navigation = useNavigation<AddEntryScreenNavigationProp>();
  const dispatch = useAppDispatch();

  const [activityName, setActivityName] = useState('');
  const [activityDescription, setActivityDescription] = useState('');
  const [time, setTime] = useState('');
  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [selectedTime, setSelectedTime] = useState(new Date());

  const handleAddPhoto = () => {
    const options = {
      mediaType: 'photo' as MediaType,
      quality: 0.8 as any,
      maxWidth: 1000,
      maxHeight: 1000,
    };

    launchImageLibrary(options, (response: ImagePickerResponse) => {
      if (response.didCancel) {
        return;
      }
      
      if (response.errorMessage) {
        Alert.alert('Error', 'Failed to pick image');
        return;
      }

      if (response.assets && response.assets[0]) {
        setPhotoUri(response.assets[0].uri || null);
      }
    });
  };

  const handleTimePicker = () => {
    setShowTimePicker(true);
  };

  const handleTimeChange = (event: any, selectedDate?: Date) => {
    setShowTimePicker(Platform.OS === 'ios');
    if (selectedDate) {
      setSelectedTime(selectedDate);
      const timeString = selectedDate.toLocaleTimeString('en-GB', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: false 
      });
      setTime(timeString);
    }
  };

  const handleSaveEntry = () => {
    if (!activityName.trim()) {
      Alert.alert('Error', 'Please enter an activity name');
      return;
    }

    const newEntry: JournalEntry = {
      id: Date.now().toString(),
      activityName: activityName.trim(),
      activityDescription: activityDescription.trim(),
      time: time || new Date().toLocaleTimeString('en-GB', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: false 
      }),
      date: new Date().toISOString(),
      photoUri: photoUri || undefined,
      createdAt: Date.now(),
    };

    dispatch(addEntry(newEntry));
    
    Alert.alert(
      'Success',
      'Journal entry saved!',
      [
        {
          text: 'OK',
          onPress: () => navigation.goBack(),
        },
      ]
    );
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Activity Photo */}
        <SimpleAnimatedView animation="zoomIn" delay={0}>
          <TouchableOpacity style={styles.photoContainer} onPress={handleAddPhoto}>
            {photoUri ? (
              <Image source={{ uri: photoUri }} style={styles.photo} />
            ) : (
              <View style={styles.photoPlaceholder}>
                <Image source={require('../assets/img/ion_camera.png')} />
                <Text style={styles.photoPlaceholderText}>Activity Photo</Text>
              </View>
            )}
          </TouchableOpacity>
        </SimpleAnimatedView>

        {/* Activity Name */}
        <SimpleAnimatedView animation="fadeInUp" delay={200}>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Activity Name</Text>
            <TextInput
              style={styles.textInput}
              value={activityName}
              onChangeText={setActivityName}
              placeholder="Running 3 km"
              placeholderTextColor={Colors.textMuted}
            />
          </View>
        </SimpleAnimatedView>

        {/* Activity Description */}
        <SimpleAnimatedView animation="fadeInUp" delay={400}>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Activity Description</Text>
            <TextInput
              style={[styles.textInput, styles.textArea]}
              value={activityDescription}
              onChangeText={setActivityDescription}
              placeholder="Describe your activity..."
              placeholderTextColor={Colors.textMuted}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />
          </View>
        </SimpleAnimatedView>

        {/* Time */}
        <SimpleAnimatedView animation="fadeInUp" delay={600}>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Time:</Text>
            <TouchableOpacity style={styles.timeButton} onPress={handleTimePicker}>
              <Text style={styles.timeButtonText}>
                {time || 'Add'}
              </Text>
            </TouchableOpacity>
            {showTimePicker && (
              <DateTimePicker
                value={selectedTime}
                mode="time"
                is24Hour={true}
                display="default"
                onChange={handleTimeChange}
              />
            )}
          </View>
        </SimpleAnimatedView>

        {/* Save Button */}
        <SimpleAnimatedView animation="bounceIn" delay={800}>
          <TouchableOpacity style={styles.saveButton} onPress={handleSaveEntry}>
            <Image source={require('../assets/img/BUTTON.png')}/>
          </TouchableOpacity>
        </SimpleAnimatedView>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 20,
  },
  photoContainer: {
    height: 200,
    backgroundColor: Colors.surface,
    borderRadius: 12,
    marginVertical: 20,
    overflow: 'hidden',
  },
  photo: {
    width: '100%',
    height: '100%',
  },
  photoPlaceholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  photoPlaceholderText: {
    fontSize: 16,
    color: Colors.primary,
    marginTop: 8,
    fontWeight: '600',
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 8,
  },
  textInput: {
    backgroundColor: Colors.surface,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: Colors.text,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  textArea: {
    height: 100,
  },
  timeButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  timeButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.background,
  },
  saveButton: {
    alignSelf: 'center',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  saveButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.background,
    marginLeft: 8,
  },
  cameraEmoji: {
    fontSize: 40,
    marginBottom: 8,
  },
  saveEmoji: {
    fontSize: 24,
    marginRight: 8,
  },
});

export default AddEntryScreen;
