import React from 'react';
import { View, Text, ActivityIndicator, Image } from 'react-native';

import styles from './styles'

export default class Splash extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.wrapper}>
                    <Image style={styles.image} source={{uri: "https://www.pngitem.com/pimgs/m/144-1449712_transparent-bike-wheel-clipart-cycling-vocabulary-in-english.png"}}/>
                    <Text style={styles.title}>Bicycle Tracking App</Text>
                </View>
                <View style={styles.activityIndicatorContainer}>
                    <ActivityIndicator animating={true}/>
                </View>
            </View>
        );
    }
}