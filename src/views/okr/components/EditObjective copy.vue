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
          <el-button type="text" class="ml-2" @click='newResultsFun()'>+ 新增</el-button>
        </el-row>
        <el-row>
            <div  style="margin-bottom:10px;"
              v-for="(item,index) in okr.key_results"
              :key="item.krid"
              :name="item.krid"
              
            >
            <!-- :disabled="!isOwn" -->
            <div class="tabcard">
                  <el-progress type="circle" :width="50" :percentage="item.progress" />
                  <span class="ml-1" v-text="'KR' + item.krid + '：' + item.kr" />
                  <el-tag class="ml-2" size="small" @click.native='setParamFun(item,index)' v-text="'信心指数：'+item.confidence+'/10'" />
                  <div class="rightBtn">
                    <el-button type="text" class="ml-2" @click.native='pinglunFun(item,index)'>查看评论</el-button>
                    <el-button type="text" class="ml-2" @click="editResultsFun(item)">编辑</el-button>
                    <el-button type="text" class="ml-2">删除</el-button>
                  </div>
                  <i class="rightArr el-icon-arrow-down"></i>
              </div>
                
              <div class="tabcardCont" :class="checkIndex == index && 'curr'"><!--  v-if="isOwn" 并且的关系-->
                  <el-row class="mb-1">
                    <el-col :span="2" class="tabcardCont-l">信心指数：</el-col>
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
              </div>
              <div class="assd" :class="tcIndex == index && 'curr'">
                  <div class="assd-bt">
                    <div class="assd-bt-left">
                      关于<span v-text="'KR' + item.krid + '：' + item.kr" />的评论留言
                    </div>
                    <div class="assd-bt-right">
                      <el-button type="primary" size="mini" @click.native='addpinglunFun(item,index)'>新建留言</el-button>
                    </div>
                  </div>
                  <div class="assd-bt border_b">
                    <div class="assd-bt-left">
                      <span>1# 赵胜艳</span>
                    </div>
                    <div class="assd-bt-right">
                      2020-09-02 12：10
                    </div>
                  </div>
                  <div class="border_b">
                    <div class="textCont">内容内容，内容内容，内容内容，内容内容，内容内容，内容内容，内容内容，内容内容，内容内容，内容内容，内容内容，内容内容，内容内容，内容内容，内容内容，容内容，内容内容，内容内容，容内容，内容内容，内容内容，容内容，内容内容，内容内容，容内容，内容内容，内容内容，容内容，内容内容，内容内容，</div>
                    <div class="textfile">
                      <div class="textfile-item">
                        <i class="el-icon-document"></i>
                        <p>文本.txt</p>
                        <p>21.kb<span>点击下载</span></p>
                      </div>
                      <div class="textfile-item">
                        <i class="el-icon-document"></i>
                        <p>文本文本文本文本文本文本文本文本.docx</p>
                        <p>8.9m<span>点击下载</span></p>
                      </div>
                      <div class="textfile-item">
                        <i class="el-icon-document"></i>
                        <p>文本.txt</p>
                        <p>21.kb<span>点击下载</span></p>
                      </div>
                      <div class="textfile-item">
                        <i class="el-icon-document"></i>
                        <p>文本.txt</p>
                        <p>21.kb<span>点击下载</span></p>
                      </div>
                    </div>
                    <div class="textbtn">
                      <span>编辑</span><span>回复</span><span>删除</span>
                    </div>
                  </div>
                  <div class="assd-bt border_b">
                    <div class="assd-bt-left">
                      <span>2# 陈宣宇</span>
                    </div>
                    <div class="assd-bt-right">
                      2020-09-02 12：10
                    </div>
                  </div>
                  <div class="border_b">
                    <div class="textCont">内容内容，内容内容，内容内容，内容内容，内容内容，内容内容，内容内容，内容内容，内容内容，内容内容，内容内容，内容内容，内容内容，内容内容，内容内容，容内容，内容内容，内容内容，容内容，内容内容，内容内容，容内容，内容内容，内容内容，容内容，内容内容，内容内容，容内容，内容内容，内容内容，</div>
                    
                  </div>
                  <div class="assd-bt">
                    <div class="assd-bt-left">
                      <el-pagination
                        small
                        layout="pager"
                        :total="50"
                        style="margin-left:-10px">
                      </el-pagination>
                    </div>
                    <div class="assd-bt-right">
                      <el-button type="primary" size="mini">新建留言</el-button>
                    </div>
                  </div>
              </div>
          </div>
        </el-row>
      </div>
      
    </el-drawer>

    <!--新建KeyResults 弹框-->
    <!-- <el-dialog title="新建 Key Results" :visible.sync="newResultsPop">
      <el-form :model="newResultsForm" :rules="newResultsRules" ref="newResultsForm" label-width="80px">
          <el-form-item  label="名称" prop="kr">
            <el-input v-model="newResultsForm.kr"  placeholder="请输入新建 Key Results的名称" :maxlength="50"></el-input>
          </el-form-item>
          <div slot="footer" class="dialog-footer">
            <el-button type="primary" :disabled="isDisable" @click="newResultsBtnFun">提 交</el-button>
            <el-button @click="newResultsPop = false">关 闭</el-button>
          </div>
      </el-form>
    </el-dialog> -->

    <!--编辑KeyResults弹框-->
    <!-- <el-dialog title="编辑" :visible.sync="editResultsPop">
      <el-form :model="editResultsForm" :rules="editResultsForm" ref="editResultsForm" label-width="80px">
        <el-form-item  label="名称" prop="kr">
          <el-input v-model="editResultsForm.kr"  placeholder="请输入新建 Key Results的名称" :maxlength="50"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="editResultsBtnFun">提 交</el-button>
        <el-button @click="editResultsPop = false">关 闭</el-button>
      </div>
    </el-dialog> -->

    <!--评论 弹框-->
    <!-- <el-dialog title="新建留言" :visible.sync="addPinglunPop">
      <el-form :model="newPinglunFormZ" :rules="newPinglunRulesForm" ref="newPinglunForm" label-width="80px">
        <el-form-item label="留言内容" prop="contentA">
          <el-input
            type="textarea"
            :rows="2"
            placeholder="请输入内容"
            v-model="newPinglunForm.contentA">
          </el-input>
        </el-form-item>
        <el-form-item label="附件">
            <el-upload
              class="upload-demo"
              :action='uploadFileHost'
              :on-preview="handlePreview"
              :on-remove="handleRemoveUpload"
              :before-remove="beforeRemove"
              multiple
              :headers=headers
              :name = "name"
              :data = "params"
              :before-upload = "beforeUpload"
              :on-exceed="handleExceed"
              :on-success = "onSuccess"
              :file-list="fileList">
              <el-button size="small" type="success">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">请确认无误后再上传，可上传多个文件，大小不限，pdf、word、excel或图片类型的文件！</div>
            </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="newPinglunBtnFun">提 交</el-button>
        <el-button @click="addPinglunPop = false">关 闭</el-button>
      </div>
    </el-dialog> -->
  </div>
