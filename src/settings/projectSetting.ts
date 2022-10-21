import type { ProjectConfig } from '/#/config';
import { MenuTypeEnum, MenuModeEnum, TriggerEnum, MixSidebarTriggerEnum } from '/@/enums/menuEnum';
import { CacheTypeEnum } from '/@/enums/cacheEnum';
import {
  ContentEnum,
  PermissionModeEnum,
  ThemeEnum,
  RouterTransitionEnum,
  SettingButtonPositionEnum,
  SessionTimeoutProcessingEnum,
} from '/@/enums/appEnum';
import { SIDE_BAR_BG_COLOR_LIST, HEADER_PRESET_BG_COLOR_LIST } from './designSetting';
import { primaryColor } from '../../build/config/themeConfig';

// ! You need to clear the browser cache after the change
// ! 更改后需要清除浏览器缓存
const setting: ProjectConfig = {
  // Whether to show the configuration button
  // 是否显示配置按钮
  showSettingButton: true,

  // Whether to show the theme switch button
  // 是否显示主题切换按钮
  showDarkModeToggle: true,

  // `Settings` button position
  // “设置”按钮位置
  settingButtonPosition: SettingButtonPositionEnum.AUTO,

  // Permission mode
  // 权限模式
  permissionMode: PermissionModeEnum.ROUTE_MAPPING,

  // Permission-related cache is stored in sessionStorage or localStorage
  // 权限相关缓存存储在sessionStorage或localStorage中
  permissionCacheType: CacheTypeEnum.LOCAL,

  // Session timeout processing
  // 会话超时处理
  sessionTimeoutProcessing: SessionTimeoutProcessingEnum.ROUTE_JUMP,

  // color
  // 颜色
  themeColor: primaryColor,

  // Website gray mode, open for possible mourning dates
  // 网站灰色模式，开放供可能的哀悼日使用
  grayMode: false,

  // Color Weakness Mode
  // 色弱模式
  colorWeak: false,

  // Whether to cancel the menu, the top, the multi-tab page display, for possible embedded in other systems
  // 是否取消菜单、顶部、多选项卡页面显示，以便可能嵌入其他系统
  fullContent: false,

  // content mode
  // 内容模式
  contentMode: ContentEnum.FULL,

  // Whether to display the logo
  // 是否显示徽标
  showLogo: true,

  // Whether to show footer
  // 是否显示页脚
  showFooter: false,

  // Header configuration
  // 头配置
  headerSetting: {
    // header bg color
    // 头部背景颜色
    bgColor: HEADER_PRESET_BG_COLOR_LIST[0],

    // Fixed at the top
    // 固定在顶部

    fixed: true,
    // Whether to show top

    // 是否显示顶部
    show: true,

    // theme
    theme: ThemeEnum.LIGHT,

    // Whether to enable the lock screen function
    useLockPage: true,

    // Whether to show the full screen button
    showFullScreen: true,

    // Whether to show the document button
    showDoc: true,

    // Whether to show the notification button
    showNotice: true,

    // Whether to display the menu search
    showSearch: true,
  },

  // Menu configuration
  menuSetting: {
    // sidebar menu bg color
    bgColor: SIDE_BAR_BG_COLOR_LIST[0],
    //  Whether to fix the left menu
    fixed: true,
    // Menu collapse
    collapsed: false,
    // When sider hide because of the responsive layout
    siderHidden: false,
    // Whether to display the menu name when folding the menu
    collapsedShowTitle: false,
    // Whether it can be dragged
    // Only limited to the opening of the left menu, the mouse has a drag bar on the right side of the menu
    canDrag: false,
    // Whether to show no dom
    show: true,
    // Whether to show dom
    hidden: false,
    // Menu width
    // 菜单展开宽度
    menuWidth: 210,
    // Menu mode
    mode: MenuModeEnum.INLINE,
    // Menu type
    type: MenuTypeEnum.SIDEBAR,
    // Menu theme
    theme: ThemeEnum.DARK,
    // Split menu
    split: false,
    // Top menu layout
    topMenuAlign: 'center',
    // Fold trigger position
    trigger: TriggerEnum.HEADER,
    // Turn on accordion mode, only show a menu
    accordion: true,
    // Switch page to close menu
    closeMixSidebarOnChange: false,
    // Module opening method ‘click’ |'hover'
    mixSideTrigger: MixSidebarTriggerEnum.CLICK,
    // Fixed expanded menu
    mixSideFixed: false,
  },

  // Multi-label
  // 多标签
  multiTabsSetting: {
    cache: false,
    // Turn on
    show: true,
    // Is it possible to drag and drop sorting tabs
    // 是否可以拖放排序选项卡
    canDrag: true,
    // Turn on quick actions
    // 启用快速操作
    showQuick: true,
    // Whether to show the refresh button
    // 是否显示刷新按钮
    showRedo: true,
    // Whether to show the collapse button
    // 是否显示折叠按钮
    showFold: true,
  },

  // Transition Setting
  // 过渡设置
  transitionSetting: {
    // Whether to open the page switching animation
    // 是否打开切换页面动画
    // The disabled state will also disable pageLoading
    // 禁用状态也将禁用页面加载
    enable: true,

    // Route basic switching animation
    // 路由基本切换动画
    basicTransition: RouterTransitionEnum.FADE_SIDE,

    // Whether to open page switching loading
    // 是否打开页面切换加载
    // Only open when enable=true
    // 仅当enable=true时打开
    openPageLoading: true,

    // Whether to open the top progress bar
    // 是否打开顶部进度条
    openNProgress: false,
  },

  // Whether to enable KeepAlive cache is best to close during development, otherwise the cache needs to be cleared every time
  // 是否启用KeepAlive缓存，最好在开发期间关闭，否则每次都需要清除缓存
  openKeepAlive: true,

  // Automatic screen lock time, 0 does not lock the screen. Unit minute default 0
  // 自动屏幕锁定时间，0不锁定屏幕。单位分钟默认值0
  lockTime: 0,

  // Whether to show breadcrumbs
  // 是否显示面包屑
  showBreadCrumb: true,

  // Whether to show the breadcrumb icon
  // 是否显示面包屑图标
  showBreadCrumbIcon: false,

  // Use error-handler-plugin
  // 使用错误处理程序插件
  useErrorHandle: true,

  // Whether to open back to top
  // 是否打开返回顶部
  useOpenBackTop: true,

  // Is it possible to embed iframe pages
  // 是否可以嵌入iframe页面
  canEmbedIFramePage: true,

  // Whether to delete unclosed messages and notify when switching the interface
  // 切换界面时是否删除未关闭的消息并通知
  closeMessageOnSwitch: true,

  // Whether to cancel the http request that has been sent but not responded when switching the interface.
  // 切换接口时是否取消已发送但未响应的http请求。
  // If it is enabled, I want to overwrite a single interface. Can be set in a separate interface
  // 如果启用，我想覆盖单个接口。可以在单独的界面中设置
  removeAllHttpPending: false,
};

export default setting;
