<template>
  <div class="post-topic">
    <el-container class="post-topic-container"
                  label-positon="left"
                  label-width="0px"
                  v-loading="isSending">
      <el-main>
        <el-row>
          <el-col>
            <h1 class="post-topic-title">我要发贴</h1>
          </el-col>
        </el-row>
        <el-row align="middle">
          <el-col>
            <el-form :model="ruleForm"
                     status-icon
                     :rules="rules"
                     ref="ruleForm">
              <el-form-item label="标题："
                            prop="title">
                <el-input v-model="ruleForm.title"
                          autocomplete="off"
                          type="text"
                          prefix-icon="el-icon-edit" />
              </el-form-item>
              <el-form-item label="内容："
                            prop="title">
                <el-tiptap v-model="ruleForm.content"
                           :extensions="extensions"
                           lang="zh" />
              </el-form-item>
              <el-form-item label="价格："
                            prop="price">
                <el-input v-model="ruleForm.price"
                          autocomplete="off"
                          type="text"
                          prefix-icon="el-icon-coin" />
              </el-form-item>
              <el-form-item label="交易账号："
                            prop="title">
                <el-input v-model="ruleForm.account"
                          autocomplete="off"
                          type="text"
                          prefix-icon="el-icon-coin" />
              </el-form-item>
              <el-form-item label="密码："
                            prop="title">
                <el-input v-model="ruleForm.psw"
                          autocomplete="off"
                          type="text"
                          prefix-icon="el-icon-coin" />
              </el-form-item>
              <el-form-item label="封面：">
                <el-upload class="avatar-uploader"
                           action="https://jsonplaceholder.typicode.com/posts/"
                           :show-file-list="false"
                           :http-request="addCover"
                           :before-upload="beforeAvatarUpload"
                           v-if="!ruleForm.cover">
                  <i class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
                <img v-else
                     :src="ruleForm.cover">
              </el-form-item>
              <el-form-item>
                <el-button style="width:100%;"
                           type="primary"
                           @click="post"
                           :disabled="isDisabled||isSending">
                  发布<el-icon class="el-icon--right">
                  </el-icon>
                </el-button>
                <!-- <div v-html="ruleForm.content"></div> -->
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import { uploadPicture, createPost } from '../api/api'
import { jsToFormData } from '../utils/data.js'
import {
  // 需要的 extensions
  Doc,
  Text,
  Paragraph,
  Heading,
  Bold,
  Underline,
  Italic,
  Strike,
  ListItem,
  BulletList,
  OrderedList,
  Link,
  Image,
  CodeBlock,
  Blockquote,
  TodoItem,
  TodoList,
  TextAlign,
  FontSize,
  FontType,
  Fullscreen,
  TextHighlight,
  TextColor,
  FormatClear,
  Table,
  TableHeader,
  TableCell,
  TableRow,
  History,
  TrailingNode,
  HardBreak,
  HorizontalRule,
  LineHeight,
  Indent
} from 'element-tiptap';
export default {
  name: "PostTopic",
  data () {
    var checkEmpty = (rule, value, callback) => {
      if (value == '') {
        return callback(new Error('不能为空'));
      } else {
        callback();
      }
    };
    var checkNumber = (rule, value, callback) => {
      if (value == '') {
        return callback(new Error('不能为空'));
      }
      if (isNaN(value)) {
        return callback(new Error('请输入数字'));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        title: '',
        content: '',
        price: '',
        cover: '',
        account: '',
        psw: ''
      },
      isSending: false,
      extensions: [
        new Doc(), // 必须项
        new Text(), // 必须项
        new Paragraph(), // 必须项
        new Heading({ level: 6 }), // 标题
        new Bold({ bubble: true }), // 加粗 bubble: true 在气泡菜单中渲染菜单按钮
        new Underline({ bubble: true, menubar: false }), // 下划线 bubble: true, menubar: false 在气泡菜单而不在菜单栏中渲染菜单按钮
        new Italic({ bubble: true }), // 斜体
        new Strike({ bubble: true }), // 删除线
        new ListItem(), // 使用列表必须项
        new BulletList({ bubble: true }), // 无序列表
        new OrderedList({ bubble: true }), // 有序列表
        new Link(), // 链接
        new Image({// 默认会把图片生成 base64 字符串和内容存储在一起，如果需要自定义图片上传
          uploadRequest (file) {
            // 如果接口要求 Content-Type 是 multipart/form-data，则请求体必须使用 FormData
            const fd = new FormData()
            //image是后台接口需要参数名
            fd.append('file', file)
            //走后台接口进行上传返回上传后的图片地址
            // 第1个 return 是返回 Promise 对象
            // 为什么？因为 axios 本身就是返回 Promise 对象
            return uploadPicture(fd).then(res => {
              // 这个 return 是返回最后的结果
              return res.data.data.pic_list[0]
            })
          } // 图片的上传方法，返回一个 Promise<url>
        }), // 图片
        new CodeBlock({ bubble: true }), // 代码块
        new Blockquote(), // 引用
        new TodoItem(), // 任务列表必须项
        new TodoList(), // 任务列表
        new TextAlign({ bubble: true }), // 文本对齐方式
        new FontSize({ bubble: true }), // 字号
        new FontType({ bubble: true }), // 字体
        new Fullscreen(), // 全屏
        new TextHighlight({ bubble: true }), // 文本高亮
        new TextColor({ bubble: true }), // 文本颜色
        new FormatClear({ bubble: true }), // 清除格式
        new Table({ resizable: true }), // 表格
        new TableHeader(), // 表格必须项
        new TableCell(), // 表格必须项
        new TableRow(), // 表格必须项
        new History(), // 撤销
        new TrailingNode(), // 重做
        new HardBreak(), // 分割线
        new HorizontalRule(), // 行距
        new LineHeight(), // 增加缩进
        new Indent() // 减少缩进
      ],
      rules: {
        title: [
          { validator: checkEmpty, trigger: 'blur' }
        ],
        price: [
          { validator: checkNumber, trigger: 'blur' }
        ],
      },
    }
  },
  computed: {
    // 注册按钮是否可点击
    isDisabled () {
      if (this.ruleForm.title && this.ruleForm.content && this.ruleForm.cover && this.ruleForm.price) {
        return false;
      }
      return true;
    },
  },
  methods: {
    beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    },
    addCover (val) {
      let formData = new FormData();
      formData.append('file', val.file);
      const fileReader = new FileReader();
      let that = this;
      fileReader.readAsDataURL(val.file)
      fileReader.addEventListener('load', function () {
        that.ruleForm.cover = fileReader.result;
      })
    },
    post () {
      let formData = new FormData();
      formData = jsToFormData(this.ruleForm);
      createPost(formData).then(res => {
        console.log(res)
        if (res.data.code == 200) {
          this.$message({
            message: '发贴成功,现在返回主页面',
            type: 'success'
          })
          this.$router.push({ path: '/main' })
        }
      })
    }
  },
}
</script>

<style>
.post-topic {
  background-position: center;
  height: 100%;
  width: 100%;
  background-size: cover;
  position: fixed;
  background: url('../../public/img/cover.jpg') no-repeat;
  background-size: 100% 100%;
  overflow: scroll;
}
.post-topic-container {
  border-radius: 15px;
  background-clip: padding-box;
  margin: 10px auto;
  padding: 35px 35px 15px 35px;
  width: 80vw;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 35px #cac6c6;
}
.post-topic-title {
  margin: '0px auto 40px auto';
  text-align: center;
  color: #505458;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
</style>