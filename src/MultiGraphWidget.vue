<template>
    <div class="m-portlet m-portlet--full-height m-portlet--skin-light m-portlet--fit  m-portlet--rounded">
        <div class="m-portlet__head">
            <div class="m-portlet__head-caption">
                <div class="m-portlet__head-title">
                    <h3 class="m-portlet__head-text">
                        {{ this.title }}
                    </h3>
                </div>
            </div>
            <div class="m-portlet__head-tools">
                <ul class="m-portlet__nav">
                    <li class="m-portlet__nav-item m-dropdown m-dropdown--inline m-dropdown--arrow m-dropdown--align-right m-dropdown--align-push" data-dropdown-toggle="hover">
                        <a href="#" class="m-portlet__nav-link m-dropdown__toggle dropdown-toggle btn btn--sm m-btn--pill btn-secondary m-btn m-btn--label-brand">
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
            <Spinner v-if="isLoading" style="margin-top:30%; margin-left: 43%"></Spinner>

            <div v-show="!isLoading" class="m-widget21" style="min-height: 300px">
                <div class="row">
                    <div class="col-md-4">
                        <div class="m-widget21__item ">
                            <div class="m-widget21__info">
																	<span class="m-widget21__title m--font-brand">
																		{{ this.graphData1['title'] }}
																	</span>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="m-widget21__item ">
                            <div class="m-widget21__info">
																	<span class="m-widget21__title m--font-info">
																		{{ this.graphData2['title'] }}
																	</span>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="m-widget21__item ">
                            <div class="m-widget21__info">
																	<span class="m-widget21__title m--font-success">
																		{{ this.graphData3['title'] }}
																	</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="m-widget21__chart m-portlet-fit--sides" style="height:310px;">
                    <canvas id="m_chart_adwords_stats"></canvas>
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
                title: '',
                graphData1: {},
                graphData2: {},
                graphData3: {},
                graphLabels: [],
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
        components : {
          Spinner
        },
        methods: {
            renderGraph() {
                var e = document.getElementById("m_chart_adwords_stats").getContext("2d"),
                    t = e.createLinearGradient(0, 0, 0, 240);
                t.addColorStop(0, Chart.helpers.color("#ffefce").alpha(1).rgbString()),
                    t.addColorStop(1, Chart.helpers.color("#ffefce").alpha(.3).rgbString());
                var a = {
                        type: "line",
                        data: {
                            labels: this.graphLabels,
                            datasets: [{
                                label: this.graphData1['title'],
                                backgroundColor: colors["brand"],
                                borderColor: colors["brand"],
                                pointBackgroundColor: Chart.helpers.color("#000000").alpha(0).rgbString(),
                                pointBorderColor: Chart.helpers.color("#000000").alpha(0).rgbString(),
                                pointHoverBackgroundColor: colors["danger"],
                                pointHoverBorderColor: Chart.helpers.color("#000000").alpha(.1).rgbString(),
                                data: this.graphData1['data']
                            },
                                {
                                    label: this.graphData2['title'],
                                    backgroundColor: colors["accent"],
                                    borderColor: colors["accent"],
                                    pointBackgroundColor: Chart.helpers.color("#000000").alpha(0).rgbString(),
                                    pointBorderColor: Chart.helpers.color("#000000").alpha(0).rgbString(),
                                    pointHoverBackgroundColor: colors["danger"],
                                    pointHoverBorderColor: Chart.helpers.color("#000000").alpha(.1).rgbString(),
                                    data: this.graphData2['data']
                                }
                                ,
                                {
                                    label: this.graphData3['title'],
                                    backgroundColor: colors["success"],
                                    borderColor: colors["success"],
                                    pointBackgroundColor: Chart.helpers.color("#000000").alpha(0).rgbString(),
                                    pointBorderColor: Chart.helpers.color("#000000").alpha(0).rgbString(),
                                    pointHoverBackgroundColor: colors["danger"],
                                    pointHoverBorderColor: Chart.helpers.color("#000000").alpha(.1).rgbString(),
                                    data: this.graphData3['data']
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
                                mode: "nearest",
                                intersect: !1,
                                position: "nearest",
                                xPadding: 10,
                                yPadding: 10,
                                caretPadding: 10
                            }
                            ,
                            legend: {
                                display: !1
                            }
                            ,
                            responsive: !0,
                            maintainAspectRatio: !1,
                            scales: {
                                xAxes: [{
                                    display: !1,
                                    gridLines: !1,
                                    scaleLabel: {
                                        display: !0, labelString: "Month"
                                    }
                                }
                                ],
                                yAxes: [{
                                    stacked: !0,
                                    display: !1,
                                    gridLines: !1,
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
                    }
                ;
                this.chart = new Chart(e, a)
            },
            switchDays(menuItem) {
                    this.menu.current = menuItem.label;
                    if (this.chart !== null)
                        this.chart.destroy();
                    this.loadData(menuItem.days)
                },
                loadData(days) {
                    this.isLoading = true;
                    let data = {'days' : days};
                    let url = 'https://prod.musicforworld.com/v1/dashboard/conversion_rates/';
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
                                this.title = json['title']
                                this.graphLabels = json['labels']
                                this.graphData1 = json['data1']
                                this.graphData2 = json['data2']
                                this.graphData3 = json['data3']

                                this.isLoading = false;
                                console.log(this.graphData2['data'])
                                this.renderGraph();
                            }
                        )

            }
            },
        created() {
            this.loadData(7);
        }
    }
</script>
