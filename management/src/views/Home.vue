<template>
  <el-container>
    <el-aside width="200px">
      <!-- 导航 -->
      <el-menu
        :default-active="hashdata"
        class="el-menu-vertical-demo"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
        router
        unique-opened
      >
        <div class="title">
          <p>{{ titles }}</p>
        </div>
        <div v-for="(item,index) in powerarr" :key="index">
          <!-- 1 -->
          <el-menu-item v-if="!item.children" :index="item.url">
            <i :class="item.icon"></i>
            <span slot="title">{{ item.titl }}</span>
          </el-menu-item>

          <!-- 3 -->
          <el-submenu v-else :index="item.url">
            <template slot="title">
              <i :class="item.icon"></i>
              <span>{{ item.titl }}</span>
            </template>

            <el-menu-item
              v-for="(val,num) in item.children"
              :key="num"
              :index="val.url"
            >{{ val.titl }}</el-menu-item>
          </el-submenu>
        </div>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header class="title">
        <!-- 面包屑 -->
        <el-breadcrumb separator="/">
          <el-breadcrumb-item v-for="item in bread" :key="item">{{ item }}</el-breadcrumb-item>
        </el-breadcrumb>
        <div>
          <p style="color:cadetblue;">
            欢迎你,
            <!-- 下拉 -->
            <el-dropdown @command="handleCommand">
              <span class="el-dropdown-link">
                <span style="color:cadetblue;font-size:16px">{{ username }}</span>
                <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="b">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </p>
          <img :src="imgUser" />
        </div>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { aging, accountinfo } from "@/api/apis";
export default {
  data() {
    return {
      hashdata: "",
      username: "",
      imgUser: "",
      titles: "鱼子的管理系统",
      bread: [],
      list: [
        {
          url: "/home/index",
          icon: "el-icon-s-home",
          titl: "后台首页",
          roles: ["super", "normal"],
        },
        {
          url: "/home/manage",
          icon: "el-icon-collection",
          titl: "订单管理",
          roles: ["super", "normal"],
        },
        {
          url: "123",
          icon: "el-icon-s-order",
          titl: "商品管理",
          children: [
            { url: "/home/prodlist", titl: "商品列表" },
            { url: "/home/addprod", titl: "商品添加" },
            { url: "/home/goods", titl: "商品分类" },
          ],
          roles: ["super", "normal"],
        },
        {
          url: "/home/store",
          icon: "el-icon-menu",
          titl: "店铺管理",
          roles: ["super"],
        },
        {
          url: "132456",
          icon: "el-icon-s-home",
          titl: "账号管理",
          children: [
            { url: "/home/account", titl: "账号列表" },
            { url: "/home/addaccount", titl: "添加账号" },
            { url: "/home/change", titl: "修改密码" },
            { url: "/home/center", titl: "个人中心" },
          ],
          roles: ["super"],
        },
        {
          url: "456",
          icon: "el-icon-pie-chart",
          titl: "销售统计",
          children: [
            { url: "/home/stati", titl: "商品统计" },
            { url: "/home/order", titl: "订单统计" },
          ],
          roles: ["super"],
        },
      ],
    };
  },
  // 计算属性
  computed: {
    // 权限管理
    powerarr() {
      return this.list.filter((item) => item.roles.includes(localStorage.role));
    },
  },
  methods: {
    //退出登录
    handleCommand() {
        localStorage.clear();
        location.href = "/";
    },
    // 获取头像函数
    accinfo() {
      accountinfo(localStorage.id).then((res) => {
        this.imgUser = res.data.accountInfo.imgUrl;
      });
    },
  },
  // token
  created() {
    // 面包屑bug

    this.bread = this.$route.meta.bread;

    // 监听bus事件
    this.$bus.$on("lodeimg", () => {
      this.accinfo(); //刷新头像
    });
    // 回去当前hash
    this.hashdata = this.$route.path;
    // 登录是否过期接口
    aging(localStorage.token).then((res) => {
      if (res.data.code == 0) {
        // 有效
        this.username = localStorage.user;
      } else {
        // 无效
        this.username = "请登录";
      }
    });
    this.accinfo();
  },
  watch: {
    $route(to) {
      this.bread = to.meta.bread;
    },
  },
};
</script>

<style lang="less" scoped>
.el-container {
  height: 100%;
}
.el-header {
  background-color: #fff;
}

.el-aside {
  background-color: #545c64;
}

.el-menu {
  border-right: 0px;
  .title {
    line-height: 40px;
    text-align: center;
    color: rgb(231, 244, 245);
  }
}
.el-main {
  background-color: #f0f2f5;
}
.title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 20px;
  > div {
    display: flex;
    align-items: center;
    img {
      width: 50px;
      margin: 0 10px;
      border-radius: 50%;
    }
  }
}
</style>
