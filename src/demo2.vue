<template>
  <div>
    <el-container style="height: 500px; border: 1px solid #eee">
      <el-container>
        <el-main style="overflow: hidden">
          <el-tabs type="card" v-model="currTab" class="tabBefore">
            <el-tab-pane
              v-for="item in selectTab"
              :key="item.label"
              :label="item.label"
            >
              <div style="display: flex; padding-right: 10px">
                <div style="flex: 1">
                  <el-input
                    v-if="item.ref == 'other'"
                    style="width: calc(100% - 20px); margin: 0 10px"
                    placeholder="请输入内容"
                    size="small"
                    clearable
                    v-model="searchText"
                  >
                    <el-button
                      slot="append"
                      icon="el-icon-search"
                      @click="search"
                    ></el-button>
                  </el-input>
                  <div
                    :style="{
                      height:
                        item.ref == 'other' ? 'calc(100% - 32px)' : '100%',
                      overflow: 'auto',
                    }"
                  >
                    <el-tree
                      :data="item.data"
                      :show-checkbox="${isCheck}"
                      :ref="item.ref"
                      node-key="userId"
                      default-expand-all
                      check-strictly
                      :expand-on-click-node="expand"
                      :default-expanded-keys="expendKeys"
                      :filter-node-method="filterNode"
                      :highlight-current="highlight"
                    >
                      <span class="custom-tree-node" slot-scope="scope">
                        <span :class="{ isIng: scope.data.disabled }">{{
                          scope.data.userName
                        }}</span>
                        <span v-if="scope.data.ref == 'master'"
                          >待处理任务:{{ scope.data.number }}条</span
                        >
                      </span>
                    </el-tree>
                  </div>
                </div>

                <div style="width: 250px">
                  <div style="height: 36px; line-height: 32px">
                    当前环节已选
                    <span style="color: #3b86e0">{{
                      132456
                    }}</span>
                    人
                  </div>
                  <div
                    style="
                      border: 1px solid rgb(238, 238, 238);
                      padding: 10px;
                      height: 100%;
                      overflow-y: auto;
                    "
                  >
                    <div v-for="item1 in []" :key="item1">
                      <div
                        style="padding: 5px 0"
                        class="selector-user"
                        v-if="
                          selectData.includes(item1.userId) && !item1.parent
                        "
                      >
                        {{ item1.userName }}
                        <i
                          class="el-icon-error delect-user-icon-error"
                          @click="removeUser(item1.userId)"
                          style="float: right; padding: 0 5px; cursor: pointer"
                        ></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </el-tab-pane>
          </el-tabs>
          <span style="margin-top: 5px; display: block">注意事项</span>
          <i-input
            :iData="returnReason"
            v-model="value"
            common="true"
          ></i-input>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "Vue2tovue3OlDemoDemo2",

  data() {
    return {};
  },

  mounted() {},

  methods: {},
};
</script>

<style lang="scss" scoped></style>
