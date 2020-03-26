import React from 'react';
import {View, Text} from 'react-native';

function Spacer ({...props}) {
    const customMargin = {
        marginTop: props.marginTop || 0,
        marginBottom: props.marginBottom || 0,
        marginRight: props.marginRight || 0,
        marginLeft: props.marginLeft || 0,
    }
    return (
        <View style={customMargin}></View>
    );
}

export default Spacer;