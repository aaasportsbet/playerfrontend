import Eos from 'eosjs';
import {contract, eosOptions, getScatterEOS, network} from '../scatter';

// get bet list
export async function getBetListByPlayer(playerIdentity) {
  if (playerIdentity) {
    const player = playerIdentity.name;
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
};