</template>

<script>
import Cookies from 'js-cookie'
import service from '@/utils/request'
import eventBus from '@/utils/eventBus'
import { apiAgreementList } from '@/api/data.js'
export default {
  props: {
    dialog: {
      type: Boolean,
      default: false
    },
    okr: {
      type: Object,
      default: null
    },
  },
  data() {
    return {
      dialog:'',
      activeName: '',
      request_user_id: Cookies.get('request_user_id'),
      setParamShow:false,
      checkIndex: null,
      tcIndex: null,

      isDisable: false,//禁止连续点击提交
      //新建 没接口
      newResultsPop:false,
      newResultsForm:{
          kr :'',
        },
      newResultsRules:{
          //必填项
          kr:[
            { required : true, message: '请输入留言内容！'}
          ]
      },



      searchForm:{
        id:"",
        kr: "",
        krid: "", 
        progress:"",
        confidence: "",
      },
      //编辑
      editResultsPop:false,





      //评论
      addPinglunPop:false,
      newPinglunFormZ:{
        contentA:''
      },
      
      // newResultsRules:{
      //     //必填项
      //     contentA:[
      //       { required : true, message: '请输入留言内容！'}
      //     ]
      // },
      //上传文件 传数组 上传文件多个
        // headers: {username: this.getUsername()},
        name:"file",//file不变
        params:{},
        fileList: [],
        //uploadId:[],
        uploadFileHost: HOST2 + '/file/upload',
        //提交接口
        uploadUrl:'',
        //提交接口
        isDisabled:false,
        RcontractChanges:false,
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
  mounted() {
      console.log('okr ==', this.okr.key_results)
      console.log('okr ==', this.okr)//okr id
  },
  methods: {
// 阻止事件传播
    stopProp: function (e) {
      e.stopPropagation()
    },



/*---------上传附件 合同相关附件 传数组---------*/
      onSuccess(response, file, fileList){
        let o = {};
        o.name = response.fileName + response.fileNameExt;
        let t = response.filePath;
        let arr = t.split('//');
        response.filePath = `/${arr[1]}`;
        o.url = response.filePath;
        this.addClueForm.files.push(o);
        //console.log("name"+JSON.stringify(this.addClueForm.files));
      },
      beforeUpload(file){
        const isJPG = file.name.indexOf('.xls') != -1 || file.name.indexOf('.xlsx') != -1 || file.name.indexOf('.doc') != -1 || file.name.indexOf('.docx') != -1 || file.name.indexOf('.jpg') != -1 || file.name.indexOf('.jpeg') != -1 || file.name.indexOf('.pdf') != -1 || file.name.indexOf('.png') != -1 || file.name.indexOf('.gif') != -1;
        const isLt2M = file.size / 1024 / 1024 < 10;
        if (!isJPG) {
          this.$message({
            type: 'error',
            message: '上传文件只能是pdf、word、excel或图片类型的文件！',
            customClass: 'top200',
          });
        }
        if (!isLt2M) {
          this.$message({
            type: 'error',
            message: '上传文件大小不能超过 10MB!',
            customClass: 'top200',
          });
        }
        return isJPG && isLt2M;
        return isLt2M;
      },
      handleRemoveUpload(file, fileList) {
        /*console.log("=======================")
         console.log("删除操作file===="+JSON.stringify(file))
         console.log("删除操作fileList===="+JSON.stringify(file))
         console.log("=======================")*/
        let deleteUD = file.id;
        //let deleteUD = file.response.fileName + file.response.fileNameExt;
        let productFileIdsArr=this.addClueForm.files;
        for(var i in productFileIdsArr) {
          if(productFileIdsArr[i].name == deleteUD) {
            productFileIdsArr.splice(i,1);
          }
        }
        this.addClueForm.files=productFileIdsArr;
        this.fileList = fileList;
        /*console.log("删除操作后=files==="+JSON.stringify(this.addClueForm.files))
         console.log("删除操作后=file==="+JSON.stringify(this.file))
         console.log("删除操作后=fileList==="+JSON.stringify(this.fileList))
         console.log("=======================")*/
        if(file.id){
          let url = HOST2 + "/file/del?id="+deleteUD;
          this.$resource(url).get().then((response) => {
            if (response.body.code == '200') {
              console.log("删除成功")
            }
          })
        }
      },
      handlePreview(file) {
      },
      handleExceed(files, fileList) {
        //this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
        this.$message({
          type: 'warning',
          message: `当前限制上传5个文件，，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`,
          customClass: 'top200',
        });
      },
      beforeRemove(file, fileList) {
        return this.$confirm(`确定移除 ${ file.name }？`);
      },

    addpinglunFun:function(){
      this.addPinglunPop = true;
    },
    /*---------提交---------*/
      newPinglunBtnFun(){
        // console.log("传参数 接口===="+this.uploadUrl);
        if(this.RcontractChanges){this.addClueForm.isChange=1}
        var that = this;
        this.$refs[newPinglunRulesForm].validate((valid) => {
          //生效日期不能大于截止日期
          this.changeEnd();
          if (valid) {
            //禁止连续点击
            this.isDisable = true;
            setTimeout(() => {
              this.isDisable = false
            }, 1000);
            this.loading = true;
            //回显时，有多余字段，合同去多余字段
            let contractFileTJ = this.addClueForm.contractFile;
            let contractFileTJnew = {};
            contractFileTJnew.id = contractFileTJ.id;
            contractFileTJnew.name = contractFileTJ.name;
            contractFileTJnew.url = contractFileTJ.url;
            //回显时，有多余字段，合同附件去多余字段
            let filesArr = this.addClueForm.files;
            let filesArrnew = [];
            for(var i in filesArr) {
              if(filesArr[i].name){
                let o = {};
                o.id = filesArr[i].id;
                o.name = filesArr[i].name;
                o.url = filesArr[i].url;
                filesArrnew.push(o);
              }
            }
            let purchaseInfoVo = {};
            this.addClueForm.contractFile = contractFileTJnew;
            this.addClueForm.files = filesArrnew;
            /* console.log("=============================");
             console.log("提交==contractFile处理后===="+JSON.stringify(this.addClueForm.contractFile));
             console.log("提交==files处理后===="+JSON.stringify(this.addClueForm.files));
             console.log("=============================");*/
            this.addClueForm.start = this.yeartampConversion(this.addClueForm.start);
            this.addClueForm.end = this.yeartampConversion(this.addClueForm.end);
            this.addClueForm.signDate = this.yeartampConversion(this.addClueForm.signDate);
            //this.addClueForm.parentId = this.$route.query.id;
            this.addClueForm.status = "待定";
            for (let i in this.addClueForm) {
              if (this.addClueForm[i] !== '') {
                purchaseInfoVo[i] = this.addClueForm[i];
              }
            }
            purchaseInfoVo=JSON.stringify(purchaseInfoVo);//转为JSON传值
            // console.log("传参数 接口===="+this.uploadUrl);
             console.log("传参数===="+purchaseInfoVo);
             //return false
            this.$resource(this.uploadUrl).save({},purchaseInfoVo).then((response) => {
              this.loading = false;
              if (response.body.code == '200') {
                if(this.$route.query.id){
                  this.$message({
                    type: 'success',
                    message: '修改成功',
                    customClass: 'top200',
                    duration:1000
                  });
                }else{
                  this.$message({
                    type: 'success',
                    message: '添加成功',
                    customClass: 'top200',
                    duration:1000
                  });
                }
                this.loading = false;
                this.fileList2 = [];
                this.fileList = [];
                this.addClueForm.contractFile={};
                this.addClueForm.files=[];
                if(this.$route.query.id || this.$route.query.parentId){
                  setTimeout(function() {
                    that.$router.go(-1);
                  },1000);
                }else{
                  this.resetFormAdd();
                }
              } else {
                this.$message({
                  type: 'error',
                  message: response.body.message,
                  customClass: 'top200',
                });
              }
            });
          }else {
            return false;
          }
        })
      },
    //新建KeyResults
    newResultsFun:function(){
      this.newResultsPop = true;
    },
    //提交新建
    newResultsBtnFun:function(item){
            console.log("====提交新建==")
            console.log("====item==",item)
            this.searchForm={
                id:this.okr.id,
                kr:item.kr+'修改',
                krid:item.krid, 
                progress:item.progress, 
                confidence: item.confidence
            }
            console.log("====searchForm==",this.searchForm)
            apiAgreementList(this.searchForm).then(res => {
                console.log("res--",res);
                if (res.data.code == "200") {
                    console.log("this.searchForm--",this.searchForm);
                    console.log("0000");
                } else {
                    // this.$toast({
                    //     message: '网络出错了，请稍后重试',
                    //     type: 'wrong',
                    //     duration: '2000'
                    // })
                }
            });
    },


    setParamFun(item, index){
      this.checkIndex = index
      this.tcIndex = null
      this.setParamShow=true;
      console.log("item====",item);
    },
    zhishuFun(){
      console.log("====信心指数：==")
    },
    pinglunFun(item, index){
      this.checkIndex = null
      this.tcIndex = index

      




    },
    handleClose(done) {
      console.log("this.okr.user_id===",this.okr.user_id);
      console.log("this.okr",this.okr)
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
.assd {
  display: none;
position: relative;
z-index: 10;
  margin-top:-4px;
  
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    background-color: #FFF;
    color: #303133;
    border: 1px solid #ececec !important;
    border-top:1px solid #fff !important;
    padding:10px 20px 20px;
    border-radius:0 0 5px 5px;
    font-size: 12px;
}
.assd.curr {
  display: block;
}


.assd-bt {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;}
.assd-bt .assd-bt-left{
    -webkit-box-flex: 1;
    -ms-flex: 1;
    flex: 1;
     color: #999;
     line-height: 28px;

}
.assd-bt .assd-bt-left span{
  margin:0 3px;
  
  color: #333;
    
}
.assd-bt .assd-bt-right {
    background-color: transparent;
    line-height: 28px;
}
.textCont {
    line-height: 160%;
    margin-bottom: 10px;
}
.border_b{border-bottom: 1px solid #ececec;margin:10px 0}

.textfile{display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    margin:10px 0}
.textfile-item{
     color: #333;
     line-height: 28px;
     width: 33.3%;
}
.textfile-item i{
  float: left;
  font-size: 40px;
  padding:0 0 20px;
}
.textfile-item p{
  margin:0;
  margin-left:45px;
  line-height: 20px;
  font-size: 12px;
}
.textfile-item p span{
  color: #409EFF;
  cursor: pointer;
}
.textbtn{
  text-align: right;
  margin-bottom: 10px;
}
.textbtn span{
  margin:0 4px;
  color: #409EFF;
  cursor: pointer;

}
.rightBtn{
    position: absolute;
    right: 40px;
    top: 12px;
}
.rightArr{
  position: absolute;
    right: 20px;
    top: 25px;
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
  padding: 0 2rem!important;
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
.tabcard{
display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    height: 48px;
    line-height: 48px;
    background-color: #FFF;
    color: #303133;
    cursor: pointer;
    font-size: 13px;
    font-weight: 500;
    -webkit-transition: border-bottom-color .3s;
    transition: border-bottom-color .3s;
    outline: 0;
    border: 1px solid #ececec !important;
    line-height: 33px !important;
    height: 66px !important;
    padding-top: 0.5rem !important;
    padding-bottom: 0.5rem !important;
    position: relative;
    border-radius:5px;
    
    padding:0 10px
}
.tabcardCont{
  display: none;
position: relative;
z-index: 10;
  margin-top:-4px;
  
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    background-color: #FFF;
    color: #303133;
    border: 1px solid #ececec !important;
    border-top:1px solid #fff !important;
    padding:30px 20px 20px;
    border-radius:0 0 5px 5px
}
.tabcardCont.curr {
  display: block;
}
.tabcardCont-l{
   line-height:40px;
   font-size: 14px;
}
</style>
