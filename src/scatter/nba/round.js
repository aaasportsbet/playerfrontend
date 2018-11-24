import Eos from 'eosjs';
import * as moment from 'moment';

import {getPlayerIdentity} from '../player';
import {eosOptions, getScatterEOS, network} from '../scatter';

import {getBetListByPlayer} from './bet';
import {
  filterPlayerBetListByRound,
  getPlayerRoundBetLatest,
  getPlayerRoundBets,
  playerJoinStatus,
  roundtypeKeyValue,
  teamKeyLang,
  teamKeyShort
} from './filter';

const contract = process.env.EOS.CONTRACTNBA;

// get round list
async function getRoundList() {
  const scatter = await getScatterEOS();
  if (scatter != null) {
    const eos = scatter.eos(network, Eos, eosOptions);
    const result = await eos.getTableRows(true, contract, contract, 'rounds', 'rounds', 0, -1, 10000, 'i64', 1);
    console.log('aaa', result.rows);
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
  rounds.forEach(r => {
    console.log(r);
    if (r.status == 3 || r.status == 4 || r.status == 5) {
      return;
    }

    retrounds.push(r);
  });

  return retrounds;
}

// get home round list
export async function getHomeRoundList() {
  // filter finished rounds
  const rounds = await getRoundList();
  // const filteredrounds = filterFinishedRounds(awaitdata); sort by time
  const sortedrounds = rounds.sort(sortby(moment().millisecond() * 1000));
  console.log(sortedrounds);
  const playerIdentity = await getPlayerIdentity();
  console.log('player identity: ', playerIdentity);
  // get player bet list
  const playerbets = await getBetListByPlayer(playerIdentity);
  console.log('player bets: ', playerbets);

  let displayrounds = [];
  sortedrounds.forEach((r, idx, arr) => {
    const playerRoundBets = filterPlayerBetListByRound(playerbets, playerIdentity, r.id);

    displayrounds.push({
      game_serv_id: r.id,
      game_count_down_time_serv_bet_end_time: moment
        .unix(r.bet_end_time / 1000000)
        .utc()
        .format('YYYY.MM.DD HH:mm'),
      game_count_down_time_display: true,
      game_win_status: 'win',
      game_win_status_display: false,
      game_info_left_i18n_serv_awayteam: teamKeyLang[r.awayteam],
      game_info_left_abbr: teamKeyShort[r.awayteam],
      game_info_right_i18n_serv_hometeam: teamKeyLang[r.hometeam],
      game_info_right_abbr: teamKeyShort[r.hometeam],
      game_contract_type: 'NBA',
      game_round_type_i18n_serv_type: roundtypeKeyValue[r.type],
      game_join_bet_serv_bet_unit: r.bet_unit,
      game_joied_num_serv_shares: r.shares,
      game_joined_status: playerJoinStatus(playerRoundBets, r),
      game_joined_latest: getPlayerRoundBetLatest(playerRoundBets, r),
      game_joined_more_display: playerRoundBets.length > 1,
      game_joined_more: getPlayerRoundBets(playerRoundBets, r),
      game_server_obj: r
    });
  });

  return {
    errno: displayrounds.length > 0
      ? 200
      : 404,
    data: displayrounds,
    page: 'home'
  };
}
