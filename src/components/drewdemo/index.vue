<template>
    <div id="app">
      <div id="map" class="map"></div>
    </div>
</template>

<script>
//导入基本模块
import "ol/ol.css";
import Map from "ol/Map";
import View from "ol/View";
import { Fill,Style,Stroke} from "ol/style";
//导入相关模块
import { Tile as TileLayer , Vector as VectorLayer } from 'ol/layer'
import { TileWMS ,Vector as VectorSource } from 'ol/source'
import { Select, Draw } from 'ol/interaction'
export default {
  name: "olMapImageWMSDrawLine",
  data() {
    return {
      map: null, // map地图
      layer:null, //地图图层
      lineLayer:null, //线图层
      draw: null,
      lineSource:null,
      coordinate: [],
   };
  },
  mounted() {
    this.initMap();
  },
  methods: {

    // 绘图工具
    onAddInteraction(type) {
        let self = this
        //勾绘矢量图形的类
        this.draw = new Draw({
            //source代表勾绘的要素属于的数据集
            source: self.lineSource,
            //type 表示勾绘的要素包含的 geometry 类型
            type: type
        })

        //绘制结束时触发的事件
        this.draw.on('drawend', function(e) {
            const geometry = e.feature.getGeometry()
            let pointArr = geometry.getCoordinates()
            self.coordinate.push(pointArr)
            console.log("self.coordinate="+self.coordinate);
            self.removeDraw()
        })
        self.map.addInteraction(this.draw)
    },
    //删除交互
    removeDraw() {
        this.map.removeInteraction(this.draw)
    },
    initMap() {
      //地图图层
      this.layer = new TileLayer({
        source: new TileWMS({
          //不能设置为0，否则地图不展示。
          ratio: 1,
          url: "http://localhost:8000/geoserver/nyc/wms",
          params: {
            LAYERS: "nyc:nyc_roads",
            STYLES: "",
            VERSION: "1.1.1",
            tiled: true
          },
          serverType: "geoserver",
        }),
      });

      //线的图层
      this.lineSource = new VectorSource({ wrapX: false });
      this.lineLayer = new VectorLayer({
          source: this.lineSource,
      });

      this.map = new Map({
        //地图容器ID
        target: "map",
        //引入地图
        layers: [this.layer,this.lineLayer],
        view: new View({
          //地图中心点
          center: [987777.93778, 213834.81024],
          zoom: 14,
          minZoom:6, // 地图缩放最小级别
          maxZoom:19,
        }),
      });

      // 获取点击地图的坐标(选中样式)
      let selectedStyle = new Style({
          fill: new Fill({
              color: 'rgba(1, 210, 241, 0.2)'
          }),
          stroke: new Stroke({
              color: 'yellow',
              width: 4
          })
      })
      // 选择线的工具类
      this.selectTool = new Select({
          multi: true,
          hitTolerance: 10, // 误差
          style: selectedStyle // 选中要素的样式
      })
      //添加交互
      this.map.addInteraction(this.selectTool)
      //调用绘图工具并传递类型为线，其他类型有Point,LineString,Polygon,Circle
      this.onAddInteraction('LineString')

    },
  },
};
</script>

<style scoped>
.map {
  width: 100%;
  height: 800px;
}
</style>