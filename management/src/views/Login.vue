<template>
  <div class="about">
    <div id="boxsome"></div>
    <div class="login_box">
      <h3>鱼子的女仆管理系统</h3>
      <el-input class="con" v-model="acc" placeholder="请输入账户名" clearable prefix-icon="el-icon-user"></el-input>
      <el-input
        class="con"
        v-model="pwd"
        placeholder="请输入密码"
        prefix-icon="el-icon-s-opportunity"
        show-password
      ></el-input>
      <p class="errmsg">{{ errmsg }}</p>
      <el-button class="con" type="info" style="width:100%" @click="login_btn">提交登录</el-button>
    </div>
  </div>
</template>

<script>
import { login } from "@/api/apis";
export default {
  data() {
    return {
      acc: "",
      pwd: "",
      errmsg: "",
    };
  },
  methods: {
    login_btn() {
      login(this.acc, this.pwd).then((res) => {
        // 判断登录是否成功
        if (res.data.code == 0) {
          // 保存数据
          localStorage.user = this.acc;
          localStorage.token = res.data.token;
          localStorage.role = res.data.role;
          localStorage.id = res.data.id;
          //跳转
          this.$router.push("/home/index");
          // 提示
          this.$message({
            message: "用户登录成功!",
            type: "success",
          });
        } else {
          this.errmsg = res.data.msg;
        }
      });
    },
  },
  beforeCreate() {
    window._bd_share_main = "";
  },
};
</script>

<style lang="less" scoped>
.about {
  width: 100%;
  height: 100%;
  background-color: #D3DCE6;
  display: flex;
  justify-content: center;
  align-items: center;
  .login_box {
    width: 320px;
    height: 180px;
    background-color: ivory;
    padding: 20px;
    border-radius: 6px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
    h3 {
      text-align: center;
      color: #ce6868;
    }
    .con {
      margin: 8px 0px;
      margin: 6px 0px;
    }
    .errmsg {
      font-size: 12px;
      color: #ce6868;
    }
  }
}
</style>
