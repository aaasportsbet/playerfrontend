
import zhcn from "./zhcn"

export default function applyLang( lan, val ) {
    if ( zhcn.lan == lan ) {
        return zhcn.map[val];
    } else {
        return val;
    }
}
