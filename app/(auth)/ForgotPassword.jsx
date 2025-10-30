import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";


const ForgotPasswordScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const handleResetPassword = () => {
    if (!email) {
      Alert.alert('Error', 'Please enter your email address');
      return;
    }

    if (!email.includes('@')) {
      Alert.alert('Error', 'Please enter a valid email address');
      return;
    }

    setIsLoading(true);

    
    setTimeout(() => {
      setIsLoading(false);
      setEmailSent(true);
      Alert.alert(
        'Email Sent',
        'Password reset instructions have been sent to your email address.'
      );
      console.log('Reset password requested for:', email);
    }, 2000);
  };

  const handleBackToLogin = () => {
    navigation.navigate('Login');
  };

  const handleResendEmail = () => {
    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
      Alert.alert('Email Resent', 'New reset instructions have been sent to your email.');
    }, 1500);
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
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>

          <View style={styles.content}>
            
            
            <View style={styles.iconContainer}>
              <Ionicons name="lock-closed" size={60} color="#0b2f5c" />
            </View>

            {/* Header */}
            <View style={styles.header}>
              <Text style={styles.title}>Forgot Password</Text>
              <Text style={styles.subtitle}>
                {emailSent 
                  ? 'Check your email for reset instructions'
                  : 'Enter your email address to reset your password'
                }
              </Text>
            </View>

            {!emailSent ? (
            
              <View style={styles.form}>
                
               
                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Email Address</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Enter your email address"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoComplete="email"
                  />
                </View>

               
                <TouchableOpacity 
                  style={[
                    styles.resetButton,
                    isLoading && styles.resetButtonDisabled
                  ]}
                  onPress={handleResetPassword}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <Text style={styles.resetButtonText}>Sending...</Text>
                  ) : (
                    <Text style={styles.resetButtonText}>Send Reset Link</Text>
                  )}
                </TouchableOpacity>

                {/* Back to Login */}
                <TouchableOpacity 
                  style={styles.backToLoginButton}
                  onPress={() => navigation.navigate('login')}
                >
                  <Text style={styles.backToLoginText}>
                    ← Back to Login
                  </Text>
                </TouchableOpacity>

              </View>
            ) : (
              
              <View style={styles.successContainer}>
                
                <View style={styles.successIcon}>
                  <Ionicons name="checkmark-circle" size={80} color="#0b2f5c" />
                </View>

                <Text style={styles.successTitle}>Check Your Email</Text>
                
                <Text style={styles.successMessage}>
                  We've sent password reset instructions to:{'\n'}
                  <Text style={styles.emailText}>{email}</Text>
                </Text>

                <Text style={styles.instructions}>
                  • Check your spam folder if you don't see the email{'\n'}
                  • The link will expire in 1 hour{'\n'}
                  • Follow the instructions in the email to reset your password
                </Text>

               
                <View style={styles.successButtons}>
                  <TouchableOpacity 
                    style={styles.resendButton}
                    onPress={handleResendEmail}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <Text style={styles.resendButtonText}>Resending...</Text>
                    ) : (
                      <Text style={styles.resendButtonText}>Resend Email</Text>
                    )}
                  </TouchableOpacity>

                  <TouchableOpacity 
                    style={styles.backToLoginSuccessButton}
                    onPress={() => navigation.navigate('login')}
                  >
                    <Text style={styles.backToLoginSuccessText}>
                      Back to Login
                    </Text>
                  </TouchableOpacity>
                </View>

              </View>
            )}

           
            <View style={styles.helpContainer}>
              <Text style={styles.helpTitle}>Need Help?</Text>
              <Text style={styles.helpText}>
                If you're having trouble resetting your password, contact our support team at support@paddypay.com
              </Text>
            </View>

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
  },
  backButton: {
    padding: 15,
    marginTop: 10,
    marginLeft: 10,
    alignSelf: 'flex-start',
  },
  content: {
    flex: 1,
    paddingHorizontal: 25,
    paddingTop: 20,
  },
  iconContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 12,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 22,
  },
  form: {
    width: '100%',
  },
  inputContainer: {
    marginBottom: 30,
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
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 15,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  resetButton: {
    backgroundColor: '#0b2f5c',
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#0b2f5c',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  resetButtonDisabled: {
    backgroundColor: '#ccc',
    shadowColor: '#ccc',
  },
  resetButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  backToLoginButton: {
    alignItems: 'center',
    paddingVertical: 10,
  },
  backToLoginText: {
    color: '#0b2f5c',
    fontSize: 14,
    fontWeight: '500',
  },
  successContainer: {
    alignItems: 'center',
    width: '100%',
  },
  successIcon: {
    marginBottom: 20,
  },
  successTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 15,
    textAlign: 'center',
  },
  successMessage: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 25,
  },
  emailText: {
    fontWeight: '600',
    color: '#0b2f5c',
  },
  instructions: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 30,
    textAlign: 'left',
    width: '100%',
  },
  successButtons: {
    width: '100%',
    gap: 12,
  },
  resendButton: {
    backgroundColor: '#0b2f5c',
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: 'center',
  },
  resendButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  backToLoginSuccessButton: {
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#0b2f5c',
  },
  backToLoginSuccessText: {
    color: '#0b2f5c',
    fontSize: 16,
    fontWeight: '600',
  },
  helpContainer: {
    marginTop: 40,
    padding: 20,
    backgroundColor: '#f8f9fa',
    borderRadius: 10,
    borderLeftWidth: 4,
    borderLeftColor: '#0b2f5c',
  },
  helpTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  helpText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 18,
  },
});

export default ForgotPasswordScreen;