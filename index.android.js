import React, {AppRegistry, Component, View, StyleSheet} from 'react-native';
import MapView from 'react-native-maps';

const region = {
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0,
    longitudeDelta: 0
};
class Weather extends Component {
    render() {
        return (
            <View style={styles.container}>

                <MapView style={styles.map} initialRegion={{
                    latitude: 37.78825,
                    longitude: -122.4324,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421
                }}></MapView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    map: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    }
});

AppRegistry.registerComponent('weather', () => Weather);
