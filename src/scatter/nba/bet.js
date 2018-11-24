import {BigNumber} from 'bignumber.js';
import Eos from 'eosjs';

import {eosOptions, getScatterEOS, network} from '../scatter';

const contract = process.env.EOS.CONTRACTNBA;

// get bet list
export async function getBetListByPlayer(playerIdentity) {
  if (playerIdentity) {
    const player = playerIdentity.name;
    const scatter = await getScatterEOS();
    if (scatter != null && scatter.identity) {
      const eos = scatter.eos(network, Eos, eosOptions);
      const playerkey = new BigNumber(Eos.modules.format.encodeName(player, false));
      console.log('player: ', player, ', table_key: ', playerkey.toString());
      const result = await eos.getTableRows({
        json: true, code: contract, scope: contract, table: 'bets',
        // table_key: 'bets', lower_bound: playerkey.toString(), upper_bound: playerkey
        // .plus(1)   .toString(),
        limit: 10000,
        key_type: 'i64',
        index_position: '1'
      });

      let rows = [];
      result
        .rows
        .forEach(r => {
          if (r.player != player) {
            return;
          }

          console.log('player bets: ', r);
          rows.push(r);
        });

      return rows;
    }
  }
  return [];
};

export async function betRound(playerIdentity, round_id, round_bet_unit, shares, betval) {
  if (!playerIdentity) {
    return {error: 'player not login'};
  }

  const quant = calcBetQuant(round_bet_unit, shares);
  if (quant == '') {
    return {error: 'quant is invalid'};
  }

  const scatter = await getScatterEOS();
  if (scatter != null && scatter.identity) {
    const eos = scatter.eos(network, Eos, eosOptions);
    // eos.transfer(     `${playerIdentity.name}`, contract, quant, round_id + '|' +
    // betval);
  }

  return {error: 'scatter is null'};
};

function calcBetQuant(round_bet_unit, shares) {
  const units = round_bet_unit.split(' ', 2);
  if (units.length != 2) {
    return '';
  }

  const unit = parseFloat(units[0]);
  if (unit == 0) {
    return '';
  }

  const symbol = units[1];

  return unit * shares + ' ' + symbol;
};