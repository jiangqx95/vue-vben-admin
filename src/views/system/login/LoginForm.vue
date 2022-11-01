<template>
  <LoginFormTitle v-show="getShow" class="enter-x" />
  <Form
    class="p-4 enter-x"
    :model="formData"
    :rules="getFormRules"
    ref="formRef"
    v-show="getShow"
    @keypress.enter="handleLogin"
  >
    <!--账号-->
    <FormItem name="username" class="enter-x">
      <Input
        size="large"
        v-model:value="formData.username"
        :placeholder="t('sys.login.userName')"
        class="fix-auto-fill"
      />
    </FormItem>
    <!--密码-->
    <FormItem name="password" class="enter-x">
      <InputPassword
        allow-clear
        size="large"
        visibilityToggle
        v-model:value="formData.password"
        :placeholder="t('sys.login.password')"
      />
    </FormItem>
    <!--验证码-->
    <FormItem v-if="captcha.show" name="code" class="enter-x">
      <Input size="large" v-model:value="formData.code" :placeholder="t('sys.login.code')">
        <template #suffix>
          <img :src="captcha.img" alt="" @click="getVerificationCode" style="cursor: pointer" />
        </template>
      </Input>
    </FormItem>

    <ARow class="enter-x">
      <!--记住我-->
      <ACol :span="12">
        <FormItem>
          <Checkbox v-model:checked="rememberMe" size="small">
            {{ t('sys.login.rememberMe') }}
          </Checkbox>
        </FormItem>
      </ACol>
      <!--忘记密码-->
      <ACol :span="12">
        <FormItem :style="{ 'text-align': 'right' }">
          <Button type="link" size="small" @click="setLoginState(LoginStateEnum.RESET_PASSWORD)">
            {{ t('sys.login.forgetPassword') }}
          </Button>
        </FormItem>
      </ACol>
    </ARow>

    <!--登录按钮-->
    <FormItem class="enter-x">
      <Button type="primary" size="large" block @click="handleLogin" :loading="loading">
        {{ t('sys.login.loginButton') }}
      </Button>
      <!-- <Button size="large" class="mt-4 enter-x" block @click="handleRegister">
        {{ t('sys.login.registerButton') }}
      </Button> -->
    </FormItem>

    <ARow class="enter-x">
      <ACol :md="8" :xs="24">
        <!--手机登录-->
        <Button block @click="setLoginState(LoginStateEnum.MOBILE)">
          {{ t('sys.login.mobileSignInFormTitle') }}
        </Button>
      </ACol>
      <!--二维码登录-->
      <ACol :md="8" :xs="24" class="!my-2 !md:my-0 xs:mx-0 md:mx-2">
        <Button block @click="setLoginState(LoginStateEnum.QR_CODE)">
          {{ t('sys.login.qrSignInFormTitle') }}
        </Button>
      </ACol>
      <!--注册-->
      <ACol :md="6" :xs="24">
        <Button block @click="setLoginState(LoginStateEnum.REGISTER)">
          {{ t('sys.login.registerButton') }}
        </Button>
      </ACol>
    </ARow>

    <Divider class="enter-x">{{ t('sys.login.otherSignIn') }}</Divider>

    <!--其他登录方式-->
    <div class="flex justify-evenly enter-x" :class="`${prefixCls}-sign-in-way`">
      <GithubFilled />
      <WechatFilled />
      <AlipayCircleFilled />
      <GoogleCircleFilled />
      <TwitterCircleFilled />
    </div>
  </Form>
