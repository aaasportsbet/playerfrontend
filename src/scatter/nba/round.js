import {filterPlayerBetListByRound, getBetListByPlayer} from 'bet';
import Eos from 'eosjs';
import * as moment from 'moment';
import {getPlayerIdentity} from 'player';

import {contract, eosOptions, getScatterEOS, network} from '../scatter';

// get round list
async function getRoundList() {
  const scatter = await getScatterEOS();
  if (scatter != null && scatter.identity) {
    const eos = scatter.eos(network, Eos, eosOptions);
    const result = await eos.getTableRows(true, contract, contract, 'rounds', 'rounds', 0, -1, 10000, 'i64', 1);
    return result.rows;
  }

  return [];
}

// sort algo
function sortby(time) {
  return function (a, b) {
    return (a.bet_end_time - time) > (b.bet_end_time - time)
      ? 1
      : -1
  };
}

// filter delete rounds that already drawed or returned
function filterFinishedRounds(rounds) {
  let retrounds = [];
  for (var r in rounds) {
    if (r.status == 3 || r.status == 4 || r.status == 5) {
      continue;
    }

    retrounds.push(r);
  }
}

// get home round list
export async function getHomeRoundList() {
  // filter finished rounds
  const filteredrounds = filterFinishedRounds(await getRoundList());
  // sort by time
  const sortedrounds = filteredrounds.sort(sortby(moment().millisecond() * 1000));

  // get player bet list
  let playerbets = await getBetListByPlayer(getPlayerIdentity());

  let displayrounds = [];
  for (var r in sortedrounds) {
    displayrounds.push({});
  }

  return sortedrounds;
}