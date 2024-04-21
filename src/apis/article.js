//封装和文章相关的接口数据
import { request } from "@/utils";

//1.获取频道列表
export function getChannelAPI() {
  return request({
    url: "/channels",
    method: "GET",
  });
}

//2.提交文章表单
export function createAricleAPI(formData) {
  return request({
    url: "/mp/articles?draft=false",
    method: "POST",
    data: formData,
  });
}

//获取文章列表
export function getArticleListAPI(params) {
  return request({
    url: "/mp/articles",
    method: "GET",
    params,
  });
}

//删除文章
export function delAricleAPI(id) {
  return request({
    url: `/mp/articles/${id}`,
    method: "DELETE",
  });
}
