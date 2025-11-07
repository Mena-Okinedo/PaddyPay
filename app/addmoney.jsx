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
import { SafeAreaView } from 'react-native-safe-area-context';


const AddMoneyScreen = () => {
  const navigation = useNavigation();
  
 
  const [amount, setAmount] = useState('');
  const [selectedMethod, setSelectedMethod] = useState('');

  
  const paymentMethods = [
    { id: '1', name: 'Bank Transfer', icon: 'business-outline' },
    { id: '2', name: 'Debit Card', icon: 'card-outline' },
    { id: '3', name: 'Bank USSD', icon: 'phone-portrait-outline' },
    { id: '4', name: 'Quickteller', icon: 'flash-outline' },
  ];


  const quickAmounts = ['₦1,000', '₦2,000', '₦5,000', '₦10,000'];

  
  const handleAddMoney = () => {
    if (!amount) {
      Alert.alert('Error', 'Please enter an amount');
      return;
    }

    if (!selectedMethod) {
      Alert.alert('Error', 'Please select a payment method');
      return;
    }

    
    Alert.alert(
      'Success!',
      `₦${amount} added to your wallet successfully!`,
      [
        {
          text: 'OK',
          onPress: () => navigation.goBack(),
        },
      ]
    );
  };

  
  const handleQuickAmount = (quickAmount) => {
   
    const cleanAmount = quickAmount.replace('₦', '').replace(',', '');
    setAmount(cleanAmount);
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        
        
        <View style={styles.header}>
          <TouchableOpacity 
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <Ionicons name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Add Money</Text>
          <View style={styles.placeholder} />
        </View>

        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          
          
          <View style={styles.amountSection}>
            <Text style={styles.amountLabel}>Enter Amount</Text>
            
            <View style={styles.amountInputContainer}>
              <Text style={styles.currencySymbol}>₦</Text>
              <TextInput
                style={styles.amountInput}
                placeholder="0"
                value={amount}
                onChangeText={setAmount}
                keyboardType="numeric"
                placeholderTextColor="#999"
              />
            </View>

           
            <Text style={styles.quickAmountLabel}>Quick Select</Text>
            <View style={styles.quickAmounts}>
              {quickAmounts.map((quickAmount, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.quickAmountButton}
                  onPress={() => handleQuickAmount(quickAmount)}
                >
                  <Text style={styles.quickAmountText}>{quickAmount}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

         
          <View style={styles.methodsSection}>
            <Text style={styles.sectionTitle}>Choose Payment Method</Text>
            
            {paymentMethods.map((method) => (
              <TouchableOpacity
                key={method.id}
                style={[
                  styles.methodButton,
                  selectedMethod === method.id && styles.methodButtonSelected
                ]}
                onPress={() => setSelectedMethod(method.id)}
              >
                <View style={styles.methodLeft}>
                  <Ionicons 
                    name={method.icon} 
                    size={24} 
                    color={selectedMethod === method.id ? '#173356ff' : '#666'} 
                  />
                  <Text style={[
                    styles.methodText,
                    selectedMethod === method.id && styles.methodTextSelected
                  ]}>
                    {method.name}
                  </Text>
                </View>
                
                {selectedMethod === method.id && (
                  <Ionicons name="checkmark-circle" size={24} color="#173356ff" />
                )}
              </TouchableOpacity>
            ))}
          </View>

          
          <View style={styles.infoBox}>
            <Ionicons name="information-circle-outline" size={20} color="#173356ff" />
            <Text style={styles.infoText}>
              Money will be added instantly to your PaddyPay wallet
            </Text>
          </View>

        </ScrollView>

        
        <View style={styles.footer}>
          <TouchableOpacity 
            style={[
              styles.continueButton,
              (!amount || !selectedMethod) && styles.continueButtonDisabled
            ]}
            onPress={handleAddMoney}
            disabled={!amount || !selectedMethod}
          >
            <Text style={styles.continueButtonText}>
              Continue
            </Text>
          </TouchableOpacity>
        </View>

      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  keyboardView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  placeholder: {
    width: 30,
  },
  scrollView: {
    flex: 1,
    padding: 20,
  },
  amountSection: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
  },
  amountLabel: {
    fontSize: 16,
    color: '#666',
    marginBottom: 15,
  },
  amountInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: '#0b2f5c',
    marginBottom: 25,
  },
  currencySymbol: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#0b2f5c',
    marginRight: 10,
  },
  amountInput: {
    flex: 1,
    fontSize: 28,
    fontWeight: 'bold',
    color: 'black',
    paddingVertical: 10,
  },
  quickAmountLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  quickAmounts: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  quickAmountButton: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 8,
  },
  quickAmountText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
  methodsSection: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 15,
  },
  methodButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    marginBottom: 10,
  },
  methodButtonSelected: {
    borderColor: '#0b2f5c',
    backgroundColor: '#f0f8ff',
  },
  methodLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  methodText: {
    fontSize: 16,
    color: '#333',
    marginLeft: 12,
  },
  methodTextSelected: {
    color: '#0b2f5c',
    fontWeight: '500',
  },
  infoBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e8f4ff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
  },
  infoText: {
    fontSize: 14,
    color: '#0b2f5c',
    marginLeft: 10,
    flex: 1,
  },
  footer: {
    padding: 20,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  continueButton: {
    backgroundColor: '#0b2f5c',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
  },
  continueButtonDisabled: {
    backgroundColor: '#ccc',
  },
  continueButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AddMoneyScreen;