import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Switch, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation
import axios from 'axios'; // Import axios for API calls

const ProfileScreen = ({ route }) => {
  const navigation = useNavigation();
  
  const [userData, setUserData] = useState({
    name: '',
    username: '',
    phone: '',
  });

  const [darkMode, setDarkMode] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  // Fetch user data and settings when the component mounts
  useEffect(() => {
    const userId = route?.params?.user_id;

    if (userId) {
      // Fetch user data (name, username, phone)
      axios.get(`http://your-api-endpoint.com/users/${userId}`)
        .then((response) => {
          const { name, username, phone } = response.data;
          setUserData({ name, username, phone });
        })
        .catch((error) => {
          console.error('Error fetching user data:', error);
        });

      // Fetch user settings (darkMode, notificationsEnabled)
      axios.get(`http://your-api-endpoint.com/settings/${userId}`)
        .then((response) => {
          const { theme, notifications_enabled } = response.data;
          setDarkMode(theme === 'dark');
          setNotificationsEnabled(notifications_enabled);
        })
        .catch((error) => {
          console.error('Error fetching settings:', error);
        });
    }
  }, [route?.params?.user_id]);

  // Handle the change of settings (dark mode and notifications)
  const handleSettingChange = (settingType, value) => {
    const userId = route?.params?.user_id;

    if (settingType === 'darkMode') {
      setDarkMode(value);
    } else if (settingType === 'notifications') {
      setNotificationsEnabled(value);
    }

    // Send the updated settings to the backend
    axios.post(`http://your-api-endpoint.com/settings/update`, {
      user_id: userId,
      theme: darkMode ? 'dark' : 'light',
      notifications_enabled: notificationsEnabled,
    })
    .then((response) => {
      console.log('Settings updated successfully:', response.data);
    })
    .catch((error) => {
      console.error('Error updating settings:', error);
    });
  };

  return (
    <View style={styles.container}>
      {/* Header with 'Back to Library' button */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('Library')}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>โปรไฟล์</Text>
      </View>

      {/* User Information */}
      <View style={styles.userInfo}>
        <Image
          source={{ uri: 'https://via.placeholder.com/150' }} // Placeholder image
          style={styles.profileImage}
        />
        <View style={styles.userDetails}>
          <Text style={styles.userName}>{userData.name}</Text>
          <Text style={styles.userUsername}>{userData.username}</Text>
          <Text style={styles.userPhone}>{userData.phone}</Text>
        </View>
      </View>

      {/* Settings */}
      <View style={styles.settings}>
        <Text style={styles.settingsTitle}>การตั้งค่า</Text>
        <View style={styles.settingItem}>
          <Ionicons name="moon-outline" size={24} color="gray" />
          <Text style={styles.settingText}>โหมดมืด</Text>
          <Switch
            value={darkMode}
            onValueChange={(value) => handleSettingChange('darkMode', value)}
            style={styles.settingSwitch}
          />
        </View>
        <View style={styles.settingItem}>
          <Ionicons name="notifications-outline" size={24} color="gray" />
          <Text style={styles.settingText}>การแจ้งเตือน</Text>
          <Switch
            value={notificationsEnabled}
            onValueChange={(value) => handleSettingChange('notifications', value)}
            style={styles.settingSwitch}
          />
        </View>
        <TouchableOpacity style={styles.settingItem} onPress={() => navigation.navigate('Login')}>
          <Ionicons name="log-out-outline" size={24} color="gray" />
          <Text style={styles.settingText}>ออกจากระบบ</Text>
        </TouchableOpacity>
      </View>

      {/* Contact Us */}
      <View style={styles.contact}>
        <Text style={styles.contactTitle}>ติดต่อเรา</Text>
        <Text style={styles.contactText}>
          มีปัญหาหรือข้อสงสัยเกี่ยวกับการใช้งานระบบ? ติดต่อเจ้าหน้าที่ได้ที่
        </Text>
        <TouchableOpacity
          style={styles.contactInfo}
          onPress={() => Linking.openURL(`tel:${'02-123-4567'}`)}
        >
          <Ionicons name="call-outline" size={24} color="gray" />
          <Text style={styles.contactText}>02-123-4567</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.contactInfo}
          onPress={() => Linking.openURL(`mailto:${'library@example.ac.th'}`)}
        >
          <Ionicons name="mail-outline" size={24} color="gray" />
          <Text style={styles.contactText}>library@example.ac.th</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#122620',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  userDetails: {
    marginLeft: 20,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  userUsername: {
    fontSize: 16,
    color: 'gray',
  },
  userPhone: {
    fontSize: 16,
    color: 'gray',
  },
  settings: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  settingsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  settingText: {
    marginLeft: 10,
    fontSize: 16,
    flex: 1,
  },
  settingSwitch: {
    marginLeft: 'auto',
  },
  contact: {
    padding: 20,
  },
  contactTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  contactText: {
    fontSize: 16,
    marginBottom: 10,
  },
  contactInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
});

export default ProfileScreen;
