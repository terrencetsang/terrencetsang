<template>
  <div class="home">
    <el-container>
      <el-header height="80px">
        <el-row :gutter="20">
          <el-col :span="4">
            <img class="logo" src="../assets/logo.png" />
          </el-col>
          <el-col :span="16">
            <h2>后台管理系统</h2>
          </el-col>
          <el-col class="btn-text" :span="4">
            <el-button type="text">Terence</el-button>
          </el-col>
        </el-row>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <el-menu
            router
            active-text-color="#ffd04b"
            background-color="#6e757c"
            class="el-menu-vertical-demo"
            default-active="1"
            text-color="#fff"
          >
            <el-menu-item v-for="i in list" :key="i.path" :index="i.path">
              <el-icon>
                <icon-menu />
              </el-icon>
              <span>{{ i.meta.title }}</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-main>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "HomeView",
  components: {},
  setup() {
    const router = useRouter();
    const list = router.getRoutes().filter((v) => v.meta.isShow);
    console.log(list);

    return {
      list,
    };
  },
});
</script>
<style lang="scss" scoped>
.logo {
  height: 80px;
}

h2 {
  text-align: center;
  color: #fff;
  height: 80px;
  line-height: 80px;
}

.btn-text {
  text-align: right;
  height: 80px;
  line-height: 80px;

  .el-button--text {
    color: #fff;
  }
}

.el-header {
  background: #545c64;
}

.el-aside {
  .el-menu {
    height: calc(100vh - 80px);
  }
}
</style>
