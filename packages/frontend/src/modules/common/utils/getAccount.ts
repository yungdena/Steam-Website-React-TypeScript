import { IAccount } from "../types/Account.interface";

export const getAccount = async () => {
  const storedAccountLocal = localStorage.getItem("account");
  const storedAccountSession = sessionStorage.getItem("account");

  if (storedAccountLocal) {
    const parsedAccount: IAccount = JSON.parse(storedAccountLocal);
    return parsedAccount;
  } else if (storedAccountSession) {
    const parsedAccount: IAccount = JSON.parse(storedAccountSession);
    return parsedAccount;
  }

  return null;
};