</template>
<script lang="ts" setup>
  import { reactive, ref, unref, computed } from 'vue';
  import { Checkbox, Form, Input, Row, Col, Button, Divider } from 'ant-design-vue';
  import {
    GithubFilled,
    WechatFilled,
    AlipayCircleFilled,
    GoogleCircleFilled,
    TwitterCircleFilled,
  } from '@ant-design/icons-vue';
  import LoginFormTitle from './LoginFormTitle.vue';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { useUserStore } from '/@/store/modules/user';
  import { LoginStateEnum, useLoginState, useFormRules, useFormValid } from './useLogin';
  import { useDesign } from '/@/hooks/web/useDesign';
  import Cookies from 'js-cookie';
  import { rsaEncrypt } from '/@/utils/encrypt/rsaEncrypt';
  import { cookieSetting } from '/@/settings/cookieSetting';

  const userStore = useUserStore();

  // 验证码对象
  const captcha = reactive({
    show: false, // 是否需要验证码
    img: '', // 图片
    uuid: '',
  });
  // 获取验证码
  getVerificationCode();

  const GLOB_APP_SHORT_NAME = import.meta.env.VITE_GLOB_APP_SHORT_NAME + '_';
  const ACol = Col;
  const ARow = Row;
  const FormItem = Form.Item;
  const InputPassword = Input.Password;
  const { t } = useI18n();
  const { notification, createErrorModal } = useMessage();
  const { prefixCls } = useDesign('login');
  const { setLoginState, getLoginState } = useLoginState();
  const { getFormRules } = useFormRules();
  const formRef = ref();
  const loading = ref(false);
  const rememberMe = ref(false);
  const getShow = computed(() => unref(getLoginState) === LoginStateEnum.LOGIN);
  const { validForm } = useFormValid(formRef);

  const formData = reactive({
    username: '',
    password: '',
    code: '',
  });

  // 获取cookie
  const rememberMe_ = Cookies.get(GLOB_APP_SHORT_NAME + 'rememberMe');
  rememberMe.value = rememberMe_ === undefined ? false : Boolean(rememberMe_);
  if (rememberMe.value) {
    const username = Cookies.get(GLOB_APP_SHORT_NAME + 'username');
    formData.username = username === undefined ? formData.username : username;
    const password = Cookies.get(GLOB_APP_SHORT_NAME + 'password');
    formData.password = password === undefined ? formData.password : password;
  }

  // 验证码请求
  async function getVerificationCode() {
    userStore.getVerificationCode().then((res) => {
      if (res.show != false) {
        captcha.show = true;
        captcha.img = res.img;
        captcha.uuid = res.uuid;
      }
    });
  }

  // 登录请求
  async function handleLogin() {
    // 表单校验
    const data = await validForm();
    if (!data) return;

    const encrypt_pass =
      data.password !== Cookies.get(GLOB_APP_SHORT_NAME + 'password')
        ? rsaEncrypt(data.password)
        : data.password;

    // 加密失败
    if (!encrypt_pass) {
      createErrorModal({
        title: t('sys.api.errorTip'),
        content: '密码错误',
        getContainer: () => document.body.querySelector(`.${prefixCls}`) || document.body,
      });
      return false;
    }

    try {
      loading.value = true;
      // 请求登录接口
      const userInfoModel = await userStore.login({
        password: encrypt_pass, // 密码
        username: data.username, // 用户名
        code: data.code, // 验证码
        uuid: captcha.uuid, // uuid
        mode: 'none',
      });
      if (userInfoModel) {
        if (rememberMe.value) {
          Cookies.set(GLOB_APP_SHORT_NAME + 'username', data.username, {
            expires: cookieSetting.passCookieExpires,
          });
          Cookies.set(GLOB_APP_SHORT_NAME + 'password', encrypt_pass, {
            expires: cookieSetting.passCookieExpires,
          });
          Cookies.set(GLOB_APP_SHORT_NAME + 'rememberMe', rememberMe, {
            expires: cookieSetting.passCookieExpires,
          });
        } else {
          Cookies.remove(GLOB_APP_SHORT_NAME + 'username');
          Cookies.remove(GLOB_APP_SHORT_NAME + 'password');
          Cookies.remove(GLOB_APP_SHORT_NAME + 'rememberMe');
        }
        notification.success({
          message: t('sys.login.loginSuccessTitle'),
          description: `${t('sys.login.loginSuccessDesc')}: ${userInfoModel.user.realName}`,
          duration: 3,
        });
      }
    } catch (error) {
      // 刷新二维码
      if (captcha.show) {
        await getVerificationCode();
      }
      // @ts-ignore
      const { response, message } = error || {};
      // 错误提示
      createErrorModal({
        title: t('sys.api.errorTip'),
        content:
          response?.data?.message ||
          response?.data?.error?.message ||
          message ||
          t('sys.api.networkExceptionMsg'),
        getContainer: () => document.body.querySelector(`.${prefixCls}`) || document.body,
      });
    } finally {
      loading.value = false;
    }
  }
</script>
