import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import DashboardScreen from './screen/Dashboard';
import LoginPage from './screen/Login';
import TransactionPage from './screen/Transaction';
import BudgetCategoryPage from './screen/BudgetCategory';
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from '@expo/vector-icons';

import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

export default function App() {
  const Tab = createBottomTabNavigator();


  return (
    <SafeAreaProvider>
      {/* <View style={styles.container}> */}
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
              if (route.name === "LoginPage") {
                iconName = focused
                  ? "information-circle"
                  : "information-circle-outline";
              } else if (route.name === "Dashboard") {
                iconName = "apps-outline";
              } else if (route.name === "History") {
                iconName = "newspaper-outline";
              } else if (route.name === "Budget Category") {
                iconName = "settings-outline";
              } else if (route.name === "Dashboard") {
                iconName = "star";
              }
              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: "tomato",
            tabBarInactiveTintColor: "gray",
          })}
        >
          <Tab.Screen options={{
            headerShown: false,
          }} name="Dashboard" component={DashboardScreen} />
          <Tab.Screen options={{
            headerShown: false,
          }} name="History" component={TransactionPage} />
          <Tab.Screen options={{
            headerShown: false,
          }} name="Budget Category" component={BudgetCategoryPage} />
          <Tab.Screen name="Login" component={LoginPage} />
        </Tab.Navigator>
      </NavigationContainer>
      {/* </View> */}
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

});
