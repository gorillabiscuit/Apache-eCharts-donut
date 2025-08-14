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

    const data = [
      { name: 'Cryptopunks', value: 36, itemStyle: { color: '#CB2B83' } },
      { name: 'Bored Ape Yacht Club', value: 22, itemStyle: { color: '#FF5630' } },
      { name: 'Pudgy Penguins', value: 19, itemStyle: { color: '#FFAB00' } },
      { name: 'Creepz', value: 15, itemStyle: { color: '#8E33FF' } },
      { name: 'Other', value: 11, itemStyle: { color: '#00B8D9' } }
    ]

    type LabelLayoutParams = {
      labelRect: { x: number; width: number }
      labelLinePoints: [number[], number[], number[]]
    }

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
          radius: [100, 140],
          center: ['50%', '50%'],
          left: 'center',
          width: 514,
          itemStyle: {
            borderColor: '#221E37',
            borderWidth: 1
          },
          label: {
            alignTo: 'edge',
            formatter: '{name|{b}}\n{gap|}\n{percent|{d}%}',
            minMargin: 5,
            edgeDistance: 10,
            lineHeight: 14,
            rich: {
              name: {
                fontSize: 14,
                fontFamily: 'Public Sans',
                fontWeight: 500,
                color: '#E6E0FF',
                lineHeight: 12
              },
              gap: {
                height: 2
              },
              percent: {
                fontSize: 12,
                fontFamily: 'Roboto Mono',
                fontWeight: 700,
                color: '#BBB',
                lineHeight: 14
              }
            }
          },
          labelLine: {
            length: 18,
            length2: 8,
            maxSurfaceAngle: 80
          },
          labelLayout: (params: LabelLayoutParams) => {
            const isLeft = params.labelRect.x < chart.getWidth() / 2
            const points = params.labelLinePoints
            points[2][0] = isLeft
              ? params.labelRect.x
              : params.labelRect.x + params.labelRect.width
            return {
              labelLinePoints: points
            }
          },
          data
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
    <div
      ref={chartContainerRef}
      style={{ width: 514, minWidth: 514, maxWidth: 514, height: 388 }}
    />
  )
}


