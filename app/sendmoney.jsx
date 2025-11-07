import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const SendMoneyScreen = () => {
  const navigation = useNavigation();
  
  
  const [amount, setAmount] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [accountName, setAccountName] = useState('');
  const [bankName, setBankName] = useState('');
  const [description, setDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [showPinModal, setShowPinModal] = useState(false);
  const [transactionPin, setTransactionPin] = useState('');
  const [pinError, setPinError] = useState('');

  const [showBankList, setShowBankList] = useState(false);
  const [bankSearch, setBankSearch] = useState('');


  const accountDatabase = {
    '1234567895': { name: 'John Adebayo', bank: 'GTBank' },
    '1234567894': { name: 'Sarah Johnson', bank: 'Access Bank' },
    '1234567893': { name: 'Mike Davis', bank: 'Zenith Bank' },
    '1234567892': { name: 'Grace Wilson', bank: 'First Bank' },
    '1234567891': { name: 'David Brown', bank: 'UBA' },
    '1234567890': { name: 'Anita Peter', bank: 'Opay' },
    '1234567896': { name: 'Mr Adefolarin', bank: 'Moniepoint' },
    
  };

  
  const recentContacts = [
    { id: '1', name: 'Anita Peter', phone: '801 234 5678', account: '1234567890', bank: 'Access Bank' },
    { id: '2', name: 'Jason Peter', phone: '802 345 6789', account: '1234567890', bank: 'Zenith Bank' },
    { id: '3', name: 'Grace Wilson', phone: '803 456 7890', account: '4567890123', bank: 'First Bank' },
      { id: '4', name: 'Mr Adefolarin', phone: '803 456 7890', account: '4567890126', bank: 'Moniepoint' },
  ];

 
  const banks = [
    { code: '044', name: 'Access Bank' },
    { code: '058', name: 'GTBank' },
    { code: '307', name: 'First Bank' },
    { code: '034', name: 'Moniepoint' },
    { code: '057', name: 'Zenith Bank' },
    { code: '032', name: 'Union Bank' },
    { code: '070', name: 'Fidelity Bank' },
     { code: '101', name: 'Providus Bank' },
    { code: '076', name: 'Polaris Bank' },
    { code: '221', name: 'Stanbic IBTC Bank' },
    { code: '068', name: 'Standard Chartered Bank' },
    { code: '232', name: 'Sterling Bank' },
    { code: '033', name: 'United Bank for Africa' },
    { code: '215', name: 'Unity Bank' },
    { code: '035', name: 'Wema Bank' },
    { code: '059', name: 'Opay' }
  ];

 
  const filteredBanks = banks.filter(bank =>
    bank.name.toLowerCase().includes(bankSearch.toLowerCase())
  );

  const formatAmount = (text) => {
    const cleanText = text.replace(/[^\d]/g, '');
    const number = parseInt(cleanText || '0');
    return number.toLocaleString('en-US');
  };


  const handleAmountChange = (text) => {
    const formatted = formatAmount(text);
    setAmount(formatted);
  };

  const getRawAmount = () => {
    return parseInt(amount.replace(/,/g, '') || '0');
  }
  const lookupAccountName = async (accNumber) => {
    setIsVerifying(true);
    
    setTimeout(() => {
      setIsVerifying(false);
      
      const accountInfo = accountDatabase[accNumber];
      if (accountInfo) {
        setAccountName(accountInfo.name);
        if (!bankName) {
          setBankName(accountInfo.bank);
        }
        Alert.alert('Account Verified ✅', `Account Name: ${accountInfo.name}`);
      } else {
        setAccountName('');
        Alert.alert('Account Not Found ❌', 'Please check account number');
      }
    }, 2000);
  };

 
  const handleAccountNumberChange = (text) => {
    const numbersOnly = text.replace(/[^0-9]/g, '');
    if (numbersOnly.length <= 10) {
      setAccountNumber(numbersOnly);
      if (accountName && numbersOnly.length < 10) {
        setAccountName('');
      }
      if (numbersOnly.length === 10 && bankName) {
        lookupAccountName(numbersOnly);
      }
    }
  };


  const handleSendMoney = async () => {
    const rawAmount = getRawAmount();
    
    if (rawAmount < 100) {
      Alert.alert('Error', 'Minimum transfer amount is ₦100');
      return;
    }

    if (!accountNumber || !accountName || !bankName) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    if (accountNumber.length !== 10) {
      Alert.alert('Error', 'Account number must be 10 digits');
      return;
    }

    setShowPinModal(true);
  };


  const verifyTransactionPin = () => {
    if (transactionPin.length !== 4) {
      setPinError('PIN must be 4 digits');
      return;
    }

    if (transactionPin !== '1234') { 
      setPinError('Incorrect PIN. Try 1234 for demo');
      return;
    }

    setPinError('');
    setShowPinModal(false);
    performTransaction();
  };

  const performTransaction = async () => {
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setTransactionPin('');
      
     
      navigation.navigate('success', {
        amount: amount,
        recipient: accountName,
        accountNumber: accountNumber,
        bank: bankName,
        description: description,
        date: new Date().toLocaleString(),
        transactionId: 'TXN' + Date.now(),
      });
      
    }, 3000);
  };

 
  const handleContactSelect = (contact) => {
    setAccountNumber(contact.account);
    setAccountName(contact.name);
    setBankName(contact.bank);
    setTimeout(() => lookupAccountName(contact.account), 1000);
  };


  const handleBankSelect = (bank) => {
    setBankName(bank.name);
    setShowBankList(false);
    setBankSearch('');
    if (accountNumber.length === 10) {
      lookupAccountName(accountNumber);
    }
  };


  const handlePinInput = (digit) => {
    if (transactionPin.length < 4) {
      setTransactionPin(prev => prev + digit);
      setPinError('');
    }
  };

  const handlePinClear = () => {
    setTransactionPin('');
    setPinError('');
  };


  const handlePinBackspace = () => {
    setTransactionPin(prev => prev.slice(0, -1));
    setPinError('');
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
          <Text style={styles.headerTitle}>Send Money </Text>
          <View style={styles.placeholder} />
        </View>

        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          
      
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>💁 Recent Transaction</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={styles.contactsContainer}>
                {recentContacts.map((contact) => (
                  <TouchableOpacity
                    key={contact.id}
                    style={styles.contactButton}
                    onPress={() => handleContactSelect(contact)}
                  >
                    <View style={styles.contactPhoto}>
                      <Text style={styles.contactPhotoText}>
                        {contact.name.split(' ').map(n => n[0]).join('')}
                      </Text>
                    </View>
                    <Text style={styles.contactName}>{contact.name.split(' ')[0]}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          </View>

          
          <View style={styles.section}>
            <Text style={styles.sectionTitle}> Amount to Send</Text>
            <View style={styles.amountContainer}>
              <Text style={styles.currencySymbol}>₦</Text>
              <TextInput
                style={styles.amountInput}
                placeholder="0"
                value={amount}
                onChangeText={handleAmountChange}
                keyboardType="numeric"
                placeholderTextColor="#999"
              />
            </View>
            {amount && (
              <Text style={styles.amountInWords}>{getRawAmount().toLocaleString('en-US')} Naira</Text>
            )}
          </View>

        
          <View style={styles.section}>
            <Text style={styles.sectionTitle}> Recipient Details</Text>
            
         
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}> Select Bank *</Text>
              <TouchableOpacity 
                style={styles.bankSelector}
                onPress={() => setShowBankList(true)}
              >
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
                onChangeText={handleAccountNumberChange}
                keyboardType="numeric"
                maxLength={10}
              />
              {isVerifying && (
                <View style={styles.verifyingContainer}>
                  <ActivityIndicator size="small" color="#0b2f5c" />
                  <Text style={styles.verifyingText}>Looking up account name...</Text>
                </View>
              )}
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}> Account Name *</Text>
              <View style={styles.accountNameContainer}>
                <TextInput
                  style={[
                    styles.textInput, 
                    !accountName && styles.disabledInput,
                    accountName && styles.verifiedInput
                  ]}
                  placeholder={isVerifying ? "Looking up account..." : "Account name will appear here"}
                  value={accountName}
                  editable={false}
                />
                {accountName && (
                  <Ionicons name="checkmark-circle" size={20} color="#34C759" style={styles.verifiedIcon} />
                )}
              </View>
              {accountName && (
                <Text style={styles.verifiedText}>✅ Account verified successfully!</Text>
              )}
            </View>

            
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}> Description (Optional)</Text>
              <TextInput
                style={styles.textInput}
                placeholder="e.g., For lunch, Birthday gift"
                value={description}
                onChangeText={setDescription}
              />
            </View>
          </View>

        
          <View style={styles.infoBox}>
            <Ionicons name="information-circle" size={20} color="#0b2f5c" />
            <Text style={styles.infoText}>
              • Enter 10-digit account number to auto-fill name{'\n'}
              • Select bank first for faster verification{'\n'}
              • You'll need your 4-digit PIN to complete transfer
            </Text>
          </View>

        </ScrollView>

        <View style={styles.footer}>
          <TouchableOpacity 
            style={[
              styles.sendButton,
              (!amount || !accountNumber || !accountName || !bankName || isLoading || isVerifying) && styles.sendButtonDisabled
            ]}
            onPress={handleSendMoney}
            disabled={!amount || !accountNumber || !accountName || !bankName || isLoading || isVerifying}
          >
            {isLoading ? (
              <View style={styles.buttonLoading}>
                <ActivityIndicator color="white" />
                <Text style={styles.sendButtonText}>Processing...</Text>
              </View>
            ) : (
              <Text style={styles.sendButtonText}> Send ₦{amount || '0'}</Text>
            )}
          </TouchableOpacity>
        </View>

     
        <Modal visible={showBankList} animationType="slide" transparent={true}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}> Select Bank</Text>
                <TouchableOpacity onPress={() => setShowBankList(false)}>
                  <Ionicons name="close" size={24} color="#000" />
                </TouchableOpacity>
              </View>
              <View style={styles.searchContainer}>
                <Ionicons name="search" size={20} color="#666" />
                <TextInput
                  style={styles.searchInput}
                  placeholder="Search for bank..."
                  value={bankSearch}
                  onChangeText={setBankSearch}
                />
              </View>
              <FlatList
                data={filteredBanks}
                keyExtractor={(item) => item.code}
                renderItem={({ item }) => (
                  <TouchableOpacity style={styles.bankItem} onPress={() => handleBankSelect(item)}>
                    <Text style={styles.bankItemText}>{item.name}</Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          </View>
        </Modal>

        <Modal visible={showPinModal} animationType="slide" transparent={true}>
          <View style={styles.pinModalContainer}>
            <View style={styles.pinModalContent}>
              <View style={styles.pinHeader}>
                <Text style={styles.pinTitle}>Enter Transaction PIN</Text>
                <Text style={styles.pinSubtitle}>Enter your 4-digit PIN to confirm transfer</Text>
              </View>

              <View style={styles.pinDisplay}>
                <Text style={styles.pinAmount}>₦{amount}</Text>
                <Text style={styles.pinRecipient}>to {accountName}</Text>
              </View>

             
              <View style={styles.pinDots}>
                {[0, 1, 2, 3].map((index) => (
                  <View
                    key={index}
                    style={[
                      styles.pinDot,
                      index < transactionPin.length && styles.pinDotFilled
                    ]}
                  />
                ))}
              </View>

              {pinError ? <Text style={styles.pinError}>{pinError}</Text> : null}

              <View style={styles.pinKeypad}>
                <View style={styles.pinRow}>
                  {['1', '2', '3'].map((digit) => (
                    <TouchableOpacity
                      key={digit}
                      style={styles.pinKey}
                      onPress={() => handlePinInput(digit)}
                    >
                      <Text style={styles.pinKeyText}>{digit}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
                <View style={styles.pinRow}>
                  {['4', '5', '6'].map((digit) => (
                    <TouchableOpacity
                      key={digit}
                      style={styles.pinKey}
                      onPress={() => handlePinInput(digit)}
                    >
                      <Text style={styles.pinKeyText}>{digit}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
                <View style={styles.pinRow}>
                  {['7', '8', '9'].map((digit) => (
                    <TouchableOpacity
                      key={digit}
                      style={styles.pinKey}
                      onPress={() => handlePinInput(digit)}
                    >
                      <Text style={styles.pinKeyText}>{digit}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
                <View style={styles.pinRow}>
                  <TouchableOpacity style={styles.pinKey} onPress={handlePinClear}>
                    <Text style={styles.pinKeyText}>Clear</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.pinKey}
                    onPress={() => handlePinInput('0')}
                  >
                    <Text style={styles.pinKeyText}>0</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.pinKey} onPress={handlePinBackspace}>
                    <Ionicons name="backspace" size={24} color="#333" />
                  </TouchableOpacity>
                </View>
              </View>

          
              <View style={styles.pinActions}>
                <TouchableOpacity
                  style={styles.pinCancelButton}
                  onPress={() => {
                    setShowPinModal(false);
                    setTransactionPin('');
                    setPinError('');
                  }}
                >
                  <Text style={styles.pinCancelText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.pinConfirmButton,
                    transactionPin.length !== 4 && styles.pinConfirmDisabled
                  ]}
                  onPress={verifyTransactionPin}
                  disabled={transactionPin.length !== 4}
                >
                  <Text style={styles.pinConfirmText}>Confirm Transfer</Text>
                </TouchableOpacity>
              </View>

              <Text style={styles.pinDemoHint}>💡 Demo PIN: 1234</Text>
            </View>
          </View>
        </Modal>

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
    backgroundColor: '#0b2f5c',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  contactPhotoText: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
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
    borderBottomColor: '#0b2f5c',
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
  amountInWords: {
    fontSize: 14,
    color: '#666',
    marginTop: 8,
    fontStyle: 'italic',
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
  accountNameContainer: {
    position: 'relative',
  },
  verifiedInput: {
    borderColor: '#34C759',
    backgroundColor: '#f0f9f0',
  },
  verifiedIcon: {
    position: 'absolute',
    right: 15,
    top: 15,
  },
  disabledInput: {
    backgroundColor: '#f0f0f0',
    color: '#999',
  },
  verifyingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  verifyingText: {
    fontSize: 12,
    color: '#007AFF',
    marginLeft: 8,
    fontStyle: 'italic',
  },
  verifiedText: {
    fontSize: 12,
    color: '#34C759',
    marginTop: 5,
    fontWeight: '500',
  },
  infoBox: {
    backgroundColor: '#e8f4ff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
  },
  infoText: {
    fontSize: 14,
    color: '#0b2f5c',
    lineHeight: 20,
    marginLeft: 10,
  },
  footer: {
    padding: 20,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  sendButton: {
    backgroundColor: '#0b2f5c',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
  },
  sendButtonDisabled: {
    backgroundColor: '#ccc',
  },
  buttonLoading: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sendButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: '80%',
    padding: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 15,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    marginLeft: 10,
  },
  bankItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  bankItemText: {
    fontSize: 16,
    color: '#333',
  },
  // PIN Modal Styles
  pinModalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pinModalContent: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 25,
    width: '90%',
    maxWidth: 400,
  },
  pinHeader: {
    alignItems: 'center',
    marginBottom: 20,
  },
  pinTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  pinSubtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  pinDisplay: {
    alignItems: 'center',
    marginBottom: 30,
  },
  pinAmount: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#0b2f5c',
    marginBottom: 5,
  },
  pinRecipient: {
    fontSize: 16,
    color: '#666',
  },
  pinDots: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  pinDot: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#f0f0f0',
    marginHorizontal: 10,
  },
  pinDotFilled: {
    backgroundColor: '#0b2f5c',
  },
  pinError: {
    color: '#FF3B30',
    textAlign: 'center',
    marginBottom: 15,
    fontSize: 14,
  },
  pinKeypad: {
    marginBottom: 20,
  },
  pinRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 15,
  },
  pinKey: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#f8f9fa',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pinKeyText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  pinActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  pinCancelButton: {
    flex: 1,
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    marginRight: 10,
  },
  pinCancelText: {
    fontSize: 16,
    color: '#666',
    fontWeight: '500',
  },
  pinConfirmButton: {
    flex: 2,
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#0b2f5c',
    alignItems: 'center',
  },
  pinConfirmDisabled: {
    backgroundColor: '#ccc',
  },
  pinConfirmText: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
  },
  pinDemoHint: {
    textAlign: 'center',
    color: '#666',
    fontSize: 12,
    marginTop: 15,
    fontStyle: 'italic',
  },
});

export default SendMoneyScreen;