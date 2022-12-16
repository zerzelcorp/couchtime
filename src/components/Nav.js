import React, { useContext, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { LoginRounded } from "@mui/icons-material";
import { Slide, Tooltip, useScrollTrigger, useTheme } from "@mui/material";
import { AppContext } from "../context/AppContext";
import useTokenGuest from "../hooks/useTokenGuest";
import axios from "axios";
import UserLists from "../views/UserLists";

const pages = ["Home", "Movies", "Series"];

const Nav = () => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const [token, setToken] = useState({ tkn: null, error: null });

  const ctx = useContext(AppContext);

  const { palette } = useTheme();
  const navigate = useNavigate();

  // const {token,error} = useTokenGuest();

  const createTokenGuest = async () => {
    try {
      const tknreq = await axios.get(
        `${process.env.REACT_APP_URL_BASE}/authentication/guest_session/new?api_key=${process.env.REACT_APP_API_KEY}`
      );
      const newtoken = tknreq;
      if (newtoken) {
        setToken({ tkn: newtoken, error: null });
        ctx.setId({ id: newtoken });
        navigate("/", { replace: true });
      }
    } catch (error) {
      navigate("/auth", { replace: true });
      setToken({ tkn: null, error: error });
    }
  };

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static" className="animate__animated animate__fadeIn">
      <Container maxWidth="xl">
        <Toolbar
          disableGutters
          sx={{
            display: "flex",
            flexDirection: {xs:"row-reverse",md:"row"},
            alignContent: "center",
          }}
        >
          <Box
            sx={{
              borderRight:{xs:0,md:1},
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: 1,
              mr: 1,
            }}
          >
            <img
              style={{ height: "40px", width: "30px", marginRight: "8px" }}
              src="poplogo.png"
              alt="logopop"
            />
            <Typography variant="h4" sx={{ mr: 2, fontFamily: "fantasy" }}>
              CouchTime
            </Typography>
          </Box>

          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "flex", md: "none" },
            }}
          >
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            {/* MENU RESPONSIVE */}
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              <MenuItem onClick={handleCloseNavMenu}>
                <Link to="/" style={{ color: "white", textDecoration: "none" }}>
                  Home
                </Link>
              </MenuItem>
              <MenuItem>
                <Link
                  to="/movies"
                  style={{ color: "white", textDecoration: "none" }}
                >
                  Movies
                </Link>
              </MenuItem>
              <MenuItem>
                <NavLink
                  to="/series"
                  style={{ color: "white", textDecoration: "none" }}
                >
                  Series
                </NavLink>
              </MenuItem>
              <MenuItem>
                <NavLink
                  to="/auth"
                  style={{ color: "white", textDecoration: "none" }}
                >
                  Login
                </NavLink>
              </MenuItem>

              <MenuItem>
                <NavLink
                  to="/signup"
                  style={{ color: "white", textDecoration: "none" }}
                >
                  Signup
                </NavLink>
              </MenuItem>

              <MenuItem onClick={createTokenGuest}> 
                  {token.tkn ? (
                    <Typography variant="body2">Guest Session</Typography>
                  ) : (
                    <Typography variant="body2">Login as Guest</Typography>
                  )}
              </MenuItem>
              {ctx.user.id ? (
                <Box>
                  <Tooltip title="Open settings">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                      <Avatar alt="Login" />
                    </IconButton>
                  </Tooltip>
                  <Menu
                    sx={{ mt: "45px" }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                  >
                    <MenuItem onClick={handleCloseUserMenu}>
                      <NavLink
                        to={`/mylist/:id`}
                        style={{ color: "white", textDecoration: "none" }}
                      >
                        <Typography>My List</Typography>
                      </NavLink>
                    </MenuItem>
                    <MenuItem onClick={handleCloseUserMenu}>
                      <NavLink
                        to="/t"
                        style={{ color: "white", textDecoration: "none" }}
                      >
                        <Typography>Logout</Typography>
                      </NavLink>
                    </MenuItem>
                  </Menu>
                </Box>
              ) : (
                ""
              )}
            </Menu>
          </Box>

          {/* RIGHT LINKS */}
          <Box
            sx={{
              width: "100%",
              display: {xs:"none",md:"flex"},
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              ml: 2,
            }}
          >
            <Box sx={{ display: "flex", gap: 2, flexDirection: "row" }}>
              <Button>
                <NavLink
                  to="/"
                  style={{ color: "white", textDecoration: "none" }}
                >
                  Home
                </NavLink>
              </Button>
              <Button>
                <NavLink
                  to="/movies"
                  style={{ color: "white", textDecoration: "none" }}
                >
                  Movies
                </NavLink>
              </Button>
              <Button>
                <NavLink
                  to="/series"
                  style={{ color: "white", textDecoration: "none" }}
                >
                  Series
                </NavLink>
              </Button>
            </Box>
            {/* AUTH LINKS BOX */}
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                justifyContent: "center",
                alignItems: "center",
                gap: 2,
                mb: { xs: 2, md: 0 },
              }}
            >
              <Button sx={{ fontSize: "xs" }} startIcon={<LoginRounded />}>
                <NavLink
                  to="/signup"
                  style={{ color: "white", textDecoration: "none" }}
                >
                  <Typography>Signup</Typography>
                </NavLink>
              </Button>
              <MenuItem sx={{ fontSize: "xs" }}>
                <NavLink
                  to="/auth"
                  style={{ color: "white", textDecoration: "none" }}
                >
                  Login
                </NavLink>
              </MenuItem>
              <Button sx={{ fontSize: "xs" }} onClick={createTokenGuest}>
                {token.tkn ? (
                  <Typography variant="body2">Guest Session</Typography>
                ) : (
                  <Typography variant="body2">Login as Guest</Typography>
                )}
              </Button>
              {ctx.user.id ? (
                <>
                  <Tooltip title="Open settings">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                      <Avatar alt="Login" />
                    </IconButton>
                  </Tooltip>
                  <Menu
                    sx={{ mt: "45px" }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                  >
                    <MenuItem onClick={handleCloseUserMenu} component="text">
                      {/* <NavLink
                        to={`/mylists`}
                        style={{ color: "white", textDecoration: "none" }}
                      >
                        <Typography>My List</Typography>
                      </NavLink> */}
                      <UserLists/>
                    </MenuItem>
                    <MenuItem onClick={handleCloseUserMenu}>
                      <NavLink
                        to="/t"
                        style={{ color: "white", textDecoration: "none" }}
                      >
                        <Typography>Logout</Typography>
                      </NavLink>
                    </MenuItem>
                  </Menu>
                </>
              ) : (
                ""
              )}
            </Box>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Nav;
