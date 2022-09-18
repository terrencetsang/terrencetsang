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
      :total="souList.length"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs, ref } from "vue";
import { InitData } from "../types/order";
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
        souList.value = res.data
        data.selectData.count = res.data.length;
        handleCurrentChange(1)
      });
    });
    const handleCurrentChange = (curPage: number) => {
      data.selectData.page = curPage
      currentPage.value = curPage      
      const list:any = souList.value.slice((curPage-1) * pageSize.value, pageSize.value*curPage)
      data.list=list
    };
    const handleSizeChange = (sizeTotal: number) => {
      pageSize.value = sizeTotal
      data.list = souList.value.slice((currentPage.value-1) * sizeTotal, sizeTotal);
      console.log(data.list);
      
    };
    return {
      ...toRefs(data),
      currentPage,
      pageSize,
      souList,
      handleCurrentChange,
      handleSizeChange,
    };
  },
});
</script>

<style scoped></style>
