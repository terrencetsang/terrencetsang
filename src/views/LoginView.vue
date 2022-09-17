<template>
  <div class="login-box">
    <el-form ref="loginFormRef" :model="loginForm" status-icon :rules="rules" label-width="120px" class="loginForm">
      <h1 class="title">后台管理系统</h1>
      <el-form-item label="账号" prop="userName">
        <el-input v-model="loginForm.userName" type="text" autocomplete="off" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="loginForm.password" type="password" autocomplete="off" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" style="width: 100%" @click="submitForm(loginFormRef)">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";
import { InitData } from "../types/login";
import { FormInstance } from "element-plus";

export default defineComponent({
  setup() {
    const data = reactive(new InitData());
    const rules = {
      userName: [
        { required: true, message: "请输入账号", trigger: "blur" },
        {
          min: 6,
          max: 24,
          message: "账号长度需要在6-24之间",
          trigger: "blur",
        },
      ],
      password: [
        { required: true, message: "请输入密码", trigger: "blur" },
        {
          min: 6,
          max: 24,
          message: "密码长度需要在6-24之间",
          trigger: "blur",
        },
      ],
    };
    const submitForm = (loginFormRef: FormInstance) => {
      loginFormRef.validate((valid: boolean) => {
        if (valid) {
          alert("验证通过!");
        }
      });
    };
    return {
      ...toRefs(data),
      rules,
      submitForm,
    };
  },
});
</script>

<style lang="scss" scoped>
.login-box {
  width: 100%;
  height: 100%;
  background: url("../assets/bg.png") no-repeat center;
  box-sizing: border-box;
  position: relative;

  .title {
    text-align: center;
    line-height: 88px;
  }

  .loginForm {
    width: 400px;
    padding: 20px;
    background-color: #fff;
    border-radius: 20px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>
