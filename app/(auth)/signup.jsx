
import { SafeAreaView } from "react-native-safe-area-context";

import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import { useState } from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';


const SignupScreen = ({ }) => {
  const navigation =useNavigation();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName:'',
    email: '',
    BVN:'',
    phoneNumber: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

   
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }

   
    if (field === 'phoneNumber') {
     
      const digitsOnly = value.replace(/\D/g, '');
     
      if (digitsOnly.length <= 10) {
        setFormData(prev => ({
          ...prev,
          phoneNumber: digitsOnly
        }));
      }
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.phoneNumber) {
      newErrors.phoneNumber = 'Phone number is required';
    } else if (formData.phoneNumber.length !== 10) {
      newErrors.phoneNumber = 'Phone number must be 10 digits';
    }

    if (!formData.BVN) {
      newErrors.BVN = 'BVN is required';
    } else if (formData.BVN.length !== 11) {
      newErrors.BVN = 'BVN must be 11 digits';
    }


    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignup = () => {
    if (validateForm()) {
      
      console.log('Signup data:', formData);
      navigation.navigate('home');
    }
  };

  

  
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoid}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
         
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.navigate('index')}
          >
            <Ionicons name="arrow-back" size={24} color="#0b2f5c" />
          </TouchableOpacity>

         
          <View style={styles.logoContainer}>
            <Text style={styles.title}>Personal information </Text>
            <Text style={styles.subtitle}>fill in your personal information</Text>
          </View>

          
          <View style={styles.formContainer}>
           
            <View style={styles.inputContainer}>
              <Text style={styles.label}>First Name</Text>
              <TextInput
                style={[
                  styles.input,
                  errors.firstName && styles.inputError
                ]}
                placeholder="Enter your first name"
                value={formData.firstName}
                onChangeText={(value) => handleInputChange('firstName', value)}
                autoCapitalize="words"
              />
              {errors.firstName && (
                <Text style={styles.errorText}>{errors.firstName}</Text>
              )}
            </View>

            <View style={styles.inputContainer}>
                  <Text style={styles.label}>Last Name </Text>
                  <TextInput style={[
                  styles.input,
                  errors.lastName && styles.inputError
                ]}
                placeholder="Enter your last name"
                value={formData.lastName}
                onChangeText={(value) => handleInputChange('lastName', value)}
                autoCapitalize="words"/>
                {errors.lastName &&(
                  <Text style={styles.errorText}>{errors.lastName}</Text>
                )}

            </View>

            
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Email Address</Text>
              <TextInput
                style={[
                  styles.input,
                  errors.email && styles.inputError
                ]}
                placeholder="Enter your email"
                value={formData.email}
                onChangeText={(value) => handleInputChange('email', value)}
                keyboardType="email-address"
                autoCapitalize="none"
                autoComplete="email"
              />
              {errors.email && (
                <Text style={styles.errorText}>{errors.email}</Text>
              )}
            </View>

            
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Phone Number</Text>
              <View style={styles.phoneInputContainer}>
                <View style={styles.countryCodeContainer}>
                  <Image source={require('../../assets/images/nigeria.png')}
                         style={styles.flag}/>    
                  <Text style={styles.countryCode}>+234</Text>
                </View>
                <TextInput
                  style={[
                    styles.phoneInput,
                    errors.phoneNumber && styles.inputError
                  ]}
                  placeholder="801 234 5678"
                  value={formData.phoneNumber}
                  onChangeText={(value) => handleInputChange('phoneNumber', value)}
                  keyboardType="phone-pad"
                  maxLength={10}
                />
              </View>
              {errors.phoneNumber && (
                <Text style={styles.errorText}>{errors.phoneNumber}</Text>
              )}
            </View >

           <View style={styles.inputContainer}>
            <Text style={styles.label}>BVN</Text>
            <View style={styles.phoneInputContainer}>
            </View>
           <TextInput style={[
                         styles.phoneInput,
                         errors.BVN && styles.inputError  ]}
                         placeholder="068 123 45678"
                         value={formData.BVN}
                         onChangeText={(value) => handleInputChange('BVN', value)}
                         keyboardType="phone-pad"
                         maxLength={11}
           
           />
           </View>
                     {errors.BVN && (
                      <Text style={styles.errorText}> {errors.BVN}</Text>
                     )}

           </View>

          
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Password</Text>
              <View style={styles.passwordContainer}>
                <TextInput
                  style={[
                    styles.passwordInput,
                    errors.password && styles.inputError
                  ]}
                  placeholder="Enter your password"
                  value={formData.password}
                  onChangeText={(value) => handleInputChange('password', value)}
                  secureTextEntry={!showPassword}
                  autoCapitalize="none"
                />
                <TouchableOpacity
                  style={styles.eyeIcon}
                  onPress={() => setShowPassword(!showPassword)}
                >
                  <Ionicons
                    name={showPassword ? "eye-off" : "eye"}
                    size={20}
                    color="#666"
                  />
                </TouchableOpacity>
              </View>
              {errors.password && (
                <Text style={styles.errorText}>{errors.password}</Text>
              )}
            </View>

            
            <View style={styles.termsContainer}>
              <Text style={styles.termsText}>
                By creating an account, you agree to our{' '}
                <Text style={styles.link}>Terms of Service</Text> and{' '}
                <Text style={styles.link}>Privacy Policy</Text>
              </Text>
            </View>

           
            <TouchableOpacity style={styles.signupButton} onPress={handleSignup}>
              <Text style={styles.signupButtonText}>Create Account</Text>
            </TouchableOpacity>

         
            <View style={styles.loginContainer}>
              <Text style={styles.loginText}>
                Already have an account?{' '}
                <Text 
                  style={styles.loginLink}
                  onPress={() => navigation.navigate('login')}
                >
                  Sign In
                </Text>
              </Text>
            </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  keyboardAvoid: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
  },
  backButton: {
    padding: 10,
    marginTop: 10,
    alignSelf: 'flex-start',
  },
  logoContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  logo: {
    width: 120,
    height: 40,
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginTop:-20
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
  formContainer: {
    marginTop: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  inputError: {
    borderColor: '#ff3b30',
  },
  errorText: {
    color: '#ff3b30',
    fontSize: 12,
    marginTop: 4,
  },
  phoneInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  countryCodeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRightWidth: 0,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    paddingHorizontal: 12,
    height: 50,
  },
  flag: {
    width: 20,
    height: 15,
    marginRight: 8,
  },
  countryCode: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  phoneInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  passwordContainer: {
    position: 'relative',
  },
  passwordInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
    paddingRight: 50,
  },
  eyeIcon: {
    position: 'absolute',
    right: 16,
    top: 14,
  },
  termsContainer: {
    marginBottom: 24,
  },
  termsText: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    lineHeight: 16,
  },
  link: {
    color: '#0b2f5c',
    fontWeight: '500',
  },
  signupButton: {
    backgroundColor: '#0b2f5c',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  signupButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  loginContainer: {
    alignItems: 'center',
  },
  loginText: {
    fontSize: 14,
    color: '#666',
  },
  loginLink: {
    color: '#0b2f5c',
    fontWeight: '600',
  },
});

export default SignupScreen;


