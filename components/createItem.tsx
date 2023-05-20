import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useGlobalContext } from "@/context/global";
import { ChangeEvent, useState } from "react";

export default function CreateItem() {
  const { item, toggleCreateItem, addItem } = useGlobalContext();

  const [form, setForm] = useState({
    name: "",
    duration_start: null,
    duration_end: null,
    start_price: 0,
  });

  function handleChangeForm(field: string) {
    return (e: ChangeEvent<HTMLInputElement>) =>
      setForm((v) => ({
        ...v,
        [field]: e.target.value,
      }));
  }

  async function submitForm() {
    try {
      const res = await fetch("/api/item/create", {
        method: "POST",
        body: JSON.stringify(form) as any,
        headers: new Headers({
          "Content-Type": "application/json",
          Accept: "application/json",
        }),
      });

      const item = await res.json();

      if (!res.ok) throw item.error;

      addItem(item);
      toggleCreateItem();
    } catch (error) {
      console.error(error);
    }
  }

  function handleToggleCreateItem() {
    toggleCreateItem();
  }

  return (
    <Dialog onClose={handleToggleCreateItem} open={item}>
      <DialogTitle>Create Item</DialogTitle>
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
          label="Start Price"
          type="number"
          sx={{ my: 2 }}
          fullWidth
          value={form.start_price}
          onChange={handleChangeForm("start_price")}
        />
        <TextField
          label="Start"
          type="datetime-local"
          sx={{ my: 2 }}
          fullWidth
          value={form.duration_start}
          InputLabelProps={{ shrink: true }}
          onChange={handleChangeForm("duration_start")}
        />
        <TextField
          label="End"
          type="datetime-local"
          sx={{ my: 2 }}
          fullWidth
          value={form.duration_end}
          InputLabelProps={{ shrink: true }}
          onChange={handleChangeForm("duration_end")}
        />

        <Box
          sx={{ my: 2, display: "flex", justifyContent: "flex-end", gap: 2 }}
        >
          <Button
            variant="contained"
            color="error"
            onClick={handleToggleCreateItem}
          >
            Cancel
          </Button>
          <Button variant="contained" onClick={submitForm}>
            Create
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
