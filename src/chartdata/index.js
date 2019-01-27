
import _ from 'lodash'

export default function fetchChartData(bets, home, away, unit, win, score) {
  console.log( "EOS: ", unit );
  let distribute = _(bets)
  .map(bet => {
    return {'bet': bet.bet_val, 'eos': bet.share}
  })
  .groupBy('bet')
  .map(v => {
    let eos = _(v)
    .map(bet => {
      return bet.eos
    })
    .sum()
    return {'bet': v[0].bet, 'eos': eos}
  })
  .orderBy('eos', 'desc')
  .value()
  
  let bet = []
  let eos = []
  _(distribute)
  .take(4)
  .values()
  .forEachRight(v => {
    if (v.bet > 0) {
      bet.push(home + '(' + v.bet + ')')
    } else {
      bet.push(away + '(' + Math.abs(v.bet) + ')')
    }
    eos.push(v.eos * unit)
  })

  let others = _(distribute)
  .drop(4)
  .values()
  .sumBy('eos')

  if (others > 0)
  {
    bet.unshift('OTHER')
    eos.unshift(others)
  }

  return {
    xAxis: {
      type: 'value',
      name: 'EOS',
      axisLabel: {
        fontSize: 17
      }
    },
    yAxis: {
      type: 'category',
      name: 'BET',
      data: bet,
      axisLabel: {
        fontSize: 17
      }
    },
    textStyle: {
      color: "#DDDDDD",
      fontSize: 18
    },
    series: [{
      data: eos,
      type: 'bar',
      barWidth: "66%",
      itemStyle: {
        color: "#444444",
        borderColor: "#666666",
        borderWidth: 1.5
      },
      label: {
        show: true,
        formatter: (p) => {
          if (p.name == 'OTHER') {
            return ''
          } else {
            let name = p.name.replace(')', '').split('(');
            return name[0] + ' ' + win + ' ' + name[1] + ' ' + score;
          }
        }
      }
    }]
  }
}
