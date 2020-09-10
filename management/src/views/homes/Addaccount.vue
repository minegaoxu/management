<template>
  <div id="box">
    <p>添加账号</p>
    <div>
      <p>
        <span>账号</span>
        <el-input class="inpu" v-model="user" placeholder="请输入内容"></el-input>
      </p>
      <p>
        <span>密码</span>
        <el-input class="inpu" placeholder="请输入密码" v-model="pwd" show-password></el-input>
      </p>
      <p>
        <span>用户组</span>
        <el-select v-model="val" placeholder="请选择用户组">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </p>
      <div class="btn">
        <el-button type="primary" size="small" @click="addBtn">添加</el-button>
        <el-button size="small" @click="chanBtn">重置</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { adduser } from "@/api/apis";
export default {
  data() {
    return {
      user: "",
      pwd: "",
      val: "",
      options: [
        {
          value: "普通管理员",
          label: "普通管理员",
        },
        {
          value: "超级管理员",
          label: "超级管理员",
        },
      ],
    };
  },
  methods: {
    addBtn() {
      adduser(this.user, this.pwd, this.val).then((res) => {
        if (res.data.code == 0) {
          // 提示
          this.$message({
            message: "添加账号成功!",
            type: "success",
          });
        } else {
          console.log("添加失败");
        }
      });
    },
    chanBtn() {
      this.user = "";
      this.pwd = "";
      this.val = "";
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
      padding: 10px 140px;
      width: 330px;
    }
    p {
      display: flex;
      justify-content: center;
      padding: 20px 50px;
      width: 330px;
      span {
        margin: 0 10px;
      }
      .inpu {
        width: 200px;
      }
    }
  }
}
</style>