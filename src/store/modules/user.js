//和用户相关的状态管理

import { createSlice } from "@reduxjs/toolkit";
import { request } from "@/utils/index";
import { setToken as _setToken, getToken, removeToken } from "@/utils";

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

const fetchLogin = (LoginForm) => {
  return async (dispath) => {
    //1.发送异步请求
    const res = await request.post("/authorizations", LoginForm);
    //2.提交同步action进行token存入
    dispath(setToken(res.data.token));
  };
};

//获取用户信息
const fetchUserInfo = () => {
  return async (dispath) => {
    const res = await request.get("/user/profile");
    dispath(setUserInfo(res.data));
  };
};

export { fetchLogin, fetchUserInfo, clearUserInfo };

export default userReducer;
