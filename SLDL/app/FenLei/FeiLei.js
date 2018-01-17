/**
 * Created by guohongan on 2018/1/17.
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
} from 'react-native';

export default class FenLei extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <View style={styles.container}>
                {/*<Text onPress={()=>Actions.Login()}>点我跳转到登陆</Text>*/}
                <Text>
                    分类
                </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});