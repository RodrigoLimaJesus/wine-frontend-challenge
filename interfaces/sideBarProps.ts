import { Dispatch, SetStateAction } from 'react';

export default interface ISideBarProps {
  isHidden: boolean;
  setIsHidden: Dispatch<SetStateAction<boolean>>;
}
