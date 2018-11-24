import {getScatterEOS, requiredFields} from '../scatter';

// login
export async function login() {
    let scatter = await getScatterEOS();
    if (scatter != null) {
        await scatter.getIdentity(requiredFields);
    }

    return scatter != null && scatter.identity;
}

// get player identity
export async function getPlayerIdentity() {
    const scatter = await getScatterEOS();
    if (scatter != null && scatter.identity) {
        const account = scatter
            .identity
            .accounts
            .find(x => x.blockchain === 'eos');
        return account;
    }

    return null;
}

// logout
export async function logout() {
    const scatter = await getScatterEOS();
    if (scatter != null && scatter.identity) {
        scatter.forgetIdentity();
    }
}
