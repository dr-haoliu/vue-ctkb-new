<template>
  <div style="width: 80%; flex: auto; margin: auto; padding: 10px">
    <div style="font-size: 32px; padding: 10px">
      <span><b>APIs</b> </span>
    </div>

    <el-container
        v-loading="loading"
        element-loading-text="Loading..."
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)"
        style="width: 80%; margin: auto; padding: 10px; display: flex; flex-direction: column;">
        <el-header>
          <h4> $apiUrl = "http://34.69.146.90:8081"</h4>
        </el-header>

        <el-main>
          <el-card>
            <b>Search all criteria by a condition name:</b>
            <div>
              <p> $apiUrl + "/common-condition/get-criteria-name/{concept_name}/{include}"</p>
              <p> replace concept_name with condition name you want to search</p>
              <p> replace include with 1 for inclusion, 0 for exclusion</p>
            </div>
          </el-card>

          <el-card>
            <b>Search all criteria by a condition id:</b>
            <div>
              <p> $apiUrl + "/common-condition/get-criteria-id/{concept_id}/{include}"</p>
              <p> replace concept_id with condition id you want to search</p>
              <p> replace include with 1 for inclusion, 0 for exclusion</p>
            </div>
          </el-card>

          <el-card>
            <b>Search conditions by a criterion name:</b>
            <div>
              <p> $apiUrl + "/common-condition/get-conditions-name/{concept_name}/{include}"</p>
              <p> replace concept_name with a criterion name you want to search</p>
              <p> replace include with 1 for inclusion, 0 for exclusion</p>
            </div>
          </el-card>

          <el-card>
            <b>Search conditions by a criterion id:</b>
            <div>
              <p> $apiUrl + "/common-condition/get-conditions-id/{concept_id}/{include}"</p>
              <p> replace concept_id with criterion id you want to search</p>
              <p> replace include with 1 for inclusion, 0 for exclusion</p>
            </div>
          </el-card>

        </el-main>


      <el-row style="width: 80%; margin: auto; margin-top: 10px; display: flex;">
        <div><b>Please contact us for more detailed API information.</b></div>
      </el-row>

    </el-container>
  </div>
</template>

<script>
export default {
  name: "API"
}
</script>

<style scoped>

</style>