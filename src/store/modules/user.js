//和用户相关的状态管理

import { createSlice } from "@reduxjs/toolkit";
import { request } from "@/utils/index";

const userStore = createSlice({
  name: "user",
  //数据状态
  initialState: {
    token: "",
  },
  //同步的修改方法
  reducers: {
    setToken(state, action) {
      state.token = action.payLoad;
    },
  },
});

//解构出actionCreater

const { setToken } = userStore.actions;

//获取reducer函数

const userReducer = userStore.reducer;

//异步方法 完成登录获取token

const fetchLogin = (LoginForm) => {
  return async (dispath) => {
    //1.发送异步请求
    const res = await request.post("/authorizations", LoginForm);
    console.log(res, "ress");
    //2.提交同步action进行token存入
    dispath(setToken(res.data.token));
  };
};

export { fetchLogin, setToken };

export default userReducer;
