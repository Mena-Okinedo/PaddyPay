import { Stack } from "expo-router";
import { useEffect, useState } from "react";
import SplashScreen from '../Componet/SplashScreen';

export default function RootLayout() {
   const[showSplash, setShowSplash] = useState(true);
    useEffect(() =>{
      setTimeout(() =>
        setShowSplash(false), 3000
      );
    }, []

  );

    if (showSplash){
      return <SplashScreen/>;
    }

  return (
  
  <Stack screenOptions={{headerShown:false}}>

  
     <Stack.Screen name="index"/>
       <Stack.Screen name="(auth)"/>
        <Stack.Screen name="home"/>
         <Stack.Screen name="profile"/>
         <Stack.Screen name="addmoney"/>
          <Stack.Screen name="sendmoney"/>
         <Stack.Screen name="success"/>



  </Stack>);
}
