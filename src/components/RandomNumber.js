import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { white, hidden } from 'ansi-colors';

class RandomNumber extends React.Component {
    static propTypes = {
        id: PropTypes.number.isRequired,
        number: PropTypes.number.isRequired,
        isDisabled: PropTypes.bool.isRequired,
        onPress: PropTypes.func.isRequired,
    }
    handlePress = () => {
        if (this.props.isDisabled) { return; } //if the number isDisabled, do nothing; otherwise, call the onPress function
        this.props.onPress(this.props.id);
    };
    
    render() {
        return(
            <TouchableOpacity onPress={ this.handlePress }>
                <Text style = { [styles.number, this.props.isDisabled && styles.selected] } > {this.props.number} </Text>
                            {/* include the style.selected only when the isSelected is true */}
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
    },
    selected: {
        backgroundColor: '#000000',
        color: '#ffffff',
        overflow: 'hidden', //ensure that the background color doesnt overflow outside of the box with borderRadius
    }
});

export default RandomNumber;