import {BigNumber} from 'bignumber.js';
import Eos from 'eosjs';

import {eosOptions, getScatterEOS, network} from '../scatter';

import {teamKeyShort} from './filter';

const contract = process.env.EOS.CONTRACTNBA;

// get bet list
export function getPlayerRoundBets(player, round) {
  console.log('getPlayerRoundBets player: ', player);
  if (player === '') {
    return [];
    }

  var bets = [];
  if (round.bets) {
    round.bets.forEach((bet) => {
      if (bet.player != player || bet.round_id != round.id) {
        return;
      }

      bets.push(bet);
    });
  }

  console.log('round bets: ', bets);
  return bets;
};

export function playerRoundJoinStatus(playerRoundBets, round) {
  switch (round.status) {
    case 0:  // betting
      return {
        index: 0,
        value: playerRoundBets.length > 0 ? 'Join Again' : 'Join Now'
      };
    case 1:  // wait publish result
      return {index: 1, value: 'Gaming'};
    default:
      return {index: 2, value: 'View Detail'};
  }
};

function roundBetValue(bet, round) {
  var winner;
  var points;
  switch (round.type) {
    case 0:  // pointdiff
      winner = bet.bet_val > 0 ? round.hometeam : round.awayteam;
      points = Math.abs(bet.bet_val) + '';
      break;
    case 1:  // winlose
      winner = bet.bet_val == 1 ? round.hometeam : round.awayteam;
      points = '';
      break;
    case 2:  // range
      winner = bet.bet_val > 0 ? round.hometeam : round.awayteam;
      switch (Math.abs(bet.bet_val)) {
        case 1:
          points = '1~3';
          break;
        case 2:
          points = '4~7';
          break;
        case 3:
          points = '8~12';
          break;
        case 4:
          points = '13~20';
          break;
        case 5:
          points = '>20';
          break;
          }
      break;
      }

  return {
    team_name: teamKeyShort[winner], share: bet.share, team_score: points
  }
};

export function getPlayerRoundBetLatest(
    playerRoundBets, round){return playerRoundBets.length > 0 ?
                                roundBetValue(playerRoundBets[0], round) :
                                0};

export function getPlayerPreviousRoundBets(playerRoundBets, round) {
  var bets = [];
  playerRoundBets.forEach((b, idx) => {
    if (idx == 0) {
      return;
    }

    bets.push(roundBetValue(b, round));
  });

  return bets;
};

export async function getPlayerBetStatEOS(player) {
  var stat = {};
  const scatter = await getScatterEOS();
  if (scatter != null && scatter.identity) {
    const eos = scatter.eos(network, Eos, eosOptions);
    const tablekey = new BigNumber(Eos.modules.format.encodeName(player, false))
        const result = await eos.getTableRows({
          json: true,
          code: contract,
          scope: contract,
          table: 'betstateoss',
          lower_bound: tablekey.toString(),
          upper_bound: tablekey.plus(1).toString(),
          limit: 1
        });

    console.log('player bet stat response: ', result);
    if (result.rows.length > 0) {
      stat = result.rows[0];
    } else {
      stat = {
        player: player,
        join_times: 0,
        win_times: 0,
        bet_amount: '0.0000 EOS',
        win_amount: '0.0000 EOS',
        extras: []
      };
    }
  }

  console.log('player stat: ', stat);
  return stat;
  }

/// bet round
export async function betRound(
    playerIdentity, round, winner, range, points, shares) {
  if (!playerIdentity) {
    return {errno: 401, error: 'player not login'};
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
      betval = homewin ? points.toString() : (-points).toString();
      break;
    case 1:
      betval = homewin ? 1 + '' : 0 + '';
      break;
    case 2:
      betval = homewin ? range.toString() : (-range).toString();
      break;
      }

  const quant = calcBetTotal(round.bet_unit, shares);
  if (quant == '') {
    return {errno: 400, error: 'quantity is invalid'};
    }

  try {
    const scatter = await getScatterEOS();
    if (scatter != null && scatter.identity) {
      const eos = scatter.eos(network, Eos, eosOptions);
      const response = await eos.transfer(
          `${playerIdentity.name}`, contract, quant,
          'bet|' + round.id + ',' + betval);
      return {errno: 200, data: response};
    } else {
      return {errno: 401, error: 'player not login'};
    }
  } catch (error) {
    return {errno: 500, error: error};
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
