<template>
  <div class="home">
    <div id="container"></div>
  </div>
</template>

<script>
import { Chart } from "@antv/g2";

export default {
  data() {
    return {};
  },
  methods: {
    print() {
      const data = [
        { date: '2018-02-02', price: 1800 },
        { date: '2018-02-03', price: 5000 },
        { date: '2018-02-04', price: 10000 }
      ];

      const chart = new Chart({
        container: "container",
        autoFit: true,
        height: 500
      });

      chart.data(data);
      chart.scale({
        date: {
          alias: "日期",
          type: "time"
        },
        price: {
          alias: "价格",
          sync: true,
          nice: true
        }
      });

      chart.tooltip({
        showCrosshairs: true,
        shared: true
      });

      chart
        .line()
        .position("date*price")
        .color("#9AD681");
      chart.render();
    }
  },
  mounted() {
    this.print();
  }
};
</script>

<style lang="less">
</style>
