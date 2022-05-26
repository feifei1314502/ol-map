<template>
  <div>
    <el-container style="height: 500px; border: 1px solid #eee">
      <el-aside
        width="200px"
        style="border-right: 1px solid rgb(238, 238, 238)"
      >
        <div style="padding: 5px 20px; height: 24px">下一环节</div>
        <div
          class="submit-left-select"
          style="overflow: auto; width: 100%; height: calc(100% - 24px)"
        >
          <el-checkbox-group v-model="checkboxData">
            <div
              class="check-block"
              :class="currentNode == item.value ? 'check-select' : ''"
              v-for="item in mustCheckboxOption"
              :key="item"
              :title="item.label"
              @click="checkChange(item)"
            >
              <el-checkbox :label="item.value" :key="item.value" disabled>{{
                item.label
              }}</el-checkbox>
            </div>
          </el-checkbox-group>
          <el-checkbox-group v-model="checkboxData">
            <div
              class="check-block"
              :class="currentNode == item.value ? 'check-select' : ''"
              v-for="item in checkboxOption"
              :key="item"
              :title="item.label"
            >
              <el-checkbox
                :label="item.value"
                :key="item.value"
                @change="checkChange(item)"
                >{{ item.label }}</el-checkbox
              >
            </div>
          </el-checkbox-group>
          <el-radio-group v-model="radioData">
            <div
              class="check-block"
              :class="currentNode == item.value ? 'check-select' : ''"
              v-for="item in radioOption"
              :title="item.label"
              :key="item"
            >
              <el-radio
                :label="item.value"
                :key="item.value"
                @change="checkChange(item)"
                >{{ item.label }}</el-radio
              >
            </div>
          </el-radio-group>
        </div>
      </el-aside>
      <el-container>
        <el-main style="overflow: hidden">
          <el-tabs
            type="card"
            v-model="activeName"
            @tab-click="handleTabCick"
            class="tabBefore"
          >
            <el-tab-pane
              v-for="(item) in selectTab"
              :key="item.label"
              :name="item.ref"
              :label="item.label"
            >
              <div style="display: flex; padding-right: 10px">
                <div style="flex: 1">
                  <el-input
                    style="width: calc(100% - 20px); margin: 0 10px"
                    placeholder="请输入内容"
                    size="small"
                    v-model="searchText"
                  >
                    <div slot="suffix">
                      <a
                        @click="cleanSearchT(item.ref)"
                        href="javascript:;"
                        style="line-height: 35px; text-decoration: none"
                        class="el-icon-circle-close"
                      ></a>
                    </div>
                    <el-button
                      slot="append"
                      icon="el-icon-search"
                      @click="searchT(item.ref)"
                    ></el-button>
                  </el-input>
                  <div
                    :style="{
                      height:
                        item.ref == 'other'
                          ? 'calc(100% - 32px)'
                          : 'calc(100% - 32px)',
                      overflow: 'auto',
                    }"
                  >
                    <el-checkbox
                      v-model="selectorAll"
                      style="margin-left: 24px; padding: 5px 0 10px 0"
                      @change="checkSelectAll()"
                      >全选</el-checkbox
                    >
                    <el-tree
                      v-if="showTree"
                      :data="item.data"
                      :ref="item.ref"
                      show-checkbox
                      node-key="userId"
                      :default-expanded-keys="['alldept']"
                      :highlight-current="highlight"
                      :filter-node-method="filterNode"
                      default-expand-all
                      check-strictly
                      @check-change="handleCheckChange"
                      :default-checked-keys="item.selec"
                    >
                      <span class="custom-tree-node" slot-scope="scope">
                        <span>{{ scope.data.userName }}</span>
                        <span>{{ scope.data.userStact }}</span>
                      </span>
                    </el-tree>
                  </div>
                </div>

                <div style="width: 250px">
                  <div style="height: 36px; line-height: 32px">
                    当前环节已选
                    <span style="color: #3b86e0">{{
                      AllSelectUser.length
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
                    <div v-for="(item1) in userList" :key="item1.label">
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
          <span style="margin-top: 5px; display: block; margin-bottom: 5px"
            >办理提示</span
          >
          <i-input :iData="reason" v-model="value" common="true"></i-input>
        </el-main>
      </el-container> </el-container
    >`
  </div>
</template>

<script>
export default {
  name: "Vue2tovue3OlDemoDemo",

  data() {
    return {};
  },

  mounted() {},

  methods: {},
};
</script>

<style lang="scss" scoped></style>
