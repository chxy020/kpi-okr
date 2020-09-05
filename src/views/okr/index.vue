<template>
  <div class="dashboard-container">
    <el-row type="flex" justify="end" align="middle" class="mb-1">
      <select-period class="mr-1" />
      <add-objective class="mr-1" />
      <router-link :to="$route.path.endsWith('tree')?'/okr/list':'/okr/tree'">
        <el-button
          size="small"
          plain
          :icon="$route.path.endsWith('tree')?'el-icon-menu':'el-icon-connection'"
        >
          {{ $route.path.endsWith('tree')?'列表视图':'关系视图' }}</el-button>
      </router-link>
    </el-row>
    <router-view />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import AddObjective from './components/AddObjective'
import SelectPeriod from './components/SelectPeriod'

export default {
  name: 'Okr',
  provide: {
    is_show_kr: true
  },
  components: {
    AddObjective,
    SelectPeriod
  },
  computed: {
    ...mapGetters(['name', 'token', 'period'])
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
}
.dashboard-container {
  padding-left: 10%;
  padding-right: 10%;
}
@media only screen and (max-width: 1200px) {
  .dashboard-container {
    padding-left: 0;
    padding-right: 0;
  }
}
</style>
