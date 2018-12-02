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
export async function isscatterInstalled() {
  try {
    // connect
    const installed = await ScatterJS
      .scatter
      .connect(process.env.EOS.APPLICATION);
    // console.log('scatter installed: ', installed);
    return installed;
  } catch (error) {
    throw Error(error);
  }
}

// get scatter eos
export async function getScatterEOS() {
  try {
    let scatter = store.getters.scatterEOS;
    console.log('get scatter from store: ', scatter);
    if (scatter == null) {
      console.log('err_get scatter from store', scatter);
      const installed = await isscatterInstalled();
      if (installed) {
        scatter = ScatterJS.scatter;
        await scatter.getIdentity(requiredFields);
        console.log('await_get scatter from store', scatter);
        store.dispatch('setScatterEOS', scatter);
        window.ScatterJS = null;

        console.log('set scatter to store: ', scatter);
      }
    }
    console.log('return_get scatter from store', scatter);
    return scatter;
  } catch (error) {
    console.log('return_erro_get scatter from store', error);
    throw Error(error);
  }
}
