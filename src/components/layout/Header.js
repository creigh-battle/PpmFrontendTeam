import React, { Children, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../../actions/securityActions";
import { changeTheme, openDrawer } from "../../actions/userInterfaceActions";
import styled from "styled-components";
import { format } from "date-fns";
import { MdLockOutline, MdLockOpen, MdDehaze } from "react-icons/md";
import Switch from "react-switch";
import {
  dark,
  light,
  darkContent,
  lightContent,
  darkText,
  lightText,
  darkHighlightColor,
  lightHighlightColor,
  navyBlue,
} from "../../constants/colors";

const Container = styled.div({
  display: "flex",
  minHeight: "90vh",
});

const SidebarContainer = styled.div({
  width: "18vw",
  borderRight: "1px solid rgba(265,265,265,0.12)",
  "@media(max-width: 788px)": {
    display: "none",
  },
  minHeight: "100vh",
});

const HamburgerIconContainer = styled.div({
  marginLeft: "10px",
  marginRight: "0px",
  "@media(min-width: 788px)": {
    display: "none",
  },
});

const SidebarTitleContainer = styled.div({
  display: "flex",
  height: "10vh",
  width: "100%",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
  "&:hover": {
    cursor: "pointer",
  },
});

const SidebarElementContainer = styled.div({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  marginTop: "10px",

  "&:hover": {
    cursor: "pointer",
  },
});

const ChildrenContainer = styled.div({
  width: "100%",
});

const NavbarContainer = styled.nav({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  height: "10vh",
  width: "100%",
  background: light,
  flexDirection: "row",
  boxShadow: "0 3px 10px rgb(265 265 265 / 0.2)",
  position: "relative",
});

const FlexContainer = styled.div({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  // "@media(max-width: 788px)": {
  //   display: "none",
  // },
});

const NavElementContainer = styled.div({
  marginRight: "10px",
});

const DateContainer = styled.div({
  marginLeft: "20px",
});

const DrawerContainer = styled.div({
  height: '100vh',
  width: '35%',
  background: 'pink',
  position: 'fixed',
  top: 0,
  right: 0,
});

const DrawerHeader = styled.div({
  display: 'flex',
  height: "10vh",
  justifyContent: 'flex-end',
  alignItems: 'center'
})

const DrawerElementsContainer = styled.div({
  height: '100%',
  background: 'black',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
})

const DrawerElement = styled.div({
  marginTop: '10px'
  
})

function Header(props) {
  const { validToken, user } = props.security;
  const [theme, setTheme] = useState("");
  const [checked, setChecked] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setTheme(props.userInterface.color);
  }, [props.userInterface]);


  const logout = () => {
    props.logout();
    window.location.href = "/";
  };

  const updateTheme = () => {
    if (checked == false) {
      props.changeTheme("dark");
    } else {
      props.changeTheme("light");
    }

    setChecked(!checked);
  };

  const isOpen = () => {
    setOpen(!open)
    console.log(open)
  }

  const userIsAuthenticated = (
    <FlexContainer style={{ marginRight: 20 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "15px",
        }}
      >
        {theme == "dark" && (
          <p
            style={{
              color: theme == "dark" ? light : dark,
            }}
          >
            Switch to light mode
          </p>
        )}

        {theme == "light" && (
          <p
            style={{
              color: theme == "dark" ? light : dark,
            }}
          >
            Switch to dark mode
          </p>
        )}
      </div>
      <Switch
        checked={checked}
        onChange={() => updateTheme()}
        uncheckedIcon={false}
        checkedIcon={false}
        height={20}
        width={40}
        offHandleColor="#000000"
        onHandleColor="#ffffff"
        onColor={darkHighlightColor}
        offColor={lightHighlightColor}
      />
      <HamburgerIconContainer>
        <MdDehaze size={25} color={theme == "dark" ? light : dark} onClick={isOpen}/>
      </HamburgerIconContainer>
    </FlexContainer>
  );

  const userIsNotAuthenticated = (
    <FlexContainer style={{ marginRight: 20 }}>
      {/* <Switch
        checked={checked}
        onChange={() => updateTheme()}
        uncheckedIcon={false}
        checkedIcon={false}
        height={20}
        width={40}
        offHandleColor="#000000"
        onHandleColor="#ffffff"
        onColor="#888"
      /> */}
      <div style={{ display: "flex" }}>
        <div size={25} style={{ color: theme == "dark" ? light : dark }}>
          <Link className="nav-link" to="/login">
            Login
          </Link>
        </div>
        <div size={25} style={{ color: theme == "dark" ? light : dark }}>
          <Link className="nav-link" to="/register">
            Register
          </Link>
        </div>
      </div>
      {/* <HamburgerIconContainer onClick={isOpen}>
        <MdDehaze size={25} style={{ color: theme == "dark" ? light : dark }} />
      </HamburgerIconContainer> */}
    </FlexContainer>
  );

  const sidebarNotAuthenticated = (
    <>
      <SidebarTitleContainer
        style={{ color: theme == "dark" ? darkText : lightText }}
        style={{ background: theme == "dark" ? light : darkContent }}
      >
        PPMT
      </SidebarTitleContainer>
      <SidebarElementContainer></SidebarElementContainer>
      <SidebarElementContainer>
        <MdLockOpen />
        Sign In
      </SidebarElementContainer>
    </>
  );

  const sidebarAuthenticated = (
    <>
      <SidebarTitleContainer
        style={{
          color: theme == "dark" ? darkHighlightColor : lightHighlightColor,
          background: theme == "dark" ? navyBlue : light,
        }}
      >
        <Link className="nav-link" to="/dashboard">
          <h3 style={{ textAlign: "center" }}> PPMT</h3>
        </Link>
      </SidebarTitleContainer>
      <SidebarElementContainer>
        <Link
          to="/dashboard"
          style={{
            textDecoration: "none",
            color: theme == "dark" ? lightText : darkText,
          }}
        >
          Dashboard
        </Link>
      </SidebarElementContainer>

      <SidebarElementContainer>
        <MdLockOutline />
        <Link
          to="/logout"
          style={{
            textDecoration: "none",
            color: theme == "dark" ? lightText : darkText,
          }}
          onClick={logout}
        >
          Logout
        </Link>
      </SidebarElementContainer>
    </>
  );

  let headerLinks;
  let sidebar;

  if (validToken && user) {
    headerLinks = userIsAuthenticated;
    sidebar = sidebarAuthenticated;
  } else {
    headerLinks = userIsNotAuthenticated;
    sidebar = sidebarNotAuthenticated;
  }

  return (
    <Container>
      {user && validToken && (
        <SidebarContainer
          style={{
            color: theme == "dark" ? lightText : darkText,
            background: theme == "dark" ? navyBlue : light,
            borderRight:
              theme == "dark"
                ? "1px solid rgba(265,265,265,.5)"
                : "1px solid rgba(0,0,0,0.2)",
          }}
        >
          {sidebar}
        </SidebarContainer>
      )}

      <ChildrenContainer>
        <NavbarContainer
          style={{
            color: theme == "dark" ? lightText : darkText,
            background: theme == "dark" ? navyBlue : lightContent,
            boxShadow:
              theme == "dark"
                ? "0px 3px 10px rgb(187 134 252 / .2)"
                : "0 3px 10px rgb(0 0 0 / 0.4)",
          }}
        >
          <DateContainer
            style={{ color: theme == "dark" ? lightText : darkText }}
          >
            Today is the {format(new Date(), "do MMMM Y")}
          </DateContainer>
          {headerLinks}
        </NavbarContainer>
        {props.children}
        {open && (
          <DrawerContainer>
            <DrawerHeader style={{background: theme == "dark" ? 'gray' : navyBlue }}><MdDehaze size={25} color={theme == "dark" ? light : dark} onClick={isOpen}/></DrawerHeader>
           <DrawerElementsContainer style={{background: theme == "dark" ? darkContent : lightContent }}>
            <DrawerElement className="nav-link"><Link to="/dashboard" onClick={() => setOpen(false)}>Dashboard</Link></DrawerElement>
            <DrawerElement className="nav-link">  <MdLockOutline />
        <Link
          to="/logout"
          style={{
       
            // color: theme == "dark" ? lightText : darkText,
          }}
          onClick={logout}
        >
          Logout
        </Link></DrawerElement>
          </DrawerElementsContainer>
          </DrawerContainer>
        )}
     
      </ChildrenContainer>
    </Container>
  );
}

const mapStateToProps = (state) => ({
  security: state.security,
  userInterface: state.userInterface,
  drawer: state.drawer.active
});

export default connect(mapStateToProps, { logout, changeTheme, openDrawer })(Header);
