<template>
  <div class="add-objective">
    <el-row>
      <el-button type="primary" style="float: right;" @click="outerVisible = true">添加Objective</el-button>
    </el-row>

    <el-dialog title="添加Objective" :visible.sync="outerVisible">
      <el-dialog width="55%" title="选择上级目标" :visible.sync="innerVisible" append-to-body>
        <tab-show />
      </el-dialog>

      <el-form ref="ruleForm" :model="ruleForm" :rules="rules" class="demo-dynamic">
        <el-form-item label="类型" :label-width="formLabelWidth" prop="level">
          <el-select v-model="ruleForm.level" placeholder="请选择类型">
            <el-option label="公司级" value="company" />
            <el-option label="个人级" value="person" />
          </el-select>
        </el-form-item>
        <el-form-item label="负责人" :label-width="formLabelWidth" prop="user_name">
          <el-input :disabled="true" v-text="ruleForm.user_name" />
        </el-form-item>
        <el-form-item label="目标名称" :label-width="formLabelWidth" prop="objective">
          <el-input v-model="ruleForm.objective" autocomplete="off" />
        </el-form-item>
        <el-form-item label="备注" :label-width="formLabelWidth" prop="note">
          <el-input
            v-model="ruleForm.note"
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4 }"
            placeholder="请输入内容"
          />
        </el-form-item>
        <el-form-item label="上级目标" :label-width="formLabelWidth">
          <el-tag
            v-show="ruleForm.up_objective"
            size="medium"
            type="info"
            closable
            disable-transitions="false"
            @close="handleClose"
            v-text="ruleForm.up_objective"
          />
          <el-button type="text" class="ml-1" @click="innerVisible = true">选择</el-button>
        </el-form-item>
        <el-form-item
          v-for="kr in ruleForm.key_results"
          :key="kr.krid"
          :label="'Key Result ' + kr.krid"
          :label-width="formLabelWidth"
          :rules="{ required: true, message: 'Key Result 不能为空', trigger: 'blur' }"
        >
          <el-col :span="23">
            <el-input v-model="kr.kr" autocomplete="off" />
          </el-col>
          <el-col :span="1">
            <i class="el-icon-remove" @click="removeKR(kr)" />
          </el-col>
        </el-form-item>
        <el-form-item label :label-width="formLabelWidth">
          <el-link type="primary" @click.prevent="addKR">
            <i class="el-icon-plus">继续添加 Key Result</i>
          </el-link>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelClick('ruleForm')">取 消</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import TabShow from './TabShow'
import Cookies from 'js-cookie'
import service from '@/utils/request'
import eventBus from '@/utils/eventBus'

class KeyResult {
  constructor(krid, kr = '', progress = 0, confidence = 5) {
    this.krid = krid
    this.kr = kr
    this.progress = progress
    this.confidence = confidence
  }
}

export default {
  components: {
    TabShow
  },
  data() {
    return {
      outerVisible: false,
      innerVisible: false,
      dialogFormVisible: false,
      ruleForm: {
        objective: '',
        up_okr_id: '',
        up_objective: '',
        level: '',
        key_results: [new KeyResult(1)],
        user_id: Cookies.get('request_user_id'),
        user_name: Cookies.get('request_user_name'),
        note: ''
      },
      formLabelWidth: '120px',
      rules: {
        user_name: [{ required: true }],
        objective: [
          { required: true, message: '请输入目标名称', trigger: 'blur' },
          { max: 100, message: '长度在100 个字符以内', trigger: 'blur' }
        ],
        note: [{ max: 255, message: '长度在 255 个字符以内', trigger: 'blur' }],
        level: [{ required: true, message: '请选择类型', trigger: 'change' }],
        key_results: [
          {
            type: 'array',
            required: true,
            message: '请至少填一个Key Result',
            trigger: 'change'
          }
        ]
      }
    }
  },
  mounted() {
    this.initListener()
  },
  beforeDestroy() {
    eventBus.$off('choose')
  },
  methods: {
    initListener() {
      eventBus.$on('choose', this.chooseUpObjective)
    },
    chooseUpObjective(up_okr_id, up_objective) {
      console.log(up_okr_id, up_objective)
      this.ruleForm.up_okr_id = up_okr_id
      this.ruleForm.up_objective = up_objective
      this.innerVisible = false
    },
    submitForm(formName) {
      var form = this.ruleForm
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(form.objective)
          service
            .request({
              url: '/addokr',
              // url: 'http://192.168.3.31:9528/api/kpi/v1/addokr',
              method: 'post',
              data: {
                objective: form.objective,
                up_okr_id: form.up_okr_id,
                up_objective: form.up_objective,
                level: form.level,
                key_results: form.key_results,
                user_id: form.user_id,
                user_name: form.user_name,
                note: form.note,
                period: Cookies.get('period'),
                period_type: Cookies.get('period_type')
              }
            })
            .then((res) => {
              console.log(res)
              if (res.errno === 0) {
                this.resetForm(formName)
                this.outerVisible = false
                this.$message({
                  message: 'OKR创建成功',
                  type: 'success'
                })
                eventBus.$emit('refresh_okr')
              }
            })
        } else {
          console.log('error submit!!')
          this.$message.error('请检查所填项')
          return false
        }
      })
    },
    cancelClick(formName) {
      this.resetForm(formName)
      this.outerVisible = false
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
      this.ruleForm.up_okr_id = ''
      this.ruleForm.up_objective = ''
      this.ruleForm.key_results = [new KeyResult(1)]
    },
    removeKR(item) {
      var index = this.ruleForm.key_results.indexOf(item)
      if (index !== -1 && this.ruleForm.key_results.length > 1) {
        this.ruleForm.key_results.splice(index, 1)
        var i = 1
        this.ruleForm.key_results = this.ruleForm.key_results.map((kr) => {
          kr.krid = i++
          return kr
        })
      }
    },
    addKR() {
      this.ruleForm.key_results.push(
        new KeyResult(this.ruleForm.key_results.length + 1)
      )
    },
    handleClose() {
      this.ruleForm.up_okr_id = ''
      this.ruleForm.up_objective = ''
    }
  },
  provide: {
    is_show_kr: false
  }
}
</script>

<style scoped>
.el-icon-remove {
  color: #f56c6c;
  padding-left: 5px;
  cursor: pointer;
}
.red-star {
  color: #f56c6c;
  margin-right: 5px;
}
</style>
