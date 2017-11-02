<template>
    <!--begin:: Widgets/NEW USERS-->
    <div class="m-portlet m-portlet--bordered-semi m-portlet--half-height m-portlet--fit " style="min-height: 300px">
        <div class="m-portlet__head">
            <div class="m-portlet__head-caption">
                <div class="m-portlet__head-title">
                    <h3 class="m-portlet__head-text">
                        {{ graphTitle }}
                    </h3>
                </div>
            </div>

            <div class="m-portlet__head-tools">
                <ul class="m-portlet__nav">
                    <li class="m-portlet__nav-item m-dropdown m-dropdown--inline m-dropdown--arrow m-dropdown--align-right m-dropdown--align-push" data-dropdown-toggle="hover" aria-expanded="true">
                        <a class="m-portlet__nav-link m-dropdown__toggle dropdown-toggle btn btn--sm m-btn--pill btn-secondary m-btn m-btn--label-brand">
                            {{ menu.current }}
                        </a>

                        <div class="m-dropdown__wrapper">
                            <span class="m-dropdown__arrow m-dropdown__arrow--right m-dropdown__arrow--adjust" style="left: auto; right: 39px;"></span>
                            <div class="m-dropdown__inner">
                                <div class="m-dropdown__body">
                                    <div class="m-dropdown__content">
                                        <ul class="m-nav">
                                            <li v-for="menuItem in menu.list" class="m-nav__item">
                                                <a href="" @click.prevent="switchDays(menuItem)" class="m-nav__link">
                                                    <span class="m-nav__link-text">{{ menuItem.label }}</span>
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <div class="m-portlet__body">
            <spinner v-if="isLoading"></spinner>
            <!--begin::Widget1-->
            <div class="m-widget20" v-show="!isLoading">
                <div class="m-widget20__number m--font-success">
                    {{ graphTotal }}
                </div>
                <div class="m-widget20__chart" style="height:160px;">
                    <canvas id="line-chart" width="800" height="450"></canvas>
                </div>
            </div>
            <!--end::Widget 1-->
        </div>
    </div>
    <!--end:: Widgets/NEW USERS-->
</template>

<script>
    import Spinner from './Spinner.vue'

    export default {
        data() {
            return {
                graphData: [],
                graphLabels: [],
                graphTotal: 0,
                graphTitle: '',
                isLoading: true,
                menu: {
                    current: 'Last 7 Days',
                    list: [
                        {label: 'Last 7 Days', days: 7},
                        {label: 'Last 30 Days', days: 30}
                    ]
                },
                chart: null
            }
        },
        methods: {
            switchDays(menuItem) {
                this.menu.current = menuItem.label;
                if (this.chart !== null)
                    this.chart.destroy();
                this.loadData(menuItem.days)
            },
            loadData(days) {
                this.isLoading = true;
                let data = {'days' : days};
                let url = 'https://prod.musicforworld.com/v1/dashboard/subscriptions_per_day/';
                this.$http.post(url, data)
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
                            this.graphTitle = json['title']
                            this.graphLabels = json['labels']
                            this.graphData = json['data']
                            this.graphTotal = json['total']
                            this.isLoading = false;
                            this.renderGraph();
                        }
                    )
            },
            renderGraph()  {
                let context = document.getElementById("line-chart").getContext("2d");
                let t = context.createLinearGradient(0, 0, 0, 240);

                t.addColorStop(0, Chart.helpers.color("#d1f1ec").alpha(1).rgbString());
                t.addColorStop(1, Chart.helpers.color("#d1f1ec").alpha(.3).rgbString());

                let options = {
                    type:"line",
                    data: {
                        labels:this.graphLabels,
                        datasets:[ {
                            label: "",
                            backgroundColor: t,
                            borderColor: "#34bfa3",
                            pointBackgroundColor: Chart.helpers.color("#000000").alpha(0).rgbString(),
                            pointBorderColor: Chart.helpers.color("#000000").alpha(0).rgbString(),
                            pointHoverBorderColor: Chart.helpers.color("#000000").alpha(.1).rgbString(),
                            data: this.graphData,
                        }
                        ]
                    }
                    ,
                    options: {
                        title: {
                            display: !1
                        }
                        ,
                        tooltips: {
                            mode: "nearest", intersect: !1, position: "nearest", xPadding: 10, yPadding: 10, caretPadding: 10
                        }
                        ,
                        legend: {
                            display: !1
                        }
                        ,
                        responsive:!0,
                        maintainAspectRatio:!1,
                        scales: {
                            xAxes:[ {
                                display:!1,
                                gridLines:!1,
                                scaleLabel: {
                                    display: !0, labelString: "Month"
                                }
                            }
                            ],
                            yAxes:[ {
                                display:!1,
                                gridLines:!1,
                                scaleLabel: {
                                    display: !0, labelString: "Value"
                                }
                                ,
                                ticks: {
                                    beginAtZero: !0
                                }
                            }
                            ]
                        }
                        ,
                        elements: {
                            line: {
                                tension: 1e-7
                            }
                            ,
                            point: {
                                radius: 4, borderWidth: 12
                            }
                        }
                        ,
                        layout: {
                            padding: {
                                left: 0, right: 0, top: 10, bottom: 0
                            }
                        }
                    }
                };
                this.chart = new Chart(context, options)
            },
        },
        components: {
            Spinner
        },
        created() {
            this.loadData(7);
        }
    }
</script>

