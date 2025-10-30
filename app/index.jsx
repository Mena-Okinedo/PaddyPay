import { router } from 'expo-router';
import { useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const OnboardingScreen = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const flatListRef = useRef(null);
  const scrollY = useRef(new Animated.Value(0)).current;

  const slides = [
    {
      id: '1',
      title: 'Secure Banking',
      description: 'Your finances are protected with bank-level security and encryption technology.',
      image:require('../assets/images/onboarding.png')
    },
    {
      id: '2',
      title: 'Smart Investing',
      description: 'Grow your wealth with AI-powered investment recommendations and portfolio management.',
      image:require('../assets/images/onboarding1.png')
    },
    {
      id: '3',
      title: 'Instant Transfers',
      description: 'Send and receive money instantly with zero fees and real-time processing.',
      image:require('../assets/images/onboarding2.png')
    },
  ];

 
  const onScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
    { useNativeDriver: false }
  );

  const onMomentumScrollEnd = (event) => {
    const slideHeight = SCREEN_HEIGHT * 0.6;
    const currentIndex = Math.round(event.nativeEvent.contentOffset.y / slideHeight);
    setCurrentSlide(currentIndex);
  };
  const goToSignUp = () => {
    router.push('/signup');
  };

  const goToLogin = () => {
    router.push('/login');
  };

  const scrollToSlide = (index) => {
    const slideHeight = SCREEN_HEIGHT * 0.6;
    flatListRef.current?.scrollToOffset({
      offset: index * slideHeight,
      animated: true,
    });
    setCurrentSlide(index);
  };

  const renderSlide = ({ item, index }) => {
    return (
      <View style={styles.slide}>
        <View style={styles.slideContent}>
         
          <Image
            source={item.image}
            style={styles.featureImage}
            resizeMode="contain"
          />
          
        
          <View style={styles.textContainer}>
            <Text style={styles.slideTitle}>{item.title}</Text>
            <Text style={styles.slideDescription}>{item.description}</Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      
      <View style={styles.logoContainer}>
        <Image
          source={require('../assets/images/logo-3.png')} 
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.logoText}>PaddyPay</Text>
      </View>

      
      <View style={styles.slidesContainer}>
        <FlatList
          ref={flatListRef}
          data={slides}
          renderItem={renderSlide}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          snapToInterval={SCREEN_HEIGHT * 0.6}
          decelerationRate="fast"
          onScroll={onScroll}
          onMomentumScrollEnd={onMomentumScrollEnd}
          scrollEventThrottle={16}
        />
      </View>

      <View style={styles.dotsContainer}>
        {slides.map((_, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.dot,
              currentSlide === index ? styles.activeDot : styles.inactiveDot,
            ]}
            onPress={() => scrollToSlide(index)}
          />
        ))}
      </View>

     
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.registerButton} onPress={goToSignUp}>
          <Text style={styles.registerButtonText}>Get Started</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.loginButton} onPress={goToLogin}>
          <Text style={styles.loginButtonText}>Already have an account?</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  logoContainer: {
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  logo: {
    width: 150,
    height: 60,
  },

  logoText:{color:'#0b2f5c',
            fontSize:20,
            fontWeight:'bold',
            marginTop:-5

  },

  slidesContainer: {
    flex: 1,
    height: SCREEN_HEIGHT * 0.6,
  },
  slide: {
    height: SCREEN_HEIGHT * 0.6,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  slideContent: {
    alignItems: 'center',
    width: '100%',
  },
  featureImage: {
    width: 250,
    height: 250,
    marginBottom: 40,
  },
  textContainer: {
    alignItems: 'center',
  },
  slideTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1a1a1a',
    textAlign: 'center',
    marginBottom: 16,
  },
  slideDescription: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 24,
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: '#0b2f5c',
    width: 20,
  },
  inactiveDot: {
    backgroundColor: '#ccc',
  },
  buttonsContainer: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  registerButton: {
    backgroundColor: '#0b2f5c',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 12,
  },
  registerButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  loginButton: {
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#0b2f5c',
  },
  loginButtonText: {
    color: '#0b2f5c',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default OnboardingScreen;