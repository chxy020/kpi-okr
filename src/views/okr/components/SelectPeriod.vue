<template>
  <el-dropdown
    size="medium"
    @command="handleCommand"
  >
    <span class="el-dropdown-link">
      {{ currentPeriod.text }}
      <i class="el-icon-arrow-down el-icon--right" />
    </span>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item
        v-for="(item, index) in periods"
        :key="index"
        :command="item"
        v-text="item.text"
      >
        2020年1季度OKR
      </el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
class Period {
  constructor(year, quarter = '') {
    this.year = year
    this.quarter = quarter
  }
  get value() {
    return this.quarter ? this.year + '-' + this.quarter : this.year.toString()
  }
  get text() {
    return (
      this.year + '年' + (this.quarter ? this.quarter + '季' : '') + '度OKR'
    )
  }
  get period_type() {
    return this.quarter ? 'quarter' : 'year'
  }
}
import eventBus from '@/utils/eventBus'
import { shallowClone } from '@/utils/index'
import Cookies from 'js-cookie'
import service from '@/utils/request'

export default {
  data() {
    return {
      periods: [],
      currentPeriod: shallowClone(new Period(new Date().getFullYear(), Math.ceil((new Date().getMonth() + 1) / 3)))
    }
  },
  watch: {
    currentPeriod(newValue) {
      const period_type = newValue.period_type
      const period = newValue.value
      eventBus.$emit('period_change', period_type, period)
      Cookies.set('period', period)
      Cookies.set('period_type', period_type)
    }
  },
  created() {
    this.initPeriods()
  },
  methods: {
    initPeriods() {
      const year = new Date().getFullYear().toString()
      const quarter = Math.ceil((new Date().getMonth() + 1) / 3).toString()
      this.periods.unshift(new Period(year))
      const current = new Period(year, quarter)
      // this.currentPeriod = shallowClone(current)
      this.periods.unshift(current)
      Cookies.set('period', current.value)
      Cookies.set('period_type', current.period_type)
      this.getHistoryPeriods()
    },
    handleCommand(command) {
      this.currentPeriod = command
    },
    getHistoryPeriods() {
      service.request({
        url: '/okr_periods'
      }).then(res => {
        if (res.errno === 0) {
          res.data.forEach(item => {
            // 将历史period加入this.periods,同时要避免重复
            const existPeriod = this.periods.map(p => p.value)
            if (!existPeriod.includes(item.period)) {
              const year = item.period_type === 'year' ? item.period : item.period.split('-')[0]
              const quarter = item.period_type === 'quarter' ? item.period.split('-')[1] : ''
              this.periods.push(new Period(year, quarter))
            }
          })
        }
      })
    }
  }
}
</script>

<style>
.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
  font-size: 16px;
}
</style>
