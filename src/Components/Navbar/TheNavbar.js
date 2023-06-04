import { Container, Navbar, Nav, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import classes from "./TheNavbar.module.css";
import { useContext } from "react";
import { TbCircleLetterE } from "react-icons/tb";
import AuthContext from "../contexts/auth-context";

const TheNavbar = () => {
  const authCntxt = useContext(AuthContext);
  const { IsLoggedIn } = authCntxt;
  const logOutHandle = () => {
    authCntxt.LogOut();
  };
  return (
    <>
      <Navbar
        bg="info"
        variant="info"
        expand="sm"
        sticky="top"
        className="mb-3"
      >
        <Container fluid>
          <TbCircleLetterE size="50px" color="white" />
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav className={classes.list}>
              <NavLink
                to="/home"
                className={({ isActive }) =>
                  isActive ? classes.active : undefined
                }
                end
              >
                Home
              </NavLink>
              {IsLoggedIn && (
                <NavLink
                  to="/expense"
                  className={({ isActive }) =>
                    isActive ? classes.active : undefined
                  }
                  end
                >
                  Expense
                </NavLink>
              )}
            </Nav>
            <Nav className={classes.listB}>
              {!IsLoggedIn && (
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive ? classes.active : undefined
                  }
                >
                  Sign Up
                </NavLink>
              )}
              {!IsLoggedIn && (
                <NavLink
                  to="/logIn"
                  className={({ isActive }) =>
                    isActive ? classes.active : undefined
                  }
                >
                  Log In
                </NavLink>
              )}
              {IsLoggedIn && (
                <NavLink
                  to="/profile"
                  className={({ isActive }) =>
                    isActive ? classes.active : undefined
                  }
                >
                  Profile
                </NavLink>
              )}
              {IsLoggedIn && (
                <Button
                  variant="warning"
                  className="mb-2"
                  onClick={logOutHandle}
                >
                  Log Out
                </Button>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};
export default TheNavbar;
//activeClassName={classes.active}---> Version 5 react-router-dom
/* <NavLink
                to="/store"
                className={({ isActive }) =>
                  isActive ? classes.active : undefined
                }
              >
                Store
              </NavLink>

              <NavLink
                to="/about"
                className={({ isActive }) =>
                  isActive ? classes.active : undefined
                }
              >
                About
              </NavLink>
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  isActive ? classes.active : undefined
                }
              >
                Contact
            </NavLink>*/
