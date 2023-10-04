import React from "react";
import styled from "styled-components";

const Footer = () => {
  return (
    <LogoBox>
      {/* <Logo src="/logo.svg" alt="" /> */}
      <p className="text-sm text-gray-500 sm:mt-0 dark:text-gray-300">
        © Copyright 2023. All Rights Reserved.
      </p>
    </LogoBox>
  );
};

const LogoBox = styled.div`
  text-align: center;
`;

const Logo = styled.img`
  width: 200px;
`;

export default Footer;
