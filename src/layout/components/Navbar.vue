<template>
  <div class="navbar">
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo two-side"
      mode="horizontal"
      active-text-color="#409EFF"
      @select="handleSelect"
    >
      <!-- <el-submenu index="1">
        <template slot="title">
          KPI
        </template>
        <el-menu-item index="1-1">
          绩效报表
        </el-menu-item>
        <el-menu-item index="1-2">
          我的绩效
        </el-menu-item>
        <el-menu-item index="1-3">
          360互评
        </el-menu-item>
        <el-menu-item index="1-4">
          绩效列表
        </el-menu-item>
        <el-menu-item index="1-5">
          后台管理
        </el-menu-item>
      </el-submenu> -->
      <el-menu-item index="1">
        <a href="javascript:void(0)">KPI</a>
      </el-menu-item>
      <el-menu-item index="2">
        <a href="javascript:void(0)">OKR</a>
      </el-menu-item>

      <div class="right-menu">
        <div class="avatar-container">
          <div class="avatar-wrapper">
            <img
              :src="avatar + '?imageView2/1/w/80/h/80'"
              class="user-avatar"
            >
            <span class="user-name">{{ username }}</span>
          </div>
        </div>
      </div>
    </el-menu>
  </div>
</template>

<script>
import Cookies from 'js-cookie'
export default {
  components: {},
  data() {
    return {
      activeIndex: '2',
      activeIndex2: '2',
      username: Cookies.get('request_user_name'),
      avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif'
    }
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath)
      if (key !== '2') {
        window.location.href = '../kpi/index.html'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .two-side {
    padding-right: 10%;
    padding-left: 10%;

    .el-menu-item.is-active{
      font-weight: 600;
    }
  }
  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .user-name {
          position: relative;
          right: -10px;
          top: -15px;
          font-size: 14px;
        }
      }
    }
  }
}
</style>
<style>
@media screen and (max-width: 1200px) {
  .navbar .two-side {
    padding-left: 0 !important;
    padding-right: 0 !important;
  }
}
</style>
