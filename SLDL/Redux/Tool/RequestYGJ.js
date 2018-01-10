/**
 * Created by Rabbit on 2017/4/21.
 */
'use strict';
import RNFetchBlob from 'react-native-fetch-blob';

import {
    AsyncStorage
} from 'react-native';

// 处理url
const encodeQuery = (url,  params = {}) => {
    let _url = url;
    if (!params || !Object.keys(params).length) {
        return _url
    };

    _url = _url.indexOf("?") === -1 ? `${_url}?` : `${_url}&`;

    const query = Object.keys(params)
        .map(key => `${key}=${params[key]}`)
        .join("&");

    return `${_url}${query}`;
};

// 处理错误请求
const throwError = (json) => {
    const error = new Error(json)
    error.msg = json.msg;
    error.status = json.status;
    throw error;
};


const checkStatus = (resp, json) => {
    // console.log(resp, json);
    if (resp.respInfo.status === 200 && json.status === 0){
        return json;
    }else{
        throwError(json);
    };
    return json;
};

const Request = {
    // 框架可以用过cancel 取消某个网络请求
    /**
     * 设置Header请求头
     */
    header:{
        // 'Accept': 'application/json',
        // 'Content-Type': 'application/json',
    },
    /**
     * Config参数
     */
    config:{
        // 指示器,iOS专属
        // indicator:true,
        // 超时
        // timeout:3000
        // 缓存
        // fileCache : bool,
        // 缓存地址
        // path : string,
        // appendExt : string,
        // session : string,
        // addAndroidDownloads : any,
    },

    /**
     *
     * @param method            请求方式GET, POST, PUT, DELETE
     * @param url               请求网址
     * @param params            请求参数
     * @param config            网络配置文件
     * @param header            请求头
     * @returns {Promise.<TResult>}
     *
     */
    fetch: async( { method, url, params = {}, config = {}, header = {} } ) => {
        let _method;
        let _params;
        let _url = url;
        let _config = { indicator:true, timeout:3000,  ...config};;
        let _header = { 'Content-Type': 'application/json', ...header };;

        // let userData = await AsyncStorage.getItem('USER_TOKEN');

        if (!method) _method = 'GET';
        else _method  = method.toUpperCase();

        if (_method === 'GET' && params) {
            _url = encodeQuery(url, params);
        }

        if (_method === 'POST' && params) {
            _params =  JSON.stringify(params);
        }

        if (__DEV__){
            console.log('_url:', _url);
            console.log('_config:', _config);
            console.log('_method:', _method);
            console.log('_header:', _header);
        }

        return RNFetchBlob
            .config(_config)
            .fetch(_method ,_url, _header, _params)
            .then(resp => {
                return checkStatus(resp, resp.json());
            })
            .then((response)=>{
                return response;
            })
            .catch((error)=>{
                throw error
            })
    },

    /**
     *
     * @param url       请求网址
     * @param params    参数
     * @param header    请求头
     * @param config    fetchblob配置
     * @returns
     *
     */
    get:( url, params = {}, header = {}, config = {} ) => {

        return RTRequest.fetch({method:'get', url, params, header, config })
            .then((data)=>{
                // console.log(data);
                return data;
            })
            .catch((error)=>{
                // console.log(error.msg);
                throw error;
            })
    },

    post:( url, params = {}, header = {}, config = {} ) => {

        return RTRequest.fetch({method:'post', url, params, header, config })
            .then((data)=>{
                // console.log(data);
                return data;
            })
            .catch((error)=>{
                // console.log(error.msg);
                throw error;
            })
    },

    /**
     * @param url               请求网址
     * @param body              要上传的信息,会自动转码
     * @param uploadProgress    上传进度
     * @param successCallBack   返回正确的值
     * @param failCallBack      返回错误的值
     * @returns
     *
     */
    upload:(url,body,uploadProgress,successCallBack,failCallBack) => {
        return RNFetchBlob
            .config(Request.config)
            .fetch('POST',url,{
                'Content-Type' : 'multipart/form-data',
            },body)
            .uploadProgress((written, total) => {
                // 搜索进度打印
                // console.log('搜索进度:'+written / total);
            })
            .progress((received, total) => {
                let perent = received / total;
                // console.log('上传进度:' + perent);
                uploadProgress(perent);
            })
            .then((response)=>{
                if (response.respInfo.status === 200){
                    return response.json();
                }else {
                    return failCallBack(response);
                }
            })
            .then((response)=> {
                // console.log(response);
                successCallBack(response);
            })
            .catch((error)=>{
                failCallBack(error);
            });
    }
};

export default Request;
