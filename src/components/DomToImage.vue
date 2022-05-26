<template>
  <div>
    <div id="my-node" class="my-node">土拍你啊</div>

    <div @click="exportImg">按钮</div>
  </div>
</template>

<script>
import domtoimage from "dom-to-image";
export default {
  name: "Vue2tovue3OlDemoDomtoimage",

  data() {
    return {};
  },

  mounted() {},

  methods: {
    exportImg() {
      var node = document.getElementById("my-node");
      domtoimage
        .toPng(node)
        .then(function (dataUrl) {
          let link = document.createElement("a");
          link.download = "my-image-name.png";
          link.href = dataUrl;
          link.click();
        })
        .catch(function (error) {
          console.error("oops, something went wrong!", error);
        });

      domtoimage
        .toJpeg(document.getElementById("my-node"), { quality: 0.95 })
        .then(function (dataUrl) {
          let link = document.createElement("a");
          link.download = "my-image-name.jpeg";
          link.href = dataUrl;
          link.click();
        });
    },
  },
};
</script>

<style scoped>
.my-node {
  width: 400px;
  height: 400px;
  background-color: pink;
}
</style>
