import styled from 'styled-components/native';

export const Container = styled.View`
  background: #ed3237;
  flex: 1;
  flex-grow: 1;
`;

export const Content = styled.View`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 10px;
  /* margin-top: 80px; */
`;

export const TextProduct = styled.Text`
  font-style: normal;
  font-weight: normal;
  font-size: 64px;
  line-height: 90px;

  display: flex;
  align-items: center;
  text-align: center;

  color: #f2f2f2;
`;

export const ContentText = styled.Text`
  width: 100%;
  height: 79px;
  background: yellow;
  align-items: center;
`;

export const TextDescription = styled.Text`
  font-family: Heebo;
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 26px;
  max-width: 100%;
  width: 90%;
  /* or 162% */
  text-align: center;
  top: 10px;
  color: #e0e0e0;
  padding-left: 10px;
  padding-right: 10px;
`;

export const TextWelcome = styled.Text`
  font-family: Heebo;
  font-style: normal;
  font-weight: bold;
  font-size: 24px;
  line-height: 24px;
  /* identical to box height, or 100% */

  display: flex;
  align-items: center;
  text-align: center;

  color: #e0e0e0;
`;

export const ContainerButtons = styled.View`
  align-items: center;
  justify-content: center;
  flex: 1;
  /* height: 100%; */

  /* bottom: 0px;
  position: absolute; */
  /* margin-top: 50px; */
  /* background-color: blue; */
`;

export const ButtonListRestaurants = styled.TouchableOpacity`
  width: 304px;
  height: 58px;

  background: #c22b2f;
  border-radius: 16px;

  align-items: center;
  justify-content: space-between;
  flex-direction: row;

  padding-right: 15px;
  margin-bottom: 25px;
  padding-left: 15px;
`;

export const ButtonSearchMap = styled.TouchableOpacity`
  width: 304px;
  height: 58px;

  background: #ffb472;

  border-radius: 16px;

  align-items: center;
  justify-content: space-between;
  flex-direction: row;

  padding-right: 15px;
  padding-left: 15px;
`;
