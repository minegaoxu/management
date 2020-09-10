<template>
  <div id="box">
    <div class="top_div">
      <p>账号列表</p>
    </div>
    <div class="tabl">
      <!-- 表格 -->
      <el-table :data="tableData" style="width: 100%" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="60"></el-table-column>
        <el-table-column label="账号" prop="account"></el-table-column>
        <el-table-column prop="userGroup" label="用户组"></el-table-column>
        <el-table-column prop="ctime" label="创建时间"></el-table-column>
        <el-table-column label="操作" show-overflow-tooltip>
          <template slot-scope="scope">
            <el-button plain size="small" @click="dialogFormVisible = true">编辑</el-button>
            <el-button
              type="danger"
              plain
              size="small"
              @click="removeBtn(scope.$index, scope.row)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 弹出框 -->
      <el-dialog title="收货地址" :visible.sync="dialogFormVisible">
        <el-form :model="form">
          <el-form-item label="用户名" :label-width="formLabelWidth">
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="用户组" :label-width="formLabelWidth">
            <el-select v-model="form.region" placeholder="请选择活动区域">
              <el-option label="普通管理员" value="普通管理员"></el-option>
              <el-option label="超级管理员" value="超级管理员"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="chanUs">确 定</el-button>
        </div>
      </el-dialog>
      <!-- 分页 -->
      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-size="6"
          layout="total , prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </div>
      <el-button type="danger" @click="open">批量删除</el-button>
      <el-button type="primary" @click="toggleSelection()">取消选择</el-button>
    </div>
  </div>
</template>

<script>
import { lookUser, removeuser, changeuser, delusers } from "@/api/apis";
import { getchinaTime } from '@/utils/util'
export default {
  data() {
    return {
      tableData: [],
      currentPage: 1, //当前页
      pageSize: 6,    //每页显示的条数
      total: 0,       //总共的条数
      dialogTableVisible: false,
      dialogFormVisible: false,

      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
      },
      formLabelWidth: "120px",
      val: [],
    };
  },

  methods: {
    // 批量删除
    handleSelectionChange(vle) {
      this.val = vle;
    },
    open() {
      this.$confirm("此操作将永久删除, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          let arr = [];
          this.val.forEach((item) => {
            arr.push(item.id);
          });
          delusers(JSON.stringify(arr)).then((res) => {
            if (res.data.code == 0) {
              this.$message({
                type: "success",
                message: "删除成功!",
              });
              this.foo();
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
    // 分页
    handleSizeChange(val) {
      this.pageSize = val;
      this.foo();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.foo();
    },
    //xuanran
    foo() {
      lookUser(this.currentPage, this.pageSize).then((res) => {
        let arr = res.data.data
        // 修改时间格式
        for(let obj of arr){
          obj.ctime = getchinaTime(obj.ctime)
        }
        // 赋值
        this.tableData = arr
        this.total = res.data.total
      });
    },
    //修改用户信息函数
    chanUs() {
      this.dialogFormVisible = false;
      changeuser(localStorage.id, this.form.name, this.form.region).then(
        (res) => {
          if (res.data.code == 0) {
            // 提示
            this.$message({
              message: "修改成功!",
              type: "success",
            });
            this.foo();
          } else {
            // 提示
            this.$message({
              message: "修改失败!",
              type: "success",
            });
          }
        }
      );
    },
    // 点击删除
    removeBtn(index) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          removeuser(this.id[index].id).then((res) => {
            if (res.data.code == 0) {
              this.foo();
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
    toggleSelection(rows) {
      if (rows) {
        rows.forEach((row) => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
  },
  // 发送请求
  created() {
    this.foo();
  },
};
</script>

<style lang="less" scoped>
#box {
  background-color: #fff;
  .top_div {
    border-bottom: 1px solid #ccc;
    p {
      padding: 10px;
    }
  }
  .tabl {
    padding: 0px 0px 20px 20px;
  }
}
</style>