<template>
    <div class="p-4">
        <div class="row">
            <div class="col-4">
                <joiner-graph></joiner-graph>
            </div>
            <div class="col-4">
                <profit-graph></profit-graph>
            </div>
            <div class="col-4">
                <fill-graph></fill-graph>
            </div>
        </div>
        <div class="row">
            <div class="col-4">
                <total-sheet></total-sheet>
            </div>
            <div class="col-4">
                <conversion-graph></conversion-graph>
            </div>
            <div class="col-4">
                <funnel-sheet></funnel-sheet>
            </div>
        </div>
    </div>
</template>

<script>
    import JoinerGraph from './GraphWidget.vue'
    import ProfitGraph from './GoalWidget.vue'
    import FillGraph from './PercentWidget.vue'
    import TotalSheet from './RowWidget.vue'
    import ConversionGraph from './MultiGraphWidget.vue'
    import FunnelSheet from './RowWidget2.vue'

    export default {
        components: {
            FunnelSheet,
            'joiner-graph': JoinerGraph,
            'profit-graph': ProfitGraph,
            'fill-graph': FillGraph,
            'total-sheet': TotalSheet,
            'conversion-graph' : ConversionGraph,
            'funnel-sheet' : FunnelSheet
        }
    }

</script>

<style>

</style>
