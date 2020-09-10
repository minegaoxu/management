<template>
  <div>
    <div id="box">
      <div>
        <div>
          <span class="el-icon-document-remove"></span>
        </div>
        <div>
          <p>总订单</p>
          <strong>{{ totalOrder }}</strong>
        </div>
      </div>
      <div>
        <div>
          <span class="el-icon-coin red"></span>
        </div>
        <div>
          <p>总销售额</p>
          <strong>{{ totayAmount }}</strong>
        </div>
      </div>
      <div>
        <div>
          <span class="el-icon-s-order"></span>
        </div>
        <div>
          <p>今日订单数</p>
          <strong>{{ todayOrder }}</strong>
        </div>
      </div>
      <div>
        <div>
          <span class="el-icon-s-platform green"></span>
        </div>
        <div>
          <p>今日销售额</p>
          <strong>{{ totayAmount }}</strong>
        </div>
      </div>
    </div>
    <div id="echar"></div>
  </div>
</template>

<script>
import echarts from "echarts";
import { reportIndex } from "@/api/apis";
export default {
  data() {
    return {
      totalAmount:0,    //总销售额
      totalOrder:0,     //总订单
      todayOrder:0,     //今日订单数
      totayAmount:0,    //今日销售额
    };
  },
  mounted() {
    let myCharts = echarts.init(document.getElementById("echar"));
    // 发送请求
    reportIndex().then((res) => {
      console.log(res);
      for( let key in res.data ){
        this[key] = res.data[key]
      }
      if (res.statusText == "OK") {
        // 配置对象
        let option = {
          title: {
            text: "数据统计",
          },
          tooltip: {
            trigger: "axis",
          },
          legend: {
            data: res.data.xData,
          },
          grid: {
            left: "3%",
            right: "4%",
            bottom: "3%",
            containLabel: true,
          },
          toolbox: {
            feature: {
              saveAsImage: {},
            },
          },
          xAxis: {
            type: "category",
            boundaryGap: false,
            data: res.data.xData,
          },
          yAxis: {
            type: "value",
          },
          series: [
            {
              name: "总订单",
              type: "line",
              stack: "总量",
              data: res.data.totalOrder,
            },
            {
              name: "总金额",
              type: "line",
              stack: "总量",
              data: res.data.totalAmount,
            },
            {
              name: "订单数据",
              type: "line",
              stack: "总量",
              data: res.data.orderData,
            },
            {
              name: "金额数据",
              type: "line",
              stack: "总量",
              data: res.data.amountData,
            },
            {
              name: "今日订单",
              type: "line",
              stack: "总量",
              data: res.data.todayOrder,
            },
          ],
        };
        myCharts.setOption(option);
      }
    });
  },
};
</script>

<style lang="less" scoped>
#box {
  display: flex;
  justify-content: space-between;
  height: 100px;
  > div {
    width: 16%;
    height: 80px;
    background-color: #fff;
    display: flex;
    justify-content: space-between;
    padding: 0px 30px;
    span {
      margin-top: 10px;
      font-size: 60px;
      color: rgb(92, 116, 250);
    }
    .green {
      color: rgb(79, 221, 86);
    }
    .red {
      color: crimson;
    }
    p {
      padding-top: 10px;
      line-height: 30px;
      font-size: 16px;
      font-weight: bold;
      margin: 0px;
      text-align: center;
      color: #888;
    }
  }
}
#echar {
  width: 100%;
  height: 400px;
  background-color: #fff;
}
</style>