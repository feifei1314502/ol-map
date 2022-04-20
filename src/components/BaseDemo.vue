<template>
  <div>
    <div id="map" class="map-home" style="width: 100vw; height: 100vh"></div>
    <div ref="popup" class="popup" v-show="shopPopup">
      <div class="info">
        <ul>
          <li>信息1xxx</li>
          <li>信息2xxx</li>
          <li>信息3xxx</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { Map, View, Feature, Overlay } from "ol";
import { Tile as TileLayer, Vector as VectorLayer } from "ol/layer";
import { XYZ, Vector as VectorSource } from "ol/source";
import * as olProj from "ol/proj";
import { Point } from "ol/geom";
import { Style, Fill, Stroke, Circle as sCircle, Text } from "ol/style";
import MousePosition from "ol/control/MousePosition";
import { createStringXY } from "ol/coordinate";
import { defaults as defaultControls } from "ol/control";
import Cluster from "ol/source/Cluster";
import { boundingExtent } from "ol/extent";
//基础配置
export default {
  name: "App",
  components: {},
  data() {
    return {
      openMap: null,
      popup: null,
      shopPopup: false,
      markerLayer: null, // 坐标标记层
      markerSource: null, // 坐标数据源
    };
  },
  mounted() {
    this.initMap();
    this.resolutionChange();
    this.rightClick();
  },
  methods: {
    // 初始化地图
    initMap() {
      const mousePositionControl = new MousePosition({
        coordinateFormat: createStringXY(4),
        projection: "EPSG:4326",
        // className: "custom-mouse-position",
        // target: document.getElementById("mouse-position"),
      });

      this.openMap = new Map({
        controls: defaultControls().extend([mousePositionControl]),
        target: "map",
        layers: [
          new TileLayer({
            source: new XYZ({
              url: "https://wprd0{1-4}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&style=7&x={x}&y={y}&z={z}",
            }),
          }),
        ],
        view: new View({
          // 将西安作为地图中心
          center: olProj.fromLonLat([108.945951, 34.465262]),
          zoom: 1,
        }),
      });
      this.setMarker();
      this.addOverlay();
      this.singleclick();
      this.pointermove();
    },
    // 添加标记
    setMarker() {
      // let _style = new Style({
      //   image: new sCircle({
      //     radius: 10,
      //     stroke: new Stroke({
      //       color: "#fff",
      //     }),
      //     fill: new Fill({
      //       color: "#3399CC",
      //     }),
      //   }),
      // });
      // // 图层
      // let _feature = new Feature({
      //   geometry: new Point(olProj.fromLonLat([108.91, 34.465262])),
      // });
      // _feature.setStyle(_style);
      // let _marker = new VectorLayer({
      //   source: new VectorSource({
      //     features: [_feature],
      //   }),
      // });
      // this.openMap.addLayer(_marker);

      this.setMarkerSource();
      let _style = this.setClusterStyle();
      this.markerLayer = new VectorLayer({
        source: this.markerSource,
        style: _style,
      });
      this.openMap.addLayer(this.markerLayer);
    },

    // 点击事件
    singleclick() {
      // 点击
      this.openMap.on("singleclick", (e) => {
        // // 判断是否点击在点上
        // let feature = this.openMap.forEachFeatureAtPixel(
        //   e.pixel,
        //   (feature) => feature
        // );
        // console.log(feature);
        // if (feature) {
        //   this.shopPopup = true;
        //   // 设置弹窗位置
        //   let coordinates = feature.getGeometry().getCoordinates();
        //   this.popup.setPosition(coordinates);
        // } else {
        //   this.shopPopup = false;
        // }

        // 聚合点
        this.markerLayer.getFeatures(e.pixel).then((clickedFeatures) => {
          if (clickedFeatures.length) {
            const features = clickedFeatures[0].get("features");
            if (features.length > 1) {
              const extent = boundingExtent(
                features.map((r) => r.getGeometry().getCoordinates())
              );
              this.openMap
                .getView()
                .fit(extent, { duration: 1000, padding: [200, 200, 200, 200] });
            } else {
              this.shopPopup = true;
              // 设置弹窗位置
              let coordinates = features[0].getGeometry().getCoordinates();
              this.popup.setPosition(coordinates);
            }
          } else {
            this.shopPopup = false;
          }
        });
      });
    },

    // 鼠标右击事件
    rightClick() {
      // 右键点击
      this.openMap.getViewport().oncontextmenu = (e) => {
        // 取消默认右键事件
        e.preventDefault();
        this.showMenuPopup = true;
        // 设置弹窗位置跟随鼠标
        let coordinates = this.openMap.getEventCoordinate(e);
        this.position = coordinates;
        this.menuPopup.setPosition(coordinates);
      };
    },

    // 鼠标上移
    pointermove() {
      this.openMap.on("pointermove", (e) => {
        if (this.openMap.hasFeatureAtPixel(e.pixel)) {
          this.openMap.getViewport().style.cursor = "pointer";
        } else {
          this.openMap.getViewport().style.cursor = "inherit";
        }
      });
    },
    // 添加覆盖物
    addOverlay() {
      // 创建Overlay
      let elPopup = this.$refs.popup;
      this.popup = new Overlay({
        element: elPopup,
        positioning: "bottom-center",
        stopEvent: false,
        offset: [0, -20],
      });
      this.openMap.addOverlay(this.popup);
    },

    resolutionChange() {
      // 监听缩放
      this.openMap.getView().on("change:resolution", (e) => {
        console.log(e);
        this.shopPopup = false;
      });
    },
    // 演示直接静态返回坐标数组，实际项目中可改成接口获取数据
    getPoints() {
      return [
        [108.945951, 34.465262],
        [109.04724, 34.262504],
        [108.580321, 34.076162],
        [110.458983, 35.071209],
        [105.734862, 35.49272],
      ];
    },

    // 多个坐标点显示
    setMarkerSource() {
      // 坐标点样式
      let _style = new Style({
        image: new sCircle({
          radius: 10,
          stroke: new Stroke({
            color: "#fff",
          }),
          fill: new Fill({
            color: "#3399CC",
          }),
        }),
      });
      let _points = this.getPoints();
      // 遍历生成图层点
      let _features = _points.reduce((list, item) => {
        let _feature = new Feature({
          geometry: new Point(olProj.fromLonLat(item)),
        });
        _feature.setStyle(_style);
        list.push(_feature);
        return list;
      }, []);
      // this.markerSource = new VectorSource({
      //   features: _features,
      // });

      this.markerSource = new Cluster({
        distance: 100,
        source: new VectorSource({
          features: _features,
        }),
      });
    },

    // 设置聚合物的样式
    setClusterStyle() {
      const styleCache = {};
      const _style = (feature) => {
        const size = feature.get("features").length;
        let style = styleCache[size];
        if (!style) {
          // 聚合和非聚合样式判断
          /**
           * 如果是需要更多个性化设置，在聚合时需要判断feature，
           * 并且你需要在每一个点的feature创建时使用feature.set("key","value","boolean")的方式把你的自定义信息写入，
           * 然后通过item.get("key")判断分别设置，可自行去研究。
           */
          if (size > 1) {
            style = new Style({
              image: new sCircle({
                radius: 20,
                stroke: new Stroke({
                  color: "#fff",
                }),
                fill: new Fill({
                  color: "#3399CC",
                }),
              }),
              text: new Text({
                text: size.toString(),
                fill: new Fill({
                  color: "#fff",
                }),
              }),
            });
          } else {
            style = new Style({
              image: new sCircle({
                radius: 15,
                stroke: new Stroke({
                  color: "#fff",
                }),
                fill: new Fill({
                  color: "#e9b626",
                }),
              }),
            });
          }
          styleCache[size] = style;
        }
        return style;
      };
      return _style;
    },
  },
};
</script>

<style></style>
