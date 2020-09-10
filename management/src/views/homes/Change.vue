<template>
  <div id="box">
    <p>修改密码</p>
    <div>
      <p>
        <span>原密码</span>
        <el-input class="inpu" v-model="oldinput" placeholder="请输入内容"></el-input>
      </p>
      <p class="err">{{ err }}</p>
      <p>
        <span>新密码</span>
        <el-input class="inpu" placeholder="请输入密码" v-model="input" show-password></el-input>
      </p>
      <p>
        <span>确认新密码</span>
        <el-input class="inpu" placeholder="请输入密码" v-model="inputagen" show-password></el-input>
      </p>
      <p class="err">{{ errtext }}</p>
      <div class="btn">
        <el-button type="primary" size="small" @click="changepwd">添加</el-button>
        <el-button size="small">重置</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { editpwd } from "@/api/apis";
import { checkoldpwd } from "@/api/apis";
export default {
  data() {
    return {
      oldinput: "",
      input: "",
      inputagen: "",
      errtext: "",
      err:''
    };
  },
  methods: {
    changepwd() {
      // 检查旧密码是否正确
      checkoldpwd(this.oldinput, localStorage.id).then((res) => {
        if (res.data.code == 0) {
          if (!(this.input == this.inputagen)) {
            this.errtext = "两次输入的密码不一致";
            return;
          }
          // 修改密码
          editpwd(this.input, localStorage.id).then((res) => {
            if (res.data.code == 0) {
              //提示
              this.$message({
                message: "修改密码成功!",
                type: "success",
              });
            }
          });
        }else{
          this.err = '旧密码输入错误'
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
#box {
  background-color: #fff;
  > p {
    line-height: 40px;
    border-bottom: 1px solid #ddd;
    padding-left: 20px;
    color: #666;
  }
  > div {
    padding-right: 700px;
    .btn {
      padding: 10px 0px;
      margin-left: 42%;
    }
    .err {
      font-size: 12px;
      color: brown;
      padding: 0px;
      line-height: 0px;
      margin-left: 5%;
    }
    p {
      display: flex;
      justify-content: center;
      //   margin: px 0;
      padding: 20px 50px;
      line-height: 40px;
      span {
        width: 100px;
        margin: 0 12px;
        white-space: nowrap;
      }
      .inpu {
        flex: 1;
        width: 200px;
      }
    }
  }
}
</style>