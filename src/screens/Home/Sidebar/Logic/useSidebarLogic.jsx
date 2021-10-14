import { useRef } from 'react';

const useSidebarLogic = () => {
  const profileSidebarRef = useRef(null);

  const openProfileSidebar = () => {
    profileSidebarRef.current.classList.add('show');
  };

  const closeProfileSidebar = () => {
    profileSidebarRef.current.classList.remove('show');
  };

  return {
    openProfileSidebar,
    profileSidebarRef,
    closeProfileSidebar,
  };
};

export default useSidebarLogic;
