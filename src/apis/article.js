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
export function createAricleApi(formData) {
  return request({
    url: "/mp/articles?draft=false",
    method: "POST",
    data: formData,
  });
}
