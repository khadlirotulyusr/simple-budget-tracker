import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Ionicons } from '@expo/vector-icons';

import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Provider } from "react-redux";
import { store, persistor } from "./store/index";
import { PersistGate } from "redux-persist/integration/react";

//screen
import DashboardScreen from './screen/Dashboard';
import LoginPage from './screen/Login';
import TransactionPage from './screen/Transaction/Transaction';
import BudgetCategoryPage from './screen/BudgetCategory/BudgetCategory';
import AddBudgetCategoryPage from './screen/BudgetCategory/AddCategory';
import EditBudgetCategoryPage from './screen/BudgetCategory/EditCategory';
import AddTransactionPage from './screen/Transaction/AddTransaction';
import EditTransactionPage from './screen/Transaction/EditTransaction';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
//bottom tab
function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          switch (route.name) {
            case "Dashboard":
              iconName = "apps-outline";
              break;
            case "History":
              iconName = "newspaper-outline";
              break;
            case "Budget Category":
              iconName = "wallet-outline";
              break;
            case "Login":
              iconName = "log-in-outline";
              break;
            default:
              iconName = "ellipse-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "tomato",
        tabBarInactiveTintColor: "gray",
        headerShown: false,
      })}
    >
      <Tab.Screen name="Dashboard" component={DashboardScreen} />
      <Tab.Screen name="History" component={TransactionPage} />
      <Tab.Screen name="Budget Category" component={BudgetCategoryPage} />
      <Tab.Screen name="Login" component={LoginPage} />
    </Tab.Navigator>
  );
}
export default function App() {
  const Tab = createBottomTabNavigator();


  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SafeAreaProvider>
          <NavigationContainer>
            {/* <Tab.Navigator
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
              <Tab.Screen options={{
                headerShown: false,
                tabBarButton: () => null,
              }} name="Add Category" component={AddBudgetCategoryPage} />
            </Tab.Navigator> */}
            <Stack.Navigator>
              {/* Main Tabs */}
              <Stack.Screen
                name="MainTabs"
                component={MainTabs}
                options={{ headerShown: false }}
              />

              <Stack.Screen
                name="Add Category"
                component={AddBudgetCategoryPage}
                options={{ title: "Add Category" }}
              />
              <Stack.Screen
                name="Edit Category"
                component={EditBudgetCategoryPage}
                options={{ title: "Edit Category" }}
              />
              <Stack.Screen
                name="Add Transaction"
                component={AddTransactionPage}
                options={{ title: "Add Transaction" }}
              />
              <Stack.Screen
                name="Edit Transaction"
                component={EditTransactionPage}
                options={{ title: "Edit Transaction" }}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
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
