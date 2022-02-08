import React from 'react';
import { View , StyleSheet, Text } from 'react-native';
import {theme} from '../../styles/theme';

export default function Header({percentage}) {
 return (
   <View style={styles.header}>
       <Text style={styles.percentage}>
           {percentage}%
       </Text>
      
   </View>
  );
}

const styles = StyleSheet.create({

    header:{
        position: 'absolute',
        zIndex: 1,
        top: 100,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 30
    },

    percentage:{
        fontSize: 112,
        color: theme.colors.blue100,
        marginTop: 50,
       
    }
})