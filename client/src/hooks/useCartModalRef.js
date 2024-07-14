import { useRef } from "react";

export const useCartModalRef = () => {
  const cartref = useRef();
  return cartref;
};

export default useCartModalRef;
