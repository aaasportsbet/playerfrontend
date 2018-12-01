import store from '../store/index';

import {getScatterEOS, requiredFields} from './scatter';

// login
export async function login() {
  try {
    const identity = await getPlayerIdentity();
    return identity;
  } catch (error) {
    return error;
  }
}

// get player identity
export async function getPlayerIdentity() {
  try {
    const scattereos = await getScatterEOS();
    console.log('get player identity scatter: ', scattereos);
    if (scattereos != null && scattereos.identity) {
      const account = scattereos
        .identity
        .accounts
        .find(x => x.blockchain === 'eos');
      return account;
    }

    throw Error('player not login');
  } catch (error) {
    return error;
  }
}

// logout
export async function logout() {
  const scatter = await getScatterEOS();
  if (scatter != null && scatter.identity) {
    scatter.forgetIdentity();
  }
  // Vuex ( when using a setScatter action on your store )
  store.dispatch('setScatterEOS', null);
}
