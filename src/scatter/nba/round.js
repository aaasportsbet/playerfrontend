import Eos from 'eosjs';

import {contract, eosOptions, getScatterEOS, network} from '../scatter';

// get round list
async function getRoundList() {
  const scatter = await getScatterEOS();
  if (scatter != null && scatter.identity) {
    const eos = scatter.eos(network, Eos, eosOptions);
    const result = await eos.getTableRows(
        true, contract, contract, 'rounds', 'rounds', 0, -1, 10000, 'i64', 1);
    return result.rows;
    }

  return {};
}

// sort algo
function roundsort(a, b) {
  return (a.id < b.id) ? 1 : -1;
  }

// get home round list
export async function getHomeRoundList() {
  const retrounds = await getRoundList();
  // sort by today sort by id
  const sortedrounds = retrounds.sort(roundsort);
}