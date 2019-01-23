import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

class RandomNumber extends React.Component {
    static propTypes = {
        number: PropTypes.number.isRequired
    }
    handlePress = () => {
        console.log(this.props.number);
    };
    
    render() {
        return(
            <TouchableOpacity onPress={ this.handlePress }>
                <Text style = { styles.number } > {this.props.number} </Text>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    number: {
        fontSize: 25,
        textAlign: 'center',
        paddingVertical: 10,
        marginVertical: 25,
        marginHorizontal: 20,
        width: 100,
        borderWidth: 1,
        borderRadius: 15
    }
});

export default RandomNumber;