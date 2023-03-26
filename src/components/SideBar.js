// External imports
import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import PatchStyles from "patch-styles";
import { Nav, Button, Fade } from "react-bootstrap";
// Internal imports
import styles from "../styles/SideBar.module.css";
import appStyles from "../App.module.css";
import { useCurrentUser } from "../contexts/CurrentUserContext";
import { axiosReq } from "../api/axiosDefaults";
import useViewport from "../contexts/ViewportContext";
import { useLocation } from "react-router-dom/cjs/react-router-dom";

/*
Collapsible sidebar which welcomes the user and acts as site navigation
*/
function SideBar() {
  // Variables
  const currentUser = useCurrentUser();
  const profile_id = currentUser.profile_id;
  const { width } = useViewport();
  const xsScreen = width <= 577;
  const [menuOpen, setMenuOpen] = useState(false);
  const [fadeIn, setFadeIn] = useState(false);
  const [projectsList, setProjectsList] = useState([]);
  const [contribProjectsList, setContribProjectsList] = useState([]);
  const ref = useRef(null);
  const ref2 = useRef(null);
  const location = useLocation();

  // Code inspired by CI walkthrough project
  useEffect(() => {
    const handleClickOutside = (ev) => {
      if (
        xsScreen &&
        ref.current &&
        !ref.current.contains(ev.target) &&
        !ref2.current.contains(ev.target)
      ) {
        setMenuOpen(false);
        setFadeIn(false);
      }
    };

    document.addEventListener("mouseup", handleClickOutside);
    return () => {
      document.removeEventListener("mouseup", handleClickOutside);
    };
  }, [ref, ref2, xsScreen]);

  // Fade menu in and out
  const handleFadeInOut = () => {
    setMenuOpen(!menuOpen);
    setTimeout(
      () => {
        setFadeIn(!menuOpen);
      },
      !menuOpen ? 250 : 0
    );
  };

  const fetchProjects = useCallback(async () => {
    try {
      const ownProjects = await axiosReq.get(
        `/projects/?creator__profile=${profile_id}`
      );
      setProjectsList(ownProjects.data.results);
      const contribProjects = await axiosReq.get(
        `/projects/?contributors__profile=${profile_id}`
      );
      setContribProjectsList(contribProjects.data.results);
    } catch (err) {
      console.log(err);
    }
  }, [profile_id, location]);

  // Get previous menu state and user's projects
  useLayoutEffect(() => {
    const handleMount = async () => {
      try {
        const { data } = await axiosReq.get(`/profiles/${profile_id}`);
        setMenuOpen(data.menu_open);
        setFadeIn(data.menu_open);
      } catch (err) {
        console.log(err);
      }
      fetchProjects();
    };

    handleMount();
  }, [profile_id, fetchProjects]);

  // Post menu state in API
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

  // Dynamic elements
  const autoClose = xsScreen ? (
    <i className="fa-solid fa-caret-right AutoClose"></i>
  ) : (
    <></>
  );

  return (
    <PatchStyles classNames={styles}>
      <PatchStyles classNames={appStyles}>
        {/* Menu show/hide */}
        <Button
          ref={ref}
          className="position-absolute m-3 BgNavy MenuButton"
          aria-label="Toggle navigation"
          onClick={() => {
            handleFadeInOut();
          }}
        >
          <i className="fa-solid fa-bars"></i>
        </Button>

        {/* Collapsible menu */}
        <div
          ref={ref2}
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
              <Nav.Item className="text-white fw-bold pt-2 mb-1">
                Welcome {currentUser.username}!
              </Nav.Item>
              {/* Navigation links */}
              <Nav.Item>
                <NavLink
                  exact
                  to="/"
                  className="nav-link text-white"
                  onClick={() => {
                    if (xsScreen) {
                      handleFadeInOut();
                    }
                  }}
                >
                  Dashboard
                  {autoClose}
                </NavLink>
              </Nav.Item>
              <hr className="text-white"></hr>

              <Nav.Item className="text-white fw-bold mb-1">
                My Projects
              </Nav.Item>

              {projectsList?.map((project) => (
                <Nav.Item key={project.id}>
                  <NavLink
                    exact
                    to={`/projects/${project.id}`}
                    className="nav-link text-white"
                    onClick={() => {
                      if (xsScreen) {
                        handleFadeInOut();
                      }
                    }}
                  >
                    <span className="text-truncate d-inline-block NavTitles">
                      {project.title}
                    </span>
                    {autoClose}
                  </NavLink>
                </Nav.Item>
              ))}

              <hr className="text-white"></hr>

              <Nav.Item className="text-white fw-bold mb-1">
                Contributing Projects
              </Nav.Item>

              {contribProjectsList?.map((project) => (
                <Nav.Item key={project.id}>
                  <NavLink
                    exact
                    to={`/projects/${project.id}`}
                    className="nav-link text-white"
                    onClick={() => {
                      if (xsScreen) {
                        handleFadeInOut();
                      }
                    }}
                  >
                    <span className="text-truncate d-inline-block NavTitles">
                      {project.title}
                    </span>
                    {autoClose}
                  </NavLink>
                </Nav.Item>
              ))}
              <hr className="text-white"></hr>

              <Nav.Item>
                <NavLink
                  exact
                  to="/new"
                  className="nav-link text-white"
                  onClick={() => {
                    if (xsScreen) {
                      handleFadeInOut();
                    }
                  }}
                >
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
