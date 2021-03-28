import React, {useState, useEffect, useCallback} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import {ActivityIndicator} from 'react-native';
import {
  StatusBar,
  Image,
  FlatList,
  Dimensions,
  Animated,
  Text,
  View,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import api from '../../services/api';

const {width} = Dimensions.get('screen');
import {
  FlingGestureHandler,
  Directions,
  State,
  ScrollView,
} from 'react-native-gesture-handler';
import {
  Container,
  Content,
  BannerFood,
  Titlebar,
  Title,
  Avatar,
  Name,
} from './styles';
interface Companie {
  id: string;
  name: string;
  description: string;
  cnpj: string;
}
interface Params {
  companie: Companie;
}

const DATA = [
  {
    title: 'Afro vibes',
    location: 'Mumbai, India',
    date: 'Nov 17th, 2020',
    poster:
      'https://storage.googleapis.com/golden-wind/bootcamp-gostack/desafio-food/food3.png',
  },
  {
    title: 'Jungle Party',
    location: 'Unknown',
    date: 'Sept 3rd, 2020',
    poster:
      'https://storage.googleapis.com/golden-wind/bootcamp-gostack/desafio-food/food2.png',
  },
  {
    title: '4th Of July',
    location: 'New York, USA',
    date: 'Oct 11th, 2020',
    poster: 'http://www.dogao.com/img/menu/06-gigantes-01-maracana.jpg',
  },
  {
    title: 'Summer festival',
    location: 'Bucharest, Romania',
    date: 'Aug 17th, 2020',
    poster: 'http://www.dogao.com/img/menu/03-file-10-pimentinha.jpg',
  },
  {
    title: 'BBQ with friends',
    location: 'Prague, Czech Republic',
    date: 'Sept 11th, 2020',
    poster: 'http://www.dogao.com/img/menu/03-file-01-cheddar.jpg',
  },
  {
    title: 'Festival music',
    location: 'Berlin, Germany',
    date: 'Apr 21th, 2021',
    poster:
      'https://anamaria.uol.com.br/images/large/2020/05/08/hamburguer-suino-gourmet-prepare-este-lanche-na-quarentena-1238425.jpg',
  },
  {
    title: 'Beach House',
    location: 'Liboa, Portugal',
    date: 'Aug 12th, 2020',
    poster:
      'https://www.creative-flyers.com/wp-content/uploads/2020/06/Summer-Beach-House-Flyer.jpg',
  },
];
const OVERFLOW_HEIGHT = 70;
const SPACING = 10;
const ITEM_WIDTH = width * 0.76;
const ITEM_HEIGHT = 200;
const VISIBLE_ITEMS = 3;

const OverflowItems = ({data, scrollXAnimated}) => {
  const inputRange = [-1, 0, 1];
  const translateY = scrollXAnimated.interpolate({
    inputRange,
    outputRange: [OVERFLOW_HEIGHT, 0, -OVERFLOW_HEIGHT],
  });
  return (
    <View style={styles.overflowContainer}>
      <Animated.View style={{transform: [{translateY}]}}>
        {data.map((item, index) => {
          return (
            <View key={index} style={styles.itemContainer}>
              <Text style={[styles.title]} numberOfLines={1}>
                {item.title}
              </Text>
              <View style={styles.itemContainerRow}>
                <Text style={[styles.location]}>{item.location}</Text>
                <Text style={[styles.date]}>{item.date}</Text>
              </View>
            </View>
          );
        })}
      </Animated.View>
    </View>
  );
};

const RestaurantMenu = (): JSX.Element => {
  const [data, setData] = React.useState(DATA);
  const scrollXIndex = React.useRef(new Animated.Value(0)).current;
  const scrollXAnimated = React.useRef(new Animated.Value(0)).current;
  const [index, setIndex] = React.useState(0);
  const setActiveIndex = useCallback((activeIndex) => {
    scrollXIndex.setValue(activeIndex);
    setIndex(activeIndex);
  }, []);

  const navigation = useNavigation();
  const route = useRoute();

  const routeParams = route.params as Params;

  useEffect(() => {
    console.log(routeParams);
  }, []);

  useEffect(() => {
    if (index === data.length - VISIBLE_ITEMS - 1) {
      const newData = [...data, ...data];
      setData(newData);
    }
  }, []);

  useEffect(() => {
    Animated.spring(scrollXAnimated, {
      toValue: scrollXIndex,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <ScrollView contentContainerStyle={{flex: 1}}>
      <Container>
        <Content>
          <Titlebar>
            <Avatar
              source={{
                uri:
                  'https://www.creative-flyers.com/wp-content/uploads/2020/06/Summer-Beach-House-Flyer.jpg',
              }}
            />
            <View
              style={{
                justifyContent: 'space-between',
                flexDirection: 'row',
                width: '80%',
              }}>
              <View>
                <Title>Bem Vindo,</Title>
                <Name>Aman</Name>
              </View>
              <View
                style={{
                  alignItems: 'center',
                  backgroundColor: 'yellow',
                  width: '20%',
                  borderRadius: 40,
                  justifyContent: 'center',
                }}>
                <Icon name="md-cart" size={32} color="red" />
              </View>
            </View>
          </Titlebar>

          <FlingGestureHandler
            key="left"
            direction={Directions.LEFT}
            onHandlerStateChange={(ev) => {
              if (ev.nativeEvent.state === State.END) {
                if (index === data.length - 1) {
                  return;
                }
                setActiveIndex(index + 1);
              }
            }}>
            <FlingGestureHandler
              key="right"
              direction={Directions.RIGHT}
              onHandlerStateChange={(ev) => {
                if (ev.nativeEvent.state === State.END) {
                  if (index === 0) {
                    return;
                  }
                  setActiveIndex(index - 1);
                }
              }}>
              <SafeAreaView style={styles.container}>
                <StatusBar hidden />
                <FlatList
                  data={data}
                  keyExtractor={(_, index) => String(index)}
                  horizontal
                  inverted
                  contentContainerStyle={{
                    flex: 1,
                    justifyContent: 'center',
                    padding: SPACING * 2,
                    marginTop: 20,
                    marginLeft: 20,
                  }}
                  scrollEnabled={false}
                  removeClippedSubviews={false}
                  CellRendererComponent={({
                    item,
                    index,
                    children,
                    style,
                    ...props
                  }) => {
                    const newStyle = [style, {zIndex: data.length - index}];
                    return (
                      <View style={newStyle} index={index} {...props}>
                        {children}
                      </View>
                    );
                  }}
                  renderItem={({item, index}) => {
                    const inputRange = [index - 1, index, index + 1];
                    const translateX = scrollXAnimated.interpolate({
                      inputRange,
                      outputRange: [50, 0, -100],
                    });
                    const scale = scrollXAnimated.interpolate({
                      inputRange,
                      outputRange: [0.8, 1, 1.3],
                    });
                    const opacity = scrollXAnimated.interpolate({
                      inputRange,
                      outputRange: [1 - 1 / VISIBLE_ITEMS, 1, 0],
                    });

                    return (
                      <Animated.View
                        style={{
                          position: 'absolute',
                          left: -ITEM_WIDTH / 2,
                          opacity,
                          transform: [
                            {
                              translateX,
                            },
                            {scale},
                          ],
                        }}>
                        <BannerFood
                          source={{uri: item.poster}}
                          resizeMode="cover"
                        />
                        <View
                          style={{
                            position: 'absolute',
                            bottom: 0,
                            marginBottom: 10,

                            width: '100%',
                          }}>
                          <Text
                            style={{
                              color: '#FFFFFF',
                              fontWeight: 'bold',
                              fontSize: 22,
                              textAlign: 'center',
                              backgroundColor: 'transparent',
                              opacity: 0.9,
                            }}>
                            Nome do Lanche
                          </Text>
                        </View>
                      </Animated.View>
                    );
                  }}
                />
              </SafeAreaView>
            </FlingGestureHandler>
          </FlingGestureHandler>
        </Content>
      </Container>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: -1,
  },
  location: {
    fontSize: 16,
  },
  date: {
    fontSize: 12,
  },
  itemContainer: {
    height: OVERFLOW_HEIGHT,
    padding: SPACING * 2,
  },
  itemContainerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  overflowContainer: {
    height: OVERFLOW_HEIGHT,
    overflow: 'hidden',
  },
});

export default RestaurantMenu;
