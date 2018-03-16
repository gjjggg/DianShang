/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';

import {
    Scene,
    Router,
    Actions,
    Reducer,
    ActionConst,
    Overlay,
    Tabs,
    Modal,
    Drawer,
    Stack,
    Lightbox,
} from 'react-native-router-flux'

import Home from './app/Home/Home'

import FeiLei from './app/FenLei/FeiLei'
import Car from './app/Car/Car'
import Main from './app/Main/Main'

// const  reducerCreate = params =>{
//   const  defaultReducer = new Reducer(params);
//   return (state,action) => {
//     return defaultReducer(state,action);
//   };
// };
const  getScrneStyle =()=>({
    backgroundColor:'#ff7000'
})
// const getScrneStyle =()=>({
//
// });

const router = (...props)=>(
    <Router getSceneStyle={getScrneStyle}>
        <Modal  hideNavBar>
            <Scene hideNavBar key="root">
                <Tabs
                    key="tabbar"        // 唯一标识
                    wrap={true}         // 自动使用自己的导航栏包装每个场景
                    lazy={true}         // 是否默认渲染tabbar
                    tabBarPosition={'bottom'}       // tabbar在顶部还是底部，iOS默认顶部，安卓默认顶部

                >
                    <Stack key="Test1"
                           title={'首页'}
                    >
                        <Scene component={Home} key="Test1_key" title="shouye" />
                    </Stack>
                    <Stack key="Test2"
                           title={'分类'}
                    >
                        <Scene component={FeiLei} key="Test2_key" title="fenlei" />
                    </Stack>
                    <Stack key="Test3"
                           title={'购物车'}
                    >
                        <Scene component={Car} key="Test3_key" title="car" />
                    </Stack>
                    <Stack key="Test4"
                           title={'我的'}
                    >
                        <Scene component={Main} key="Test4_key" title="main" />
                    </Stack>
                </Tabs>
            </Scene>
            <Scene hideNavBar key="Login">
                <Scene
                    title='登录'
                    key="LoginModal"
                    component={Car}
                    gesturesEnabled={false}
                    hideNavBar

                />
            </Scene>
        </Modal>
    </Router>
)

export default  router;
const styles = StyleSheet.create({
    tabBarStyle: {
        backgroundColor: '#eee',
        height:49,
    },
});