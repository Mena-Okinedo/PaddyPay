import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import {
  Alert,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const HomeScreen = () => {
  const [activeTab, setActiveTab] = useState('Home');
  const [isBalanceVisible, setIsBalanceVisible] = useState(true);
   const navigation =useNavigation();

  
  const userData = {
    name: 'Anita Peters',
    balance: '₦245,800.50',
    accountNumber: '1234567890',
  };


  const recentTransactions = [
    { id: '1', name: 'Airtime Purchase', amount: '-₦1,500', type: 'debit', date: 'Today', icon: 'phone-portrait' },
    { id: '2', name: 'Salary', amount: '+₦150,000', type: 'credit', date: 'Yesterday', icon: 'business' },
    { id: '3', name: 'Electricity Bill', amount: '-₦8,300', type: 'debit', date: 'Dec 12', icon: 'flash' },
    { id: '4', name: 'Transfer to Sarah', amount: '-₦25,000', type: 'debit', date: 'Dec 10', icon: 'arrow-forward' },
  ];

 
  const quickActions = [
    { id: '1', name: 'Withdraw', icon: 'arrow-up', color: '#0b2f5c' },
    { id: '2', name: 'Request Money', icon: 'arrow-down', color: '#4D7C55' },
    { id: '3', name: 'Airtime', icon: 'phone-portrait', color: '#FF9500' },
    { id: '4', name: 'Bills', icon: 'document-text', color: '#FF3B30' },
  ];

  const toggleBalanceVisibility = () => {
    setIsBalanceVisible(!isBalanceVisible);
  };

  const getHiddenBalance = () => {
    return '•••••••';
  };

    
  const handleQuickAction = (action) => {
    Alert.alert('Quick Action', `${action.name} feature coming soon!`);
  };

  const handleTransactionPress = (transaction) => {
    Alert.alert('Transaction Details', 
      `${transaction.name}\nAmount: ${transaction.amount}\nDate: ${transaction.date}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Image
            source={{ uri: 'https://via.placeholder.com/40x40/007AFF/ffffff?text=PP' }}
            style={styles.logo}
          />
          <View>
            <Text style={styles.welcomeText}>Welcome back to PaddyPay,</Text>
            <Text style={styles.userName}>{userData.name}</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.notificationButton}>
          <Ionicons name="notifications-outline" size={24} color="#000" />
          <View style={styles.notificationBadge} />
        </TouchableOpacity>
      </View>

      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        
        
        <View style={styles.balanceCard}>
          <View style={styles.balanceHeader}>
            <Text style={styles.balanceLabel}>Total Balance</Text>
            <TouchableOpacity onPress={toggleBalanceVisibility}>
              <Ionicons  name={isBalanceVisible ? "eye-outline" : "eye-off-outline"} 
                size={20} 
                color="#fff" />
            </TouchableOpacity>
          </View>
          <Text style={styles.balanceAmount}>{isBalanceVisible ? userData.balance : getHiddenBalance()}</Text>
          <Text style={styles.accountNumber}>Account: {userData.accountNumber}</Text>
          
          <View style={styles.balanceActions}>
            <TouchableOpacity style={styles.actionButton}
            onPress={() => navigation.navigate('addmoney')}>
              <Ionicons name="add" size={20} color="#0b2f5c" />
              <Text style={styles.actionText}>Add Money</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}
             onPress={() => navigation.navigate('sendmoney')}>
              <Ionicons name="arrow-up" size={20} color="#0b2f5c" />
              <Text style={styles.actionText}>Send Money</Text>
            </TouchableOpacity>
          </View>
        </View>

        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActions}>
            {quickActions.map((action) => (
              <TouchableOpacity
                key={action.id}
                style={styles.quickAction}
                onPress={() => handleQuickAction(action)}
              >
                <View style={[styles.actionIcon, { backgroundColor: action.color }]}>
                  <Ionicons name={action.icon} size={20} color="#fff" />
                </View>
                <Text style={styles.actionName}>{action.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Transactions</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.transactions}>
            {recentTransactions.map((transaction) => (
              <TouchableOpacity
                key={transaction.id}
                style={styles.transaction}
                onPress={() => handleTransactionPress(transaction)}
              >
                <View style={styles.transactionLeft}>
                  <View style={[
                    styles.transactionIcon,
                    { backgroundColor: transaction.type === 'credit' ? '#E8F5E8' : '#FFE8E8' }
                  ]}>
                    <Ionicons 
                      name={transaction.icon} 
                      size={20} 
                      color={transaction.type === 'credit' ? '#34C759' : '#FF3B30'} 
                    />
                  </View>
                  <View>
                    <Text style={styles.transactionName}>{transaction.name}</Text>
                    <Text style={styles.transactionDate}>{transaction.date}</Text>
                  </View>
                </View>
                <Text style={[
                  styles.transactionAmount,
                  { color: transaction.type === 'credit' ? '#34C759' : '#FF3B30' }
                ]}>
                  {transaction.amount}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

       
        <View style={styles.promoBanner}>
          <View style={styles.promoContent}>
            <Text style={styles.promoTitle}>Get 5% Cashback</Text>
            <Text style={styles.promoText}>On all bill payments this month</Text>
            <TouchableOpacity style={styles.promoButton}>
              <Text style={styles.promoButtonText}>Learn More</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.promoIcon}>
            <Ionicons name="gift" size={40} color="#fff" />
          </View>
        </View>

      </ScrollView>

   
      <View style={styles.bottomNav}>
        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => setActiveTab('Home')}
        >
          <Ionicons 
            name={activeTab === 'Home' ? 'home' : 'home-outline'} 
            size={24} 
            color={activeTab === 'Home' ? '#0b2f5c' : '#666'} 
          />
          <Text style={[
            styles.navText,
            { color: activeTab === 'Home' ? '#0b2f5c' : '#666' }
          ]}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => setActiveTab('Transactions')}
        >
          <Ionicons 
            name={activeTab === 'Transactions' ? 'swap-horizontal' : 'swap-horizontal-outline'} 
            size={24} 
            color={activeTab === 'Transactions' ? '#0b2f5c' : '#666'} 
          />
          <Text style={[
            styles.navText,
            { color: activeTab === 'Transactions' ? '#0b2f5c' : '#666' }
          ]}>Transactions</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => setActiveTab('Pay')}
        >
          <View style={styles.centralButton}>
            <Ionicons name="add" size={28} color="#fff" />
          </View>
          <Text style={styles.navText}>Pay</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => setActiveTab('Cards')}
        >
          <Ionicons 
            name={activeTab === 'Cards' ? 'card' : 'card-outline'} 
            size={24} 
            color={activeTab === 'Cards' ? '#0b2f5c' : '#666'} 
          />
          <Text style={[
            styles.navText,
            { color: activeTab === 'Cards' ? '#0b2f5c' : '#666' }
          ]}>Cards</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.navItem}
           onPress={() =>  {setActiveTab('profile');
            navigation.navigate('profile')}}
          
           
        
        >
          <Ionicons 
            name={activeTab === 'profile' ? 'person' : 'person-outline'} 
            size={24} 
            color={activeTab === 'profile' ? '#0b2f5c' : '#666'} 
          />
          <Text style={[
            styles.navText,
            { color: activeTab === 'profile' ? '#0b2f5c' : '#666' }
          ]}>Profile</Text>
        </TouchableOpacity>
      </View>
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
    backgroundColor: '#ffff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  welcomeText: {
    fontSize: 12,
    color: '#666',
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  notificationButton: {
    position: 'relative',
    padding: 8,
  },
  notificationBadge: {
    position: 'absolute',
    top: 6,
    right: 6,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FF3B30',
  },
  content: {
    flex: 1,
  },
  balanceCard: {
    margin: 20,
    padding: 24,
    backgroundColor: '#0b2f5c',
    borderRadius: 20,
    shadowColor: '#0b2f5c',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  balanceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  balanceLabel: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
    fontWeight: '500',
  },
  balanceAmount: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
  },
  accountNumber: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.7)',
    marginBottom: 24,
  },
  balanceActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
    minWidth: 120,
    justifyContent: 'center',
  },
  actionText: {
    marginLeft: 8,
    fontSize: 14,
    fontWeight: '600',
    color: '#0b2f5c',
  },
  section: {
    marginHorizontal: 20,
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  seeAllText: {
    fontSize: 14,
    color: '#0b2f5c',
    fontWeight: '500',
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  quickAction: {
    alignItems: 'center',
    flex: 1,
  },
  actionIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  actionName: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  transactions: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  transaction: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  transaction: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  transactionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  transactionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  transactionName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  transactionDate: {
    fontSize: 12,
    color: '#666',
  },
  transactionAmount: {
    fontSize: 14,
    fontWeight: '600',
  },
  promoBanner: {
    margin: 20,
    padding: 20,
    backgroundColor: '#4D7C55',
    borderRadius: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  promoContent: {
    flex: 1,
  },
  promoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 4,
  },
  promoText: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.9)',
    marginBottom: 12,
  },
  promoButton: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  promoButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#4D7C55',
  },
  promoIcon: {
    marginLeft: 16,
  },
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
  },
  navText: {
    fontSize: 10,
    marginTop: 4,
    fontWeight: '500',
  },
  centralButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#0b2f5c',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -30,
    shadowColor: '#0b2f5c',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
});

export default HomeScreen;