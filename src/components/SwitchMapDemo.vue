<template>
  <div id="content">
    <div id="map" ref="map"></div>
    <div id="mouse-position">
      <el-checkbox-group v-model="checkList">
        <el-checkbox label="天地图影像图" @change="changImage"></el-checkbox>
        <el-checkbox label="天地图影像标注" @change="changText"></el-checkbox>
      </el-checkbox-group>
    </div>
  </div>
</template>

<script>
import "ol/ol.css";
import { Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
import XYZ from "ol/source/XYZ";
import { fromLonLat } from "ol/proj";

// 切换图层--底图切换
export default {
  name: "Vue2tovue3Switchmapdemo",

  data() {
    return {};
  },

  mounted() {
    this.initMap();
  },

  methods: {
    // 初始化一个 openlayers 地图
    initMap() {
      let target = "map";
      let tileLayer = [
        new TileLayer({
          source: new XYZ({
            url: "http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetPurplishBlue/MapServer/tile/{z}/{y}/{x}",
          }),
        }),
      ];
      let view = new View({
        center: fromLonLat([104.912777, 34.730746]),
        zoom: 4.5,
      });
      this.map = new Map({
        target: target,
        layers: tileLayer,
        view: view,
      });
    },
    // 天地图影像图层
    changImage: function (checked) {
      if (checked) {
        this.TiandiMap_img = new TileLayer({
          name: "天地图影像图层",
          source: new XYZ({
            url: "http://t0.tianditu.com/DataServer?T=img_w&x={x}&y={y}&l={z}&tk=5d27dc75ca0c3bdf34f657ffe1e9881d", //parent.TiandituKey()为天地图**
            wrapX: false,
          }),
        });
        // 添加到地图上
        this.map.addLayer(this.TiandiMap_img);
      } else {
        this.map.removeLayer(this.TiandiMap_img);
      }
    },
    // 天地图影像注记图层
    changText: function (checked) {
      if (checked) {
        this.TiandiMap_cia = new TileLayer({
          name: "天地图影像注记图层",
          source: new XYZ({
            url: "http://t0.tianditu.com/DataServer?T=cia_w&x={x}&y={y}&l={z}&tk=5d27dc75ca0c3bdf34f657ffe1e9881d", //parent.TiandituKey()为天地图**
            wrapX: false,
          }),
        });
        // 添加到地图上
        this.map.addLayer(this.TiandiMap_cia);
      } else {
        this.map.removeLayer(this.TiandiMap_cia);
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
