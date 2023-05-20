import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useGlobalContext } from "@/context/global";
import { ChangeEvent, useState } from "react";

export default function Deposit() {
  const { user, deposit, toggleDeposit, setUser } = useGlobalContext();
  const [form, setForm] = useState({ balance: 0 });

  function handleChangeForm(field: string) {
    return (e: ChangeEvent<HTMLInputElement>) =>
      setForm((v) => ({
        ...v,
        [field]: e.target.value,
      }));
  }

  async function submitForm() {
    try {
      const res = await fetch("/api/balance/deposit", {
        method: "POST",
        body: JSON.stringify(form) as any,
        headers: new Headers({
          "Content-Type": "application/json",
          Accept: "application/json",
        }),
      });

      const balance = await res.json();

      setUser({ ...user, balance: balance.totalBalance });
      toggleDeposit();
    } catch (error) {
      console.error(error);
    }
  }

  function handleToggleDeposit() {
    toggleDeposit();
  }

  return (
    <Dialog
      fullWidth
      maxWidth="sm"
      onClose={handleToggleDeposit}
      open={deposit}
    >
      <DialogTitle>Deposit</DialogTitle>
      <DialogContent>
        <TextField
          label="Amount"
          type="number"
          value={form.balance}
          onChange={handleChangeForm("balance")}
          sx={{ my: 2 }}
          fullWidth
        />

        <Box
          sx={{ my: 2, display: "flex", justifyContent: "flex-end", gap: 2 }}
        >
          <Button
            variant="contained"
            color="error"
            onClick={handleToggleDeposit}
          >
            Cancel
          </Button>
          <Button variant="contained" onClick={submitForm}>
            Deposit
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
