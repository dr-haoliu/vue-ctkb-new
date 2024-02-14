<template>
    <div>
        <section class="showcase">
            <div class="container-fluid p-0">
                <div class="row no-gutters">

                    <div class="col-lg-6 order-lg-2 text-white showcase-img info_banner_2"></div>
                    <div class="col-lg-6 order-lg-1 my-auto showcase-text">
                        <h2>Completely Interactive Analytics</h2>
                        <p class="lead mb-0">With both research and clinical design in mind, the Knowledge Base provides fully
                            interactive access to eligibility criteria information from nearly 240,000 clinical trials</p>
                    </div>
                </div>
                <div class="row no-gutters">
                    <div class="col-lg-6 text-white showcase-img info_banner_1"></div>
                    <div class="col-lg-6 my-auto showcase-text">
                        <h2>Real-World Data Applications</h2>
                        <p class="lead mb-0">Eligibility information collected and analyzed in the Knowledge Base is
                            being applied in clinics and hospitals research around the country in our freely available platforms MedConn [Under development]
<!--                          <a href="http://www.ohdsi.org/web/criteria2query/">Criteria2Query</a> -->
<!--                          and <a href="http://impact2.dbmi.columbia.edu/dquest-flask/">DQueST</a> -->
                          </p>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
    export default {
        name: "HomeShowcase"
    }
</script>

<style scoped>

    .showcase .showcase-text {
        padding: 3rem
    }

    .showcase .showcase-img {
        min-height: 30rem;
        background-size: cover
    }

    @media ( min-width :768px) {
        .showcase .showcase-text {
            padding: 7rem
        }
    }

    .info_banner_1 {
        background: url('~@/assets/img/home_bkgd_3.jpg') no-repeat center center;
    }

    .info_banner_2 {
        background: url('~@/assets/img/home_bkgd_2.jpg') no-repeat center center;
    }

</style>