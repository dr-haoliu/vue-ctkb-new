<template>
    <div>
        <!-- Icons Grid -->
        <section class="features-icons bg-light text-center">
            <div class="container">
                <div class="row">
                    <div class="col-lg-3">
                        <div class="features-icons-item mx-auto mb-5 mb-lg-0 mb-lg-3">
                            <div class="features-icons-icon d-flex" @click="toCriteriaLib()">
                                <i class="icon-basket m-auto text-primary"></i>
                            </div>
                            <h3>Criteria Summary</h3>
                            <p class="lead mb-0">Support your design of eligibility criteria using historical data from over
                                200,000 trials</p>
                        </div>
                    </div>
                    <div class="col-lg-3">
                        <div class="features-icons-item mx-auto mb-5 mb-lg-0 mb-lg-3">
                            <div class="features-icons-icon d-flex" @click="toConditionLib()">
                                <i class="icon-calculator m-auto text-primary"></i>
                            </div>
                            <h3>Cohort Definition</h3>
                            <p class="lead mb-0">Leverage our entire Knowledge Base to define patient cohort</p>
                        </div>
                    </div>
<!--                    <div class="col-lg-4">-->
<!--                        <div class="features-icons-item mx-auto mb-0 mb-lg-3">-->
<!--                            <div class="features-icons-icon d-flex" @click="toDquest()">-->
<!--                                <i class="icon-question m-auto text-primary"></i>-->
<!--                            </div>-->
<!--                            <h3>Online Trial Finder</h3>-->
<!--                            <p class="lead mb-0">Find the clinical trial perfect for you by answering a few medical-->
<!--                                questions</p>-->
<!--                        </div>-->
<!--                    </div>-->
                    <div class="col-lg-3">
                    <div class="features-icons-item mx-auto mb-5 mb-lg-0 mb-lg-3">
                      <div class="features-icons-icon d-flex">
                        <i class="icon-layers m-auto text-primary"></i>
                      </div>
                      <h3>Adverse Event Monitoring</h3>
                      <p class="lead mb-0">[ Under Development ]</p>
                    </div>
                  </div>
                </div>
<!--                <div class="row">-->
<!--                    <div class="col-lg-4">-->
<!--                        <div class="features-icons-item mx-auto mb-5 mb-lg-0 mb-lg-3">-->
<!--                            <div class="features-icons-icon d-flex" @click="toC2q()">-->
<!--                                <i class="icon-people m-auto text-primary"></i>-->
<!--                            </div>-->
<!--                            <h3>Find Patients in your EHR</h3>-->
<!--                            <p class="lead mb-0">Identify eligible patients inside your hospital using the OHDSI Data-->
<!--                                Network</p>-->
<!--                        </div>-->
<!--                    </div>-->
<!--                    <div class="col-lg-4">-->
<!--                        <div class="features-icons-item mx-auto mb-5 mb-lg-0 mb-lg-3">-->
<!--                            <div class="features-icons-icon d-flex">-->
<!--                                <i class="icon-layers m-auto text-primary"></i>-->
<!--                            </div>-->
<!--                            <h3>Adverse Event Monitoring</h3>-->
<!--                            <p class="lead mb-0">[ Under Development ]</p>-->
<!--                        </div>-->
<!--                    </div>-->
<!--                    <div class="col-lg-4">-->
<!--                        <div class="features-icons-item mx-auto mb-0 mb-lg-3">-->
<!--                            <div class="features-icons-icon d-flex" @click="toCovid19TrialFinder()">-->
<!--                                <i class="icon-check m-auto text-primary"></i>-->
<!--                            </div>-->
<!--                            <h3>Covid-19 Trial Finder</h3>-->
<!--                            <p class="lead mb-0">Find nearby Covid-19 clinical trials that are relevant to you and looking for patients in the United States</p>-->
<!--                        </div>-->
<!--                    </div>-->
<!--                </div>-->
            </div>
        </section>
    </div>
</template>

<script>
    export default {
        name: "HomeFeatureIcons",
        methods:{
            toCriteriaLib(){
                this.$router.push({path:'/criteria'})
            },
            toConditionLib(){
                this.$router.push({path:'/condition'})
            },
            toDquest(){
                var url = 'http://impact2.dbmi.columbia.edu/dquest-flask/';
                window.open(url,'_blank');
                // window.location.href = 'http://impact2.dbmi.columbia.edu/dquest-flask/';
            },
            toC2q(){
                var url = 'http://www.ohdsi.org/web/criteria2query/';
                window.open(url,'_blank');
                // window.location.href = 'http://impact2.dbmi.columbia.edu/dquest-flask/';
            },
            toCovid19TrialFinder(){
                var url = 'https://covidtrialx.dbmi.columbia.edu/dquest-flask/';
                window.open(url,'_blank');
            }
        }
    }
</script>

<style scoped>

    .features-icons {
        padding-top: 2rem;
        padding-bottom: 2rem
    }

    .features-icons .features-icons-item {
        max-width: 20rem
    }

    .features-icons .features-icons-item .features-icons-icon {
        height: 7rem
    }

    .features-icons .features-icons-item .features-icons-icon i {
        font-size: 4.5rem
    }

    .features-icons .features-icons-item:hover .features-icons-icon i {
        font-size: 5rem
    }

</style>