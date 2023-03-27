// External imports
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { NavLink } from "react-router-dom";
import PatchStyles from "patch-styles";
import { Nav, Button, Fade } from "react-bootstrap";
// Internal imports
import styles from "../../styles/SideBar.module.css";
import appStyles from "../../App.module.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { axiosReq } from "../../api/axiosDefaults";
import useViewport from "../../contexts/ViewportContext";
import { useLocation } from "react-router-dom/cjs/react-router-dom";
import { useSetErrorAlert } from "../../contexts/ErrorContext";

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
  const location = useLocation();
  const setErrorAlert = useSetErrorAlert(); 

  // Fade menu in or out and post menu state in API
  const handleFadeInOut = useCallback(
    async (state) => {
      try {
        await axiosReq.patch(`/profiles/${profile_id}`, {
          menu_open: state,
        });
      } catch (err) {
        setErrorAlert({ ...err.response, variant: "danger"});
      }
      setMenuOpen(state);
      setTimeout(
        () => {
          setFadeIn(state);
        },
        state ? 250 : 0
      );
    },
    [profile_id, setErrorAlert]
  );

  // Code inspired by CI walkthrough project
  useEffect(() => {
    const handleClickOutside = (ev) => {
      if (xsScreen && ref.current && !ref.current.contains(ev.target)) {
        handleFadeInOut(false);
      }
    };

    document.addEventListener("mouseup", handleClickOutside);
    return () => {
      document.removeEventListener("mouseup", handleClickOutside);
    };
  }, [ref, xsScreen, handleFadeInOut]);

  // Fetch user's related projects for nav menu
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
      setErrorAlert({ ...err.response, variant: "danger"});
    }
  }, [profile_id, setErrorAlert]);

  // Get previous menu state
  useLayoutEffect(() => {
    const handleMount = async () => {
      try {
        const { data } = await axiosReq.get(`/profiles/${profile_id}`);
        setMenuOpen(data.menu_open);
        setFadeIn(data.menu_open);
      } catch (err) {
        setErrorAlert({ ...err.response, variant: "danger"});
      }
      fetchProjects();
    };

    handleMount();
  }, [profile_id, fetchProjects, location, setErrorAlert]);

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
          className="BgNavy MenuButton"
          aria-label="Toggle navigation"
          onClick={() => {
            handleFadeInOut(!menuOpen);
          }}
        >
          <i className="fa-solid fa-bars"></i>
        </Button>

        {/* Collapsible menu */}
        <div
          className={`Menu Sidebar BgNavy text-start ${menuOpen ? "MenuOpened" : ""}`}
        >
          <Fade
            in={fadeIn}
            id="site-nav"
            className="SiteNav"
            appear
            unmountOnExit
            mountOnEnter
            timeout={100}
          >
            <Nav
              className="flex-column pb-5 pt-4 pt-sm-5 ps-3 pe-4"
              variant="pills"
            >
              {/* Welcome user */}
              <Nav.Item className="text-white fw-bold pt-2 mb-1">
                Welcome {currentUser.username}!
              </Nav.Item>
              {/* Navigation links */}
              <Nav.Item>
                <NavLink exact to="/" className="nav-link text-white">
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
                  className="nav-link text-dark bg-light"
                >
                  New Project <i className="fa-solid fa-plus"></i>
                </NavLink>
              </Nav.Item>
            </Nav>
          </Fade>
        </div>

        <div
          className={`MenuBack Sidebar text-start ${
            menuOpen ? "MenuOpened" : ""
          }`}
        ></div>
      </PatchStyles>
    </PatchStyles>
  );
}

export default SideBar;
