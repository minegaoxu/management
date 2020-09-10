<template>
  <div id="box">
    <div>
      <p>管理员信息</p>
    </div>
    <div>
      <p>
        管理员id:
        <span>{{ id }}</span>
      </p>
    </div>
    <div>
      <p>
        账号:
        <span>{{ account }}</span>
      </p>
    </div>
    <div>
      <p>
        用户组:
        <span>{{ userGroup }}</span>
      </p>
    </div>
    <div>
      <p>
        创建时间:
        <span>{{ ctime }}</span>
      </p>
    </div>
    <p>
      <span style="color:cadetblue;">管理员头像</span>
      <el-upload
        class="avatar-uploader"
        action="http://127.0.0.1:5000/users/avatar_upload"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :data="upcode"
      >
        <i class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
    </p>

  </div>
  
</template>

<script>
import { accountinfo } from "@/api/apis";
import { getchinaTime } from "@/utils/util"
export default {
  data() {
    return {
      upcode: {},
      id: "",
      ctime: "",
      account: "",
      userGroup: "",
    };
  },
  methods: {
    handleAvatarSuccess(res) {
      if (res.code == 0) {
        this.$message({
          message: "恭喜你，上传头像成功",
          type: "success",
        });
        this.$bus.$emit("lodeimg");
      }
    },
  },
  created() {
    //获取参数
    this.upcode = { id:localStorage.id }
    // 渲染页面
    accountinfo(localStorage.id).then((res) => {
      this.id = res.data.accountInfo.id;
      this.ctime = getchinaTime(res.data.accountInfo.ctime);
      this.account = res.data.accountInfo.account;
      this.userGroup = res.data.accountInfo.userGroup;
    });
  },
};
</script>

<style lang="less" scoped>
#box {
  background-color: #fff;
  padding: 4px;
  > div {
    border-bottom: 1px solid #ccc;
    p {
      line-height: 46px;
      padding-left: 20px;
      color: cadetblue;
      span {
        margin-left: 20px;
      }
    }
  }
  > p {
    display: flex;
    padding: 10px 20px;
    line-height: 100px;
    span {
      margin: 0px 20px;
    }
    .avatar-uploader {
      width: 100px;
      height: 100px;
      border: 1px dashed #d9d9d9;
      display: flex;
      justify-content: center;
    }
  }
}
</style>