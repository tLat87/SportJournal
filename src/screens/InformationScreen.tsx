import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  StatusBar,
  Share,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';
import { Colors } from '../constants/colors';
import SimpleAnimatedView from '../components/SimpleAnimatedView';

const { width } = Dimensions.get('window');

type InformationScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Information'>;

const InformationScreen = () => {
  const navigation = useNavigation<InformationScreenNavigationProp>();

  const handleShareApp = async () => {
    try {
      await Share.share({
        message: 'Check out Sport Uni Best Journal - Your personal sports diary!',
        title: 'Sport Uni Best Journal',
      });
    } catch (error) {
      Alert.alert('Error', 'Failed to share app');
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.background} />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Information</Text>
      </View>

      {/* Main Content */}
      <View style={styles.content}>
        {/* App Logo Section */}
        <SimpleAnimatedView animation="fadeInDown" delay={0}>
          <View style={styles.logoSection}>
            <Image source={require('../assets/img/29d54cce08ef7e8421f27eb29c026dcb62c6b993.png')} style={{width: 70, height:70, borderRadius: 10, marginRight: 16}}/>
            
            {/* Main Image */}
            <Image source={require('../assets/img/ee38d184ddf2b28962e5e3140931df33c9d28014.png')} style={{width: 200, height:300, borderBottomWidth: 1, borderBottomColor: Colors.primary}} resizeMode='stretch'/>

          </View>
        </SimpleAnimatedView>

        {/* Description */}
        <SimpleAnimatedView animation="fadeInUp" delay={300}>
          <Text style={styles.description}>
            Sport Uni Best Journal is a simple and stylish sports diary. Here you can record your workouts, add photos, view history and track your progress in statistics.
          </Text>
        </SimpleAnimatedView>

        {/* Share Button */}
        <SimpleAnimatedView animation="bounceIn" delay={600}>
          <TouchableOpacity style={styles.shareButton} onPress={handleShareApp}>
            <Image source={require('../assets/img/Share.png')} />
          </TouchableOpacity>
        </SimpleAnimatedView>
      </View>
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
    paddingTop: 60,
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
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.text,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  logoSection: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 30,
  },
  logoContainer: {
    flex: 1,
  },
  logoIcon: {
    width: 120,
    height: 120,
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
    textAlign: 'center',
  },
  logoSpheres: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 8,
  },
  sphere: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.primary,
    marginHorizontal: 2,
  },
  logoSubtext: {
    fontSize: 12,
    color: Colors.primary,
    textAlign: 'center',
    fontWeight: '600',
  },
  imageContainer: {
    flex: 1,
    height: 200,
    marginLeft: 20,
    borderRadius: 12,
    overflow: 'hidden',
  },
  placeholderImage: {
    flex: 1,
    backgroundColor: Colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderEmoji: {
    fontSize: 80,
  },
  description: {
    fontSize: 16,
    color: Colors.text,
    lineHeight: 24,
    textAlign: 'center',
    marginBottom: 40,
  },
  shareButton: {

    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  shareIcon: {
    fontSize: 20,
    marginRight: 8,
  },
  shareText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.background,
  },
});

export default InformationScreen;

