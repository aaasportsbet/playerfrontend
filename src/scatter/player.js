import store from '../store/index';

import {getScatterEOS, requiredFields} from './scatter';

// login
export async function login() {
  const scatter = await getScatterEOS();
  if (scatter != null) {
    await scatter.getIdentity(requiredFields);
    }

  return scatter != null && scatter.identity;
  }

// get player identity
export async function getPlayerIdentity() {
  const scatter = await getScatterEOS();
  if (scatter == null || !scatter.identity) {
    await login();
    }

  if (scatter != null && scatter.identity) {
    const account = scatter.identity.accounts.find(x => x.blockchain === 'eos');
    return account;
    }

  throw Error('player not login');
  }

// logout
export async function logout() {
  const scatter = await getScatterEOS();
  if (scatter != null && scatter.identity) {
    scatter.forgetIdentity();
    // Vuex ( when using a setScatter action on your store )
    store.dispatch('setScatterEOS', null);
  }
}
