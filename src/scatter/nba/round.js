import Eos from 'eosjs';
import * as moment from 'moment';

import {getPlayerIdentity} from '../player';
import {eosOptions, getScatterEOS, network} from '../scatter';

import {getPlayerPreviousRoundBets, getPlayerRoundBetLatest, getPlayerRoundBets, playerRoundJoinStatus} from './bet';
import {roundtypeKeyValue, teamKeyLang, teamKeyShort} from './filter';

const contract = process.env.EOS.CONTRACTNBA;

function playerBetWinStatus(bet) {
  switch (bet.status) {
    case 0:
      return 'wait';
    case 1:
      return 'win';
    case 2:
      return 'lose';
    case 3:
      return 'awarded';
    case 4:
      return 'returned';
    default:
      return 'unknown';
  }
  }

// sort algo
function sortby(time) {
  return function(a, b) {
    return (a.bet_end_time - time) > (b.bet_end_time - time) ? 1 : -1
  };
  }

function formatTime(time){
    return moment.unix(time).utc().local().format('YYYY.MM.DD HH:mm')}

// get round list
async function getRoundList() {
  const scatter = await getScatterEOS();
  if (scatter != null) {
    const eos = scatter.eos(network, Eos, eosOptions);
    const result = await eos.getTableRows(
        true, contract, contract, 'rounds', 'rounds', 0, -1, 10000, 'i64', 1);
    return result.rows.sort(sortby(moment().second()));
    ;
    }

  return [];
}

// get single round
async function getRound(id) {
  try {
    const scatter = await getScatterEOS();
    if (scatter != null) {
      const eos = scatter.eos(network, Eos, eosOptions);
      const result = await eos.getTableRows({
        json: true,
        code: contract,
        scope: contract,
        table: 'bets',
        lower_bound: id,
        upper_bound: id + 1,
        limit: 1
      });

      if (result.rows.length > 0) {
        return result.rows[0];
      }
      }

    return {};
  } catch (error) {
    return error;
  }
}

// get home round list
export async function getHomeRoundList() {
  try {
    const rounds = await getRoundList();
    console.log('home rounds', rounds);
    const playerIdentity = await getPlayerIdentity();
    console.log('player identity: ', playerIdentity);

    let displayrounds = [];
    rounds.forEach((r) => {
      const playerRoundBets = getPlayerRoundBets(playerIdentity.name, r);

      displayrounds.push({
        game_serv_id: r.id,
        game_count_down_time_serv_bet_end_time: formatTime(r.bet_end_time),
        game_count_down_time_display: true,
        game_win_status: 'win',
        game_win_status_display: false,
        game_info_left_i18n_serv_awayteam: teamKeyLang[r.awayteam],
        game_info_left_abbr: teamKeyShort[r.awayteam],
        game_info_left_id: r.awayteam,
        game_info_right_i18n_serv_hometeam: teamKeyLang[r.hometeam],
        game_info_right_abbr: teamKeyShort[r.hometeam],
        game_info_right_id: r.hometeam,
        game_contract_type: 'NBA',
        game_round_type_i18n_serv_type: roundtypeKeyValue[r.type],
        game_join_bet_serv_bet_unit: r.bet_unit,
        game_joied_num_serv_shares: r.shares,
        game_joined_status: playerRoundJoinStatus(playerRoundBets, r),
        game_joined_latest: getPlayerRoundBetLatest(playerRoundBets, r),
        game_joined_more_display: playerRoundBets.length > 1,
        game_joined_more: getPlayerPreviousRoundBets(playerRoundBets, r),
        game_server_obj: r,
        game_info_left_result_score: r.awaypoint,
        game_info_right_result_score: r.homepoint,
        game_info_result_players: r.shares,
        game_info_result_bonuspool: r.total,
        game_info_result_winner_num: r.shares_win,
        game_info_result_winner_getuint: r.unit_award
      });
    });

    return {
      errno: displayrounds.length > 0 ? 200 : 404,
      data: displayrounds,
      page: 'home'
    };
  } catch (error) {
    return error;
  }
}

// get me page round list
export async function getMeRoundList(playerIdentity) {
  if (!playerIdentity) {
    throw Error('player not login');
    }

  const rounds = await getRoundList();
  console.log(rounds);

  let ongoingrounds = [];
  let historyrounds = [];
  rounds.forEach((r) => {
    const playerRoundBets = getPlayerRoundBets(playerIdentity.name, r);

    if (playerRoundBets.length == 0) {
      return;
      }

    const joined_status = playerRoundJoinStatus(playerRoundBets, r);
    if (joined_status.index != 2) {
      ongoingrounds.push({
        game_serv_id: r.id,
        game_count_down_time_serv_bet_end_time: formatTime(r.bet_end_time),
        game_count_down_time_display: true,
        game_win_status: 'win',
        game_win_status_display: false,
        game_info_left_i18n_serv_awayteam: teamKeyLang[r.awayteam],
        game_info_left_abbr: teamKeyShort[r.awayteam],
        game_info_left_id: r.awayteam,
        game_info_right_i18n_serv_hometeam: teamKeyLang[r.hometeam],
        game_info_right_abbr: teamKeyShort[r.hometeam],
        game_info_right_id: r.hometeam,
        game_contract_type: 'NBA',
        game_round_type_i18n_serv_type: roundtypeKeyValue[r.type],
        game_join_bet_serv_bet_unit: r.bet_unit,
        game_joied_num_serv_shares: r.shares,
        game_joined_status: joined_status,
        game_joined_latest: getPlayerRoundBetLatest(playerRoundBets, r),
        game_joined_more_display: playerRoundBets.length > 1,
        game_joined_more: getPlayerPreviousRoundBets(playerRoundBets, r),
        game_server_obj: r
      });
    } else {
      // split by bet
      playerRoundBets.forEach((bet) => {
        historyrounds.push({
          game_serv_id: r.id,
          game_count_down_time_display: false,
          game_win_status: playerBetWinStatus(bet),
          game_win_status_display: true,
          game_info_left_i18n_serv_awayteam: teamKeyLang[r.awayteam],
          game_info_left_abbr: teamKeyShort[r.awayteam],
          game_info_left_id: r.awayteam,
          game_info_right_i18n_serv_hometeam: teamKeyLang[r.hometeam],
          game_info_right_abbr: teamKeyShort[r.hometeam],
          game_info_right_id: r.hometeam,
          game_contract_type: 'NBA',
          game_round_type_i18n_serv_type: roundtypeKeyValue[r.type],
          game_join_bet_serv_bet_unit: r.bet_unit,
          game_joied_num_serv_shares: r.shares,
          game_joined_status: joined_status,
          game_joined_latest: getPlayerRoundBetLatest(playerRoundBets, r),
          game_joined_more_display: false,
          game_server_obj: r,
          game_info_left_result_score: r.awaypoint,
          game_info_right_result_score: r.homepoint,
          game_info_result_players: r.shares,
          game_info_result_bonuspool: r.total,
          game_info_result_winner_num: r.shares_win,
          game_info_result_winner_getuint: r.unit_award
        });
      });
    }
  });

  return {
    errno: 200,
    ongoingdata: ongoingrounds,
    historydata: historyrounds,
    me_sum: {
      'game_status': 'history_or_ongoing',
      'game_join_times_serv_times': 5,
      'game_join_win_times_serv_win_times': 1,
      'game_payout_serv_payout': 1,
      'game_get_serv_get': 1
    },
    page: 'me'
  };
}