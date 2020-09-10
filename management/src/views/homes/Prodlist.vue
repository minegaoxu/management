<template>
  <div id="box">
    <p>商品列表</p>
    <!-- 表格 -->
    <el-table
      :data="tableData"
      style="width: 100%;height:600px"
      v-loading="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.6)"
    >
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline>
            <el-form-item label="商品名称">
              <span>{{ props.row.name }}</span>
            </el-form-item>
            <el-form-item label="所属分类">
              <span>{{ props.row.category }}</span>
            </el-form-item>
            <el-form-item label="商品价格">
              <span>{{ props.row.price }}</span>
            </el-form-item>
            <el-form-item label="商品描述">
              <span>{{ props.row.goodsDesc }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column label="商品名称" prop="name"></el-table-column>
      <el-table-column label="所属分类" prop="category"></el-table-column>
      <el-table-column label="商品价格" prop="price"></el-table-column>
      <el-table-column label="商品图片">
        <template slot-scope="props">
          <img class="imgsmail" :src="Img_Getdata + props.row.imgUrl" />
        </template>
      </el-table-column>
      <el-table-column label="商品描述" prop="goodsDesc"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button plain size="small" @click="diaBtn(scope.row)">编辑</el-button>
          <el-button type="danger" plain size="small" @click="removeBtn(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 弹出框 -->
    <el-dialog title="修改商品" :visible.sync="diaVisible">
      <el-form>
        <div class="smail">
          <p>商品名称</p>
          <el-input v-model="editlist.name" placeholder="请输入内容" clearable></el-input>
        </div>
        <div class="smail">
          <p>商品分类</p>
          <el-select v-model="editlist.category" placeholder="请选择分类">
            <el-option v-for="item in categorieslist" :key="item.value" :value="item.cateName"></el-option>
          </el-select>
        </div>
        <div class="smail">
          <p>商品价格</p>
          <el-input-number v-model="editlist.price" :min="1" :max="20"></el-input-number>
        </div>

        <div class="smail">
          <p>添加图片</p>

          <!-- 上传图片 -->

          <el-upload :action="Img_Updata" :on-success="handleAvatarSuccess" :show-file-list="false">
            <i v-show="!editlist.imgUrl" class="el-icon-plus"></i>
            <img style="width: 100px" v-show="editlist.imgUrl" :src="Img_Getdata + editlist.imgUrl" />
          </el-upload>
        </div>
        <div class="smail">
          <p>商品描述</p>
          <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="editlist.goodsDesc"></el-input>
        </div>
      </el-form>
      <div slot="footer">
        <el-button @click="diaVisible = false">取 消 上 传</el-button>
        <el-button type="primary" @click="upBtn">确 定 上 传</el-button>
      </div>
    </el-dialog>
    <!-- 分页器 -->
    <div class="block">
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="pageaize"
        layout="total , prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import {
  goodslist,
  goodsdel,
  edit,
  categories,
  Img_Updata,
  Img_Getdata,
} from "@/api/apis";
export default {
  data() {
    return {
      tableData: [],
      currentPage: 1,
      pageaize: 5,
      total: 0,
      // imgUrl: "",
      // 弹出框 回填数据
      diaVisible: false,
      editlist: {}, //渲染数据
      categorieslist: [],
      // 图片上传/查看地址
      Img_Updata: "",
      Img_Getdata: "",
      loading: false, //是否显示加载动画
    };
  },
  methods: {
    // 上传图片
    handleAvatarSuccess(res) {
      if (res.code == 0) {
        this.editlist.imgUrl = res.imgUrl;
      }
    },
    // 点击编辑
    diaBtn(row) {
      this.diaVisible = true;
      // 获取分类数组
      categories().then((res) => {
        this.categorieslist = res.data.categories;
      });
      this.editlist = { ...row };
    },

    // 确认修改
    upBtn() {
      this.diaVisible = false;
      // 获取数据接口
      edit(this.editlist).then((res) => {
        if (res.data.code == 0) {
          this.$message({
            message: "恭喜您,修改成功!",
            type: "success",
          });
          //关闭loading
          this.loading = false;
          this.getgoods();
        } else {
          this.$message.error("修改失败了额...");
        }
      });
    },
    // 分页
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getgoods();
    },
    // 获取商品接口函数
    getgoods() {
      this.loading = true;
      setTimeout(() => {
        goodslist(this.currentPage, this.pageaize).then((res) => {
          if (res.statusText == "OK") {
            // 获取数据
            this.tableData = res.data.data;

            //获取总条数
            this.total = res.data.total;

            this.loading = false;
          }
        });
      }, 100);
    },
    // 删除商品接口
    removeBtn(index, row) {
      this.$confirm("此操作将永久删除数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          goodsdel(row.id).then((res) => {
            if (res.data.code == 0) {
              this.$message({
                message: "删除成功!!!",
                type: "success",
              });
              // 刷新页面
              this.getgoods();
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
  created() {
    this.Img_Updata = Img_Updata;
    this.Img_Getdata = Img_Getdata;
    //获取商品接口
    this.getgoods();
    // 渲染分类列表
    categories().then((res) => {
      this.options = res.data.categories;
    });
  },
};
</script>

<style lang="less" scoped>
#box {
  background-color: #fff;

  .imgsmail {
    width: 80px;
    border-radius: 10px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  }

  .block {
    padding: 10px 0;
  }
  p {
    line-height: 40px;
    padding-left: 10px;
    font-weight: bold;
    color: #666;
  }
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
}
</style>