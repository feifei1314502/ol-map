<template>
  <div id="map">
    <div id="digitalScale"><span>比例尺1：</span><span id="zoom"></span></div>
  </div>
</template>

<script>
import ol from 'ol'
export default {
  name: "Vue2tovue3OlDemoDigitalScale",

  data() {
    return {};
  },

  mounted() {
    var scaleLineControl = new ol.control.ScaleLine(); //定义比例尺控件

    // 实例化地图
    var map = new ol.Map({
      layers: [
        new ol.layer.Tile({
          source: new ol.source.OSM(),
        }),
      ],
      target: "map",
      view: new ol.View({
        center: ol.proj.transform([104, 30], "EPSG:4326", "EPSG:3857"),
        zoom: 10,
      }),
      controls: ol.control.defaults().extend([scaleLineControl]), //加载比例尺控件
    });

    // 监听分辨率变化，通过dpi和像素关系（比例尺=dpi/0.0254*分辨率）输出比例尺
    map.getView().on("change:resolution", function () {
      document.getElementById("zoom").innerHTML =
        map.getView().getResolution() * 3779.5275590551; //这里使用了View中的getResolution方法获得当前View的分辨率。
    });
  },

  methods: {},
};
</script>

<style lang="scss" scoped></style>
