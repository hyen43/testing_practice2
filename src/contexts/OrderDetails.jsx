import { createContext, useContext, useState } from "react";
import { pricePerItem } from "../constants";
const OrderDetails = createContext();

//custom hook
export function useOrderDetails() {
  const contextValue = useContext(OrderDetails);

  if (!contextValue) {
    throw new Error(
      "useOrderDetails must be called from within an OrderDetailProvider"
    );
  }

  return contextValue;
}

export function OrderDetailProvider(props) {
  const [optionCounts, setOptionCounts] = useState({
    scoops: {}, // ex:{Chocolate: 1, Vanilla: 2}
    toppings: {}, // ex: {"Gummi Bears": 1}
  });

  function updateItemCount(itemName, newItemCount, optionType) {
    // 상태 변이 막기(스테이트 복사)
    const newOptionCounts = { ...optionCounts };

    // 새로운 정보에 따라 업데이트 하기
    newOptionCounts[optionType][itemName] = newItemCount;

    //optionCount의 상태가 new option cuount가 되게끔
    setOptionCounts(newOptionCounts);
  }

  // 주문 초기화 함수
  function resetOrder() {
    setOptionCounts({
      scoops: {},
      toppings: {},
    });
  }

  // 총합을 나타내는 utility
  function calculateTotal(optionType) {
    //get an array of counts for the option type(ex. [1,2])
    const countsArray = Object.values(optionCounts[optionType]);

    //total the values in the array of counts For the number of items
    const totalCount = countsArray.reduce((total, value) => total + value, 0);

    // multiply the total number of items by the price for this item type
    return totalCount * pricePerItem[optionType];
  }

  const totals = {
    scoops: calculateTotal("scoops"),
    toppings: calculateTotal("toppings"),
  };

  const value = { optionCounts, totals, updateItemCount, resetOrder };
  return <OrderDetails.Provider value={value} {...props} />;
}
