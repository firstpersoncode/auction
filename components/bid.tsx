import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useGlobalContext } from "@/context/global";
import { ChangeEvent, useEffect, useState } from "react";

export default function Bid() {
  const {
    user,
    bid,
    disableBid,
    selectedItem,
    setDisableBid,
    toggleBid,
    setUser,
    updateItemCurrPrice,
  } = useGlobalContext();
  const [form, setForm] = useState({
    price: 0,
  });

  useEffect(() => {
    if (selectedItem?.current_price >= 0) {
      setForm({ price: selectedItem.current_price + 50 });
    }
  }, [selectedItem?.current_price]);

  function handleChangeForm(field: string) {
    return (e: ChangeEvent<HTMLInputElement>) =>
      setForm((v) => ({
        ...v,
        [field]: e.target.value,
      }));
  }

  async function submitForm() {
    if (disableBid) return;
    try {
      const res = await fetch("/api/bid/create", {
        method: "POST",
        body: JSON.stringify({ itemRef: selectedItem._id, ...form }) as any,
        headers: new Headers({
          "Content-Type": "application/json",
          Accept: "application/json",
        }),
      });

      toggleBid();
      if (res.ok) {
        setUser({ ...user, balance: user.balance - form.price });
        setDisableBid(true);
        updateItemCurrPrice(selectedItem._id, form.price);
      }
    } catch (error) {
      console.error(error);
    }
  }

  function handleToggleBid() {
    toggleBid();
  }

  return (
    <Dialog fullWidth maxWidth="sm" onClose={handleToggleBid} open={bid}>
      <DialogTitle>Bid {selectedItem?.name}</DialogTitle>
      <DialogContent>
        <TextField
          label="Bid price"
          type="number"
          value={form.price}
          onChange={handleChangeForm("price")}
          sx={{ my: 2 }}
          fullWidth
        />

        <Box
          sx={{ my: 2, display: "flex", justifyContent: "flex-end", gap: 2 }}
        >
          <Button variant="contained" color="error" onClick={handleToggleBid}>
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={submitForm}
            disabled={user?.balance < form.price}
          >
            Submit
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
