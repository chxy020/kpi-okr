<template>
  <div @click="clickCard">
    <el-col class="card-container" :span="21">
      <el-card shadow="hover" class="box-card" :class="{ 'judge-show': !is_show_kr }">
        <el-row slot="header" type="flex" class="clearfix mt-1" :class="{ 'pl-3': is_show_kr }">
          <el-progress :width="60" type="circle" :percentage="totalProgress" class="mr-1" />
          <el-col :span="18">
            <el-row class="one-line" v-text="objective">目标名称xxx</el-row>
            <el-row class="mt-1">
              <el-tag size="small" :type="tagType" class="mr-1" v-text="levelText">公司级</el-tag>
              <el-tag size="small" type effect="plain" class="mr-1" v-text="user_name">李鑫</el-tag>
            </el-row>
          </el-col>
        </el-row>
        <template v-if="is_show_kr">
          <div
            v-for="item in key_results"
            :key="item.krid"
            class="text item"
            v-text="'KR' + item.krid + '：' + item.kr +'('+item.confidence+'/10)'"
          />
        </template>
      </el-card>
    </el-col>

    <edit-objective
      v-if="is_show_kr"
      style="float: right; padding: 3px 0;"
      :dialog="dialog"
      :okr="{
        id,
        objective,
        up_okr_id,
        up_objective,
        key_results,
        note,
        level,
        user_id,
        user_name,
        period_type,
        period,
        levelText,
        tagType,
        totalProgress
      }"
      @dialog_show="handleDialog"
    />
  </div>
</template>

<script>
import EditObjective from './EditObjective'
import eventBus from '@/utils/eventBus'

export default {
  components: {
    EditObjective
  },
  props: [
    'id',
    'objective',
    'up_okr_id',
    'up_objective',
    'key_results',
    'note',
    'level',
    'user_id',
    'user_name',
    'period_type',
    'period'
  ],
  data() {
    return {
      dialog: false
    }
  },
  computed: {
    levelText() {
      return this.level === 'company' ? '公司级' : '个人级'
    },
    tagType() {
      return this.level === 'company' ? 'danger' : 'success'
    },
    totalProgress() {
      if (!this.key_results || this.key_results.length === 0) {
        return 0
      } else {
        let sum = 0
        for (const item of this.key_results) {
          sum += Number(item.progress)
        }
        return Math.floor(sum / this.key_results.length)
      }
    }
  },
  inject: ['is_show_kr'],
  methods: {
    handleDialog(isOpen) {
      this.dialog = isOpen
      if (!isOpen) {
        eventBus.$emit('refresh_okr')
      }
    },
    clickCard() {
      if (this.is_show_kr) {
        this.dialog = true
      } else {
        eventBus.$emit('choose', this.id, this.objective)
      }
    }
  }
}
</script>

<style scoped>
.card-container{
  margin: 0 3rem 1rem 3rem !important;
}
.box-card {
  cursor: pointer;
}
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
  padding-left: 3rem !important;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}
.one-line {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>

<style>
.judge-show .el-card__body {
  display: none !important;
}
.judge-show .item {
  padding-left: 0.5rem;
}
</style>
