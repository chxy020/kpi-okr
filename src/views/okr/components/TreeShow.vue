<template>
  <div>
    <v-chart v-if="okrList.length != 0" style="width:100%;height:200px;" :options="tree" />
    <no-data v-show="okrList.length == 0" />
  </div>
</template>

<script>
import ECharts from 'vue-echarts'
import 'echarts/lib/chart/tree'
import 'echarts/lib/component/tooltip'
import NoData from '@/views/NoData'
import eventBus from '@/utils/eventBus'
import service from '@/utils/request'
import Cookies from 'js-cookie'

export default {
  components: {
    'v-chart': ECharts,
    NoData
  },
  data() {
    return {
      period: Cookies.get('period'),
      okrList: [],
      treeData: null,
      tree: {
        tooltip: {
          trigger: 'item',
          triggerOn: 'mousemove',
          formatter: function(item) {
            if (item.value === -1) {
              return
            }
            const { objective, user_name, level, key_results } = item.data
            const levelText = level === 'company' ? '公司级' : '个人级'
            const personCss = 'border-color: #e1f3d8; color: #67c23a;' // background-color: #f0f9eb;
            const companyCss = 'border-color: #fde2e2; color: #f56c6c;' // background-color: #fef0f0;
            const progressList = key_results.map((item) => item.progress)
            const progressSum = progressList.reduce(
              (total, num) => total + num
            )
            const progress =
              Math.floor(progressSum / progressList.length).toString() + '%'
            return `<div style="padding:8px 12px;border-radius:10px;">${objective}</br>
                      <div style="color:#cccccc;font-size:12px;margin-top:5px;">负责人：${user_name}</br>
                      进度：${progress}</br>
                      <span style="display:inline-block;border: 1px solid #d9ecff;border-radius: 4px;margin-top:3px; padding:1px 5px;font-size:10px;${
  level === 'person' ? personCss : companyCss
}">${levelText}</span>
                      </div>
                    </div>`
          }
        },
        series: [
          {
            // 注意，最外层是一个对象，代表树的根节点
            type: 'tree',
            data: [],
            top: '1%',
            left: '15%',
            bottom: '1%',
            right: '20%',
            symbolSize: 16,
            itemStyle: {
              borderColor: '#409EFF'
            },
            label: {
              position: 'left',
              verticalAlign: 'middle',
              align: 'right',
              fontSize: 12,
              backgroundColor: '#ffffff',
              borderRadius: 3,
              shadowColor: '#b2b2b2',
              shadowBlur: 5,
              padding: 5
            },

            leaves: {
              label: {
                position: 'right',
                verticalAlign: 'middle',
                align: 'left'
              }
            },

            expandAndCollapse: true,
            animationDuration: 550,
            animationDurationUpdate: 750
          }
        ]
      }
    }
  },
  created() {
    this.initListener()
  },
  mounted() {
    this.getOKRList()
  },
  beforeDestroy() {
    eventBus.$off('period_change')
    eventBus.$off('refresh_okr')
  },
  methods: {
    initListener() {
      eventBus.$on('period_change', this.periodChange)
      eventBus.$on('refresh_okr', this.getOKRList)
    },
    generateTree(root) {
      if (!root.children) {
        this.tree.series[0].data = [this.treeData]
        return
      }
      var children = []
      for (const child of root.children) {
        for (const okr of this.okrList) {
          if (child.okr_id === okr.id) {
            children.push(okr)
          }
        }
      }
      root.children = []
      for (const item of children) {
        const node = { name: item.objective, value: item.id, ...item }
        root.children.push(node)
        this.generateTree(node)
      }
    },
    periodChange(period_type, period) {
      this.period = period
      this.getOKRList()
    },
    getOKRList() {
      if (!this.period) {
        return
      }
      service
        .request({
          url: '/getokrs',
          params: {
            period: this.period
          }
        })
        .then((res) => {
          if (res.errno === 0) {
            this.okrList = []
            this.treeData = null
            this.tree.series[0].data = []
            const data = res.data
            this.okrList = data
            if (data.length === 0) {
              this.treeList = []
              return
            } else {
              let children = data.filter((item) => !item.up_okr_id)
              children = children.map((item) => {
                const obj = {
                  okr_id: item.id
                }
                return obj
              })
              this.treeData = {
                name: `${this.period}${
                  this.period.includes('-') ? '季度' : '年度'
                }OKR`,
                value: -1,
                children: children
              }
              this.generateTree(this.treeData)
            }
          }
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.echarts {
  width: 100%;
  height: 100%;
}
</style>
