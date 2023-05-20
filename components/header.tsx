import { MouseEvent, useState } from "react";
import Link from "next/link";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import AdbIcon from "@mui/icons-material/Adb";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useGlobalContext } from "@/context/global";

export default function Header() {
  const { user, toggleLogin, toggleCreateItem, toggleDeposit, setUser } =
    useGlobalContext();

  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  function handleOpenUserMenu(event: MouseEvent<HTMLElement>) {
    setAnchorElUser(event.currentTarget);
  }

  function handleCloseUserMenu() {
    setAnchorElUser(null);
  }

  function handleToggleLogin() {
    handleCloseUserMenu();
    toggleLogin();
  }

  function handleToggleCreateItem() {
    handleCloseUserMenu();
    toggleCreateItem();
  }

  function handleToggleDeposit() {
    handleCloseUserMenu();
    toggleDeposit();
  }

  async function handleLogOut() {
    try {
      await fetch("/api/user/signout", {
        method: "GET",
      });

      setUser(null as any);
      handleCloseUserMenu();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <AppBar position="static">
      <Container maxWidth="lg">
        <Toolbar
          disableGutters
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Link style={{ display: "flex", alignItems: "center" }} href="/">
            <AdbIcon sx={{ display: "flex", mr: 1 }} />
            <Typography
              variant="h6"
              noWrap
              sx={{
                mr: 2,
                display: "flex",
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              LOGO
            </Typography>
          </Link>

          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            {user && (
              <Typography sx={{ color: "#FFF" }}>
                {anchorElUser ? `Balance: $${user.balance}` : user.name}
              </Typography>
            )}
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                {user ? (
                  <Avatar alt={user.name} />
                ) : (
                  <AccountCircleIcon fontSize="large" sx={{ color: "#FFF" }} />
                )}
              </IconButton>
            </Tooltip>
          </Box>

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
            {!user && (
              <MenuItem onClick={handleToggleLogin}>
                <Typography textAlign="center">Login</Typography>
              </MenuItem>
            )}
            {user && [
              <MenuItem key="create-item" onClick={handleToggleCreateItem}>
                <Typography textAlign="center">Create Item</Typography>
              </MenuItem>,
              <MenuItem key="deposit" onClick={handleToggleDeposit}>
                <Typography textAlign="center">Deposit</Typography>
              </MenuItem>,
              <MenuItem key="logout" onClick={handleLogOut}>
                <Typography textAlign="center">Logout</Typography>
              </MenuItem>,
            ]}
          </Menu>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
