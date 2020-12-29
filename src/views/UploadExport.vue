<template>
  <div class="upload-export">
    <div class="export">
      <el-button @click="exportExcel()" size="mini">导出excel</el-button>
      <el-table :data="tabData" style="width: 100%" height="300px">
        <el-table-column prop="姓名" label="姓名" align="center"></el-table-column>
        <el-table-column prop="年龄" label="年龄" align="center"></el-table-column>
        <el-table-column prop="性别" label="性别" align="center"></el-table-column>
      </el-table>
    </div>

    <div class="upload">
      <el-upload
        ref="upload"
        accept=".xls,.xlsx"
        action="/"
        :on-change="importExcel"
        :show-file-list="false"
        :auto-upload="false"
      >
        <el-button slot="trigger" size="mini">导入excel</el-button>
      </el-upload>

      <!-- 导入的excel表格和展示的表头名el-table的prop对应 -->
      <el-table :data="tabData2" style="width: 100%" height="300px">
        <el-table-column prop="姓名" label="姓名" align="center"></el-table-column>
        <el-table-column prop="年龄" label="年龄" align="center"></el-table-column>
        <el-table-column prop="性别" label="性别" align="center"></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import XLSX from 'xlsx';

export default {
  data() {
    return {
      tabData: [
        {
          姓名: '张三',
          性别: '男',
          年龄: 25
        },
        {
          姓名: '张三',
          性别: '男',
          年龄: 25
        },
        {
          姓名: '张三',
          性别: '男',
          年龄: 25
        },
        {
          姓名: '张三',
          性别: '男',
          年龄: 25
        }
      ],
      tabData2: []
    };
  },

  methods: {
    excel2blob(excel) {
      // 生成excel的配置项
      const options = {
        // 要生成的文件类型
        bookType: 'xlsx',
        // // 是否生成Shared String Table，官方解释是，如果开启生成速度会下降，但在低版本IOS设备上有更好的兼容性
        bookSST: false,
        type: 'binary'
      };
      const strData = XLSX.write(excel, options);

      // 将字符串转ArrayBuffer
      function s2ab(s) {
        const buf = new ArrayBuffer(s.length);
        const view = new Uint8Array(buf);
        for (let i = 0; i !== s.length; ++i) view[i] = s.charCodeAt(i) & 0xff;
        return buf;
      }

      const buf = s2ab(strData);
      const blob = new Blob([buf], {
        type: 'application/octet-stream'
      });
      return blob;
    },

    exportExcel() {
      let sheet1data = this.tabData.slice(0, 4);
      let sheet2data = this.tabData.slice(0, 2);
      let sheet3data = this.tabData.slice(0, 1);
      var sheet1 = XLSX.utils.json_to_sheet(sheet1data);
      var sheet2 = XLSX.utils.json_to_sheet(sheet2data);
      var sheet3 = XLSX.utils.json_to_sheet(sheet3data);

      // 创建一个新的空的excel文件
      var excel = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(excel, sheet1, 'sheet1');
      XLSX.utils.book_append_sheet(excel, sheet2, 'sheet2');
      XLSX.utils.book_append_sheet(excel, sheet3, 'sheet3');

      const excelBlob = this.excel2blob(excel);
      const url = URL.createObjectURL(excelBlob); // 创建blob地址

      const aLink = document.createElement('a');
      aLink.href = url;
      aLink.download = '张三.xlsx'; // 指定保存文件名
      aLink.click();
    },

    importExcel(fileData) {
      // 取到File
      const file = fileData.raw;

      if (!/\.(xls|xlsx)$/.test(file.name.toLowerCase())) {
        this.$message.error('上传格式不正确，请上传xls或者xlsx格式');
        return false;
      }

      const fileReader = new FileReader();
      fileReader.onload = ev => {
        try {
          const data = ev.target.result;
          const excel = XLSX.read(data, {
            type: 'binary'
          });
          const sheetName = excel.SheetNames[0]; // 取第一张表的名字
          const json = XLSX.utils.sheet_to_json(excel.Sheets[sheetName]); // 根据表格内容生成json
          this.tabData2 = json;

          // 重写数据
          this.$refs.upload.value = '';
        } catch (e) {
          return false;
        }
      };

      fileReader.readAsBinaryString(file);
    }
  }
};
</script>

<style lang="scss" scoped>
.upload-export {
  .export {
    margin-bottom: 30px;
  }
}
</style>
