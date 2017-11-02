<template>
    <div class="m-portlet m-portlet--bordered-semi m-portlet--half-height m-portlet--fit " style="min-height: 300px">
        <div class="m-portlet__head">
            <div class="m-portlet__head-caption">
                <div class="m-portlet__head-title">
                    <h3 class="m-portlet__head-text">
                        {{ title }}
                    </h3>
                </div>
            </div>
        </div>
        <div class="m-portlet__body">

            <spinner v-if="isLoading"></spinner>
            <div class="m-widget16">
                <div class="row">
                    <div class="col-md-4">

                        <div class="m-widget16__body" v-show="!isLoading">

                            <!--begin::widget item-->
                            <div class="m-widget16__item">
																<span class="m-widget16__date">
																	Fill Rate
																</span>
                                <span class="m-widget16__price m--align-right m--font-brand">
                                    {{ percentage }}
                                </span>
                            </div>
                            <!--end::widget item-->
                            <!--begin::widget item-->
                            <div class="m-widget16__item">
																<span class="m-widget16__date">
																	Filled Slots
																</span>
                                <span class="m-widget16__price m--align-right m--font-success">
                                    {{ filled }}
                                </span>
                            </div>
                            <!--end::widget item-->
                            <!--begin::widget item-->
                            <div class="m-widget16__item">
																<span class="m-widget16__date">
																	Empty Slots
																</span>
                                <span class="m-widget16__price m--align-right m--font-danger">
                                    {{ empty }}
																</span>
                            </div>
                            <!--end::widget item-->
                        </div>
                    </div>
                    <div class="col-md-8" style="margin-top:-10%">
                        <div class="m-widget16__stats">
                            <div class="m-widget16__visual">
                                <div id="m_chart_support_tickets" style="height: 200px"></div>
                            </div>

                        </div>
                    </div>


                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Spinner from './Spinner.vue'

    export default {

        data() {
            return {
                'isLoading' : false,
                'filled' : 0,
                'empty' : 0,
                'title' : '',
            }
        },
        components : {
            Spinner
        },
        computed : {
            total() {
                return this.empty + this.filled;
            },
            percentage() {
                if (this.total === 0)
                    return "0%";
                return parseInt(this.filled/this.total * 100) + "%";
            }
        },
        methods : {
            renderGraph: function () {
                Morris.Donut({
                    element:"m_chart_support_tickets", data:[ {
                        label: "Filled", value: this.filled
                    }
                        , {
                            label: "Empty", value: this.empty
                        }
                    ], labelColor:"#a7a7c2", colors:["#34bfa3", '#f4516c', '#f4516c']
                });
            },
            loadData() {
                this.isLoading = true;
                let url = 'https://prod.musicforworld.com/v1/dashboard/fill_rate/';
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
                            this.isLoading = false;
                            this.title = json['title'];
                            this.filled = parseInt(json['filled']);
                            this.empty = parseInt(json['empty']);
                            this.renderGraph();
                        }
                    )
            },
        },
        created() {
            this.loadData();
        }
    }
</script>