import { useEffect, useRef } from 'react'
import * as echarts from 'echarts/core'
import { PieChart } from 'echarts/charts'
import { TitleComponent, TooltipComponent } from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'

echarts.use([TitleComponent, TooltipComponent, PieChart, CanvasRenderer])

export default function MultiPie() {
  const chartContainerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!chartContainerRef.current) return

    const chart = echarts.init(chartContainerRef.current)

    const TOTAL_USD = 212_423.43

    const formatUsd = (amount: number) =>
      new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0
      }).format(amount)

    const primaryData = [
      {
        name: 'Cryptopunks',
        percent: 36,
        loans: 12,
        image:
          'https://lh3.googleusercontent.com/jcn6v1K0DZvF4IAFohPcOvvKWGc4U2FH21VKYkO6eoXLML2TrW9eHO05t0qe_o91JamX3iBymbus8eDkgdyXMoom=s250',
        color: '#CB2B83'
      },
      {
        name: 'Bored Ape Yacht Club',
        percent: 22,
        loans: 8,
        image:
          'https://lh3.googleusercontent.com/w3dmFHFr0F33spfG8O6xOFwtJgs4uhFvha2UT_mNJC1HjAFdE9uzONOK9Lpj7wcub7oZ_Ojg9A1-auoJLOVx5GmxJzJEnVj4hkO_Xg=s250',
        color: '#FF5630'
      },
      {
        name: 'Pudgy Penguins',
        percent: 19,
        loans: 5,
        image:
          'https://lh3.googleusercontent.com/bcCd1TfusKK6wWjmshwmizmY9j7An3pp9kxopMxfIt-_I8WFnSIK-5gevOduoYK4Qpq2e3DyXgROKNfkP396W5ViEYXhxoyAZG3s_vY=s120',
        color: '#FFAB00'
      },
      {
        name: 'Creepz',
        percent: 15,
        loans: 4,
        image:
          'https://i.seadn.io/gcs/files/13f3b6e7226f54d739ad8c3ed838802b.png?w=500&auto=format',
        color: '#8E33FF'
      },
      {
        name: 'Other',
        percent: 11,
        loans: 3,
        image: '',
        color: '#00B8D9'
      }
    ]

    const otherBreakdown = [
      {
        name: 'Milady',
        percent: 1.0,
        loans: 5,
        image:
          'https://i.seadn.io/gae/a_frplnavZA9g4vN3SexO5rrtaBX_cBTaJYcgrPtwQIqPhzgzUendQxiwUdr51CGPE2QyPEa1DHnkW1wLrHAv5DgfC3BP-CWpFq6BA?w=500&auto=format'
      },
      {
        name: 'World of Women',
        percent: 4.7,
        loans: 2,
        image:
          'https://lh3.googleusercontent.com/I68L-_MThK4yUXXnUGnNJQBuAtu5w66mg-57ZzKOYDDVI6Y4-XbdMt3SbuVaEymUkoIgv9BdrNa1cbQPPaJKRgaEM9JqpywS-rW4KQ=s120'
      },
      {
        name: 'CyberBrokers',
        percent: 5.3,
        loans: 1,
        image:
          'https://lh3.googleusercontent.com/Qd1IEPYz_0YlMaclPwb6_9PyP7afZIzH15IdIU2X6t1Wvg81DwpAaWOY0cNmxy173C4yMA7sM3xF9-HJsCSKJdx6KvDR3old3IKuTIc=s120'
      }
    ]

    const data = primaryData.map((d) => ({
      name: d.name,
      value: d.percent,
      itemStyle: { color: d.color },
      extra: {
        usd: TOTAL_USD * (d.percent / 100),
        loans: d.loans,
        image: d.image
      }
    }))

    type LabelLayoutParams = {
      labelRect: { x: number; width: number }
      labelLinePoints: [number[], number[], number[]]
    }

    const option: echarts.EChartsCoreOption = {
      backgroundColor: '#221E37',
      color: ['#CB2B83', '#00B8D9', '#8E33FF', '#FF5630', '#FFAB00'],
      tooltip: {
        trigger: 'item',
        confine: true,
        appendToBody: true,
        backgroundColor: 'transparent',
        borderWidth: 0,
        padding: 0,
        extraCssText: 'box-shadow:none;padding:0;',
        position: (point: number[]) => {
          return [point[0] + 12, point[1] + 12]
        },
        formatter: (params: {
          name: string
          percent: number
          color: string
          data: { extra?: { usd: number; loans: number; image: string } }
        }) => {
          const name = params.name
          const percent = Math.round(params.percent)
          const color = (params.color as unknown as string) || '#FFF'
          const extra = params.data?.extra || { usd: 0, loans: 0, image: '' }

          // Special multi-list tooltip for Other
          if (name === 'Other') {
            const rows = otherBreakdown
              .map((row) => {
                const usd = formatUsd(TOTAL_USD * (row.percent / 100))
                const loansLabel = `${row.loans} loan${row.loans === 1 ? '' : 's'}`
                return (
                  '<div style="display:flex;flex-direction:row;align-items:center;padding:0;gap:15px;width:100%;height:44px;">' +
                  (row.image
                    ? '<img src="' + row.image + '" style="width:32px;height:32px;border-radius:1000px;object-fit:cover;" />'
                    : '<div style="width:32px;height:32px;border-radius:1000px;background:#00B8D9;"></div>') +
                  '<div style="font-family: \'Public Sans\'; font-weight:500; font-size:13px; line-height:22px; color:#FFFFFF;">' +
                  row.name + ' ' + usd + ' ' + row.percent + '% (' + loansLabel + ')' +
                  '</div>' +
                  '</div>'
                )
              })
              .join('')

            return (
              '<div style="display:flex;flex-direction:column;justify-content:center;align-items:flex-start;padding:24px;gap:16px;position:relative;width:fit-content;background:#302B4D;box-shadow:0px 0px 2px rgba(0,0,0,0.24), 0px 12px 24px -4px rgba(0,0,0,0.24);border-radius:16px;">' +
              rows +
              '</div>'
            )
          }

          const usd = formatUsd(extra.usd)
          const loansLabel = `${extra.loans} loan${extra.loans === 1 ? '' : 's'}`
          const image = extra.image

          return (
            '<div style="display:flex;flex-direction:column;justify-content:center;align-items:flex-start;padding:24px;gap:16px;position:relative;width:fit-content;background:#302B4D;box-shadow:0px 0px 2px rgba(0,0,0,0.24),0px 12px 24px -4px rgba(0,0,0,0.24);border-radius:16px;">' +
              '<div style="display:flex;flex-direction:row;align-items:center;padding:0;gap:15px;width:100%;height:44px;">' +
                (image
                  ? '<img src="' + image + '" style="width:32px;height:32px;border-radius:1000px;object-fit:cover;" />'
                  : '<div style="width:32px;height:32px;border-radius:1000px;background:' + color + ';"></div>') +
                '<div style="font-family: \'Public Sans\'; font-weight:500; font-size:13px; line-height:22px; color:#FFFFFF;">' +
                name + ' ' + usd + ' ' + percent + '% (' + loansLabel + ')' +
                '</div>' +
              '</div>' +
            '</div>'
          )
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


