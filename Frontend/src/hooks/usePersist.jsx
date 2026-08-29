import { useState, useEffect } from "react";

function usePersist() {
  const [persist, setPersist] = useState(() => {
    try {
      const item = localStorage.getItem("persist");
      return item ? JSON.parse(item) : false;
    } catch (error) {
      console.error("Error reading localStorage:", error);
      return false;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("persist", JSON.stringify(persist));
    } catch (error) {
      console.error("Error saving to localStorage:", error);
    }
  }, [persist]);

  return [persist, setPersist]; 
}

export default usePersist;