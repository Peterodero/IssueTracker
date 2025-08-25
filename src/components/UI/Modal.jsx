import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

export default function Modal({ children, onClose }) {
  const dialog = useRef();

  useEffect(() => {
    // Using useEffect to sync the Modal component with the DOM Dialog API
    // This code will open the native <dialog> via it's built-in API whenever the <Modal> component is rendered
    const modal = dialog.current;
    modal.showModal();

    return () => {
      modal.close(); // needed to avoid error being thrown
    };
  }, []);

  return createPortal(
    <dialog
      className="modal fixed md:top-[10vh] top-[18vh] left-9 right-9 sm:left-[calc(50%-15rem)] sm:w-[30rem] m-0 p-3 md:p-5 md:max-h-[80vh] max-h-[60vh] bg-[#e2e5eb] border-0 rounded-lg z-[100] shadow-xl flex flex-col justify-between overflow-y-auto animate-[slide-down-fade-in_300ms_ease-out_forwards]"
      ref={dialog}
      onClose={onClose}
    >
      {children}
    </dialog>,
    document.getElementById("modal")
  );
}
