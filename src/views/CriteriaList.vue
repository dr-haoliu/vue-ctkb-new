<template>
    <el-container
        v-loading="loading"
        element-loading-text="Loading..."
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)"
        style="width: 80%; margin: auto; padding: 10px; display: flex; flex-direction: column;">
            <el-header>

                <h4 id="querycondition" style="margin-top: 15px">
                    Criteria Selected for: {{condition}}
                </h4>
            </el-header>
            <el-main>
                <div id="includelist">

                    <SingleCriteria v-for="(item, index) in inclist"
                                :key="item.id"
                                :index="index"
                                :itemC="item"
                                @deleteIncIndex="delInc">
                    </SingleCriteria>

                </div>

                <div id="excludelist">
                    <SingleCriteria v-for="(item, index) in exclist"
                                    :key="item.id"
                                    :index="index"
                                    :itemC="item"
                                    @deleteExcIndex="delExc">
                    </SingleCriteria>

                </div>
            </el-main>


<!--            <el-button-group style="padding: 40px">-->
                <!--  <a class="btn btn-info" id="nextstep" role="button" data-toggle="modal" data-target="#myModal">&nbsp;&nbsp;See More&nbsp;&nbsp;</a>-->
        <el-row style="width: 80%; margin: auto; margin-top: 10px; display: flex;">
                <el-button type="success" id="ehrprojection" @click="toEHRProjection()" round style="margin-right: 5px">Estimate Recruitment with EHR</el-button>
                <el-button type="warning" id="download" round style="margin-right: 5px" @click="downloadJson()">Download JSON Format</el-button>
                <el-button type="primary" id="generate" round style="margin-right: 5px">Generate Human Readable Text</el-button>
<!--            </el-button-group>-->
        </el-row>

    </el-container>
</template>

<script>
    import SingleCriteria from "../components/criterialistpage/SingleCriteria";
    import axios from "axios";

    var atlasurl = "http://www.ohdsi.org/web/atlas/";

    export default {
        name: "CriteriaList",
        components:{SingleCriteria},
        data(){
            return {
                condition:'Testing',
                inclist:[],
                exclist:[],
               loading: false,
            }
        },
        methods:{
            getList(){
                this.inclist = this.$route.params.inclist;
                this.exclist = this.$route.params.exclist;
            },
            // delete criteria
            delInc(index) {
                this.inclist.splice(index, 1);
                // console.log('deleted: ', JSON.stringify(this.inclist));
            },
            delExc(index) {
                console.log('deleted index: '+ index);
                this.exclist.splice(index, 1);
                // console.log('deleted: ', JSON.stringify(this.exclist));
            },
            toEHRProjection(){
              this.loading= true;
              var criList = this.inclist.concat(this.exclist);
              axios({
                headers: {
                  'Content-Type': 'application/json;'
                },
                method: 'post',
                url: this.$apiUrl+"/function/cohortdef/",
                transformRequest: [function (data) {
                  // 对 data 进行任意转换处理
                  return JSON.stringify(data);
                }],
                data: {
                  "cTerm": this.$store.state.condition,
                  "cId": this.$store.state.conditionId,
                  "criList": criList,
                },
              }).then(response => {
                this.loading=false;
                console.log("Testing Atlas");
                console.log(response.data);
                window.open(atlasurl + "#/cohortdefinition/" + response.data['cohortId']);

                // var map = response.data;
                // this.criteriaObj.p1 = map['Phase 1'];
                // this.criteriaObj.p2 = map['Phase 2'];
                // this.criteriaObj.p3 = map['Phase 3'];
                // this.criteriaObj.p4 = map['Phase 4'];
                // this.sum = this.criteriaObj.p1 + this.criteriaObj.p2+ this.criteriaObj.p3+ this.criteriaObj.p4;
                this.loading = false;
              }).catch(function (err) {
                    console.log(err);
                    return -1;
                  })

              // axios.post(this.$apiUrl+"/function/cohortdef/", criList)
              //     .then(response => {
              //       console.log(response.data);
              //
              //       var map = response.data;
              //       this.criteriaObj.p1 = map['Phase 1'];
              //       this.criteriaObj.p2 = map['Phase 2'];
              //       this.criteriaObj.p3 = map['Phase 3'];
              //       this.criteriaObj.p4 = map['Phase 4'];
              //       this.sum = this.criteriaObj.p1 + this.criteriaObj.p2+ this.criteriaObj.p3+ this.criteriaObj.p4;
              //       this.loading = false;
              //     })
              //     .catch(function (err) {
              //       console.log(err);
              //       return -1;
              //     })

          },
          downloadJson(){
            var criList = this.inclist.concat(this.exclist);
            const data = JSON.stringify(criList);
            const blob = new Blob([data], { type: 'text/plain' });
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = "criteria_list.json";
            link.click();
            URL.revokeObjectURL(link.href);
          }
        },
        created() {
            this.getList();
            this.condition = this.$store.state.condition;
            console.log('get condition: ' + this.condition);
            console.log('get include list: ' + this.inclist);
            console.log('get exclude list: ' + this.exclist);
        }
    }
</script>

<style scoped>

</style>