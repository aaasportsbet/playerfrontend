import Eos from 'eosjs';
import ScatterJS from 'scatterjs-core';
import ScatterEOS from 'scatterjs-plugin-eosjs';

import store from '../store/index';

// Don't forget to tell ScatterJS which plugins you are using.
ScatterJS.plugins(new ScatterEOS());

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
async function isscatterInstalled() {
  // connect
  return await ScatterJS
    .scatter
    .connect('aaasportsbet')
    .then(connected => {
      // User does not have Scatter Desktop, Mobile or Classic installed.
      return connected;
    });;
}

// get scatter eos
export async function getScatterEOS() {
  let scatter = store.getters.scatterEOS;
  console.log('store.getters.scatterEOS:', store.getters.scatterEOS);
  if (scatter == null) {
    await isscatterInstalled().then(installed => {
      if (!installed) 
        return null;
      
      scatter = ScatterJS.scatter;
      // Vuex ( when using a setScatter action on your store )
      store.dispatch('setScatterEOS', ScatterJS.scatter);
      window.ScatterJS = null;
    });
  }

  console.log('scatter: ', scatter);
  return scatter;
}
