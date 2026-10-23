
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";


import HomeScreen from "./screens/HomeScreen";
import RecipesScreen from "./screens/RecipesScreen";

import { colours } from "./constants/Colours.js";

const Tab = createBottomTabNavigator();



export default function MainTabs({ session }) {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,

        tabBarActiveTintColor: colours.skog,
        tabBarInactiveTintColor: colours.bark,

        tabBarStyle: {
          backgroundColor: colours.pergament,
          borderTopColor: colours.sage,
          height: 65,
          paddingTop: 6,
          paddingBottom: 8,
        },

        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "600",
        },
      }}
    >
      <Tab.Screen
        name="Hem"
        options={{
          tabBarLabel: "Hem",
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "home" : "home-outline"}
              size={size}
              color={color}
            />
          )
        }}
      >
        {(props) => (
          <HomeScreen
            {...props}
            session={session}
          />
        )}
      </Tab.Screen>



      <Tab.Screen
        name="Recipes"
        component={RecipesScreen}
        options={{
          tabBarLabel: "Recept",
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "book" : "book-outline"}
              size={size}
              color={color}
            />
          )
        }}
      />

    </Tab.Navigator>
  );
}
