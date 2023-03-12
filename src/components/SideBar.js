// External imports
import React, { useEffect, useLayoutEffect, useState, useRef } from "react";
import { NavLink } from "react-router-dom";
import PatchStyles from "patch-styles";
import { Nav, Button, Fade } from "react-bootstrap";
// Internal imports
import styles from "../styles/SideBar.module.css";
import appStyles from "../App.module.css";
import { useCurrentUser } from "../contexts/CurrentUserContext";
import { axiosReq } from "../api/axiosDefaults";

/** 
Collapsible sidebar which welcomes the user and acts as site navigation
*/
const SideBar = () => {
  // Variables
  const [menuOpen, setMenuOpen] = useState(false);
  const [fadeIn, setFadeIn] = useState(false);
  const currentUser = useCurrentUser();
  const profile_id = currentUser.profile_id;

  // Get previous menu state
  useLayoutEffect(() => {
    const handleMount = async () => {
      try {
        const { data } = await axiosReq.get(`/profiles/${profile_id}`);
        setMenuOpen(data.menu_open);
        setFadeIn(data.menu_open);
      } catch (err) {
        console.log(err);
      }
    };
    handleMount();
  }, [profile_id]);

  // Set future menu state in API
  useEffect(() => {
    const postMenuState = async () => {
      try {
        await axiosReq.put(`/profiles/${profile_id}`, {
          menu_open: menuOpen,
        });
      } catch (err) {
        console.log(err);
      }
    };
    postMenuState();
  }, [menuOpen, profile_id]);

  return (
    // Apply styles
    <PatchStyles classNames={styles}>
      <PatchStyles classNames={appStyles}>
        {/* Menu show/hide */}
        <Button
          className="position-absolute m-3 BgNavy MenuButton"
          aria-label="Toggle navigation"
          onClick={() => {
            setMenuOpen(!menuOpen);
            setTimeout(
              () => {
                setFadeIn(!menuOpen);
              },
              !menuOpen ? 500 : 0
            );
          }}
        >
          <i className="fa-solid fa-bars"></i>
        </Button>

        {/* Collapsible menu */}
        <div
          className={`Menu BgNavy text-start pt-3 ${
            menuOpen ? "MenuOpened" : ""
          }`}
        >
          <Fade
            in={fadeIn}
            id="account-menu"
            className="AccountMenu"
            appear
            unmountOnExit
            mountOnEnter
          >
            <Nav className={`flex-column pt-5 ps-3 pe-4 `} variant="pills">
              {/* Welcome user */}
              <Nav.Item className="text-white fw-bold">
                Welcome {currentUser.username}!
              </Nav.Item>
              {/* Navigation links */}
              <Nav.Item>
                <NavLink exact to="/" className="nav-link">
                  Dashboard
                </NavLink>
              </Nav.Item>
              <Nav.Item className="text-white fw-bold">
                My Projects
                <NavLink exact to="/1" className="nav-link">
                  Project 1
                </NavLink>
                <NavLink exact to="/2" className="nav-link">
                  Project 2
                </NavLink>
              </Nav.Item>
              <Nav.Item>
                <NavLink to="/new" className="nav-link">
                  New <i className="fa-solid fa-plus"></i>
                </NavLink>
              </Nav.Item>
            </Nav>
          </Fade>
        </div>
      </PatchStyles>
    </PatchStyles>
  );
};

export default SideBar;
