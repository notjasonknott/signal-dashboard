<template>
    <!--begin:: Widgets/Finance Stats-->
    <div class="m-portlet  m-portlet--full-height ">
        <div  class="m-portlet__body">
            <Spinner v-if="isLoading"></Spinner>

            <div v-else class="m-widget1 m-widget1--paddingless">
                <div class="m-widget1__item">
                    <div class="row m-row--no-padding align-items-center">
                        <div class="col">
                            <h3 class="m-widget1__title">
                                {{ this.rows[0].title }}
                            </h3>
                            <span class="m-widget1__desc">
                                {{ this.rows[0].subtitle }}
															</span>
                        </div>
                        <div class="col m--align-right">
															<span class="m-widget1__number m--font-danger">
																{{ this.rows[0].count }}
															</span>
                        </div>
                    </div>
                </div>
                <div class="m-widget1__item">
                    <div class="row m-row--no-padding align-items-center">
                        <div class="col">
                            <h3 class="m-widget1__title">
                                {{ this.rows[1].title }}
                            </h3>
                            <span class="m-widget1__desc">
                                {{ this.rows[1].subtitle }}
							</span>
                        </div>
                        <div class="col m--align-right">
															<span class="m-widget1__number m--font-brand">
																{{ this.rows[1].count }}
															</span>
                        </div>
                    </div>
                </div>
                <div class="m-widget1__item">
                    <div class="row m-row--no-padding align-items-center">
                        <div class="col">
                            <h3 class="m-widget1__title">
                                {{ this.rows[2].title }}
                            </h3>
                            <span class="m-widget1__desc">
{{ this.rows[2].subtitle }}
															</span>
                        </div>
                        <div class="col m--align-right">
															<span class="m-widget1__number m--font-info">
																{{ this.rows[2].count }}
															</span>
                        </div>
                    </div>
                </div>
                <div class="m-widget1__item">
                    <div class="row m-row--no-padding align-items-center">
                        <div class="col">
                            <h3 class="m-widget1__title">
                                {{ this.rows[3].title }}
                            </h3>
                            <span class="m-widget1__desc">
                                {{ this.rows[3].subtitle }}
															</span>
                        </div>
                        <div class="col m--align-right">
															<span class="m-widget1__number m--font-success">
																{{ this.rows[3].count }}
															</span>
                        </div>
                    </div>
                </div>
                <div class="m-widget1__item">
                    <div class="row m-row--no-padding align-items-center">
                        <div class="col">
                            <h3 class="m-widget1__title">
                                {{ this.rows[4].title }}
                            </h3>
                            <span class="m-widget1__desc">{{ this.rows[4].subtitle }}</span>
                        </div>
                        <div class="col m--align-right">
															<span class="m-widget1__number m--font-warning">
																{{ this.rows[4].count }}
															</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!--end:: Widgets/Finance Stats-->
</template>

<script>
    import Spinner from './Spinner.vue'

    export default {
        data() {
            return {
                'isLoading' : true,
                'rows' : []
            }
        },
        components : {
            Spinner
        },
        methods : {
            loadData() {
                this.isLoading = true;
                let url = 'https://prod.musicforworld.com/v1/dashboard/funnel_stats/';
                this.$http.get(url)
                    .then(
                        response => {
                            return response.json();
                        },
                        error_response => {
                            console.error(error_response);
                        }
                    )
                    .then (
                        json => {
                            this.rows = json['rows'];
                            this.isLoading = false;
                        }
                    )
            },
        },
        created() {
            this.loadData();
        }
    }
</script>