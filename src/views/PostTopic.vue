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
                            prop="content">
                <el-tiptap v-model="ruleForm.content"
                           :extensions="extensions"
                           lang="zh" />
              </el-form-item>
              <el-form-item label="价格："
                            prop="title">
                <el-input v-model="ruleForm.price"
                          autocomplete="off"
                          type="text"
                          prefix-icon="el-icon-coin" />
              </el-form-item>
              <el-form-item>
                <!-- <el-button style="width:100%;"
                           type="primary"
                           @click="login"
                           :disabled="isDisabled&&!isSending">
                  登录<el-icon class="el-icon--right"> -->
                <!-- </el-icon> -->
                <!-- </el-button> -->
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
      </el-main>
    </el-container>
  </div>
</template>

<script>
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
        new Image(), // 图片
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
  overflow: auto;
}
.post-topic-container {
  border-radius: 15px;
  background-clip: padding-box;
  margin: 10px auto;
  padding: 35px 35px 15px 35px;
  width: 1600px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 35px #cac6c6;
}
.post-topic-title {
  margin: '0px auto 40px auto';
  text-align: center;
  color: #505458;
}
</style>