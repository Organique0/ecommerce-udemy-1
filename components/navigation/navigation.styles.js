import styled from "styled-components";
import Link from "next/link";
import Image from "next/image";

export const NavigationContainer = styled.div`
  height: 70px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 25px;
  background-color: white;
  padding: 0 10px;
`;
export const LogoContainer = styled(Link)`
  height: 100%;
  width: 115px;
  position: relative;
`;
export const Logo = styled(Image)`
  border-radius: 4px;
`;
export const NavLinks = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;
export const NavLinkSpan = styled.span`
  padding: 10px 15px;
  cursor: pointer;
`;
export const NavLinkLink = styled(Link)`
  padding: 10px 15px;
  cursor: pointer;
`;
