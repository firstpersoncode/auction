import { ChangeEvent, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useGlobalContext } from "@/context/global";

export default function Login() {
  const { login, toggleLogin, toggleRegister, setUser } = useGlobalContext();
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  function handleChangeForm(field: string) {
    return (e: ChangeEvent<HTMLInputElement>) =>
      setForm((v) => ({ ...v, [field]: e.target.value }));
  }

  async function submitForm() {
    try {
      const res = await fetch("/api/user/signin", {
        method: "POST",
        body: JSON.stringify(form) as any,
        headers: new Headers({
          "Content-Type": "application/json",
          Accept: "application/json",
        }),
      });

      const user = await res.json();

      setUser(user);
      toggleLogin();
    } catch (error) {
      console.error(error);
    }
  }

  function handleToggleRegister() {
    toggleLogin();
    toggleRegister();
  }

  return (
    <Dialog onClose={toggleLogin} open={login}>
      <DialogTitle>Login</DialogTitle>
      <DialogContent>
        <TextField
          label="Email"
          type="email"
          value={form.email}
          onChange={handleChangeForm("email")}
          sx={{ my: 2 }}
          fullWidth
        />
        <TextField
          label="Password"
          sx={{ my: 2 }}
          type={showPassword ? "text" : "password"}
          value={form.password}
          onChange={handleChangeForm("password")}
          fullWidth
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Box sx={{ my: 2, display: "flex", justifyContent: "center" }}>
          <Button variant="contained" onClick={submitForm}>
            Login
          </Button>
        </Box>

        <Box sx={{ my: 2, display: "flex", justifyContent: "center" }}>
          <Button onClick={handleToggleRegister}>Register</Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
