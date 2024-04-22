import {
  Card,
  Breadcrumb,
  Form,
  Button,
  Radio,
  Input,
  Upload,
  Space,
  Select,
  message,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { Link, useSearchParams } from "react-router-dom";
import "./index.scss";
import { createAricleAPI, getArticleByIdAPI } from "@/apis/article";

// 引入富文本编辑器
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useEffect, useState } from "react";
import { useChannel } from "@/hooks/useChannel"; //频道列表

const { Option } = Select;

const Publish = () => {
  //获取频道列表
  const { channelList } = useChannel();

  //提交表单
  const onfinish = (formValue) => {
    //校验封面类型imageType是否和实际的图片列表imageList长度一致
    if (imageList.length !== imageType) {
      return message.warning("封面类型和图片数量不匹配");
    }

    //收集表单数据
    const { title, content, channel_id } = formValue;
    //1.按照接口文档的格式处理收集到的表单数据
    const reqData = {
      title,
      content,
      channel_id,
      cover: {
        type: imageType, //封面Type 0-无图 1-1张图 3-3张图
        images: imageList.map((item) => item.response.data.url), //图片地址数组
      },
    };

    //调用接口提交
    createAricleAPI(reqData);
  };

  //上传回调
  const [imageList, setImageList] = useState([]);
  const onChange = (value) => {
    setImageList(value.fileList);
  };

  //切换封面类型
  const [imageType, setimageType] = useState(0);
  const onTypeChange = (e) => {
    setimageType(e.target.value);
  };

  //编辑页回填数据
  const [searchParams] = useSearchParams();
  const articleId = searchParams.get("id");
  //获取实例
  const [form] = Form.useForm();
  useEffect(() => {
    //通过id获取数据
    async function getArticleDetail() {
      const res = await getArticleByIdAPI(articleId);
      const data = res.data;
      const { cover } = data;
      form.setFieldsValue({
        ...data,
        type: cover.type, //封面类型回填
      });

      //根据封面类型回填图片
      setimageType(cover.type);

      //显示图片 {url:url}
      setImageList(cover.images.map((url) => ({ url })));
    }
    getArticleDetail();

    //2调用实例方法 完成回填
  }, [articleId, form]);

  return (
    <div className="publish">
      <Card
        title={
          <Breadcrumb
            items={[
              { title: <Link to={"/"}>首页</Link> },
              { title: "发布文章" },
            ]}
          />
        }
      >
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ type: 0 }}
          onFinish={onfinish}
          form={form}
        >
          <Form.Item
            label="标题"
            name="title"
            rules={[{ required: true, message: "请输入文章标题" }]}
          >
            <Input placeholder="请输入文章标题" style={{ width: 400 }} />
          </Form.Item>
          <Form.Item
            label="频道"
            name="channel_id"
            rules={[{ required: true, message: "请选择文章频道" }]}
          >
            <Select placeholder="请选择文章频道" style={{ width: 400 }}>
              {channelList.map((item) => (
                <Option key={item.id} value={item.id}>
                  {item.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item label="封面">
            <Form.Item name="type">
              <Radio.Group onChange={onTypeChange}>
                <Radio value={1}>单图</Radio>
                <Radio value={3}>三图</Radio>
                <Radio value={0}>无图</Radio>
              </Radio.Group>
            </Form.Item>
            {/* listType：决定选择文件框的外观样式
              showUploadList：决定是否展示上传列表
            */}
            {imageType > 0 && (
              <Upload
                name="image"
                listType="picture-card"
                showUploadList
                action={"http://geek.itheima.net/v1_0/upload"}
                onChange={onChange}
                maxCount={imageType}
                fileList={imageList}
              >
                <div style={{ marginTop: 8 }}>
                  <PlusOutlined />
                </div>
              </Upload>
            )}
          </Form.Item>

          <Form.Item
            label="内容"
            name="content"
            rules={[{ required: true, message: "请输入文章内容" }]}
          >
            {/* 富文本编辑器 */}
            <ReactQuill
              className="publish-quill"
              theme="snow"
              placeholder="请输入文章内容"
            />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 4 }}>
            <Space>
              <Button size="large" type="primary" htmlType="submit">
                发布文章
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Publish;
