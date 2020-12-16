<template>
  <div class="editor">
    <div ref="editor"></div>
    <br />
    <el-button type="primary" @click="getContent">查看内容</el-button>
  </div>
</template>

<script>
import Editor from 'wangeditor';
export default {
  data() {
    return {
      editor: null,
      editorContent: ''
    };
  },
  methods: {
    initEditorConfig() {
      // 自定义菜单
      this.editor.customConfig.menus = [
        'head', // 标题
        'bold', // 粗体
        'fontSize', // 字号
        'fontName', // 字体
        'italic', // 斜体
        'underline', // 下划线
        'strikeThrough', // 删除线
        'foreColor', // 文字颜色
        'backColor', // 背景颜色
        'link', // 插入链接
        'list', // 列表
        'justify', // 对齐方式
        'quote', // 引用
        'emoticon', // 表情
        'image', // 插入图片
        'table', // 表格
        'video', // 插入视频
        'code', // 插入代码
        'undo', // 撤销
        'redo' // 重复
      ];

      // 配置 debug 模式，有 JS 错误会以throw Error方式提示出来。
      this.editor.customConfig.debug = true;

      // 用户操作（鼠标点击、键盘打字等）导致的内容变化之后，会自动触发onchange函数执行
      this.editor.customConfig.onchange = html => {
        this.editorContent = html;
      };
      // 自定义 onchange 触发的延迟时间，单位 ms，默认为 200 ms
      // this.editor.customConfig.onchangeTimeout = 60000

      // 编辑区域的z-index默认为10000
      // editor.customConfig.zIndex = 100

      // 通过lang配置项配置多语言
      // this.editor.customConfig.lang = {}

      // 关闭粘贴样式的过滤
      // this.editor.customConfig.pasteFilterStyle = false
      // 忽略粘贴内容中的图片
      // this.editor.customConfig.pasteIgnoreImg = true
      // 自定义处理粘贴的文本内容
      // this.editor.customConfig.pasteTextHandle = function (content) {
      //     // content 即粘贴过来的内容（html 或 纯文本），可进行自定义处理然后返回
      //     return content + '<p>在粘贴内容后面追加一行</p>'
      // }

      // 插入网络图片时，可通过如下配置获取到图片的信息
      // this.editor.customConfig.linkImgCallback = function (url) {
      //     console.log(url) // url 即插入图片的地址
      // }

      // 插入链接时，可通过如下配置对文字和链接进行校验
      // this.editor.customConfig.linkCheck = function (text, link) {
      //     console.log(text) // 插入的文字
      //     console.log(link) // 插入的链接
      //     return true // 返回 true 表示校验成功
      //     // return '验证失败' // 返回字符串，即校验失败的提示信息
      // }

      // 插入网络图片时，可对图片地址做自定义校验
      // this.editor.customConfig.linkImgCheck = function (src) {
      //     console.log(src) // 图片的链接
      //     return true // 返回 true 表示校验成功
      //     // return '验证失败' // 返回字符串，即校验失败的提示信息
      // }

      // 用户点击富文本区域会触发onfocus函数执行
      // this.editor.customConfig.onfocus = function () {
      //     console.log("onfocus")
      // }

      // 当前有手动获取焦点的富文本并且鼠标点击富文本以外的区域，则会触发onblur函数执行。
      // this.editor.customConfig.onblur = function (html) {
      //     // html 即编辑器中的内容
      //     console.log('onblur', html)
      // }

      // 自定义配置颜色（字体颜色、背景色）
      // this.editor.customConfig.colors = [
      //     '#000000',
      //     '#eeece0',
      //     '#1c487f',
      //     '#4d80bf',
      //     '#c24f4a',
      //     '#8baa4a',
      //     '#7b5ba1',
      //     '#46acc8',
      //     '#f9963b',
      //     '#ffffff'
      // ]

      // 自定义字体
      // editor.customConfig.fontNames = [
      //     '宋体',
      //     '微软雅黑',
      //     'Arial',
      //     'Tahoma',
      //     'Verdana'
      // ]

      // 下面两个配置，使用其中一个即可显示“上传图片”的tab。但是两者不要同时使用！！！
      this.editor.customConfig.uploadImgShowBase64 = true; // 使用 base64 保存图片
      // editor.customConfig.uploadImgServer = '/upload' // 上传图片到服务器，其中/upload是上传图片的服务器端接口
    },

    getContent: function() {
      alert(this.editorContent);
    }
  },
  mounted() {
    this.editor = new Editor(this.$refs.editor);
    this.initEditorConfig();
    this.editor.create();

    // 创建编辑器之后，然后才可以设置编辑器内容
    this.editor.txt.html('<h2>这是一款轻量级富文本编辑器</h2>'); // 设置编辑器内容
    // this.editor.txt.append('<p>追加的内容</p>')    继续追加内容。
    // this.editor.txt.clear()  清空编辑器内容
    // this.editor.txt.html()  获取html内容
    // this.editor.txt.text()  获取text内容
    // this.editor.txt.getJSON()  获取json格式的内容
  }
};
</script>

<style scoped>
.editor {
  padding: 20px;
}
</style>
