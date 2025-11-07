import { Ionicons } from '@expo/vector-icons';
import { useRoute } from '@react-navigation/native';
import { router } from 'expo-router';
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const MoneySentSuccessScreen = () => {
  
  const route = useRoute();
  

  const { 
    amount = '0.00', 
    recipient = 'Unknown Recipient', 
    accountNumber = 'N/A', 
    bank = 'Unknown Bank', 
    description = '' 
  } = route?.params || {};

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        
       
        <View style={styles.successAnimation}>
          <View style={styles.circle}>
            <Ionicons name="checkmark" size={60} color="white" />
          </View>
          <Text style={styles.successTitle}>Money Sent! </Text>
          <Text style={styles.successSubtitle}>Transfer successful</Text>
        </View>

        
        <View style={styles.amountSection}>
          <Text style={styles.amountLabel}>Amount Sent</Text>
          <Text style={styles.amount}>₦{amount}</Text>
        </View>

       
        <View style={styles.detailsCard}>
          <Text style={styles.detailsTitle}>Transaction Details</Text>
          
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Recipient:</Text>
            <Text style={styles.detailValue}>{recipient}</Text>
          </View>
          
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Account Number:</Text>
            <Text style={styles.detailValue}>{accountNumber}</Text>
          </View>
          
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Bank:</Text>
            <Text style={styles.detailValue}>{bank}</Text>
          </View>
          
          {description ? (
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Description:</Text>
              <Text style={styles.detailValue}>{description}</Text>
            </View>
          ) : null}
          
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Transaction ID:</Text>
            <Text style={styles.detailValue}>TXN{Date.now()}</Text>
          </View>
          
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Date & Time:</Text>
            <Text style={styles.detailValue}>
              {new Date().toLocaleString()}
            </Text>
          </View>
        </View>

        
        <View style={styles.actions}>
          <TouchableOpacity 
            style={styles.primaryButton}
            onPress={() => router.push('home')}
          >
            <Text style={styles.primaryButtonText}> Back to Home</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.secondaryButton}
            onPress={() =>router.push('sendMoney')}
          >
            <Text style={styles.secondaryButtonText}> Send Money</Text>
          </TouchableOpacity>
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
  content: {
    flexGrow: 1,
    padding: 20,
  },
  successAnimation: {
    alignItems: 'center',
    marginVertical: 40,
  },
  circle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#0b2f5c',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  successTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#0b2f5c',
    marginBottom: 8,
  },
  successSubtitle: {
    fontSize: 16,
    color: '#666',
  },
  amountSection: {
    alignItems: 'center',
    marginBottom: 30,
  },
  amountLabel: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
  },
  amount: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  detailsCard: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 12,
    marginBottom: 30,
  },
  detailsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  detailLabel: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  detailValue: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
    textAlign: 'right',
    flex: 1,
    marginLeft: 10,
  },
  actions: {
    gap: 12,
  },
  primaryButton: {
    backgroundColor: '#0b2f5c',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  secondaryButton: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#0b2f5c',
  },
  secondaryButtonText: {
    color: '#0b2f5c',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default MoneySentSuccessScreen;