import { createContext, useEffect, useState } from "react";

export const StoreContext = createContext(null);

const StoreProvier = ({ children }) => {
  const [store, setStore] = useState(null);
  let initLanguageData = null;
  const [language, setLanguage] = useState(
    initLanguageData === null ? 2 : parseInt(initLanguageData)
  );

  useEffect(() => {
    initLanguageData = localStorage.getItem("languageID");
    const handleChangeLanguage = (languageId) => {
      if (languageId === 0 || 1) {
        localStorage.removeItem("languageID");
        window.location.href = "https://wuansan.com/";
        return;
      }

      localStorage.setItem("languageID", languageId);
      setLanguage(languageId);
      window.location.href = "/";
    };
    const store = {
      language: [language, handleChangeLanguage],
    };
    setStore(store);
  }, []);

  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
};

export default StoreProvier;
