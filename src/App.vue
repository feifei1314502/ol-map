<template>
  <div id="app">
    <!-- <BaseDemo /> -->
    <!-- <PolygonTool/> -->
    <!-- <SwitchMapDemo/> -->
    <VectorLayerDemo/>
    <!-- <DomToImage/> -->
    <!-- <TreeDemo/> -->
    <!-- <ModifyFeatures /> -->
    <!-- <DigitalScale /> -->
  </div>
</template>

<script>
// import BaseDemo from "./components/BaseDemo.vue";
// import PolygonTool from "./components/PolygonTool.vue";
// import SwitchMapDemo from "./components/SwitchMapDemo.vue";
import VectorLayerDemo from "./components/VectorLayerDemo.vue";
// import DomToImage from "./components/DomToImage.vue";
// import TreeDemo from "./components/TreeDemo.vue";
// import ModifyFeatures from "./components/ModifyFeatures.vue";
// import DigitalScale from "./components/DigitalScale.vue";

export default {
  name: "App",
  components: {
    // BaseDemo,
    // PolygonTool,
    // SwitchMapDemo,
    VectorLayerDemo,
    // DomToImage,
    // TreeDemo,
    // ModifyFeatures,
    // DigitalScale,
  },
  mounted() {
    this.$axios.post("/api/user/myTranferRecord").then((res) => {
      console.log(res); //这里返回的就是我们在mock中自定义的数据
    });
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
