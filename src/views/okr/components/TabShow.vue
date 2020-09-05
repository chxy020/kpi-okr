<template>
  <div>
    <el-tabs
      tab-position="left"
      style="min-height: 200px;"
    >
      <el-tab-pane :label="'我的OKR (' + myOKRs.length + ')'">
        <card-show
          v-for="okr in myOKRs"
          :key="okr.id"
          v-bind="okr"
        />
        <no-data v-show="myOKRs.length == 0" />
      </el-tab-pane>
      <el-tab-pane :label="'我对齐的OKR (' + myUpOKRs.length + ')'">
        <card-show
          v-for="okr in myUpOKRs"
          :key="okr.id"
          v-bind="okr"
        />
        <no-data v-show="myUpOKRs.length == 0" />
      </el-tab-pane>
      <el-tab-pane :label="'全部OKR (' + allOKRs.length + ')'">
        <card-show
          v-for="okr in allOKRs"
          :key="okr.id"
          v-bind="okr"
        />
        <no-data v-show="allOKRs.length == 0" />
      </el-tab-pane>
      <el-tab-pane :label="'公司级OKR (' + companyOKRs.length + ')'">
        <card-show
          v-for="okr in companyOKRs"
          :key="okr.id"
          v-bind="okr"
        />
        <no-data v-show="companyOKRs.length == 0" />
      </el-tab-pane>
      <el-tab-pane :label="'个人级OKR (' + personOKRs.length + ')'">
        <card-show
          v-for="okr in personOKRs"
          :key="okr.id"
          v-bind="okr"
        />
        <no-data v-show="personOKRs.length == 0" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import CardShow from './CardShow'
import NoData from '@/views/NoData'
import eventBus from '@/utils/eventBus'
import service from '@/utils/request'
import Cookies from 'js-cookie'

export default {
  components: {
    CardShow,
    NoData
  },
  data() {
    return {
      period: Cookies.get('period'),
      myOKRs: [],
      myUpOKRs: [],
      allOKRs: [],
      companyOKRs: [],
      personOKRs: [],
      user_id: Cookies.get('request_user_id')
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
        .then(res => {
          if (res.errno === 0) {
            const data = res.data
            this.myOKRs = []
            this.myUpOKRs = []
            this.companyOKRs = []
            this.personOKRs = []
            this.allOKRs = data
            const up_okr_id_list = []

            data.forEach(okr => {
              if (okr.user_id === this.user_id && okr.up_okr_id && !up_okr_id_list.includes(okr.up_okr_id)) {
                up_okr_id_list.push(okr.up_okr_id)
              }
              if (okr.user_id === this.user_id) {
                this.myOKRs.push(okr)
              }
              if (okr.level === 'company') {
                this.companyOKRs.push(okr)
              }
              if (okr.level === 'person') {
                this.personOKRs.push(okr)
              }
            })
            if (up_okr_id_list.length > 0) {
              for (let i = 0; i < up_okr_id_list.length; i++) {
                data.forEach(okr => {
                  if (okr.id.toString() === up_okr_id_list[i]) {
                    this.myUpOKRs.push(okr)
                  }
                })
              }
            }
          }
        })
    }
  }
}
</script>
