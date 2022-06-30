import { Dispatch, SetStateAction } from 'react';

export default interface ISideBarProps {
  hideMenu: boolean;
  setHideMenu: Dispatch<SetStateAction<boolean>>;
}
