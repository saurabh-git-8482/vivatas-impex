import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const ContactContext = createContext(null);

export const ContactProvider = ({ children }) => {
  const [contactData, setContactData] = useState(null);

  const baseURL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const fetchContactData = async () => {
      try {
        const res = await axios.get(`${baseURL}/contact-page`, {
          params: { domainName: "vivatasimpex.com" },
        });
        setContactData(res.data);
      } catch (err) {
        console.error("ContactContext error:", err);
      }
    };

    fetchContactData();
  }, [baseURL]);

  return (
    <ContactContext.Provider value={contactData}>
      {children}
    </ContactContext.Provider>
  );
};

export const useContactData = () => useContext(ContactContext);
