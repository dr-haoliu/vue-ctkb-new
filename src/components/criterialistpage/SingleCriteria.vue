<template>

<!--    <div class="list-group">-->
        <el-card v-loading="loading" style="padding: 5px; margin: auto; flex: auto; width: 80%;">
        <p v-if="criteriaObj.include===1" class="list-group-item list-group-item-success">
            <span class="glyphicon glyphicon-ok"></span>
            <strong> {{criteriaObj.criteriaName}} </strong>
            <el-button type="info" @click="deleteIncCriteriaObj" style="float: right; padding: 3px 0"> Delete</el-button>
        </p>


        <p v-else class="list-group-item list-group-item-danger">
            <span class="glyphicon glyphicon-ok"></span>
            <strong> {{criteriaObj.criteriaName}} </strong>
            <el-button type="info" @click="deleteExcCriteriaObj" style="float: right; padding: 3px 0"> Delete</el-button>
        </p>

        <p v-if="criteriaObj.include===1" class="list-group-item">
            <strong> Used as Inclusion Criterion in {{convertP(this.criteriaRatio)}}% of {{this.criteriaObj.conditionName}} trials</strong>
        </p>
        <p v-else class="list-group-item">
            <strong> Used as Exclusion Criterion in {{convertP(this.criteriaRatio)}}% of {{this.criteriaObj.conditionName}} trials</strong>
        </p>

        <p v-if="sum > 0 " class="list-group-item">
            <strong> {{this.criteriaObj.p1}} of trials are Phase 1; </strong>
            <strong> {{this.criteriaObj.p2}} of trials are Phase 2; </strong>
            <strong> {{this.criteriaObj.p3}} of trials are Phase 3; </strong>
            <strong> {{this.criteriaObj.p4}} of trials are Phase 4; </strong>
        </p>
        <p v-else class="list-group-item">
            <strong> Phase count is not available. </strong>
        </p>


          <!-- Card Body -->
<!--          style="width:100%;height:550px;left:0px"-->
          <div v-if="criteriaObj.domain == 'Measurement' " class="card-body">
            <div class="chart-area" >
              <v-chart :options="valueOps" :init-options="initOps" theme="infographic" autoresize/>
            </div>
          </div>

<!--        <p class="list-group-item">-->
<!--            <strong> {{this.criteriaObj.conditionName}} </strong>-->
<!--        </p>-->
        </el-card>
<!--    </div>-->
</template>

