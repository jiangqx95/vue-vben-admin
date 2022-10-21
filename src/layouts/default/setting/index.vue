<template>
  <Tooltip :title="t('layout.header.tooltipSetting')" :mouseEnterDelay="0.5">
    <div @click="openDrawer(true)">
      <Icon icon="ion:settings-outline" />
      <SettingDrawer @register="register" />
    </div>
  </Tooltip>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import SettingDrawer from './SettingDrawer';
  import Icon from '/@/components/Icon';
  import { Tooltip } from 'ant-design-vue';

  import { useDrawer } from '/@/components/Drawer';
  import { useI18n } from '/@/hooks/web/useI18n';

  export default defineComponent({
    name: 'SettingButton',
    components: { SettingDrawer, Icon, Tooltip },
    setup() {
      const { t } = useI18n();
      const [register, { openDrawer }] = useDrawer();

      return {
        t,
        register,
        openDrawer,
      };
    },
  });
</script>
