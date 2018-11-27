// import {BigNumber} from 'bignumber.js';
import Eos from 'eosjs';

import {eosOptions, getScatterEOS, network} from '../scatter';

const contract = process.env.EOS.CONTRACTNBA;

// get bet list
export async function getBetListByPlayer(playerIdentity) {
  if (!playerIdentity) {
    throw Error('player not login');
  }

  const player = playerIdentity.name;
  const scatter = await getScatterEOS();
  if (scatter != null && scatter.identity) {
    try {
      const eos = scatter.eos(network, Eos, eosOptions);
      // const playerkey = new BigNumber(Eos.modules.format.encodeName(player,
      // false)); console.log('player: ', player, ', table_key: ',
      // playerkey.toString());
      const result = await eos.getTableRows({
        json: true, code: contract, scope: contract, table: 'bets',
        // table_key: 'bets', lower_bound: playerkey.toString(), upper_bound: playerkey
        // .plus(1)   .toString(),
        limit: 10000,
        key_type: 'i64',
        // index_position: '1'
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
    } catch (error) {
      return error;
    }
  } else {
    throw Error('scatter is null');
  }
};

/// bet round
export async function betRound(playerIdentity, round, winner, range, points, shares) {
  if (!playerIdentity) {
    throw Error('player not login');
  }

  let homewin = false;
  if (round.hometeam == winner) {
    homewin = true;
  } else {
    homewin = false;
  }

  let betval = '';
  switch (round.type) {
    case 0:
      betval = homewin
        ? points.toString()
        : (-points).toString();
      break;
    case 1:
      betval = homewin
        ? 1 + ''
        : 0 + '';
      break;
    case 2:
      betval = homewin
        ? range.toString()
        : (-range).toString();
      break;
  }

  const quant = calcBetTotal(round.bet_unit, shares);
  if (quant == '') {
    throw Error('quant is invalid');
  }

  const scatter = await getScatterEOS();
  if (scatter != null && scatter.identity) {
    const eos = scatter.eos(network, Eos, eosOptions);
    try {
      const response = await eos.transfer(`${playerIdentity.name}`, contract, quant, round.id + '|' + betval);
      return response;
    } catch (error) {
      return error;
    }
  } else {
    throw Error('scatter is null');
  }
};

export function calcBetTotal(round_bet_unit, shares) {
  const units = round_bet_unit.split(' ', 2);
  if (units.length != 2) {
    return '';
  }

  const unit = parseFloat(units[0]);
  if (unit == 0) {
    return '';
  }

  const symbol = units[1];
  if (symbol == 'EOS') {
    let DecimalPad = Eos.modules.format.DecimalPad;
    return DecimalPad(unit * shares, 4) + ' ' + symbol;
  }

  return unit * shares + ' ' + symbol;
};