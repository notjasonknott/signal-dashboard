<template>
  <div
    class="m-portlet m-portlet--bordered-semi m-portlet--half-height m-portlet--fit"
    style="min-height: 300px"
  >
    <div class="m-portlet__head">
      <div class="m-portlet__head-caption">
        <div class="m-portlet__head-title">
          <h3 class="m-portlet__head-text">{{ title }}</h3>
        </div>
      </div>
    </div>
    <!--begin::Total Profit-->
    <div class="m-widget24">
      <spinner v-if="isLoading"></spinner>
      <div class="m-widget24__item" v-show="!isLoading">
        <h4 class="m-widget24__title">{{ numLabel }}</h4>
        <br>
        <span class="m-widget24__desc">{{ numType }}</span>
        <span class="m-widget24__stats m--font-brand">{{ currentNum }}</span>
        <div class="m--space-10"></div>
        <div class="progress m-progress--sm">
          <div
            class="progress-bar m--bg-brand"
            role="progressbar"
            v-bind:style="[styles]"
            aria-valuenow="50"
            aria-valuemin="0"
            aria-valuemax="100"
          ></div>
        </div>
        <span class="m-widget24__change">{{ description }}</span>
        <span class="m-widget24__number">{{ percentage }}%</span>
      </div>
    </div>
    <!--end::Total Profit-->
  </div>
</template>

<script>
import Spinner from "./Spinner.vue";
export default {
  data() {
    return {
      isLoading: true,
      title: "",
      numLabel: "",
      numType: "",
      currentNum: 0,
      goalNum: 0,
      description: ""
    };
  },
  components: {
    Spinner
  },
  computed: {
    percentage() {
      if (this.goalNum === 0) return 0;
      return parseInt((this.currentNum / this.goalNum) * 100);
    },
    styles() {
      let style = { width: this.percentage + "%" };
      console.log(style);
      return style;
    }
  },
  methods: {
    loadData() {
      this.isLoading = true;
      let url = "https://prod.musicforworld.com/v1/dash_xsa/goal/";
      this.$http
        .get(url)
        .then(
          response => {
            return response.json();
          },
          error_response => {
            console.error(error_response);
          }
        )
        .then(json => {
          this.title = json["title"];
          this.numLabel = json["numLabel"];
          this.numType = json["numType"];
          this.graphTotal = json["total"];
          this.currentNum = json["currentNum"];
          this.goalNum = json["goalNum"];
          this.description = json["description"];
          this.isLoading = false;
        });
    }
  },
  created() {
    this.loadData();
  }
};
</script>