<script>
    import axios from "axios";

    let initOps = {
      title: {
        text: 'Measurement Value Distribution',
        x: 'center'
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
          label: {
            show: true
          }
        }
      },
      toolbox: {
        show: true,
        feature: {
          mark: {show: true},
          dataView: {show: true, readOnly: false, lang: ['Data view', 'Close', 'Refresh'], title: 'View data'},
          magicType: {
            show: true,
            type: ['line', 'bar'],
            title: {line: 'Switch to Line chart', bar: 'Switch to Bar chart'}
          },
          restore: {show: true, title: 'Reset'},
          saveAsImage: {show: true, title: 'Save as image'}
        }
      },
      calculable: true,
      xAxis: {
        data: [],
        name: 'Measurement value',
        nameLocation: 'middle',
        nameGap: 40
      },
      yAxis:
          {
            name: 'Counts',
            nameLocation: 'middle',
            nameGap: 50
          },
      dataZoom: [
        {
          show: true,
          start: 10,
          end: 90
        },
        {
          type: 'inside',
          start: 10,
          end: 90
        },
        {
          show: true,
          yAxisIndex: 0,
          filterMode: 'empty',
          width: 35,
          height: '80%',
          showDataShadow: false,
          left: '90%'
        }
      ],
      series: [{
        // 根据名字对应到相应的系列
        name: 'CT_Counts',
        type: 'line',
        data: []
      }]
    };

    export default {
        name: "SingleCriteria",
        props: {
            index: {
                type: Number,
                required: true
            },
            itemC: {
                type: Object,
                default() {
                    return {};
                }
            }
        },
        data() {
            return {
                criteriaObj: {
                    id: '',
                    criteriaId: '',
                    criteriaName: '',
                    p1: '',
                    p2: '',
                    p3: '',
                    p4: '',
                    example: '',
                    include: '',
                    domain: '',
                    conditionId: '',
                    conditionName: '',
                },
                sum: 0,
                criteriaRatio: 0.0,
                loading: true,
                initOps: initOps,
                valueOps: {},
            }
        },
        computed:{

        },
        methods: {
            convertP(num) {
                var pn = num * 100;
                return pn.toFixed(2);
            },
            deleteIncCriteriaObj: function () {
                this.$emit('deleteIncIndex', this.index)
            },
            deleteExcCriteriaObj: function () {
                this.$emit('deleteExcIndex', this.index)
            },
            loadingFunction(){

              this.getCriteriaRatio();
              this.getPhaseCount();
              this.updateData();

            },
            getPhaseCount(){
                this.loading = true;
                console.log("Search criteria id: "+ this.criteriaObj.criteriaId);
                axios.get(this.$apiUrl+"/common-criteria-stats/criteria-phase/"+ this.criteriaObj.conditionId + "/"+ this.criteriaObj.criteriaId + "/"+ this.criteriaObj.include)
                    .then(response => {
                        console.log(response.data);

                        var map = response.data;
                        this.criteriaObj.p1 = map['Phase 1'];
                        this.criteriaObj.p2 = map['Phase 2'];
                        this.criteriaObj.p3 = map['Phase 3'];
                        this.criteriaObj.p4 = map['Phase 4'];
                        this.sum = this.criteriaObj.p1 + this.criteriaObj.p2+ this.criteriaObj.p3+ this.criteriaObj.p4;
                        this.loading = false;
                    })
                    .catch(function (err) {
                        console.log(err);
                        return -1;
                    })
            },
            getCriteriaRatio(){
                console.log("Search criteria id: "+ this.criteriaObj.criteriaId);
                axios.get(this.$apiUrl+"/common-condition/"+ this.criteriaObj.conditionId + "/"+ this.criteriaObj.criteriaId + "/"+ this.criteriaObj.include)
                    .then(response => {
                        console.log(response.data);
                        var map = response.data;
                        this.criteriaRatio = map[0].conceptCount/map[0].totalCount;
                    })
                    .catch(function (err) {
                        console.log(err);
                        return -1;
                    })
            },
          updateData() {
            this.loading = true;
            this.showFlag = false;
            console.log('Measurement get criteria Id: '+ this.criteriaObj.criteriaId);
            // criteria = '4285271';
            var result = [];
            var userMax = -1.0;
            var userMin = -1.0;

            console.log("Search measurement by criteria: " + this.criteriaObj.criteriaId);
            axios.get(this.$apiUrl + "/measurement/values/concept_id/" + this.criteriaObj.criteriaId + "/" + userMax + "/" +userMin)
                .then(response => {
                  // console.log(response.data);
                  result = response.data;
                  this.loading = false;
                  this.updateChart(this.criteriaObj.criteriaId, result);
                })
                .catch(function (err) {
                  console.log(err);
                  this.loading = false;
                });
            return result;

          },
          updateChart(criteria, data) {
            var bin_list = data['bin_list'];
            var count_list = data['count_list'];
            if (!Array.isArray(bin_list) || !bin_list.length) {
              this.showFlag = false;
              // alert("Sorry, not enough measurement data to display!");
            } else if (!Array.isArray(count_list) || !count_list.length) {
              this.showFlag = false;
              // alert("Sorry, not enough measurement data to display!");
            } else {
              this.showFlag = true;
              console.log("Process Measurement: " + criteria);

              var series_data = [];
              var xAxis_data = [];


              series_data = series_data.concat(count_list);
              xAxis_data = xAxis_data.concat(bin_list);
              // console.log(series_data);
              // console.log(xAxis_data);


              this.valueOps = this.prepareOps(xAxis_data, series_data);
            }
          },
          prepareOps(xAxis_data, series_data){
            var option = {
              title: {
                text: this.criteriaObj.criteriaName + ' Value Distribution',
                x: 'center'
              },
              tooltip: {
                trigger: 'axis',
                axisPointer: {
                  type: 'shadow',
                  label: {
                    show: true
                  }
                }},
              toolbox: {
                show: true,
                feature: {
                  mark: {show: true},
                  dataView: {show: true, readOnly: false, lang: ['Data view', 'Close', 'Refresh'], title: 'View data'},
                  magicType: {
                    show: true,
                    type: ['line', 'bar'],
                    title: {line: 'Switch to Line chart', bar: 'Switch to Bar chart'}
                  },
                  restore: {show: true, title: 'Reset'},
                  saveAsImage: {show: true, title: 'Save as image'}
                }
              },
              calculable: true,
              xAxis: {
                data: xAxis_data,
                name: 'Measurement value',
                nameLocation: 'middle',
                nameGap: 40
              },
              yAxis:
                  {
                    name: 'Counts',
                    nameLocation: 'middle',
                    nameGap: 50
                  },
              dataZoom: [
                {
                  show: true,
                  start: 10,
                  end: 90
                },
                {
                  type: 'inside',
                  start: 10,
                  end: 90
                },
                {
                  show: true,
                  yAxisIndex: 0,
                  filterMode: 'empty',
                  width: 35,
                  height: '80%',
                  showDataShadow: false,
                  left: '90%'
                }
              ],
              series: [{
                // 根据名字对应到相应的系列
                name: 'CT_Counts',
                type: 'line',
                data: series_data
              }]
            };
            return option;
          },

        },
        created() {
            console.log("here ");
            console.log(this.itemC);
            this.criteriaObj.criteriaName = this.itemC.criteriaConceptName;
            this.criteriaObj.criteriaId = this.itemC.criteriaConceptId;
            this.criteriaObj.include = this.itemC.include;
            this.criteriaObj.domain = this.itemC.criteriaDomain;
            this.criteriaObj.conditionName = this.itemC.conditionConceptName;
            this.criteriaObj.conditionId = this.itemC.conditionConceptId;
            this.loadingFunction();
        }


    }
</script>

<style scoped>

.clearfix {
  display: flex;
  flex-flow: row;
  align-items: center;
  justify-content: space-between;
}

.echarts {
  width: 100%;
  height: 100%;
}

.chart-area {
  width: 1050px;
  height: 450px;
}

.card-body {
  display: flex;
  flex: auto;
  margin: auto;
}

</style>

<style>

.el-card__header {
  background-color: rgba(0, 0, 0, 0.03);
}
</style>