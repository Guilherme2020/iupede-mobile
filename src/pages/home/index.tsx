import React from 'react';
import {Image, View, Text} from 'react-native';
import {
  Container,
  Content,
  ButtonListRestaurants,
  TextWelcome,
  TextDescription,
  ContainerButtons,
  ButtonSearchMap,
} from './styles';
import IupedIcon from '../../../assets/iupede-identidade.png';
import LisRestaurant from '../../../assets/list-restaurante.png';
import SearchIcon from '../../../assets/map-icon.png';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Home: React.FC = ({navigation}): JSX.Element => {
  const goScreen = () => {
    navigation.navigate('ListRestaurants');
  };

  return (
    <Container>
      <Content>
        <Image height={10} source={IupedIcon} />

        <View style={{marginTop: 10}}>
          <TextWelcome>Bem vindo(a)!</TextWelcome>

          <TextDescription>
            Selecione uma das opções abaixo para encontrar o restaurante ideal
            para o momento.
          </TextDescription>
        </View>
        <ContainerButtons>
          <ButtonListRestaurants
            onPress={() => navigation.navigate('ReadQRcode')}>
            <Text
              style={{
                fontSize: 16,
                color: '#E0E0E0',
                textAlign: 'center',
                // width: '100%',
              }}>
              Abrir QRCODE
            </Text>
            <Icon color={'white'} size={25} name={'qrcode-scan'} />
          </ButtonListRestaurants>
          <ButtonListRestaurants
            onPress={() => navigation.navigate('ListRestaurantsAvailable')}>
            <Text
              style={{
                fontSize: 16,
                color: '#E0E0E0',
              }}>
              Lista de restaurantes
            </Text>
            <Image source={LisRestaurant} />
          </ButtonListRestaurants>
          <ButtonSearchMap onPress={() => goScreen()}>
            <Text
              style={{
                fontSize: 16,
                color: '#643002',
              }}>
              Encontrar no mapa
            </Text>
            <Image source={SearchIcon} />
          </ButtonSearchMap>
        </ContainerButtons>
      </Content>
    </Container>
  );
};

export default Home;
