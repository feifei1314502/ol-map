<template>
  <div class="Treedemo">
    <sg-tree
      :data="data6"
      show-checkbox
      check-on-click-node
      slot-name="demoSlot"
      ref="tree"
      node-key="id"
    >
      <template slot="demoSlot" slot-scope="node">
        <div @dblclick.prevent="openDetail(node)">
          <div style="display: flex; align-items: center">
            <span>{{ node.label }}</span>
            <div class="content" v-if="node.test">
              <span>置顶</span>
              <span>缩放至图层</span>
            </div>
          </div>
          <div class="process" v-if="node.test">
            <sg-slider
              v-model="val1"
              width="500"
              :tip-format="tipFormat"
            ></sg-slider>
          </div>
        </div>
      </template>
    </sg-tree>
  </div>
</template>

<script>
export default {
  name: "Vue2tovue3OlDemoTreedemo",
  data() {
    return {
      data6: [
        {
          label: "一级 1",
          id: "001",
          test: false,
          children: [
            {
              label: "二级 1.1",
              id: "011",
              test: false,
              children: [{ label: "三级 1.1.1", id: "111", test: false }],
            },
            { label: "二级 1.2", id: "012", test: false },
          ],
        },
      ],

      tipFormat: (val) => {
        return `${val}%`;
        // return null
      },
    };
  },

  mounted() {},

  methods: {
    _processTree(treeData) {
      if (treeData && treeData.length) {
        treeData.forEach((item) => {
          item.test = false;
          if (item.children && item.children.length) {
            this._processTree(item.children);
          }
        });
      }
    },
    openDetail(node) {
      console.log("node", node);
      this._processTree(this.data6);
      this.$refs.tree.setNodeAttrs([node.id], {
        test: true,
      });
    },

    handlerUnit(value) {
      let reValue = "";
      //   符合规则
      if (/^[1-9]\d{0,}([0-9]|px|%)$/.test(value)) {
        //   百分比+大于100%
        reValue = /%$/.test(value) && Number(value) > 100 ? "100%" : value;
      }
      return reValue;
    },
  },
};
</script>

<style scoped>
.Treedemo {
  width: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
}
/deep/ .node-conent {
  display: flex;
  align-items: flex-start;
}
</style>
