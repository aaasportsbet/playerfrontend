import store from '../store';
import ScatterJS from 'scatterjs-core';
import ScatterEOS from 'scatterjs-plugin-eosjs';
import Eos from 'eosjs';

export const network = {
  blockchain: 'eos',
  protocol: process.env.EOS.PROTOCOL,
  host: process.env.EOS.HOST,
  port: process.env.EOS.PORT,
  chainId: process.env.EOS.CHAINID
};
// options you want into the eosjs reference.
const eosOptions = {
  expireInSeconds: 60,
  verbose: process.env.EOS.DEBUG,
  sign: process.env.EOS.DEBUG
};
//fetchRoundList
export async function fetchRoundList(query) {

  const scatter = await getScatterEOS();
  if (scatter != null && scatter.identity) {
    const eos = scatter.eos(network, Eos, eosOptions);
    const result = await eos.getTableRows(
      true, 'aaasportsnba', 'aaasportsnba', 'rounds', 'rounds', 0, -1, 100, 'i64', 1);
      return result;
  }

  return {};
}
// get scatter eos
export async function getScatterEOS() {
  let scatter = store.getters.scatterEOS;
  if (scatter == null) {
    // Don't forget to tell ScatterJS which plugins you are using.
    ScatterJS.plugins(new ScatterEOS());
    // connect
    await ScatterJS.scatter.connect('aaasportsbet').then(connected => {
      // User does not have Scatter Desktop, Mobile or Classic installed.
      if (!connected) return null;

      scatter = ScatterJS.scatter;
      // Vuex ( when using a setScatter action on your store )
      store.dispatch('setScatterEOS', ScatterJS.scatter);
      window.ScatterJS = null;
    });

    // get identity
    const requiredFields = {accounts: [network]};
    await scatter.getIdentity(requiredFields);
  }

  console.log('scatter: ', scatter);
  return scatter;
}
