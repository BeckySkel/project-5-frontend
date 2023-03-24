// External imports
import React, { useEffect, useLayoutEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import PatchStyles from "patch-styles";
import { Nav, Button, Fade } from "react-bootstrap";
// Internal imports
import styles from "../styles/SideBar.module.css";
import appStyles from "../App.module.css";
import { useCurrentUser } from "../contexts/CurrentUserContext";
import { axiosReq } from "../api/axiosDefaults";
import useViewport from "../contexts/ViewportContext";

/*
Collapsible sidebar which welcomes the user and acts as site navigation
*/
function SideBar() {
  // Variables
  const currentUser = useCurrentUser();
  const profile_id = currentUser.profile_id;
  const {width} = useViewport();

  const [menuOpen, setMenuOpen] = useState(false);
  const [fadeIn, setFadeIn] = useState(false);
  const [projectsList, setProjectsList] = useState([]);

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
      try {
        const { data } = await axiosReq.get(`/projects/?creator=${profile_id}`);
        setProjectsList(data.results);
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
        await axiosReq.patch(`/profiles/${profile_id}`, {
          menu_open: menuOpen,
        });
      } catch (err) {
        console.log(err);
      }
    };
    postMenuState();
  }, [menuOpen, profile_id]);

  return (
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
              !menuOpen ? 250 : 0
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
            timeout={100}
          >
            <Nav className="flex-column pt-5 ps-3 pe-4" variant="pills">
              {/* Welcome user */}
              <Nav.Item className="text-white fw-bold pt-2">
                Welcome {currentUser.username}!
              </Nav.Item>
              {/* Navigation links */}
              <Nav.Item>
                <NavLink exact to="/" className="nav-link text-white">
                  Dashboard
                </NavLink>
              </Nav.Item>
              <hr className="NavDivider"></hr>
              <Nav.Item className="text-white fw-bold">My Projects</Nav.Item>

              {projectsList?.map((project) => (
                <Nav.Item key={project.id}>
                  <NavLink
                    exact
                    to={`/projects/${project.id}`}
                    className="nav-link text-white"
                    onClick={() => {
                      if (width <= 577) {
                        setMenuOpen(false);
                        setFadeIn(false);
                      }
                    }}
                  >
                    <span className="text-truncate d-inline-block NavTitles">{project.title}</span>
                    {width <= 577 ? (
                      <i className="fa-solid fa-caret-right AutoClose"></i>
                    ) : (
                      <></>
                    )}
                  </NavLink>
                </Nav.Item>
              ))}
              <hr className="NavDivider"></hr>
              <Nav.Item>
                <NavLink exact to="/new" className="nav-link text-white">
                  New Project <i className="fa-solid fa-plus"></i>
                </NavLink>
              </Nav.Item>
            </Nav>
          </Fade>
        </div>
      </PatchStyles>
    </PatchStyles>
  );
}

export default SideBar;
