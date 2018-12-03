import Eos from 'eosjs';
import ScatterJS from 'scatterjs-core';
import ScatterEOS from 'scatterjs-plugin-eosjs';

import store from '../store/index';

export const network = {
  blockchain: 'eos',
  protocol: process.env.EOS.PROTOCOL,
  host: process.env.EOS.HOST,
  port: process.env.EOS.PORT,
  chainId: process.env.EOS.CHAINID
};

// options you want into the eosjs reference.
export const eosOptions = {
  expireInSeconds: 60,
  verbose: process.env.EOS.DEBUG,
  sign: process.env.EOS.DEBUG
};

export const requiredFields = {
  accounts: [network]
};

// is scatter installed
export async function isscatterInstalled() {
  const installed = await ScatterJS
    .scatter
    .connect(process.env.EOS.APPLICATION);
  console.log('scatter installed: ', installed);
  return installed;
}

// get scatter eos
export async function getScatterEOS(force = false) {
  var scatter = store.getters.scatterEOS;
  console.log('get scatter from store: ', scatter);
  if (scatter == null || force) {
    // for (var i = 0; i < 5; i++) {   await isscatterInstalled();   } const
    // installed = await isscatterInstalled(); if (!installed) {   return scatter; }
    // Don't forget to tell ScatterJS which plugins you are using.
    ScatterJS.plugins(new ScatterEOS());

    const installed = await ScatterJS
      .scatter
      .connect(process.env.EOS.APPLICATION);
    if (!installed) 
      return store.getters.scatterEOS;
    
    scatter = ScatterJS.scatter;
    const identity = await scatter.getIdentity(requiredFields);
    console.log('await_get scatter from store: ', scatter, ', identity: ', identity);
    if (identity) {
      // store.dispatch('setScatterEOS', null);
      store.dispatch('setScatterEOS', scatter);
    }

    window.ScatterJS = null;
  }

  console.log('should show times as getPlayerIdentity');
  console.log('getScatterEOS return: ', scatter);
  return scatter;
}
