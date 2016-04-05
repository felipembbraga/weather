import React, {AppRegistry, Component, Text, View, StyleSheet} from 'react-native';
import MapView from 'react-native-maps';
var Api = require('./src/api');

class Weather extends Component {

    constructor(props) {
        super(props);
        this.state = {
            region: {
              latitude: 0,
              longitude: 0,
              latitudeDelta: 50,
              longitudeDelta: 50
            },
            marker: {
                latitude: 37,
                longitude: -95
            },
            city: '',
            temperature: '',
            description: ''
        };
    }

    componentDidMount() {
        navigator.geolocation.getCurrentPosition((position) => {
          this.setState(
            {
              region: {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                latitudeDelta: 50,
                longitudeDelta: 50
              }
            }
          );
        });
    }

    render() {

        return (
            <View style={styles.container}>
                <View style={styles.mapWrapper}>
                    <MapView initialRegion={this.state.region} style={styles.map} onRegionChangeComplete={this.onRegionChangeComplete.bind(this)}>
                        <MapView.Marker coordinate={this.state.marker} title={this.state.city} description={this.state.description}/>
                    </MapView>
                </View>
                <View style={styles.textWrapper}>
                    <Text style={styles.text}>{this.state.city}</Text>
                    <Text style={styles.text}>{this.state.temperature}</Text>
                    <Text style={styles.text}>{this.state.description}</Text>
                </View>
            </View>
        )
    }

    onRegionChangeComplete(region) {
        this.setState({
            marker: {
                longitude: region.longitude,
                latitude: region.latitude
            }
        });

        Api(region.latitude, region.longitude).then((data) => {
            this.setState(data);
        });
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'stretch',
        backgroundColor: '#F5FCFF'
    },
    mapWrapper: {
        flex: 2
    },
    textWrapper: {
        flex: 1,
        alignItems: 'center'
    },
    text: {
        fontSize: 30
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
