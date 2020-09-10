<template>
  <div id="main">
    <span class="spa">订单号</span>
    <input class="textIn" size="height:20px" v-model="orderNo" placeholder="请输入内容" />

    <span class="spa">收货人</span>
    <input class="textIn" v-model="consignee" placeholder="请输入内容" />

    <span class="spa">手机号</span>
    <input class="textIn" v-model="phone" placeholder="请输入内容" />

    <span class="spa">订单状态</span>
    <el-select v-model="orderState" placeholder="请选择">
      <el-option v-for="item in options" :key="item.value" :value="item"></el-option>
    </el-select>

    <el-date-picker
      v-model="date"
      type="daterange"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      class="spa"
    ></el-date-picker>
    <el-button type="primary" class="cha" @click="queryBtn" plain>查询</el-button>
    <el-table
      :data="tableData"
      border
      style="width: 100%;height:400px"
      v-loading="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.6)"
    >
      <el-table-column prop="orderNo" label="订单号"></el-table-column>
      <el-table-column prop="orderTime" label="下单时间"></el-table-column>
      <el-table-column prop="phone" label="手机号"></el-table-column>
      <el-table-column prop="consignee" label="收货人"></el-table-column>
      <el-table-column prop="deliverAddress" label="配送地址"></el-table-column>
      <el-table-column prop="deliveryTime" label="送达时间"></el-table-column>
      <el-table-column prop="remarks" label="用户备注"></el-table-column>
      <el-table-column prop="orderAmount" label="订单金额"></el-table-column>
      <el-table-column prop="orderState" label="订单状态"></el-table-column>

      <el-table-column fixed="right" label="操作" width="100" border>
        <template slot-scope="scope">
          <el-popover placement="right">
            <el-table :data="gridData">
              <el-table-column prop="orderNo" label="订单号"></el-table-column>
              <el-table-column prop="orderTime" label="下单时间"></el-table-column>
              <el-table-column prop="phone" label="电话号码"></el-table-column>
              <el-table-column prop="consignee" label="下单人姓名"></el-table-column>
              <el-table-column prop="deliverAddress" label="配送地址"></el-table-column>
              <el-table-column prop="deliveryTime" label="送达时间"></el-table-column>
              <el-table-column prop="remarks" label="备注"></el-table-column>
              <el-table-column prop="orderAmount" label="订单金额"></el-table-column>
              <el-table-column prop="orderState" label="订单状态"></el-table-column>
            </el-table>
            <el-button
              slot="reference"
              @click="lookRow(scope.$index, tableData)"
              type="text"
              size="small"
            >查看</el-button>
          </el-popover>
          <el-button @click="diletRow(scope)" type="text" size="small">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 弹出修改框 -->

    <el-dialog class="boxbig" title="订单修改" :visible.sync="diaVisible">
      <el-form>
        <div class="smail">
          <p>订单号</p>
          <el-input v-model="edit.orderNo" clearable></el-input>
        </div>
        <div class="smail">
          <p>下单时间</p>
          <el-input v-model="edit.orderTime"></el-input>
        </div>
        <div class="smail">
          <p>电话</p>
          <el-input v-model="edit.phone"></el-input>
        </div>
        <div class="smail">
          <p>收货人</p>
          <el-input v-model="edit.consignee"></el-input>
        </div>
        <div class="smail">
          <p>送货地址</p>
          <el-input v-model="edit.deliverAddress"></el-input>
        </div>
        <div class="smail">
          <p>送达时间</p>
          <el-input v-model="edit.deliveryTime"></el-input>
        </div>
        <div class="smail">
          <p>备注</p>
          <el-input v-model="edit.remarks"></el-input>
        </div>
        <div class="smail">
          <p>订单金额</p>
          <el-input v-model="edit.orderAmount"></el-input>
        </div>
        <div class="smail">
          <p>订单状态</p>
          <el-input v-model="edit.orderState"></el-input>
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
        :page-size="pagesize"
        layout="total , prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import { orderlist, orderDetails, orderEdit } from "@/api/apis";

import { getchinaTimeHours, getchinaTime } from "@/utils/util";
export default {
  data() {
    return {
      orderNo: "", //订单号
      consignee: "", //收货人
      phone: "", //电话号码
      orderState: "", //订单状态
      date: [new Date(2016, 9, 10, 8, 40), new Date()], //事件范围
      options: ["全部", "已完成", "已受理", "派送中"],
      tableData: [],
      currentPage: 1, //当前显示页数
      pagesize: 6, //每页显示条数
      total: 0,
      loading: false, //loading
      gridData: [], //详情数据
      diaVisible: false, //弹出框默认关闭
      edit: {},
    };
  },
  methods: {
    // 页数变化
    handleCurrentChange(val) {
      this.currentPage = val;
      //  执行获取订单函数
      this.getOrder(this.paramsex);
    },
    // 点击查询显示
    queryBtn() {
      let { orderNo, consignee, phone, orderState } = this;

      let paramsex = {};
      if (orderNo != "") paramsex.orderNo = orderNo;
      if (consignee != "") paramsex.consignee = consignee;
      if (phone != "") paramsex.phone = phone;
      if (orderState != "" && orderState != "全部")
        paramsex.orderState = orderState;
      if (this.date)
        paramsex.date = JSON.stringify([
          getchinaTime(this.date[0]),
          getchinaTime(this.date[1]),
        ]);

      this.paramsex = paramsex;

      this.getOrder(this.paramsex);
    },
    // 查看详情接口
    lookRow(index, row) {
      orderDetails(row[index].id).then((res) => {
        this.gridData = [];
        let arr = res.data.data;

        arr.orderTime = getchinaTimeHours(arr.orderTime);
        arr.deliveryTime = getchinaTimeHours(arr.deliveryTime);

        this.gridData.push(arr);
      });
    },
    // 编辑接口
    diletRow(scope) {
      this.diaVisible = true; //弹出框
      this.edit = { ...scope.row };
    },
    // 确认修改
    upBtn() {
      this.diaVisible = false;

      // 获取数据接口
      orderEdit(this.edit).then((res) => {
        if (res.data.code == 0) {
          this.$message({
            message: "恭喜您,修改成功!",
            type: "success",
          });
          this.getOrder(this.paramsex);
        } else {
          this.$message.error("修改失败了额...");
        }
      });
    },
    // 获取订单页面接口
    getOrder(paramsex) {
      this.loading = true;
      orderlist({
        currentPage: this.currentPage,
        pageSize: this.pagesize,
        ...paramsex,
      }).then((res) => {
        if (res.statusText == "OK") {
          this.loading = false;
          let arr = res.data.data;
          for (let obj of arr) {
            obj.orderTime = getchinaTime(obj.orderTime);
            obj.deliveryTime = getchinaTime(obj.deliveryTime);
          }
          this.tableData = arr;
          this.total = res.data.total;
        }
      });
    },
  },
  created() {
    this.getOrder();
  },
};
</script>

<style lang="less" scoped>
#main {
  background-color: #fff;
  padding: 10px 0px 120px;
}
.textIn {
  width: 14%;
  height: 38px;
  border-radius: 4px;
  border: 1px solid #eee;
  padding-left: 14px;
}
.spa {
  font-size: 14px;
  color: #888;
  margin: 0 10px;
}
.mar {
  margin-left: 10px;
}
.cha {
  margin: 20px 10px;
  height: 40px;
}
.block {
  padding-top: 20px;
}
.boxbig {
  padding: 0px 50px;
  .smail {
    margin: 10px 0px;
    width: 100%;
  }
}
</style>