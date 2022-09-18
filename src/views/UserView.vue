<template>
  <div>
    <div class="select-box">
      <el-form :inline="true" :model="selectData" class="demo-form-inline">
        <el-form-item label="姓名">
          <el-input v-model="selectData.nikeName" placeholder="请输入姓名" />
        </el-form-item>
        <el-form-item label="角色">
          <el-select v-model="selectData.role" class="m-2" placeholder="请选择">
            <el-option label="全部" :value="0" />
            <el-option
              v-for="item in roleList"
              :key="item.roleId"
              :label="item.roleName"
              :value="item.roleId"
            />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table :data="list" stripe style="width: 100%">
      <el-table-column prop="id" label="ID" width="180" />
      <el-table-column prop="nikeName" label="姓名" width="180" />
      <el-table-column prop="role" label="角色">
        <template #default="scope">
          <el-button
            v-for="i in scope.row.role"
            :key="i.role"
            type="text"
            size="small"
          >
            {{ i.roleName }}
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      v-model:currentPage="currentPage"
      v-model:page-size="pageSize"
      :page-sizes="[10, 20, 50, 100]"
      layout="total, sizes, prev, pager, next, jumper"
      :total="souList.length"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs, ref } from "vue";
import { InitData, UserInt } from "../types/user";
import { getUserList, getRoleList } from "../http/api";

export default defineComponent({
  setup() {
    const data = reactive(new InitData());
    const currentPage = ref(1);
    const pageSize = ref(10);
    onMounted(() => {
      initList();
    });
    const initList = () => {
      getUserList().then((res) => {
        data.souList = res.data;
        data.selectData.count = res.data.length;
        handleCurrentChange(1);
      });
      getRoleList().then((res) => {
        data.roleList = res.data;
      });
    };
    const handleCurrentChange = (curPage: number) => {
      data.selectData.page = curPage;
      currentPage.value = curPage;
      const list: any = data.souList.slice(
        (curPage - 1) * pageSize.value,
        pageSize.value * curPage
      );
      data.list = list;
    };
    const handleSizeChange = (sizeTotal: number) => {
      pageSize.value = sizeTotal;
      data.selectData.count = sizeTotal;
      data.list = data.souList.slice(
        (currentPage.value - 1) * sizeTotal,
        sizeTotal * currentPage.value
      );
    };
    const initSelect = (arr: any) => {
      currentPage.value = 1;
      pageSize.value = 10;
      return arr.slice(
        (currentPage.value - 1) * pageSize.value,
        pageSize.value * currentPage.value
      );
    };
    const onSubmit = () => {
      let arr: UserInt[] = [];
      if (
        data.selectData.nikeName ||
        (data.selectData.role && data.selectData.role !== 0)
      ) {
        if (data.selectData.nikeName) {
          arr = initSelect(
            data.souList.filter(
              (v) => v.nikeName.indexOf(data.selectData.nikeName) != -1
            )
          );
        }
        if (data.selectData.role) {
          arr = initSelect(
            data.souList.filter((v) =>
              v.role.find((i) => i.role === data.selectData.role)
            )
          );
        }
      } else {
        initList();
        arr = data.souList;
      }
      data.list = arr;
    };
    return {
      ...toRefs(data),
      currentPage,
      pageSize,
      onSubmit,
      initSelect,
      initList,
      handleCurrentChange,
      handleSizeChange,
    };
  },
});
</script>

<style scoped></style>
