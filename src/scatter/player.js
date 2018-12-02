import store from '../store/index';

import {getScatterEOS, requiredFields} from './scatter';

// login
export async function login() {
  try {
    const identity = await getPlayerIdentity();

    return identity;
  } catch (error) {
    console.error('catch return identity scatter: ', error);
    throw Error(error);
  }
  }

// get player identity
export async function getPlayerIdentity() {
  try {
    const scattereos = await getScatterEOS();
    console.log('get player identity scatter: ', scattereos);
    if (scattereos != null && scattereos.identity) {
      const account =
          scattereos.identity.accounts.find(x => x.blockchain === 'eos');
      return account;
      }

    throw Error('player not login');
  } catch (error) {
    console.error('eero_etPlayerIdentit: ', error);
    throw Error(error);
  }
  }

// logout
export async function logout() {
  try {
    const scatter = await getScatterEOS();
    if (scatter != null && scatter.identity) {
      scatter.forgetIdentity();
    }
    // Vuex ( when using a setScatter action on your store )
    store.dispatch('setScatterEOS', null);
  } catch (error) {
    throw Error(error);
  }
}
