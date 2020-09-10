<template>
  <div>
    <div id="box">
      <span>时间范围</span>
      <el-date-picker
        is-range
        v-model="times"
        type="daterange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        placeholder="选择时间范围"
      ></el-date-picker>
      <el-button type="primary" @click="clickBtn" plain>查询</el-button>
    </div>
    <div id="echrat"></div>
  </div>
</template>

<script>
import echarts from "echarts";
import { reportOrder } from "@/api/apis";
import { getchinaTime } from "@/utils/util";
export default {
  data() {
    return {
      times: ["2019-8-1 0:0:0", "2020-9-1 0:0:0"],
    };
  },
  methods: {
    //   封装函数
    getnum() {
      // 调用接口
      reportOrder(this.times).then((res) => {
        if (res.statusText == "OK") {
          let timedata = [];
          let dayaon = [];
          res.data.data.forEach((item) => {
            timedata.push(getchinaTime(item.orderTime));
            dayaon.push(item.orderAmount);
          });
          const myCharts = echarts.init(document.getElementById("echrat"));
          let option = {
            xAxis: {
              type: "category",
              data: timedata,
            },
            yAxis: {
              type: "value",
            },
            series: [
              {
                data: dayaon,
                type: "bar",
              },
            ],
          };
          myCharts.setOption(option);
        }
      });
    },
    clickBtn() {
      if (JSON.parse(this.times)[0] != "NaN-NaN-NaN NaN:NaN:NaN") {
        this.times = JSON.stringify([
          getchinaTime(this.times[0]),
          getchinaTime(this.times[1]),
        ]);
        this.getnum();
      } else {
        this.times = JSON.stringify(["2019-8-1 0:0:0", "2020-9-1 0:0:0"]);
        this.getnum();
      }
    },
  },
  mounted() {
    this.times = JSON.stringify(this.times);
    this.getnum();
  },
};
</script>

<style lang="less" scoped>
#box {
  span {
    color: #888;
    margin: 0 10px 20px;
  }
}
#echrat {
  margin-top: 30px;
  width: 100%;
  height: 400px;
  background-color: #fff;
}
</style>