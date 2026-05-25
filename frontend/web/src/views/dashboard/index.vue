<script setup lang="ts">
import type { EChartsOption } from 'echarts'
import GiChart from '@/components/GiChart/index.vue'
import { formatDate } from '@/utils/date'

defineOptions({ name: 'Dashboard' })

/** 统计卡片数据 */
const stats = shallowRef([
  { title: '访问量', value: '12,846', trend: '+12%', color: '#165dff' },
  { title: '用户数', value: '3,256', trend: '+8%', color: '#00b42a' },
  { title: '订单量', value: '1,892', trend: '+5%', color: '#ff7d00' },
  { title: '收入', value: '¥86,420', trend: '+18%', color: '#f53f3f' },
])

/** 折线图配置 */
const lineOption = computed<EChartsOption>(() => ({
  tooltip: { trigger: 'axis' },
  grid: { left: 40, right: 20, top: 30, bottom: 30 },
  xAxis: {
    type: 'category',
    data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
  },
  yAxis: { type: 'value' },
  series: [
    {
      name: '访问量',
      type: 'line',
      smooth: true,
      data: [120, 200, 150, 280, 220, 310, 260],
      areaStyle: { color: 'rgba(22, 93, 255, 0.15)' },
      itemStyle: { color: '#165dff' },
    },
  ],
}))

/** 饼图配置 */
const pieOption = computed<EChartsOption>(() => ({
  tooltip: { trigger: 'item' },
  legend: { bottom: 0 },
  series: [
    {
      type: 'pie',
      radius: ['40%', '70%'],
      data: [
        { value: 1048, name: '直接访问' },
        { value: 735, name: '邮件营销' },
        { value: 580, name: '联盟广告' },
        { value: 484, name: '视频广告' },
      ],
    },
  ],
}))

const updateTime = formatDate(new Date())
</script>

<template>
  <div class="dashboard">
    <el-row :gutter="16">
      <el-col v-for="item in stats" :key="item.title" :xs="24" :sm="12" :lg="6">
        <el-card class="dashboard__stat" shadow="hover">
          <div class="dashboard__stat-value" :style="{ color: item.color }">
            {{ item.value }}
          </div>
          <div class="dashboard__stat-title">
            {{ item.title }}
            <el-tag size="small" type="success">
              {{ item.trend }}
            </el-tag>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <el-row :gutter="16" class="dashboard__charts">
      <el-col :xs="24" :lg="14">
        <el-card shadow="hover">
          <template #header>
            <span>访问趋势</span>
            <span class="dashboard__time">{{ updateTime }}</span>
          </template>
          <GiChart :option="lineOption" height="360px" />
        </el-card>
      </el-col>
      <el-col :xs="24" :lg="10">
        <el-card shadow="hover">
          <template #header>
            流量来源
          </template>
          <GiChart :option="pieOption" height="360px" />
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<style lang="scss" scoped>
.dashboard {
  &__stat {
    margin-bottom: 16px;

    &-value {
      font-size: 28px;
      font-weight: 600;
    }

    &-title {
      display: flex;
      gap: 8px;
      align-items: center;
      margin-top: 8px;
      color: var(--el-text-color-regular);
    }
  }

  &__charts {
    margin-top: 8px;
  }

  &__time {
    float: right;
    font-size: 12px;
    color: var(--el-text-color-regular);
  }
}
</style>
