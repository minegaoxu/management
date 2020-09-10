<template>
  <div id="box">
    <div class="boxdis">
      <span>商品分类</span>
      <template>
        <el-button type="primary" @click="open">添加分类</el-button>
      </template>
    </div>
    <div>
      <!-- 表格 -->
      <el-table
        :data="tableData"
        style="width: 100%;height:500px"
        v-loading="loading"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.6)"
      >
        <el-table-column label="序号" type="index"></el-table-column>
        <el-table-column label="分类名称" prop="cateName">
          <template slot-scope="scope">
            <span v-show="!scope.row.isedit">{{scope.row.cateName}}</span>
            <el-input v-show="scope.row.isedit" v-model="scope.row.cateName" />
          </template>
        </el-table-column>
        <el-table-column label="是否启用">
          <template slot-scope="scope">
            <el-switch
              :disabled="!scope.row.isedit"
              v-model="scope.row.state"
              active-color="#13ce66"
              inactive-color="#ff4949"
            ></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope)">{{ scope.row.isedit ? '完成': '编辑' }}</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 分页器 -->
    <div class="block">
      <el-pagination
        @size-change="handleSize"
        @current-change="handleCurrent"
        :current-page="currentPage"
        :page-size="8"
        layout="total , prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import { addcate, catelist, delcate, editcate } from "@/api/apis";

export default {
  data() {
    return {
      tableData: [],
      search: "",
      currentPage: 1, //当前页
      pagesize: 8, //每页显示条数
      total: 0, //总条数
      loading: false, //loading
    };
  },
  methods: {
    // 编辑商品
    handleEdit(scope) {
      if (scope.row.isedit) {
        //改变数据
        scope.row.isedit = false;
        // 发送ajax
        editcate(scope.row).then((res) => {
          if (res.data.code == 0) {
            this.$message({
              type: "success",
              message: "修改成功!",
            });
          }
        });
      } else {
        //打开编辑状态
        scope.row.isedit = true;
      }
    },
    // 删除商品
    handleDelete(row) {
      this.$confirm("此操作将永久删除数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          delcate(row.id).then((res) => {
            if (res.data.code == 0) {
              this.getcatelist();
            }
          });

          this.$message({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    handleSize(val) {
      this.pagesize = val;
      // 调用函数
      this.getcatelist();
    },
    handleCurrent(num) {
      this.currentPage = num;
      // 调用函数
      this.getcatelist();
    },
    // 添加商品
    open() {
      this.$prompt("分类名称", "添加分类", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
      })
        .then(({ value }) => {
          addcate(value, true).then((res) => {
            if (res.data.code == 0) {
              this.$message({
                type: "success",
                message: "您成功增加分类: " + value,
              });
              // 刷新数据
              this.getcatelist();
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消输入",
          });
        });
    },
    // 获取分类函数
    getcatelist() {
      this.loading = true;
      setTimeout(() => {
        catelist(this.currentPage, this.pagesize).then((res) => {
          if (res.statusText == "OK") {
            this.loading = false;
            this.total = res.data.total; //总条数
            let arr = res.data.data;
            for (let obj of arr) {
              obj.isedit = false;
              obj.state = obj.state == 1;
            }
            this.tableData = arr;
            // 是否在编辑状态
          }
        });
      }, 100);
    },
  },
  created() {
    // 获取商品分类
    this.getcatelist();
  },
};
</script>

<style lang="less" scoped>
#box {
  background-color: #fff;
  padding: 10px;
  .boxdis {
    display: flex;
    justify-content: space-between;
  }
  .block {
    padding: 10px 0;
  }
}
</style>