<script setup lang="ts">
import type { EChartsOption } from 'echarts'
import VChart from 'vue-echarts'
import { use } from 'echarts/core'
import { BarChart, LineChart, PieChart } from 'echarts/charts'
import {
  GridComponent,
  LegendComponent,
  TitleComponent,
  TooltipComponent,
} from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'

// 按需注册 ECharts 模块
use([
  CanvasRenderer,
  BarChart,
  LineChart,
  PieChart,
  GridComponent,
  TooltipComponent,
  LegendComponent,
  TitleComponent,
])

interface Props {
  /** 图表配置 */
  option: EChartsOption
  /** 高度 */
  height?: string
  /** 是否自动 resize */
  autoresize?: boolean
}

withDefaults(defineProps<Props>(), {
  height: '320px',
  autoresize: true,
})
</script>

<template>
  <VChart
    class="gi-chart"
    :option="option"
    :autoresize="autoresize"
    :style="{ height }"
  />
</template>

<style lang="scss" scoped>
.gi-chart {
  width: 100%;
}
</style>
