
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import SearchScreen from "./screens/SearchScreen.js";
import HomeScreen from "./screens/HomeScreen.js";
import RecipeStack from "./RecipeStack";
import FavoritesScreen from "./screens/FavoritesScreen.js";
import LoginScreen from "./screens/LoginScreen";
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
        name="HomeTab"
        options={{
          tabBarLabel: "Hem",
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "home" : "home-outline"}
              size={size}
              color={color}
            />
          ),
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
        name="RecipesTab"
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
      >
        {(props) => (
          <RecipeStack
            {...props}
            session={session}
          />
        )}
      </Tab.Screen>


      {session && (
        <Tab.Screen
          name="SearchTab"
          options={{
            tabBarLabel: "Sök",
            tabBarIcon: ({ color, size, focused }) => (
              <Ionicons
                name={focused ? "search" : "search-outline"}
                size={size}
                color={color}
              />
            ),
          }}
        >
          {(props) => (
            <SearchScreen
              {...props}
              session={session}
            />
          )}
        </Tab.Screen>
      )}






      {session ? (
        <Tab.Screen
          name="FavoritesTab"
          options={{
            tabBarLabel: "Favoriter",
            tabBarIcon: ({ color, size, focused }) => (
              <Ionicons
                name={focused ? "heart" : "heart-outline"}
                size={size}
                color={color}
              />
            )
          }}
        >
          {(props) => (
            <FavoritesScreen
              {...props}
              session={session}
            />
          )}
        </Tab.Screen>
      ) : (
        <Tab.Screen
          name="LoginTab"
          options={{
            tabBarLabel: "Logga in",
            tabBarIcon: ({ color, size, focused }) => (
              <Ionicons
                name={focused ? "log-in" : "log-in-outline"}
                size={size}
                color={color}
              />
            )
          }}
        >
          {(props) => <LoginScreen {...props} />}
        </Tab.Screen>
      )}
    </Tab.Navigator>
  );
}
