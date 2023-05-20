import { IItem } from "@/models/Item";
import { IUser } from "@/models/User";
import { createContext, useContext, useState } from "react";

export interface GlobalContextType {
  isClient: boolean;
  user: any;
  login: boolean;
  register: boolean;
  item: boolean;
  bid: boolean;
  disableBid: boolean;
  selectedItem: any;
  deposit: boolean;
  items: any[];
  toggleLogin: () => void;
  toggleRegister: () => void;
  toggleCreateItem: () => void;
  toggleBid: (itemRef?: string) => void;
  setDisableBid: (value: boolean) => void;
  toggleDeposit: () => void;
  setUser: (user: IUser) => void;
  setItems: (items: IItem[]) => void;
  addItem: (item: IItem) => void;
  updateItemCurrPrice: (itemRef: string, price: number) => void;
}

const globalContext: GlobalContextType = {
  isClient: false,
  user: null,
  login: false,
  register: false,
  item: false,
  bid: false,
  disableBid: false,
  selectedItem: null,
  deposit: false,
  items: [],
  toggleLogin: () => {},
  toggleRegister: () => {},
  toggleCreateItem: () => {},
  toggleBid: (itemRef) => {},
  setDisableBid: (value) => {},
  toggleDeposit: () => {},
  setUser: (user) => {},
  setItems: (items) => {},
  addItem: (item) => {},
  updateItemCurrPrice: (itemRef, price) => {},
};

const GlobalContext = createContext<GlobalContextType>(globalContext);

export const useGlobalContext = (): GlobalContextType =>
  useContext(GlobalContext);

function useGlobalState(context: GlobalContextType): GlobalContextType {
  const [ctx, setCtx] = useState<GlobalContextType>({
    ...globalContext,
    ...context,
  });

  function toggleLogin() {
    setCtx((v) => ({ ...v, login: !v.login }));
  }

  function toggleRegister() {
    setCtx((v) => ({ ...v, register: !v.register }));
  }

  function toggleCreateItem() {
    setCtx((v) => ({ ...v, item: !v.item }));
  }

  function toggleBid(itemRef?: string) {
    setCtx((v) => ({
      ...v,
      bid: !v.bid,
      selectedItem: v.items.find(
        (item) => String(item._id) === String(itemRef)
      ),
    }));
  }

  function setDisableBid(value: boolean) {
    setCtx((v) => ({ ...v, disableBid: value }));
  }

  function toggleDeposit() {
    setCtx((v) => ({ ...v, deposit: !v.deposit }));
  }

  function setUser(user: IUser) {
    setCtx((v) => ({ ...v, user }));
  }

  function setItems(items: IItem[]) {
    setCtx((v) => ({ ...v, items }));
  }

  function addItem(item: IItem) {
    setCtx((v) => ({ ...v, items: [...v.items, item] }));
  }

  function updateItemCurrPrice(itemRef: string, price: number) {
    setCtx((v) => ({
      ...v,
      items: v.items.map((item) => {
        if (String(item._id) === String(itemRef)) {
          item.current_price = price;
        }

        return item;
      }),
    }));
  }

  return {
    ...ctx,
    toggleLogin,
    toggleRegister,
    toggleCreateItem,
    toggleBid,
    setDisableBid,
    toggleDeposit,
    setUser,
    setItems,
    addItem,
    updateItemCurrPrice,
  };
}

interface GlobalContextProviderProps {
  children: React.ReactNode;
  context: GlobalContextType;
}

export default function GlobalContextProvider({
  children,
  context,
}: GlobalContextProviderProps) {
  const state = useGlobalState(context);

  return (
    <GlobalContext.Provider value={state}>{children}</GlobalContext.Provider>
  );
}
