import styled from 'styled-components/native';
import {Dimensions} from 'react-native';
const {widthI} = Dimensions.get('screen');
const ITEM_WIDTH = widthI * 0.76;
const ITEM_HEIGHT = 200;

export const Container = styled.View`
  flex: 1;
  flex-grow: 1;
  background-color: #ffffff;
`;

export const Content = styled.View`
  padding: 20px;
  display: flex;
  flex: 1;
  padding: 10px;
  padding-bottom: 0;
  margin-top: 5px;
`;

export const BannerFood = styled.Image`
  width: 300px;
  height: 300px;
  border-radius: 14px;
  opacity: 0.8;
  background-color: black;
`;

export const Titlebar = styled.View`
  width: 100%;
  margin-top: 50px;
  /* padding-left: 20px;
  padding-right: 20px; */
  display: flex;
  flex-direction: row;
`;

export const Avatar = styled.Image`
  width: 44px;
  height: 44px;
  background: black;
  border-radius: 22px;
  margin-left: 20px;
  /* position: absolute;
  top: 0;
  left: 0; */
`;

export const Title = styled.Text`
  font-size: 20px;
  font-weight: 500;
  color: #b8bece;
`;

export const Name = styled.Text`
  font-size: 20px;
  color: #3c4560;
  font-weight: bold;
`;
