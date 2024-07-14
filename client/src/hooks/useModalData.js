import { useState } from "react";

export const useModalData = () => {
  const [modalData, setModalData] = useState(null);
  return { modalData, setModalData };
};

export default useModalData;
