
import { useFonts } from "expo-font";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";


import { fonts } from "./constants/Fonts";
import RegisterScreen from "./screens/RegisterScreen";
import LoginScreen from "./screens/LoginScreen";
import HomeScreen from "./screens/HomeScreen";
import { FavoritesProvider } from "./context/FavoritesContext";


import MainTabs from "./MainTabs";

import { useEffect, useState } from "react";
import { supabase } from "./lib/supabase";




const Stack = createNativeStackNavigator();

export default function App() {

  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);


  const [fontsLoaded] = useFonts({
    [fonts.title]: require("./assets/fonts/IndieFlower-Regular.ttf"),
  });


  if (!fontsLoaded) {
    return null;
  }


  return (
    <FavoritesProvider session={session}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="Home">
            {(props) => (
              <HomeScreen {...props} session={session} />
            )}
          </Stack.Screen>


          <Stack.Screen name="MainTabs">
            {(props) => (
              <MainTabs
                {...props}
                session={session}
              />
            )}
          </Stack.Screen>


          <Stack.Screen
            name="Register"
            component={RegisterScreen}
          />

          <Stack.Screen
            name="Login"
            component={LoginScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </FavoritesProvider>
  );
}
