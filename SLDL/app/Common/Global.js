/**
 * Created by guohongan on 2018/1/17.
 */
import React,{ Component }from 'react';
//项目中的图片可以通过Images.xx获取
import { ImageTool } from '../Resources/ImageIndex';

//统一管理项目中的路由
import {Actions} from 'react-native-router-flux';


//图片加载
global.Images = ImageTool;
global.Actions = Actions;