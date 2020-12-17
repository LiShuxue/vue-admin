<template>
  <div>
    <div ref="editor" class="editor"></div>

    <el-button type="primary" @click="getContent" size="mini">查看内容</el-button>
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
      this.editor.config.menus = [
        'head', // 标题
        'bold', // 粗体
        'fontSize', // 字号
        'fontName', // 字体
        'italic', // 斜体
        'underline', // 下划线
        'strikeThrough', // 删除线
        'indent', // 缩进
        'lineHeight', // 行高
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
        'splitLine', // 插入分割线
        'undo', // 撤销
        'redo' // 重复
      ];

      // 默认10000
      this.editor.config.zIndex = 500;

      // 用户操作（鼠标点击、键盘打字等）导致的内容变化之后，会自动触发onchange函数执行
      this.editor.config.onchange = html => {
        this.editorContent = html;
      };
      // 自定义 onchange 触发的延迟时间，单位 ms，默认为 200 ms
      this.editor.config.onchangeTimeout = 500;

      // 自定义配置颜色（字体颜色、背景色）
      // this.editor.config.colors = [
      //   '#000000',
      //   '#eeece0',
      //   '#1c487f',
      //   '#4d80bf',
      //   '#c24f4a',
      //   '#8baa4a',
      //   '#7b5ba1',
      //   '#46acc8',
      //   '#f9963b',
      //   '#ffffff'
      // ];

      // 自定义字体
      // this.editor.config.fontNames = [
      //   '黑体',
      //   '仿宋',
      //   '楷体',
      //   '标楷体',
      //   '华文仿宋',
      //   '华文楷体',
      //   '宋体',
      //   '微软雅黑',
      //   'Arial',
      //   'Tahoma',
      //   'Verdana',
      //   'Times New Roman',
      //   'Courier New'
      // ];
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
    // this.editor.txt.append('<p>追加的内容</p>'); // 继续追加内容。
    // this.editor.txt.clear(); // 清空编辑器内容
    // this.editor.txt.html(); // 获取html内容
    // this.editor.txt.text(); // 获取text内容
    // this.editor.txt.getJSON(); //获取json格式的内容
  }
};
</script>

<style lang="scss" scoped>
.editor {
  margin-bottom: 30px;
}
</style>
