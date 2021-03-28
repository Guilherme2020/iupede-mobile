import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Home from '../pages/home';
import ListRestaurantsMap from '../pages/ListRestaurantsMaps';
import ListRestaurants from '../pages/ListRestaurants';
import ReadQRcode from '../pages/ReadQRcode/';
import Companie from '../pages/Companie';
import RestaurantMenu from '../pages/RestaurantMenu';

const App = createStackNavigator();

const AppRoutes: React.FC = () => (
  <App.Navigator
    screenOptions={{
      headerShown: true,
      cardStyle: {backgroundColor: '#EBEEF8'},
    }}
    // initialRouteName="Dashboard"
  >
    <App.Screen
      options={{
        headerShown: false,
        headerTransparent: true,
        headerTitle: 'Dashboard',
        headerTitleStyle: {
          color: '#fff',
          // fontFamily: 'Poppins-Regular',
          fontSize: 16,
        },
        // headerTitle: () => <Image source={Logo} />,
      }}
      name="Dashboard"
      component={Home}
    />

    <App.Screen
      options={{
        headerShown: false,
        headerTransparent: true,
        headerTitle: 'ListRestaurant',
        headerTitleStyle: {
          color: '#fff',
          // fontFamily: 'Poppins-Regular',
          fontSize: 16,
        },
        // headerTitle: () => <Image source={Logo} />,
      }}
      name="ListRestaurants"
      component={ListRestaurantsMap}
    />
    <App.Screen
      options={{
        headerShown: false,
      }}
      name="RestaurantMenu"
      component={RestaurantMenu}
    />
    <App.Screen
      options={{
        headerShown: false,
        headerTransparent: true,
        headerTitle: 'ListRestaurant',
        headerTitleStyle: {
          color: '#fff',
          // fontFamily: 'Poppins-Regular',
          fontSize: 16,
        },
        // headerTitle: () => <Image source={Logo} />,
      }}
      name="ListRestaurantsAvailable"
      component={ListRestaurants}
    />
    <App.Screen name="ReadQRcode" component={ReadQRcode} />

    <App.Screen
      name="Companie"
      component={Companie}
      options={{
        headerShown: false,
      }}
    />
  </App.Navigator>
);

export default AppRoutes;
