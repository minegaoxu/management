<template>
  <div id="box">
    <div class="top_div">
      <p>添加商品</p>
    </div>
    <div class="smail">
      <p>商品名称</p>
      <el-input v-model="namestr" placeholder="请输入内容" clearable></el-input>
    </div>
    <div class="smail">
      <p>商品分类</p>
      <el-select v-model="value" placeholder="请选择分类">
        <el-option v-for="item in options" :key="item.value" :value="item.cateName"></el-option>
      </el-select>
    </div>
    <div class="smail">
      <p>商品价格</p>
      <el-input-number v-model="num" :min="1" :max="10" label="描述文字"></el-input-number>
    </div>

    <div class="smail">
      <p>添加图片</p>

      <!-- 上传图片 -->
      <el-upload
        class="avatar-uploader"
        :action="Img_Updata"
        :on-success="handleAvatarSuccess"
        :show-file-list="false"
      >
        <i v-show="!ingUrl" class="el-icon-plus"></i>
        <img class="avatar" v-show="ingUrl" :src="Img_Getdata + ingUrl" />
      </el-upload>
    </div>
    <div class="smail">
      <p>商品描述</p>
      <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="textarea"></el-input>
    </div>
    <el-button type="primary" size="small" @click="upBtn">添加商品</el-button>
  </div>
</template>

<script>
import { categories, add, Img_Updata, Img_Getdata } from "@/api/apis";
export default {
  data() {
    return {
      options: [],
      value: "", //分类
      num: "", //价格
      ingUrl: "", //图片地址
      textarea: "", //描述
      namestr: "", //名称
      // 图片上传地址
      Img_Updata: "",
      Img_Getdata,
    };
  },
  methods: {
    // 上传图片
    handleAvatarSuccess(res) {
      if (res.code == 0) {
        this.ingUrl = res.imgUrl;
      }
    },
    // 调用添加商品接口
    upBtn() {
      // console.log(this.textarea);
      add(this.namestr, this.value, this.num, this.ingUrl, this.textarea).then(
        (res) => {
          if (res.data.code == 0) {
            this.$message({
              message: "恭喜你，添加商品成功",
              type: "success",
            });
          }
        }
      );
    },
  },
  created() {
    this.Img_Updata = Img_Updata;
    this.Img_Getdata = Img_Getdata;
    // 渲染分类列表
    categories().then((res) => {
      this.options = res.data.categories;
    });
  },
};
</script>

<style lang="less" scoped>
#box {
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  padding-bottom: 10px;
  background-color: #fff;
  .top_div {
    display: flex;
    justify-content: space-between;
    padding: 10px;
    border-bottom: 1px solid #ccc;
    p {
      line-height: 30px;
    }
  }
  .smail {
    p {
      padding: 0px 20px;
      width: 100px;
      line-height: 30px;
    }
    display: flex;
    width: 400px;
    margin: 20px 0px;
    .el-image[data-v-1b26e4da] {
      width: 100px;
      height: 100px;
      border-radius: 8px;
    }
  }
  .el-button {
    margin-left: 140px;
  }
}
</style>