import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import {
  Alert,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';


const ProfileScreen = () => {
  const navigation = useNavigation();
  
 
  const [userData, setUserData] = useState({
    name: 'Anita peter',
    email: 'anitapeter@gmail.com',
    phone: '+234 801 234 5678',
    accountNumber: '1234567890',  
    joinDate: 'Joined September 2025',
  });

 
  const [isBiometricEnabled, setIsBiometricEnabled] = useState(true);
  const [isPushNotifications, setIsPushNotifications] = useState(true);
  const [isEmailNotifications, setIsEmailNotifications] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);

  
  const handleSignOut = () => {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Sign Out',
          style: 'destructive',
          onPress: () => {
            
            clearUserData();
        
            navigation.reset({
              index: 0,
              routes: [{ name: '(auth)' }],
            });
            
          },
        },
      ]
    );
  };

  const clearUserData = () => {
    
    console.log('Clearing user data...');
    
    
  };


  const handleSignOutWithOptions = () => {
    Alert.alert(
      'Sign Out',
      'What would you like to do?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Sign Out',
          onPress: () => {
            
            clearUserData();
            navigation.reset({
              index: 0,
              routes: [{ name: 'Login' }],
            });
          },
        },
        {
          text: 'Sign Out & Clear Data',
          style: 'destructive',
          onPress: () => {
            
            clearAllAppData();
            navigation.reset({
              index: 0,
              routes: [{ name: 'Login' }],
            });
          },
        },
      ]
    );
  };

  const clearAllAppData = () => {
   
    console.log('Clearing all app data...');
   
  };

  
  const profileSections = [
    {
      title: 'Account',
      items: [
        { 
          icon: 'person-outline', 
          name: 'Personal Information', 
          action: () => Alert.alert('Coming Soon', 'Personal Information feature coming soon!'),
          showArrow: true 
        },
        { 
          icon: 'card-outline', 
          name: 'Bank Accounts', 
          action: () => Alert.alert('Coming Soon', 'Bank Accounts feature coming soon!'),
          showArrow: true 
        },
        { 
          icon: 'lock-closed-outline', 
          name: 'Security', 
          action: () => Alert.alert('Coming Soon', 'Security settings feature coming soon!'),
          showArrow: true 
        },
      ]
    },
    {
      title: 'Preferences',
      items: [
        { 
          icon: 'notifications-outline', 
          name: 'Push Notifications', 
          action: null,
          showArrow: false,
          toggle: (
            <Switch
              value={isPushNotifications}
              onValueChange={setIsPushNotifications}
              trackColor={{ false: '#767577', true: '#0b2f5c' }}
              thumbColor={isPushNotifications ? '#007AFF' : '#f4f3f4'}
            />
          )
        },
        { 
          icon: 'mail-outline', 
          name: 'Email Notifications', 
          action: null,
          showArrow: false,
          toggle: (
            <Switch
              value={isEmailNotifications}
              onValueChange={setIsEmailNotifications}
              trackColor={{ false: '#767577', true: '#0b2f5c' }}
              thumbColor={isEmailNotifications ? '#007AFF' : '#f4f3f4'}
            />
          )
        },
        { 
          icon: 'finger-print-outline', 
          name: 'Biometric Login', 
          action: null,
          showArrow: false,
          toggle: (
            <Switch
              value={isBiometricEnabled}
              onValueChange={setIsBiometricEnabled}
              trackColor={{ false: '#767577', true: '#0b2f5c' }}
              thumbColor={isBiometricEnabled ? '#007AFF' : '#f4f3f4'}
            />
          )
        },
        { 
          icon: 'moon-outline', 
          name: 'Dark Mode', 
          action: null,
          showArrow: false,
          toggle: (
            <Switch
              value={isDarkMode}
              onValueChange={setIsDarkMode}
              trackColor={{ false: '#767577', true: '#0b2f5c' }}
              thumbColor={isDarkMode ? '#007AFF' : '#f4f3f4'}
            />
          )
        },
      ]
    },
    {
      title: 'Support',
      items: [
        { 
          icon: 'help-circle-outline', 
          name: 'Help & Support', 
          action: () => Alert.alert('Coming Soon', 'Help & Support feature coming soon!'),
          showArrow: true 
        },
        { 
          icon: 'document-text-outline', 
          name: 'Terms & Conditions', 
          action: () => Alert.alert('Coming Soon', 'Terms & Conditions feature coming soon!'),
          showArrow: true 
        },
        { 
          icon: 'shield-checkmark-outline', 
          name: 'Privacy Policy', 
          action: () => Alert.alert('Coming Soon', 'Privacy Policy feature coming soon!'),
          showArrow: true 
        },
      ]
    },
    {
      title: 'Actions',
      items: [
        { 
          icon: 'log-out-outline', 
          name: 'Sign Out', 
          action: handleSignOut, 
          showArrow: false,
          color: '#FF3B30'
        },
      ]
    }
  ];

  function handleEditProfile() {
    Alert.alert('Edit Profile', 'Edit profile feature coming soon!');
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      
     
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profile</Text>
        <View style={styles.headerRight} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        
        
        <View style={styles.profileHeader}>
          <View style={styles.avatarContainer}>
            <Image
              source={{ uri: 'https://via.placeholder.com/100x100/007AFF/ffffff?text=JD' }}
              style={styles.avatar}
            />
            <TouchableOpacity style={styles.editAvatarButton}>
              <Ionicons name="camera" size={16} color="#fff" />
            </TouchableOpacity>
          </View>
          
          <Text style={styles.userName}>{userData.name}</Text>
          <Text style={styles.userEmail}>{userData.email}</Text>
          <Text style={styles.userTier}>{userData.tier}</Text>
          
          <TouchableOpacity style={styles.editProfileButton} onPress={handleEditProfile}>
            <Text style={styles.editProfileText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>

     
        <View style={styles.infoCards}>
          <View style={styles.infoCard}>
            <Ionicons name="call-outline" size={20} color="#0b2f5c" />
            <View style={styles.infoCardContent}>
              <Text style={styles.infoCardLabel}>Phone Number</Text>
              <Text style={styles.infoCardValue}>{userData.phone}</Text>
            </View>
          </View>
          
          <View style={styles.infoCard}>
            <Ionicons name="card-outline" size={20} color="#0b2f5c" />
            <View style={styles.infoCardContent}>
              <Text style={styles.infoCardLabel}>Account Number</Text>
              <Text style={styles.infoCardValue}>{userData.accountNumber}</Text>
            </View>
          </View>
          
          <View style={styles.infoCard}>
            <Ionicons name="calendar-outline" size={20} color="#0b2f5c" />
            <View style={styles.infoCardContent}>
              <Text style={styles.infoCardLabel}>Member Since</Text>
              <Text style={styles.infoCardValue}>{userData.joinDate}</Text>
            </View>
          </View>
        </View>

        
        {profileSections.map((section, sectionIndex) => (
          <View key={sectionIndex} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            <View style={styles.sectionContent}>
              {section.items.map((item, itemIndex) => (
                <TouchableOpacity
                  key={itemIndex}
                  style={styles.menuItem}
                  onPress={item.action}
                  disabled={!item.action}
                >
                  <View style={styles.menuItemLeft}>
                    <Ionicons 
                      name={item.icon} 
                      size={22} 
                      color={item.color || '#666'} 
                    />
                    <Text style={[
                      styles.menuItemText,
                      item.color && { color: item.color }
                    ]}>
                      {item.name}
                    </Text>
                  </View>
                  
                  <View style={styles.menuItemRight}>
                    {item.toggle && item.toggle}
                    {item.showArrow && (
                      <Ionicons name="chevron-forward" size={20} color="#ccc" />
                    )}
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}

       
        <View style={styles.versionContainer}>
          <Text style={styles.versionText}>PaddyPay v1.0.0</Text>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  headerRight: {
    width: 40,
  },
  content: {
    flex: 1,
  },
  profileHeader: {
    alignItems: 'center',
    paddingVertical: 30,
    backgroundColor: '#ffffff',
    marginBottom: 16,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: '#0b2f5c',
  },
  editAvatarButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#0b2f5c',
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#ffffff',
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 16,
    color: '#666',
    marginBottom: 4,
  },
  userTier: {
    fontSize: 14,
    color: '#FF9500',
    fontWeight: '500',
    marginBottom: 20,
  },
  editProfileButton: {
    backgroundColor: '#0b2f5c',
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 20,
  },
  editProfileText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
  infoCards: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  infoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  infoCardContent: {
    marginLeft: 12,
    flex: 1,
  },
  infoCardLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  infoCardValue: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1a1a1a',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
    marginBottom: 12,
    paddingHorizontal: 20,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  sectionContent: {
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#f0f0f0',
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f8f9fa',
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  menuItemText: {
    fontSize: 16,
    color: '#1a1a1a',
    marginLeft: 12,
    flex: 1,
  },
  menuItemRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  versionContainer: {
    alignItems: 'center',
    paddingVertical: 30,
  },
  versionText: {
    fontSize: 14,
    color: '#999',
  },
});

export default ProfileScreen;