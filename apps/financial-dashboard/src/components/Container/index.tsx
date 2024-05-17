import { ReactNode } from 'react';
import { useGlobalContext } from '../../contexts/GlobalContext';
import { StyledContainer } from './style';

interface iChildren {
  children: ReactNode;
}
const Container = ({ children }: iChildren) => {
  const { sidebarIsOpen } = useGlobalContext();

  return (
    <StyledContainer sidebarIsOpen={sidebarIsOpen}>{children}</StyledContainer>
  );
};

export default Container;
