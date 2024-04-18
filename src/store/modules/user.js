//和用户相关的状态管理

import { createSlice } from "@reduxjs/toolkit";
import { request } from "@/utils/index";
import { setToken as _setToken, getToken, removeToken } from "@/utils";
import { loginAPI, getProfileAPI } from "@/apis/user";

const userStore = createSlice({
  name: "user",
  //数据状态
  initialState: {
    token: getToken() || "",
    userInfo: {},
  },
  //同步的修改方法
  reducers: {
    setToken(state, action) {
      state.token = action.payload;
      //存入本地存储localStorage
      _setToken(action.payload);
    },
    setUserInfo(state, action) {
      state.userInfo = action.payload;
    },
    //清空token和用户信息
    clearUserInfo(state) {
      state.token = "";
      state.userInfo = {};
      //清空本地存储
      removeToken();
    },
  },
});

//解构出actionCreater

const { setToken, setUserInfo, clearUserInfo } = userStore.actions;

//获取reducer函数

const userReducer = userStore.reducer;

//异步方法 完成登录获取token

const fetchLogin = (loginForm) => {
  return async (dispatch) => {
    const res = await loginAPI(loginForm);
    console.log(res.data);
    dispatch(setToken(res.data.token));
  };
};

//获取用户信息
const fetchUserInfo = () => {
  return async (dispath) => {
    const res = await getProfileAPI();
    dispath(setUserInfo(res.data));
  };
};

export { fetchLogin, fetchUserInfo, clearUserInfo };

export default userReducer;
