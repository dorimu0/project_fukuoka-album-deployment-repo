// import React, { useState, useEffect, useMemo } from "react";
import styled from "styled-components";          

const Header = () => {
  return (
      <div>
        <LogoBox>
          <Logo src="/logo.svg" alt="" />
        </LogoBox>
      </div>
  )
}

const LogoBox = styled.div`
  text-align: center;
`

const Logo = styled.img`
  width: 200px;
`

export default Header