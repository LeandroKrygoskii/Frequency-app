import React from 'react';
import { 
    Container,
    TextContent, 
    Header,
    ViewImage,
    Img,
    ViewBtn,
    Btn,
    TextBtn,
    ViewContent,
    TextContentFooter
} from './style';

import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome5 } from '@expo/vector-icons';
import {useNavigation} from '@react-navigation/native';

export default function Home() {
  

    const nav = useNavigation();

 return (
  <LinearGradient
   colors={['#2C6E87', '#59b7b1', '#032965']}
   style={{flex:1}}
  > 
    <Container>

        <Header>
           <ViewImage>
               <Img style={{resizeMode:'contain'}} source={require('../../images/gota3.png')}/>
           </ViewImage>
           <ViewContent>
                <TextContentFooter>
                Bem vindo ao aplicativo{'\n'}
                algum texto sobre o aplicativo aqui
                </TextContentFooter>
            </ViewContent>
        </Header>

        <ViewBtn>
           <Btn onPress={() => {nav.navigate('Play')}}>
             <FontAwesome5 style={{marginRight:10}} name="play" size={24} color="#c0c4ed" />
                <TextBtn>
                    Começar
                 </TextBtn>
           </Btn> 
        </ViewBtn>

       

    </Container>
  </LinearGradient>  
  );
}