<template>
  <div id="box">
    <div class="top_div">
      <p>店铺管理</p>
      <el-button type="primary" size="small" @click="upData">保存</el-button>
    </div>
    <div class="smail">
      <p>店铺名称</p>
      <el-input v-model="name"></el-input>
    </div>
    <div class="smail">
      <p>店铺公告</p>
      <el-input v-model="bulletin" type="textarea" :rows="5" placeholder="请输入内容"></el-input>
    </div>
    <div class="smail">
      <p>店铺头像</p>
      <el-upload
        class="avatar-uploader"
        :action="Img_Upshop"
        :show-file-list="false"
        :on-success="handleSuccess"
      >
        <img :src="avatar == '' ? '' : Img_Getshop + avatar" class="avatar" />
      </el-upload>
    </div>
    <div class="smail">
      <p>店铺图片</p>
      <!-- 照片墙 -->
      <el-upload
        :action="Img_Upshop"
        list-type="picture-card"
        :on-success="handleAvatarSuccess"
        :file-list="fileList"
        :on-remove="removeSopeImg"
      >
        <i class="el-icon-plus"></i>
      </el-upload>
    </div>
    <div class="smail">
      <p>配送费</p>
      <el-input v-model="deliveryPrice"></el-input>
    </div>
    <div class="smail">
      <p>配送时间</p>
      <el-input v-model="deliveryTime"></el-input>
    </div>
    <div class="smail">
      <p>配送描述</p>
      <el-input v-model="description"></el-input>
    </div>
    <div class="smail">
      <p>店铺评分</p>
      <el-input v-model="score"></el-input>
    </div>
    <div class="smail">
      <p>销量</p>
      <el-input v-model="sellCount"></el-input>
    </div>
    <div class="smail">
      <p>活动</p>
      <div>
        <el-checkbox v-for="item in supports" :key="item">{{ item }}</el-checkbox>
      </div>
    </div>
    <span>营业时间</span>
    <el-time-picker
      is-range
      v-model="date"
      range-separator="至"
      start-placeholder="开始时间"
      end-placeholder="结束时间"
      placeholder="选择时间范围"
      class="mar"
    ></el-time-picker>
  </div>
</template>

<script>
import { shopDetails,shopEdit, Img_Getshop, Img_Upshop } from "@/api/apis";
import { getchinaTime } from "../../utils/util";
export default {
  data() {
    return {
      dialogVisible: false,
      // 回填数据

      fileList: [], //回填店铺图片
      //  店铺信息
      id: 0,
      name: "", //店铺名称
      bulletin: "", //公告
      avatar: "", //店铺头像
      deliveryPrice: 0, //配送费
      deliveryTime: 0, //送到时间
      description: "", //描述
      score: "", //评分
      sellCount: 0, //销量
      supports: "", //活动
      pics: [], //店铺图片
      date: "", //营业时间
      minPrice: "", //起送价格
    };
  },
  methods: {
    //店铺头像
    handleSuccess(res) {
      console.log(res);
      if (res.code == 0) {
        this.avatar = res.imgUrl;
      }
    },
    // 添加店铺图片
    handleAvatarSuccess(res) {
      if (res.code == 0) {
        this.pics.push(res.imgUrl); //把新增图片添加到数组中
      }
    },
    //删除店铺图片
    removeSopeImg(res) {
      console.log(res);
      this.pics.splice(this.pics.indexOf(res.name), 1);
    },

    // 修改内容接口
    upData() {
      var params = {
        id: this.id,
        name: this.name,
        bulletin: this.bulletin,
        avatar: this.avatar,
        deliveryPrice: this.deliveryPrice,
        deliveryTime: this.deliveryTime,
        description: this.description,
        score: this.score,
        sellCount: this.sellCount,
        //字符串数组
        date: JSON.stringify([
          getchinaTime(this.date[0]),
          getchinaTime(this.date[1]),
        ]),
        supports: JSON.stringify(this.supports),
        pics: JSON.stringify(this.pics),
      };

      shopEdit(params).then((res) => {
        if (res.data.code == 0) {
          this.$message({
            type: "success",
            message: "店铺信息修改成功！",
          });
        }
      });
    },
  },
  created() {
    this.Img_Getshop = Img_Getshop;
    this.Img_Upshop = Img_Upshop;
    // 获取数据函数

    shopDetails().then((res) => {
      if (res.statusText == "OK") {
        for (let key in res.data.data) {
          this[key] = res.data.data[key];
        }
        // 回填照片墙数据
        this.fileList = this.pics.map((item) => {
          return {
            name: item,
            url: Img_Getshop + item,
          };
        });
      }
    });
  },
};
</script>

<style lang="less" scoped>
#box {
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
  .smail {
    p {
      padding: 0px 20px;
      width: 20%;
      line-height: 30px;
    }
    display: flex;
    width: 700px;
    margin: 10px 0px;
    img {
      width: 150px;
      height: 150px;
      border-radius: 8px;
    }
    .el-image {
      border-radius: 8px;
    }
    .el-image[data-v-2c5a6988] {
      width: 150px;
      height: 150px;
      margin-right: 6px;
    }
  }
  > span {
    margin: 0px 20px;
  }
}
</style>