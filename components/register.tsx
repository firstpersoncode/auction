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

export default function Register() {
  const { register, toggleLogin, toggleRegister, setUser } = useGlobalContext();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  function handleChangeForm(field: string) {
    return (e: ChangeEvent<HTMLInputElement>) =>
      setForm((v) => ({ ...v, [field]: e.target.value }));
  }

  async function submitForm() {
    try {
      const res = await fetch("/api/user/signup", {
        method: "POST",
        body: JSON.stringify(form) as any,
        headers: new Headers({
          "Content-Type": "application/json",
          Accept: "application/json",
        }),
      });

      const user = await res.json();

      setUser(user);
      toggleRegister();
    } catch (error) {
      console.error(error);
    }
  }

  function handleToggleLogin() {
    toggleRegister();
    toggleLogin();
  }

  return (
    <Dialog onClose={toggleRegister} open={register}>
      <DialogTitle>Register</DialogTitle>
      <DialogContent>
        <TextField
          label="Name"
          type="text"
          value={form.name}
          onChange={handleChangeForm("name")}
          sx={{ my: 2 }}
          fullWidth
        />
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
          fullWidth
          value={form.password}
          onChange={handleChangeForm("password")}
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
            Register
          </Button>
        </Box>

        <Box sx={{ my: 2, display: "flex", justifyContent: "center" }}>
          <Button onClick={handleToggleLogin}>Login</Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
