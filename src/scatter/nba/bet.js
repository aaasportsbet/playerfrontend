import Eos from 'eosjs';
import {contract, eosOptions, getScatterEOS, network} from '../scatter';

// get bet list
export async function getBetListByPlayer(player) {
  if (player) {
    const scatter = await getScatterEOS();
    if (scatter != null && scatter.identity) {
      const eos = scatter.eos(network, Eos, eosOptions);
      const result = await eos.getTableRows(
          true, contract, contract, 'bets', 'byplayer', player, player, 10000,
          'i64', 3);
      return result.rows;
    }
    }
  return [];
  }

// filter player bets in a round
export async function filterPlayerBetListByRound(bets, player, round) {
  let betlist = [];
  for (var b in bets) {
    if (b.player == player && b.round_id == round) {
      betlist.push(b);
    }
  }
}