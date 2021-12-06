import * as t from "../types";

const main = (
  state = {
    loading: false,
    error: null,
    account: null,
    contract: null,
    signer: null,
  },
  action
) => {
  switch (action.type) {
    case t.LOGIN_METAMASK:
      console.log("redux:", action.payload.contract);
      return {
        ...state,
        account: action.payload.account,
        contract: action.payload.contract,
        signer: action.payload.signer,
      };
    default:
      return { ...state };
  }
};

export default main;
