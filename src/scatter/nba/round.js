import Eos from 'eosjs';
import * as moment from 'moment';

import {contract, eosOptions, getScatterEOS, network} from '../scatter';

import {getBetListByPlayer} from './bet';
import {filterPlayerBetListByRound, getPlayerRoundBetLatest, getPlayerRoundBets, playerJoinStatus, roundtypeKeyValue, teamKeyLang, teamKeyShort} from './filter';
import {getPlayerIdentity} from './player';

// get round list
async function getRoundList() {
  const scatter = await getScatterEOS();
  if (scatter != null ) {
    const eos = scatter.eos(network, Eos, eosOptions);
    const result = await eos.getTableRows(true, contract, contract, 'rounds', 'rounds', 0, -1, 10000, 'i64', 1);
    console.log("aaa", result.rows)
    return result.rows;
    }

  return [{"err":"Not get roundlist"}];
}

// sort algo
function sortby(time) {
  return function(a, b) {
    return (a.bet_end_time - time) > (b.bet_end_time - time) ? 1 : -1
  };
  }

// filter delete rounds that already drawed or returned
function filterFinishedRounds(rounds) {
  let retrounds = [];
  console.log("rounds: ",rounds);
  for (var r in rounds) {
    if (r.status == 3 || r.status == 4 || r.status == 5) {
      console.log("tf");
      continue;

    }

    retrounds.push(r);
    console.log("af: ",retrounds);
    return retrounds;
  }
  }

// get home round list
export async function getHomeRoundList() {
  // filter finished rounds
  const awaitdata=await getRoundList()
  const filteredrounds = filterFinishedRounds(awaitdata);
  // sort by time
  console.log("filteredrounds:",awaitdata)
  const sortedrounds =filteredrounds.sort(sortby(moment().millisecond() * 1000));
        console.log("df");
  const playerIdentity = getPlayerIdentity();
  // get player bet list
  const playerbets = await getBetListByPlayer(playerIdentity);

  let displayrounds = [];
  for (var r in sortedrounds) {
    const playerRoundBets =filterPlayerBetListByRound(playerbets, playerIdentity, r.id);

    displayrounds.push({
      game_serv_id: r.id,
      game_count_down_time_serv_bet_end_time:
          moment.unix(r.bet_end_time / 1000000)
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
      game_joined_more_display: playerRoundBets.length > 0,
      game_joined_more: getPlayerRoundBets(playerRoundBets, r)
    });
    }

  return {errno: displayrounds.length > 0 ? 200 : 404, data: displayrounds};
}
