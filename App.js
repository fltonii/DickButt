import React from 'react';
import { 
  StyleSheet, 
  View, 
  Image, 
  ImageBackground,
  Dimensions, 
  Animated, 
  TouchableWithoutFeedback,
} from 'react-native';
import MainButton from './App/UI/MainButton';
import DickButt from './Images/Dick_Butt.png';
import backgroundImage from './Images/Background.jpg';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      touched: false,
      fadeValue: new Animated.Value(0),
    }
  }

  handleTouch() {
    this.setState({touched: true}, ()=> {
      Animated.timing(this.state.fadeValue, {
        toValue: 1,
        duration: 3000,
        useNativeDriver: true,
      }).start();
    });
  }

  handleClose(){
    this.setState({touched: false});
  }

  render() {
    const button = (
      <View>
        <MainButton 
          label={'Animate'}
          style={styles.button}
          handleTouch={() => this.handleTouch()}
        />
      </View>
    );
    const mainImage = (
      <Animated.View style={{ 
        opacity: this.state.fadeValue,
        transform: [{ scale: this.state.fadeValue,}]
        }}> 
        
          <Image 
            source={DickButt}
            style={styles.image}
          />
       
      </Animated.View>      
    );
    const background = (
      <ImageBackground source={backgroundImage} style={styles.backgroundImage} imageStyle={{resizeMode: 'stretch'}}>
        <TouchableWithoutFeedback onPress={() =>this.setState({ touched: false})}>
          <View style={styles.imageContainer}>   
            {mainImage}
          </View>
        </TouchableWithoutFeedback>
      </ImageBackground>
    );

    
    return(
      <View style={styles.container} >
        { !this.state.touched ? button : background }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#38de32',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: '#fbfbfb',
    width: '40%',
    height: '36%',
  },
  image: {
    zIndex: 10, 
    height: 300,
    resizeMode: 'center',
  },
  backgroundImage: {
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width, 
  },
  imageContainer: {
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width, 
    alignItems: 'center',
    justifyContent: 'center',
  },
});
