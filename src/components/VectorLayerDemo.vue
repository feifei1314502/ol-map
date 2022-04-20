<template>
  <div id="Map" ref="map" style="width: 100vw; height: 100vh"></div>
</template>
<script>
import "ol/ol.css";
import TileLayer from "ol/layer/Tile";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import XYZ from "ol/source/XYZ";
import { Map, View, Feature } from "ol";
import { Style, Stroke, Fill } from "ol/style";
import { Polygon, MultiPolygon } from "ol/geom";
import { defaults as defaultControls } from "ol/control";
import { fromLonLat } from "ol/proj";

export default {
  data() {
    return {
      map: null,
      areaLayer: null,
    };
  },
  methods: {
    /**
     * 初始化地图
     */
    initMap() {
      var highlightStyle = new Style({
        fill: new Fill({
          color: "#245189", //高亮区域填充颜色，可用rgba值
        }),
        stroke: new Stroke({
          color: "#3e84cf", //高亮区域的边界线颜色
          width: 2,
        }),
      });

      var highlightSource = new VectorSource();
      var highlightLayer = new VectorLayer({
        source: highlightSource,
        style: highlightStyle,
      });

      console.log("highlightLayer", highlightLayer);
      this.map = new Map({
        target: "Map",
        controls: defaultControls({
          zoom: true,
        }).extend([]),
        layers: [
          new TileLayer(
            {
              source: new XYZ({
                url: "http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetPurplishBlue/MapServer/tile/{z}/{y}/{x}",
              }),
            },
            { zoomOffset: 1 }
          ),
          highlightLayer,
        ],
        view: new View({
          center: fromLonLat([108.522097, 37.272848]),
          zoom: 4.7,
          maxZoom: 19,
          minZoom: 4,
        }),
      });
      this.singleclick(this.map);

      //   //地图点击事件
      //   this.map.on("click", function (e) {
      //     // let zoom = this.map.getView().getZoom();
      //     let pixel = this.map.getEventPixel(e.originalEvent);
      //     this.map.forEachFeatureAtPixel(pixel, function (feature) {
      //       let coodinate = e.coordinate;
      //       //设置地图中心点和缩放级别，如不需要可省略
      //       this.map.view.setCenter(coodinate);
      //       this.map.view.animate({
      //         zoom: 7,
      //         duration: 1000,
      //       });
      //       //引用区域高亮方法
      //       addHighlightLayer(feature.N.name);
      //     });
      //   });
    },

    // 点击事件
    singleclick(map) {
      // 点击
      map.on("singleclick", (e) => {
        let pixel = map.getEventPixel(e.originalEvent);
        map.forEachFeatureAtPixel(pixel, (feature) => {
          let coodinate = e.coordinate;
          //设置地图中心点和缩放级别，如不需要可省略
          console.log("this.map", map, coodinate,e);
            // view.setCenter(coodinate);
          //   map.view.animate({
          //     zoom: 7,
          //     duration: 1000,
          //   });
          console.log("feature", feature);
          //引用区域高亮方法
          this.addHighlightLayer(feature.N.name);
        });

        console.log("pixel", pixel);
      });
    },

    addHighlightLayer() {
      //每次执行点击事件需清除之前的
      VectorSource.clear();
      //引入中国地图的geojson格式数据

      this.$axios
        .get("https://geo.datav.aliyun.com/areas_v3/bound/440300_full.json")
        .then((res) => {
          console.log(res);
          // var features = new ol.format.GeoJSON().readFeatures(res.data);
          // console.log('features',features);
          // features.forEach(function (element) {
          //   let jsonName = element.get("name");
          //   //如果点击的区域名称等于jeojson数据中的名称，则高亮显示
          //   if (jsonName === name) {
          //     highlightSource.addFeature(element);
          //   }
          // });
        });
    },
    /**
     * 设置区域
     */
    addArea(geo = []) {
      if (geo.length == 0) return false;
      let areaFeature = null;
      // 设置图层
      this.areaLayer = new VectorLayer({
        source: new VectorSource({
          features: [],
        }),
      });
      // 添加图层
      this.map.addLayer(this.areaLayer);

      geo.forEach((g) => {
        let lineData = g.features[0];
        if (lineData.geometry.type == "MultiPolygon") {
          areaFeature = new Feature({
            geometry: new MultiPolygon(lineData.geometry.coordinates).transform(
              "EPSG:4326",
              "EPSG:3857"
            ),
          });
        } else if (lineData.geometry.type == "Polygon") {
          areaFeature = new Feature({
            geometry: new Polygon(lineData.geometry.coordinates).transform(
              "EPSG:4326",
              "EPSG:3857"
            ),
          });
        }
      });
      areaFeature.setStyle(
        new Style({
          fill: new Fill({ color: "#4e98f444" }),
          stroke: new Stroke({
            width: 3,
            color: [71, 137, 227, 1],
          }),
        })
      );
      this.areaLayer.getSource().addFeatures([areaFeature]);
      // 获取图层的范围，然后用 ol.View 的 fit方法 居中显示
      let extent = this.areaLayer.getSource().getExtent();
      this.map.getView().fit(extent);
    },
  },
  mounted() {
    this.initMap(); //初始化地图方法

    this.$axios
      .get("https://geo.datav.aliyun.com/areas_v3/bound/440100_full.json")
      .then((res) => {
        console.log(res);
        this.addArea([res.data]); //添加区域图层方法
      });
    this.$axios
      .get("https://geo.datav.aliyun.com/areas_v3/bound/440300_full.json")
      .then((res) => {
        console.log(res);
        this.addArea([res.data]); //添加区域图层方法
      });
  },
};
</script>
