<template>
  <div>
    <div class="select-box">
      <el-form :inline="true" :model="selectData" class="demo-form-inline">
        <el-form-item label="标题">
          <el-input v-model="selectData.title" placeholder="请输入关键字" />
        </el-form-item>
        <el-form-item label="详情">
          <el-input v-model="selectData.body" placeholder="请输入关键字" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table :data="list" stripe style="width: 100%">
      <el-table-column prop="id" label="ID" width="180" />
      <el-table-column prop="title" label="标题" width="180" />
      <el-table-column prop="body" label="详情" />
    </el-table>
    <el-pagination
      v-model:currentPage="currentPage"
      v-model:page-size="pageSize"
      :page-sizes="[10, 20, 50, 100]"
      layout="total, sizes, prev, pager, next, jumper"
      :total="400"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs, ref } from "vue";
import { InitData, ListInt } from "../types/order";
import { getList } from "../http/api";

export default defineComponent({
  setup() {
    const data = reactive(new InitData());
    const currentPage = ref(1);
    const pageSize = ref(10);
    const souList = ref([]);
    onMounted(() => {
      const { page } = data.selectData;
      getList(page).then((res) => {
        console.log(res);
        souList.value = res.data;
        data.selectData.count = res.data.length;
        handleSizeChange(10);
      });
    });
    const handleCurrentChange = (pageTotal: number) => {
      data.selectData.page = pageTotal;
    };
    const sliceList = (arr: ListInt[]) => {
      for (let index = 0; index < arr.length; index += 10) {
        let list: any = arr.slice(index, (index += 10));
        data.list.push(list);
      }
    };
    const handleSizeChange = (curSize: number) => {
      data.list = souList.value.slice(0, curSize);
    };
    return {
      ...toRefs(data),
      currentPage,
      pageSize,
      souList,
      sliceList,
      handleCurrentChange,
      handleSizeChange,
    };
  },
});
</script>

<style scoped></style>
