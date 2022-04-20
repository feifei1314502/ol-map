<template>
  <div id="map" class="map" style="width: 100vw; height: 100vh"></div>
</template>

<script>
import "ol/ol.css";
import View from "ol/View";
import Map from "ol/Map";
import TileLayer from "ol/layer/Tile";
import XYZ from "ol/source/XYZ";
import { Vector as VectorSource } from "ol/source";
import { Feature } from "ol";
import { Vector as VectorLayer } from "ol/layer";
import { Polygon } from "ol/geom";
import { Style, Stroke } from "ol/style";
import ExtTransform from "ol-ext/interaction/Transform";
export default {
  name: "Vue2tovue3Helloworld",

  data() {
    return {
      map: null,
      center: [116.39702518856394, 39.918590567855425], //北京故宫的经纬度
      centerSize: 11.5,
      projection: "EPSG:4326",
    };
  },

  mounted() {
    this.initMap();
    this.createPolygon();
    this.onEdit();
  },

  methods: {
    //初始化地图
    initMap() {
      //渲染地图
      var layers = [
        //   //深蓝色背景
        new TileLayer({
          source: new XYZ({
            url: "https://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetPurplishBlue/MapServer/tile/{z}/{y}/{x}",
          }),
        }),
        //   // 初始化背景
        //   new TileLayer({
        //     source: new OSM(),
        //   })
        // ,
        // new TileLayer({
        //   title: "街道图",
        //   source: new XYZ({
        //     url: "http://localhost:8888/haoxing-map/sosomaps/roadmap/{z}/{x}/{y}.jpg", //zwh本地使用
        //   }),
        // }),
      ];

      this.map = new Map({
        layers: layers,
        target: "map",
        view: new View({
          center: this.center,
          projection: this.projection,
          zoom: this.centerSize,
          maxZoom: 17,
          minZoom: 8,
        }),
      });
    },

    //创建多边形
    createPolygon() {
      //添加图层，并设置点范围
      const polygon = new Feature({
        geometry: new Polygon([
          [
            [116.39314093500519, 40.0217660530101],
            [116.47762344990831, 39.921746523871924],
            [116.33244947314951, 39.89892653421418],
            [116.30623076162784, 40.00185925352143],
          ],
        ]),
      });
      //设置样式
      polygon.setStyle(
        new Style({
          stroke: new Stroke({
            width: 4,
            color: [255, 0, 0, 1],
          }),
        })
      );
      // vectorlayer.getSource().getExtent()  获取图层的范围，然后用 ol.View 的 fit方法 居中显示
      //将图形加到地图上
      this.map.addLayer(
        new VectorLayer({
          source: new VectorSource({
            features: [polygon],
          }),
        })
      );

      // 获取图层的范围，然后用 ol.View 的 fit方法 居中显示
      let extent = this.map.vectorlayer.getSource().getExtent();
      this.map.getView().fit(extent);
    },

    //操作事件
    onEdit() {
      const transform = new ExtTransform({
        enableRotatedTransform: false,
        hitTolerance: 2,
        translate: true, // 拖拽
        stretch: false, // 拉伸
        scale: true, // 缩放
        rotate: true, // 旋转
        translateFeature: false,
        noFlip: true,
        // layers: [],
      });
      this.map.addInteraction(transform);

      //开始事件
      transform.on(["rotatestart", "translatestart"], function (e) {
        let startangle = e.feature.get("angle") || 0;
        // Translation
        console.log(1111);
        console.log(startangle);
      });
      //旋转
      transform.on("rotating", function (e) {
        console.log(2222);
        console.log(
          "rotate: " +
            ((((e.angle * 180) / Math.PI - 180) % 360) + 180).toFixed(2)
        );
        console.log(e);
      });
      //移动
      transform.on("translating", function (e) {
        console.log(3333);
        console.log(e.delta);
        console.log(e);
      });
      //拖拽事件
      transform.on("scaling", function (e) {
        console.log(4444);
        console.log(e.scale);
        console.log(e);
      });
      //事件结束
      transform.on(["rotateend", "translateend", "scaleend"], function (e) {
        console.log(5555, e);
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
