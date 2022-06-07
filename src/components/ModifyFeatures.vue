<template>
  <div id="map" style="height: 100vh; width: 100vw"></div>
</template>

<script>
import "ol/ol.css";
import { Map, View, Feature } from "ol";
import { OSM, Vector as VectorSource } from "ol/source";
import { Vector as VectorLayer, Tile as TileLayer } from "ol/layer";
import { LineString } from "ol/geom";
import { Modify } from "ol/interaction";
export default {
  data() {
    return {
      map: {},
      lineStringLayer: {},
      modify: {},
    };
  },
  created() {},
  mounted() {
    this.initMap();
    this.addLayer();
    this.modifyFeature();
  },
  computed: {},
  methods: {
    initMap() {
      this.map = new Map({
        target: "map",
        layers: [
          new TileLayer({
            source: new OSM(),
          }),
        ],
        view: new View({
          projection: "EPSG:4326",
          center: [104.2979180563, 30.528298024],
          zoom: 18,
        }),
      });
    },
    addLayer() {
      this.lineStringLayer = new VectorLayer({
        source: new VectorSource(),
      });
      this.lineStringLayer.getSource().addFeature(
        new Feature({
          geometry: new LineString([
            [104.2979180563, 30.528298024],
            [104.2987389704, 30.527798338],
          ]),
        })
      );
      this.map.addLayer(this.lineStringLayer);
    },
    // 修改要素核心代码
    modifyFeature() {
      this.modify = new Modify({
        source: this.lineStringLayer.getSource(), //这里要用source
      });
      this.map.addInteraction(this.modify);
    },
  },
};
</script>
