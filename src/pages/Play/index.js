import React, { useState, useRef, useEffect } from 'react';
import { Container, Footer, Btn } from './style';

import { LinearGradient } from 'expo-linear-gradient';
import { Svg, Circle , Path} from 'react-native-svg';

import { Fontisto } from '@expo/vector-icons'
import { StyleSheet, Dimensions, View } from 'react-native';
import  {theme}  from '../../styles/theme';
import Animated, {Easing, useAnimatedProps , useSharedValue, withTiming, withRepeat, Clock} from 'react-native-reanimated';
import Header from '../../components/Header';
import CircularProgress from '../../components/CircularBar';

import * as Progress from 'react-native-progress';

import { Audio } from 'expo-av';


const AudioFrequency = require('../../Audio/frequency.mp3')


const {width, height} = Dimensions.get('screen');


const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const AnimatedPath = Animated.createAnimatedComponent(Path);
const AnimatedSvg = Animated.createAnimatedComponent(Svg);


export default function Play() {
  
 
  const heightAnimated = useSharedValue(100);
  const waveAnimated = useSharedValue(5);
  const countInterval = useRef ( null ); 
  const sound = useRef(new Audio.Sound());

  const [stopCircle, setStopCircle] = useState(false);

  


 
    const [elapsedTime, setElapsedTime] = useState(0);
    const [progress, setProgress] = useState(0);

    
  
     function changePercentage() {
      countInterval.current = setInterval(() => {
        if (progress < 1) {
          setElapsedTime((t) => t + 1);
        }

      
      }, 1000);
     }
     

    const PlayAudio = async () => {
      try {
        const result = await sound.current.getStatusAsync();
        if(result.isLoaded){
          if(result.isPlaying === false){
            setStopCircle(true);
            sound.current.playAsync();
          }
        }
      } catch (error) {
        
      }
    }

    const StopAudio = async () => {
      try {
        const result = await sound.current.getStatusAsync();
        if(result.isLoaded){
          if(result.isPlaying === true){
            setProgress(0);
            setElapsedTime(0);
            setStopCircle(false);
            clearInterval(countInterval);
            sound.current.stopAsync();
          }
        }
      } catch (error) {
        
      }
    }

    const loadAudio = async () => {
      const checkLoading = await sound.current.getStatusAsync();
      if(checkLoading.isLoaded === false){
        try {
          const result = await sound.current.loadAsync(AudioFrequency)
          if (result.isLoaded === false) {
            //SetLoading(false);
            console.log('Error in Loading Audio');
          } else {
            console.log('sound looaded')
          }
        } catch (error) {
          console.log(error)
        }
      }
    }
  
      
      useEffect(() => {
          loadAudio();
      }, []);
     
  

    useEffect(() => {
    
        if (progress >= 100) {
          setStopCircle(false);
          clearInterval(progress);
        }
        
      }, [progress]);

    
    
  
    useEffect(() => {
       
      setProgress(elapsedTime / 1.3); // em quantos segundos vai atualizar a porcentagem "1.3"
    }, [elapsedTime]);
  
    //return progress.toFixed(0);
  




  const svgContainerProps = useAnimatedProps(() => {
    return{
      width,
      height: heightAnimated.value,
      viewBox: `0 0 ${width} ${heightAnimated.value}`
    }
  });

  const firstWaveProps = useAnimatedProps(() => {
    return{
      d:`
      M 0 0
      Q 45 ${waveAnimated.value} 90 0
      T 180 0
      T 270 0
      T 360 0
      T 900 0
      T 540 0
      V ${heightAnimated.value}
      H 0
      Z
    `
    }
  })

  const secondWaveProps = useAnimatedProps(() => {
    return{
      d:`
      M 0 0
      Q 35 ${waveAnimated.value + 5} 70 0
      T 140 0
      T 210 0
      T 280 0
      T 350 0
      T 420 0
      V ${heightAnimated.value}
      H 0
      Z
    `
    }
  })

  
   
  //const progress = useProgress();
  function handleClick() {
    PlayAudio();
    changePercentage();
    waveAnimated.value = 5;
    
    
   
    waveAnimated.value = withRepeat(
      withTiming(17, {
        duration: 1000,
        easing: Easing.linear
      }), Infinity, true
    )

    // heightAnimated.value = withRepeat( 
    //  withTiming(heightAnimated.value - 100 , {
    //   duration: 10000,
    //   easing: Easing.sin,
      
    // }), Infinity, true
    // )

   
  }

 return (

  

    <Container>

      <View style={{marginBottom:150}}>

       <Progress.Circle size={120} indeterminate={stopCircle} borderWidth={10} color={'blue'} />
        
      </View>

             
             <AnimatedSvg 
              animatedProps={svgContainerProps}
              
             >

               <AnimatedPath 
                animatedProps={firstWaveProps}
                fill={theme.colors.blue100}
                transform='translate(0 , 10)'
               />

               <AnimatedPath 
                animatedProps={secondWaveProps}
                fill={theme.colors.blue70}
                transform='translate(0 , 15)'
               /> 

             </AnimatedSvg>

            <Footer>
              
            <Btn onPress={handleClick}>
                <Svg width={120} height={120}>
                  <Circle 
                     cx= '60'
                     cy= '60'
                     r= '40'
                     fill= {theme.colors.blue100}
                     strokeWidth= '15'
                     stroke= {theme.colors.blue90}
                     strokeOpacity= '0.5'
                  />
                 
                 </Svg>

                    
                      <Fontisto 
                        name="blood-drop"
                        size={32}
                        color={theme.colors.blue90}
                        style={styles.icon}
                      />
                          
                </Btn> 

              <Btn onPress={handleClick}>
                <Svg width={120} height={120}>
                  <Circle 
                     cx= '60'
                     cy= '60'
                     r= '40'
                     fill= {theme.colors.blue100}
                     strokeWidth= '15'
                     stroke= {theme.colors.blue90}
                     strokeOpacity= '0.5'
                  />
                 
                 </Svg>

                    
                      <Fontisto 
                        name="blood-drop"
                        size={32}
                        color={theme.colors.blue90}
                        style={styles.icon}
                      />
                          
                </Btn> 

                <Btn onPress={StopAudio}>
                <Svg width={120} height={120}>
                  <Circle 
                     cx= '60'
                     cy= '60'
                     r= '40'
                     fill= {theme.colors.blue100}
                     strokeWidth= '15'
                     stroke= {theme.colors.blue90}
                     strokeOpacity= '0.5'
                  />
                 
                 </Svg>

                    
                      <Fontisto 
                        name="blood-drop"
                        size={32}
                        color={theme.colors.blue90}
                        style={styles.icon}
                      />
                          
                </Btn> 
            </Footer>

    </Container>

  );
}

const styles = StyleSheet.create({
  icon: {
    position: 'absolute',
    left: 50,
    top: 43
  },
})