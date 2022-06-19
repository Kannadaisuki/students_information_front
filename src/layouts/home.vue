<template>
  <TopBar :title="'首页'" />
  <div
    bg-hex-ffffff
    h-400px
    m-10px
    id="chart"
  >

  </div>
</template>

<script setup>
import * as echarts from "echarts";
import {getDept, stuInfoList} from "../utils/api"

// 学院列表
const depts = reactive([])
getDept().then(value => {
  new Promise((resolve, reject) => {
    let count = 0
    let total = value.data.length
    value.data.forEach(item => {
      stuInfoList({deptName: item.dept_name, pageSize: 0, pageNum: 1}).then(value => {
        depts.push({
          name: item.dept_name,
          value: value.data.total
        })
        count++
        if (count === total){
          resolve()
        }
      })
    })
  }).then(() => {
    console.log(depts)
    const chartDom = document.getElementById('chart')
    const myChart = echarts.init(chartDom)
    const option = {
      title: {
        text: '各学院人数及其占比',
        left: 'center',
        top: 'q%',
        textStyle: {
          fontSize: 30
        }
      },
      tooltip: {
        trigger: 'item',
        formatter: '{b} : {c} ({d}%)',
      },
      legend: {
        top: 'bottom',
        left: 'center',
      },
      series: [
        {
          name: '',
          type: 'pie',
          radius: ['50%', '70%'],
          center: ['center', '45%'],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10,
            borderColor: '#fff',
            borderWidth: 2
          },
          label: {
            show: false,
            position: 'center'
          },
          emphasis: {
            label: {
              show: true,
              fontWeight: 'bold',
              textStyle: {
                fontSize: 24
              }
            }
          },
          labelLine: {
            show: false
          },
          data: depts
        }
      ]
    }
    option && myChart.setOption(option)
  })
})
</script>
