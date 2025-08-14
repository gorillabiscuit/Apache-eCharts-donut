import { useEffect, useRef } from 'react'
import * as echarts from 'echarts/core'
import { PieChart } from 'echarts/charts'
import { TitleComponent } from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'

echarts.use([TitleComponent, PieChart, CanvasRenderer])

export default function MultiPie() {
  const chartContainerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!chartContainerRef.current) return

    const chart = echarts.init(chartContainerRef.current)

    const datas = [
      [
        { name: '圣彼得堡来客', value: 5.6 },
        { name: '陀思妥耶夫斯基全集', value: 1 },
        { name: '史记精注全译（全6册）', value: 0.8 },
        { name: '加德纳艺术通史', value: 0.5 },
        { name: '表象与本质', value: 0.5 },
        { name: '其它', value: 3.8 }
      ],
      [
        { name: '银河帝国5：迈向基地', value: 3.8 },
        { name: '俞军产品方法论', value: 2.3 },
        { name: '艺术的逃难', value: 2.2 },
        { name: '第一次世界大战回忆录（全五卷）', value: 1.3 },
        { name: 'Scrum 精髓', value: 1.2 },
        { name: '其它', value: 5.7 }
      ],
      [
        { name: '克莱因壶', value: 3.5 },
        { name: '投资最重要的事', value: 2.8 },
        { name: '简读中国史', value: 1.7 },
        { name: '你当像鸟飞往你的山', value: 1.4 },
        { name: '表象与本质', value: 0.5 },
        { name: '其它', value: 3.8 }
      ]
    ]

    const option: echarts.EChartsCoreOption = {
      backgroundColor: '#221E37',
      color: ['#CB2B83', '#00B8D9', '#8E33FF', '#FF5630', '#FFAB00'],
      title: {
        text: '阅读书籍分布',
        left: 'center',
        textStyle: {
          color: '#999',
          fontWeight: 'normal',
          fontSize: 14
        }
      },
      series: [
        {
          type: 'pie',
          radius: [20, 60],
          left: 'center',
          width: 514,
          itemStyle: {
            borderColor: '#221E37',
            borderWidth: 1
          },
          label: {
            alignTo: 'edge',
            formatter: '{name|{b}}\n{time|{c} 小时}',
            minMargin: 5,
            edgeDistance: 10,
            lineHeight: 15,
            rich: {
              time: {
                fontSize: 10,
                color: '#BBB'
              }
            }
          },
          labelLine: {
            length: 15,
            length2: 0,
            maxSurfaceAngle: 80
          },
          labelLayout: (params: any) => {
            const isLeft = params.labelRect.x < chart.getWidth() / 2
            const points = params.labelLinePoints
            points[2][0] = isLeft
              ? params.labelRect.x
              : params.labelRect.x + params.labelRect.width
            return {
              labelLinePoints: points
            }
          },
          data: datas[0]
        }
      ]
    }

    chart.setOption(option)

    const handleResize = () => chart.resize()
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      chart.dispose()
    }
  }, [])

  return (
    <div ref={chartContainerRef} style={{ width: 514, height: 388 }} />
  )
}


