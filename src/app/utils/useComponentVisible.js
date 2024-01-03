import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";

export default function useComponentVisible(initialIsVisible, isVisiable) {
  const dispatch = useDispatch();

  const ref = useRef(null);

  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      dispatch(isVisiable(false));
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  return { ref };
}
