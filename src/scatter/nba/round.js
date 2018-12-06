import Eos from 'eosjs';
import * as moment from 'moment';

import store from '../../store/index';
import {getPlayerIdentity} from '../player';
import {eosOptions, getScatterEOS, network} from '../scatter';

import {getPlayerBetStatEOS, getPlayerPreviousRoundBets, getPlayerRoundBetLatest, getPlayerRoundBets, playerRoundJoinStatus} from './bet';
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
    return (a.bet_end_time - time) < (b.bet_end_time - time) ? 1 : -1
  };
  }

function formatTime(time){
    return moment.unix(time).utc().local().format('YYYY.MM.DD HH:mm')}

// get round list
async function getRoundList() {
  var rounds = [];
  const scatter = await getScatterEOS();
  if (scatter != null) {
    const eos = scatter.eos(network, Eos, eosOptions);
    const result = await eos.getTableRows(
        true, contract, contract, 'rounds', 'rounds', 0, -1, 10000, 'i64', 1);
    rounds = result.rows.sort(sortby(moment().unix()));
  }

  console.log('rounds', rounds);
  return rounds;
}

// get single round
async function getRound(id) {
  if (id < 0) {
    return {};
    }

  const scatter = await getScatterEOS();
  if (scatter != null) {
    const eos = scatter.eos(network, Eos, eosOptions);
    const result = await eos.getTableRows({
      json: true,
      code: contract,
      scope: contract,
      table: 'rounds',
      lower_bound: id,
      upper_bound: id + 1,
      limit: 1
    });

    if (result.rows.length > 0) {
      return result.rows[0];
    }
    }

  return {};
}

function nullObj(obj) {
  return Object.keys(obj).length === 0
  }

export async function getSingleRound(id, player) {
  const round = await getRound(id);
  if (nullObj(round)) {
    return {errno: 404, error: 'round not found'};
    }
  const playerRoundBets = getPlayerRoundBets(player, round);
  return {errno: 200, data: formatHomeRound(round, playerRoundBets)};
  }

// get home round list
export async function getHomeRoundList(player) {
  const rounds = await getRoundList();

  let displayrounds = [];
  rounds.forEach((r) => {
    const playerRoundBets = getPlayerRoundBets(player, r);

    displayrounds.push(formatHomeRound(r, playerRoundBets));
  });

  return {
    errno: displayrounds.length > 0 ? 200 : 404,
    data: displayrounds,
    page: 'home'
  };
  }

// get me page round list
export async function getMeRoundList(player) {
  if (player === '') {
    return {errno: 401, page: 'me', error: 'player not login'};
    }

  const rounds = await getRoundList();

  let ongoingrounds = [];
  let historyrounds = [];
  rounds.forEach((r) => {
    const playerRoundBets = getPlayerRoundBets(player, r);
    if (playerRoundBets.length == 0) {
      return;
      }

    const joined_status = playerRoundJoinStatus(playerRoundBets, r);
    if (joined_status.index != 2) {
      ongoingrounds.push(formatOngoinRound(r, playerRoundBets, joined_status));
    } else {
      // split by bet
      playerRoundBets.forEach((bet) => {
        historyrounds.push(
            formatHistoryRound(r, playerRoundBets, joined_status, bet));
      });
    }
  });

  var betstat = await getPlayerBetStatEOS(player);
  console.log('betstat', betstat);
  return {
    errno: 200,
    ongoingdata: ongoingrounds,
    historydata: historyrounds,
    me_sum: {
      game_join_times_serv_times: betstat.join_times,
      game_join_win_times_serv_win_times: betstat.win_times,
      game_payout_serv_payout: betstat.bet_amount,
      game_get_serv_get: betstat.win_amount
    },
    page: 'me',
  };
  }

function formatHomeRound(r, playerRoundBets) {
  return {
    game_serv_id: r.id,
    game_count_down_time_serv_bet_end_time: formatTime(r.bet_end_time),
    game_count_down_time_serv_bet_end_time_second: r.bet_end_time,
    game_count_down_time_display: true,
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
  };
  }

function formatOngoinRound(r, playerRoundBets, joined_status) {
  return {
    game_serv_id: r.id,
    game_count_down_time_serv_bet_end_time: formatTime(r.bet_end_time),
    game_count_down_time_serv_bet_end_time_second: r.bet_end_time,
    game_count_down_time_display: true,
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
  };
  }

function formatHistoryRound(r, playerRoundBets, joined_status, bet) {
  return {
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
  };
}
