import React, { useState, useEffect } from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink } from "react-router-dom";
import logoWhite from "../../assets/whiteLogo.png";
import "../style.css";
import { ConnectBtn } from "./ConnectButton";
import Adiolenav from "../Modals/Adiolenav";

function NavbarMenu() {
  // ... [rest of your useState, useEffect, and other functions]

  const [navExpanded, setNavExpanded] = useState(false);
  const [theme, setTheme] = useState("");

  // Initialize the state
  const [scrolled, setScrolled] = useState(true); // changed from false to true

  const handleScroll = () => {
    const offset = window.scrollY;
    if (offset > 5) {
      setScrolled(false); // changed from true to false
    } else {
      setScrolled(true); // changed from false to true
    }
  };

  let navbarClasses = ["nav_bg"];
  if (scrolled) {
    navbarClasses.push("transparent");
  } else {
    navbarClasses.push("solid");
  }
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (localStorage.getItem("theme") == null) {
      document.body.className = "dark-theme";
      localStorage.setItem("theme", "dark-theme");
      setTheme("dark-theme");
    } else {
      document.body.className = localStorage.getItem("theme");
      setTheme(localStorage.getItem("theme"));
    }
  }, [theme]);
  const closeNavbar = () => {
    setNavExpanded(false); // Close the navbar when a NavLink is clicked
  };

  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      variant="dark"
      className={navbarClasses.join(" ")}
      expanded={navExpanded} // Control navbar's expanded state
      onToggle={setNavExpanded}>
      <div
        className="container p-lg-0 p-2"
        style={{ flexDirection: "inherit" }}>
        <Navbar.Brand className="text-dark fw-bold clr pt-17">
          <NavLink
            to="/"
            className="d-flex align-items-center justify-content-center logoPadding "
            onClick={closeNavbar}>
            <div className="logoBorder rounded-full overflow-hidden">
              <img
                style={{ height: "55px", width: "55px" }}
                src={logoWhite}
                className="img-fluid logo"
                alt=""
              />
            </div>
            <p className="d-lg-none d-block text-white ms-1 mt-3">u369.eth</p>
          </NavLink>
        </Navbar.Brand>

        <Nav className="gap-lg-4  gap-3 d-lg-none d-block ms-3">
          <ConnectBtn />
        </Nav>
        <Navbar.Toggle
          aria-controls="responsive-navbar-nav"
          onClick={() => setNavExpanded((prev) => !prev)}
        />
        <Navbar.Collapse
          id="responsive-navbar-nav"
          style={{ marginTop: "15px", marginLeft: "24px" }}>
          <Nav className="me-auto px-0 text-start">
            <NavLink
              className="ms-lg-2 ms-0 p-lg-2 p-0 text-decoration-none text-dark navlinks"
              to="protocol"
              onClick={closeNavbar}>
              u369.eth
            </NavLink>
            <NavLink
              className="ms-lg-2 ms-0 p-lg-2 p-0 text-decoration-none text-dark navlinks"
              to="dashboard"
              onClick={closeNavbar}>
              Dashboard
            </NavLink>

            <NavLink
              className="ms-lg-3 ms-0 p-lg-2 p-0 text-decoration-none text-dark navlinks"
              to="reward"
              onClick={closeNavbar}>
              Rewards
            </NavLink>
            <NavLink
              className="ms-lg-2 ms-0 p-lg-2 p-0 text-decoration-none text-dark navlinks"
              to="security"
              onClick={closeNavbar}>
              Security
            </NavLink>
            <NavLink
              className="ms-lg-2 ms-0 p-lg-2 p-0 text-decoration-none text-dark navlinks"
              to="insight"
              onClick={closeNavbar}>
              Insight
            </NavLink>

            <Adiolenav />
          </Nav>
          <Nav className="gap-lg-4 gap-3 d-lg-flex d-none align-items-center">
            <ConnectBtn />
          </Nav>
        </Navbar.Collapse>
      </div>
    </Navbar>
  );
}

export default NavbarMenu;
