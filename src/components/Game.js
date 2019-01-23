import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import RandomNumber from './RandomNumber';

class Game extends React.Component {
    static propTypes = {
        randomNumberCount: PropTypes.number.isRequired,
    };
    randomNumbers = Array
                    .from({ length: this.props.randomNumberCount }) //creates an array with a length of random number count
                    .map( () => Math.floor(Math.random()*10) + 1 ) //random numbers start from 2 to 10
    target = this.randomNumbers
            .slice(0, this.props.randomNumberCount - 2) //gives an array of the first 4 numbers (when the random number count is 6)
            .reduce((acc, curr) => acc + curr, 0); //The initial value is 0, in case of an empty array and the function doesnt work
    render(){
        return(
            <View style = { styles.container } >
                <Text style = { styles.target }>{this.target}</Text>
                <View style = { styles.numbersContainer }>
                    {this.randomNumbers.map( (randomNumber, index) => 
                        <RandomNumber key={ index } number={ randomNumber } />
                        )}
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ddd',
        flex: 1
    },
    target: {
        fontSize: 40,
        margin: 30,
        marginHorizontal: 50,
        paddingVertical: 10,
        textAlign: 'center',
        borderWidth: 3,
        borderRadius: 15,
    },
    numbersContainer: {
        justifyContent: 'space-around',
        flexDirection: 'row',
        flex: 1,
        flexWrap:'wrap',
    }
})

export default Game;