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
      const result = await eos.getTableRows(
          true, contract, contract, 'bets', 'byplayer', player, player, 10000,
          'i64', 3);

      console.log('player bets: ', result);
      return result.rows;
    }
    }
  return [];
};

export async function betRound(
    playerIdentity, round_id, round_bet_unit, shares, betval) {
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
    await eos.transfer(
        `${playerIdentity.name}`, contract, quant, round_id + '|' + betval,
        (error, result) => {
          return {error: error, result: result};
        });
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