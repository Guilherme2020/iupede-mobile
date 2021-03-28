import React, {useState, useEffect, useCallback} from 'react';
import {StyleSheet, View, Animated, FlatList} from 'react-native';
import Store from '../../components/stores/Store';
import {MapsComponent} from '../../components/MapsComponents';
import {CARD_WIDTH} from '../../components/stores/Store';
import api from '../../services/api';

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

const Locations = [
  {
    id: 1,
    name: 'Bakery Bread Man',
    image:
      'https://cdn.pixabay.com/photo/2016/11/30/14/08/cafe-1872888_960_720.jpg',
    lat: -5.092212,
    lon: -42.7535147,
  },
  {
    id: 2,

    name: 'House Coffee',
    image:
      'https://cdn.pixabay.com/photo/2015/05/15/14/55/cafe-768771_960_720.jpg',
    lat: 4.697481,
    lon: -74.03498,
  },
  {
    id: 3,

    name: 'Deluxe Restaurant',
    image:
      'https://cdn.pixabay.com/photo/2015/04/20/13/30/kitchen-731351_960_720.jpg',
    lat: 4.69099,
    lon: -74.041589,
  },
  {
    id: 4,
    name: 'Breakfast House',
    image:
      'https://cdn.pixabay.com/photo/2015/03/26/09/42/breakfast-690128_960_720.jpg',
    lat: 4.698775,
    lon: -74.040205,
  },
  {
    id: 5,
    name: 'Bread Man Bakery',
    image:
      'https://cdn.pixabay.com/photo/2016/11/30/14/08/cafe-1872888_960_720.jpg',
    lat: 4.694487,
    lon: -74.042319,
  },
  {
    id: 6,
    name: 'Dream Coffee',
    image:
      'https://cdn.pixabay.com/photo/2015/05/15/14/55/cafe-768771_960_720.jpg',
    lat: 4.697973,
    lon: -74.041235,
  },
  {
    id: 7,
    name: 'Home Restaurent',
    image:
      'https://cdn.pixabay.com/photo/2015/04/20/13/30/kitchen-731351_960_720.jpg',
    lat: 4.693739,
    lon: -74.038006,
  },
  {
    id: 8,
    name: 'House Breakfast',
    image:
      'https://cdn.pixabay.com/photo/2015/03/26/09/42/breakfast-690128_960_720.jpg',
    lat: 4.698775,
    lon: -74.040205,
  },
];

interface CompaniesType {
  cnpj?: string;
  description?: string;
  name?: string;
}

interface ListRestaurantType {
  image_url?: string;
  latitude?: string;
  longitude?: string;
  address?: string;
  description?: string;
  companies?: CompaniesType;
}

const ListRestaurantsMap = ({navigation}) => {
  const [longitude, setLongitude] = useState(0);
  const [latitude, setLatitude] = useState(0);
  const [offsetStart, setOffsetStart] = useState(0);
  const [index, setIndex] = useState(0);
  const [stores, setStores] = useState<ListRestaurantType[]>([]);
  const x = new Animated.Value(0);

  const updatePosition = (index) => {
    try {
      if (stores.length > 0) {
        console.log('entrei aq ');

        setLatitude(Number(stores[index].latitude));
        setLongitude(Number(stores[index].longitude));
      }
    } catch (e) {
      // console.log(index);

      console.log(e);
    }
  };

  useEffect(() => {
    (async function getLocationsStores(): Promise<void> {
      try {
        const response = await api.get('/stores');
        // console.log(response.data);
        if (response.data) {
          setStores(response.data);
          // initialPosition(0);

          // console.log(response.data);
          setLatitude(Number(response.data[0].latitude));
          setLongitude(Number(response.data[0].longitude));
        }
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);

  const updateState = (event) => {
    let position = event.nativeEvent.contentOffset.x;
    let i = Math.floor((position - offsetStart) / CARD_WIDTH);
    if (index !== i) {
      updatePosition(i);
      setIndex(i);
    }
  };

  const onScroll = Animated.event(
    [
      {
        nativeEvent: {
          contentOffset: {x},
        },
      },
    ],
    {
      listener: (event) => updateState(event),
      useNativeDriver: true,
    },
  );

  const _updateRangePositions = (offsetStart) => {
    setOffsetStart(offsetStart);
  };

  const _navigationScreen = (item: ListRestaurantType): void => {
    console.log(item);
    navigation.navigate('RestaurantMenu', {companie: item?.companies});
  };

  return (
    <View style={{flex: 1}}>
      <MapsComponent latitude={latitude} longitude={longitude} />
      <View style={styles.listStores}>
        <AnimatedFlatList
          onScroll={onScroll}
          scrollEventThrottle={16}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          data={stores}
          renderItem={({index, item}) => (
            <Store
              index={index}
              item={item}
              x={x}
              onClick={() => _navigationScreen(item)}
              updateRangePositions={_updateRangePositions}
            />
          )}
          keyExtractor={(item: any) => item.id}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  listStores: {
    marginBottom: 15,
    width: '100%',
    position: 'absolute',
    bottom: 0,
  },
});
export default ListRestaurantsMap;
