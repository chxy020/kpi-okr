<template>
  <div @click.stop>
    <el-drawer
      title="OKR详情"
      direction="btt"
      size="95%"
      :visible.sync="drawer"
      :before-close="handleClose"
    >
      <div class="okr-content">
        <el-row class="mb-2" type="flex" justify="space-between" align="middle">
          <el-row type="flex" justify="start" align="middle">
            <el-avatar class="avatar-style" v-text="okr.user_name"> user </el-avatar>
            <span class="ml-1" v-text="okr.user_name" />
          </el-row>
          <el-row v-show="isOwn">
            <el-button class="mr-2" type="primary" @click="saveEditKR">保存</el-button>
            <el-button type="danger" @click="deleteOKR">删除</el-button>
          </el-row>
        </el-row>
        <el-row class="mb-2" type="flex" justify="start" align="middle">
          <i class="el-icon-aim" />
          <span class="ml-1 objective" v-text="okr.objective" />
          <el-tag size="small" :type="okr.tagType" class="ml-2" v-text="okr.levelText">公司级</el-tag>
          <el-button type="text" class="ml-2">编辑</el-button>
        </el-row>
        <el-row class="mb-2 ml-3 sub-label">
          <el-col :span="2">整体进度：</el-col>
          <el-col :span="10">
            <el-progress type="line" :percentage="okr.totalProgress" />
          </el-col>
        </el-row>
        <el-row v-if="okr.note" class="mb-2 ml-3 sub-label">
          <span>备注：</span>
          <span class="gray-font" v-text="okr.note" />
        </el-row>
        <el-row v-if="okr.up_okr_id" class="mb-2 ml-3 sub-label">
          <el-tag type="info">
            <i class="el-icon-connection" />
            <span class="ml-1" v-text="'上级目标：' + okr.up_objective" />
          </el-tag>
        </el-row>
        <el-row class="mb-1" type="flex" justify="start" align="middle">
          <i class="el-icon-s-flag" />
          <span class="ml-1" v-text="'Key Results (' + okr.key_results.length + ')'" />
          <el-button type="text" class="ml-2">+ 新增</el-button>
        </el-row>
        <el-row>
          <el-collapse v-model="activeName" accordion>
            <el-collapse-item
              v-for="item in okr.key_results"
              :key="item.krid"
              :name="item.krid"
              
            >
            <!-- :disabled="!isOwn" -->
              <template slot="title">
                <el-progress type="circle" :width="50" :percentage="item.progress" />
                <span class="ml-1" v-text="'KR' + item.krid + '：' + item.kr" />
                <el-tag class="ml-2" size="small" v-text="'信心指数：'+item.confidence+'/10'" />
                <div class="rightBtn">
                  <el-button type="text" class="ml-2" @click='pinglunFun'>查看评论</el-button>
                  <el-button type="text" class="ml-2">编辑</el-button>
                  <el-button type="text" class="ml-2">删除</el-button>
                </div>
              </template>
              <template >
                <!-- v-if="isOwn" -->
                <el-row class="mb-1">
                  <el-col :span="2">信心指数：</el-col>
                  <el-col :span="10">
                    <div class="block">
                      <el-slider v-model="item.confidence" :min="1" :max="10" show-input />
                    </div>
                  </el-col>
                </el-row>
                <el-row class="mb-1">
                  <el-col :span="2">当前进度：</el-col>
                  <el-col :span="10">
                    <div class="block">
                      <el-slider v-model="item.progress" show-input />
                    </div>
                  </el-col>
                </el-row>
                <div>00000</div>
              </template>
            </el-collapse-item>
          </el-collapse>
        </el-row>
      </div>
    </el-drawer>


<el-collapse v-model="activeNames" @change="handleChange">
  <el-collapse-item title="一致性 Consistency" @click.native="aaa()">
    <div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
    <div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div>
  </el-collapse-item>
</el-collapse>


  </div>
</template>

<script>
import Cookies from 'js-cookie'
import service from '@/utils/request'
import eventBus from '@/utils/eventBus'
export default {
  props: {
    dialog: {
      type: Boolean,
      default: false
    },
    okr: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      dialog:'',
      activeName: '',
      activeNames:'',
      request_user_id: Cookies.get('request_user_id')
    }
  },
  computed: {
    drawer() {
      return this.dialog
    },
    isOwn() {
      return this.request_user_id === this.okr.user_id
    }
  },
  methods: {
    handleChange(){
      console.log("==handleChangeadfaffaaaa====")
    },
    aaa(){
      console.log("vvvvvvvvv====")
    },
    pinglunFun(){
      console.log("======")
    },
    handleClose(done) {
      console.log("this.okr.user_id===",this.okr.user_id);
      this.$emit('dialog_show', false)
      done()
    },
    deleteOKR() {
      if (this.request_user_id !== this.okr.user_id) {
        this.$message.error('您无权限修改当前OKR')
        return
      }
      this.$confirm('确认删除该Objective，删除后该Objective的所有KeyResults将会被一并删除，关联的Objective将不受影响')
        .then(_ => {
          service.request({
            url: '/delete_okr',
            method: 'delete',
            data: {
              okr_id: this.okr.id,
              request_user_id: this.request_user_id
            }
          }).then((_) => {
            if (_.errno === 0) {
              this.$message({
                message: 'OKR删除成功',
                type: 'success'
              })
              eventBus.$emit('refresh_okr')
              this.$emit('dialog_show', false)
            }
          })
        })
        .catch(_ => {})
    },
    saveEditKR() {
      if (this.request_user_id !== this.okr.user_id) {
        this.$message.error('您无权限修改当前OKR')
        return
      }
      service.request({
        url: '/edit_okr',
        method: 'put',
        data: {
          okr_id: this.okr.id,
          key_results: this.okr.key_results,
          request_user_id: this.request_user_id
        }
      }).then((_) => {
        if (_.errno === 0) {
          this.$message({
            message: 'OKR更新成功',
            type: 'success'
          })
          eventBus.$emit('refresh_okr')
          this.$emit('dialog_show', false)
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>

.rightBtn{
    position: absolute;
    right: 70px;
    top: 12px;
}
.okr-content {
  margin: 3rem;
}
i {
  color: #409eff;
}
.el-icon-aim,.el-icon-s-flag {
  font-size: 1.5rem;
}
.gray-font {
  color: #909399;
}
.objective {
  font-size: 1.2rem;
}
.el-collapse-item {
  margin-bottom: 0.5rem !important;
  position: relative;
}
.confidence {
  display: inline-block;
}
.sub-label{
  font-size: .8rem;
}
.el-icon-connection{
  font-size: 1rem;
}
.avatar-style{
  background-color: #409EFF;
}
.el-icon-aim:before{
  content:url('../../../assets/icon_images/target_24.png');
}
</style>

<style lang="scss">
.el-drawer__title > span {
  outline: 0 !important;
}
.el-drawer__title > span:focus {
  outline: 0 !important;
}
.el-drawer__body {
  background-color: #f5f5f5 !important;
}
.el-collapse-item__content,
.el-collapse-item__header {
  padding: 2rem !important;
}
.el-collapse-item__header {
  border-bottom: 1px solid #ececec !important;
  line-height: 33px !important;
  height: 66px !important;
  padding-top: .5rem !important;
  padding-bottom: .5rem !important;
}
.el-drawer__body {
  overflow: auto;
}
</style>
