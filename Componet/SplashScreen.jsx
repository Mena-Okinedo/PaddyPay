import { useEffect, useRef } from "react";
import { Animated, Dimensions, Image, StyleSheet, Text, View } from "react-native";

const{width, height} = Dimensions.get('screen')


const AnimatedSplashScreen =() =>{
const fadeAnim = useRef(new Animated.Value(0)).current;
const slideUpAnim = useRef(new Animated.Value(50)).current;
const scaleAnim = useRef (new Animated.Value(0.5)).current;

    
useEffect(() => {
    startAnimations();
},[]);

const startAnimations =()=>{
    fadeAnim.setValue(0);
    slideUpAnim.setValue(50);
    scaleAnim.setValue(0.5);

    Animated.sequence([
    Animated.parallel([

        Animated.timing(fadeAnim,{
            toValue:1,
            duration:1000,
            useNativeDriver:true
        }),
        Animated.timing(scaleAnim, {
            toValue:1,
            duration:800,
            useNativeDriver:true,
        }),
    ]),
    Animated.delay(300),
    ]).start();
};


        
return(
    
   
    <View style={{backgroundColor: '#0b2f5c',
                  justifyContent:'center',
                  alignContent:'center',
                  flex:1

    }}>

   

    <Animated.View style={[
             style.logoContainer,
             {
                opacity:fadeAnim,
                transform:[{
                    translateY:slideUpAnim,
                    
                },
            {
                scale:scaleAnim
            },]
             }
    ]}>

        <Image source={require('../assets/images/logo-3.png')}
                style ={style.logoImage}/>

    <Text style={style.logoText}>PaddyPay </Text>
    <Text style={style.tagline}>FINANCIAL WELLNESS</Text>
    </Animated.View>
     </View>

)}

const style = StyleSheet.create({
    logoContainer:{
        alignItems:'center',
        justifyContent:'center',
        zIndex:10,
        marginBottom: 200
    },
    logoText:{
        fontSize: 52,
        fontWeight:'800',
        color:'white',
        letterSpacing:2,
        textShadowRadius:10,
        textShadowColor:'rgba(0,0,0,0.3)',
        textShadowOffset:{
            width:2, height:2
        },
        marginTop:-70
    },
    tagline:{
        fontSize:18,
        fontWeight:'300',
        color:'rgba(255, 255, 255,0.9)',
        letterSpacing: 4,
        textTransform:'uppercase',
        textShadowColor:'rgba(0, 0, 0, 0.)' ,
        textShadowOffset: {width:1, height:1},
        textShadowRadius:5,
        marginTop: 20
      

    },
    logoImage:{
        width:250,
        height:250,
        marginBottom:30,
        alignSelf:'center',
        justifyContent: 'center'
    
    }
})
export default AnimatedSplashScreen;


