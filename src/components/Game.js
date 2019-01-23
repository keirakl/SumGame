import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import RandomNumber from './RandomNumber';
import { hidden } from 'ansi-colors';

class Game extends React.Component {
    static propTypes = {
        randomNumberCount: PropTypes.number.isRequired,
    };
    
    state = {
        selectedIds: [], //keeps track of the numbers have been pressed
    };

    randomNumbers = Array
                    .from({ length: this.props.randomNumberCount }) //creates an array with a length of random number count
                    .map( () => Math.floor(Math.random()*10) + 1 ) //random numbers start from 2 to 10
    
    target = this.randomNumbers
            .slice(0, this.props.randomNumberCount - 2) //gives an array of the first 4 numbers (when the random number count is 6)
            .reduce((acc, curr) => acc + curr, 0); //The initial value is 0, in case of an empty array and the function doesnt work
    
    isNumberSelected = (numberIndex) => {
        return this.state.selectedIds.indexOf(numberIndex) >= 0; //return True or False depending if the number is selected or not
        //if the number isnt part of the selected array, this number is gonna be -1
    };

    //modify the state and push the selected numbers to the array
    selectNumber = (numberIndex) => {
        this.setState((prevState) => ({
            selectedIds: [...prevState.selectedIds, numberIndex]
            //JXS obj Spread property: copy the existing array, and add the numberIndex
        }));
    };

    //game status: PLAYING, WON, LOST
    //function to compute the game status at any point
    gameStatus = () => {
        const sumSelected = this.state.selectedIds.reduce((acc, curr) => {
            return acc + this.randomNumbers[curr];
        }, 0);
        //determine the game status depending on sumSelected
        if (sumSelected < this.target){
            return 'PLAYING';
        }
        if (sumSelected === this.target){
            return 'WON';
        }
        return 'LOST';
    }
    
    render() {
        const gameStatus = this.gameStatus();
        return(
            <View style = { styles.container } >
                                                {/* dynamically pick a style based on the game status */}
                <Text style = { [styles.target, styles[`STATUS_${gameStatus}`]] }> 
                    {this.target} 
                </Text>
                <View style = { styles.numbersContainer }>
                    {this.randomNumbers.map( (randomNumber, index) => 
                        <RandomNumber 
                            key={ index }
                            id = { index } //represents the index that can be passed to RandomNumber.js
                            number={ randomNumber } 
                            isDisabled = { this.isNumberSelected(index) /*|| gameStatus !== 'PLAYING'*/}
                            onPress = {this.selectNumber}
                        />
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
        overflow: 'hidden',
    },
    numbersContainer: {
        justifyContent: 'space-around',
        flexDirection: 'row',
        flex: 1,
        flexWrap:'wrap',
    },
    // STATUS_PLAYING: {
    //     backgroundColor: '#bbb',
    // },
    STATUS_WON: {
        backgroundColor: 'green',
        color: 'white',
    },
    STATUS_LOST: {
        backgroundColor: 'red',
        color: 'white',
    }
})

export default Game;