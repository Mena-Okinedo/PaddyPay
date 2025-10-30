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
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const SendMoneyScreen = () => {
  const navigation = useNavigation();
  
  const [amount, setAmount] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [accountName, setAccountName] = useState('');
  const [bankName, setBankName] = useState('');
  const [description, setDescription] = useState('');

  const recentContacts = [
    { id: '1', name: 'Sarah Johnson', phone: '801 234 5678', photo: '👩' },
    { id: '2', name: 'Mike Davis', phone: '802 345 6789', photo: '👨' },
    { id: '3', name: 'Grace Wilson', phone: '803 456 7890', photo: '👩' },
    { id: '4', name: 'David Brown', phone: '804 567 8901', photo: '👨' },
  ];

  
  const banks = [
    'Access Bank',
    'First Bank',
    'GTBank',
    'Zenith Bank',
    'UBA',
    'Fidelity Bank',
    'Union Bank',
    'Stanbic IBTC',
    'Opay'
  ];

  const handleSendMoney = () => {
    if (!amount || !accountNumber || !accountName || !bankName) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    if (accountNumber.length !== 10) {
      Alert.alert('Error', 'Account number must be 10 digits');
      return;
    }

    
    Alert.alert(
      'Confirm Transfer',
      `Send ₦${amount} to ${accountName}?\nAccount: ${accountNumber}\nBank: ${bankName}`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Send Money',
          onPress: () => {
          
            Alert.alert(
              'Success!',
              `₦${amount} sent to ${accountName} successfully!`,
              [
                {
                  text: 'OK',
                  onPress: () => navigation.goBack(),
                },
              ]
            );
          },
        },
      ]
    );
  };

  
  const handleContactSelect = (contact) => {
    Alert.alert(
      'Send to ' + contact.name,
      `Send money to ${contact.name} (${contact.phone})?`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Select',
          onPress: () => {
   
            setAccountName(contact.name);
            
          },
        },
      ]
    );
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
          <Text style={styles.headerTitle}>Send Money</Text>
          <View style={styles.placeholder} />
        </View>

        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
         
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Recent Contacts</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={styles.contactsContainer}>
                {recentContacts.map((contact) => (
                  <TouchableOpacity
                    key={contact.id}
                    style={styles.contactButton}
                    onPress={() => handleContactSelect(contact)}
                  >
                    <View style={styles.contactPhoto}>
                      <Text style={styles.contactPhotoText}>{contact.photo}</Text>
                    </View>
                    <Text style={styles.contactName}>{contact.name}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          </View>

          
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Amount to Send</Text>
            <View style={styles.amountContainer}>
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
          </View>

          
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Recipient Details</Text>
            
           
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Select Bank *</Text>
              <TouchableOpacity style={styles.bankSelector}>
                <Text style={bankName ? styles.bankSelectedText : styles.bankPlaceholder}>
                  {bankName || 'Choose Bank'}
                </Text>
                <Ionicons name="chevron-down" size={20} color="#666" />
              </TouchableOpacity>
            </View>

           
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Account Number *</Text>
              <TextInput
                style={styles.textInput}
                placeholder="Enter 10-digit account number"
                value={accountNumber}
                onChangeText={(text) => {
                 
                  const numbersOnly = text.replace(/[^0-9]/g, '');
                  if (numbersOnly.length <= 10) {
                    setAccountNumber(numbersOnly);
                  }
                }}
                keyboardType="numeric"
                maxLength={10}
              />
            </View>

      
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Account Name *</Text>
              <TextInput
                style={styles.textInput}
                placeholder="Account holder name"
                value={accountName}
                onChangeText={setAccountName}
              />
              <Text style={styles.noteText}>
                {accountNumber.length === 10 ? 'Verifying account...' : 'Account name will appear after entering account number'}
              </Text>
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Description (Optional)</Text>
              <TextInput
                style={styles.textInput}
                placeholder="e.g., For lunch, Birthday gift"
                value={description}
                onChangeText={setDescription}
              />
            </View>
          </View>

          
          <View style={styles.infoBox}>
            <Ionicons name="information-circle-outline" size={20} color="#007AFF" />
            <Text style={styles.infoText}>
              Transfers are usually instant. Double-check account details before sending.
            </Text>
          </View>

        </ScrollView>

        
        <View style={styles.footer}>
          <TouchableOpacity 
            style={[
              styles.sendButton,
              (!amount || !accountNumber || !accountName || !bankName) && styles.sendButtonDisabled
            ]}
            onPress={handleSendMoney}
            disabled={!amount || !accountNumber || !accountName || !bankName}
          >
            <Text style={styles.sendButtonText}>
              Send Money
            </Text>
          </TouchableOpacity>
        </View>

      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};


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
  section: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 12,
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 15,
  },
  contactsContainer: {
    flexDirection: 'row',
  },
  contactButton: {
    alignItems: 'center',
    marginRight: 20,
  },
  contactPhoto: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  contactPhotoText: {
    fontSize: 24,
  },
  contactName: {
    fontSize: 12,
    color: '#333',
    textAlign: 'center',
  },
  amountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: '#007AFF',
  },
  currencySymbol: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#007AFF',
    marginRight: 10,
  },
  amountInput: {
    flex: 1,
    fontSize: 28,
    fontWeight: 'bold',
    color: 'black',
    paddingVertical: 10,
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
    fontWeight: '500',
  },
  bankSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    padding: 15,
    backgroundColor: '#f9f9f9',
  },
  bankSelectedText: {
    fontSize: 16,
    color: 'black',
  },
  bankPlaceholder: {
    fontSize: 16,
    color: '#999',
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    padding: 15,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  noteText: {
    fontSize: 12,
    color: '#666',
    marginTop: 5,
    fontStyle: 'italic',
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
    color: '#007AFF',
    marginLeft: 10,
    flex: 1,
  },
  footer: {
    padding: 20,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  sendButton: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
  },
  sendButtonDisabled: {
    backgroundColor: '#ccc',
  },
  sendButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SendMoneyScreen;