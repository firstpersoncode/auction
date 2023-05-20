import {
  DataGrid,
  GridColDef,
  GridComparatorFn,
  GridRenderCellParams,
  GridSortModel,
  GridValueFormatterParams,
  GridValueGetterParams,
} from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import { useGlobalContext } from "@/context/global";
import { useCallback, useEffect, useState } from "react";
import formatDistance from "date-fns/formatDistance";
import {
  differenceInSeconds,
  format,
  formatDuration,
  intervalToDuration,
} from "date-fns";

export default function Items() {
  const {
    items,
    user,
    disableBid,
    toggleCreateItem,
    setItems,
    toggleBid,
    setDisableBid,
  } = useGlobalContext();

  const [filter, setFilter] = useState("all");

  const columns: GridColDef[] = [
    {
      flex: 1,
      field: "name",
      headerName: "Name",
      filterable: false,
      hideable: false,
    },
    {
      flex: 1,
      field: "current_price",
      headerName: "Current Price",
      filterable: false,
      hideable: false,
    },
    {
      flex: 1,
      field: "duration",
      headerName: "Duration",
      filterable: false,
      hideable: false,
      sortable: false,

      valueGetter: (params: GridValueGetterParams) =>
        differenceInSeconds(
          new Date(params.row.duration_end),
          new Date(params.row.duration_start)
        ),

      valueFormatter: (params: any) =>
        formatDuration(
          intervalToDuration({ start: 0, end: params.value * 1000 })
        ),
    },

    {
      flex: 1,
      field: "duration_end",
      headerName: "Ends at",
      filterable: false,
      hideable: false,
      sortable: false,
      // type: "date",

      valueGetter: (params: GridValueGetterParams) =>
        format(new Date(params.row.duration_end), "dd MMM yyyy, HH:mm"),
    },

    {
      field: "bid",
      headerName: "Bid",
      sortable: false,
      filterable: false,
      hideable: false,

      renderCell: (params: GridRenderCellParams) => (
        <Button
          disabled={disableBid || !user?.balance}
          fullWidth
          onClick={handleBid(params.row._id)}
          variant="contained"
        >
          Bid
        </Button>
      ),
    },
  ];

  useEffect(() => {
    fetchItems(filter);
  }, [filter]);

  useEffect(() => {
    if (disableBid)
      setTimeout(() => {
        setDisableBid(false);
      }, 5000);
  }, [disableBid]);

  async function fetchItems(filter: string) {
    try {
      const res = await fetch(`/api/item/list?filter=${filter}`, {
        method: "GET",
      });
      const items = await res.json();

      setItems(items);
    } catch (error) {
      console.error(error);
    }
  }

  function handleBid(itemRef: string) {
    return () => {
      toggleBid(itemRef);
    };
  }

  function handleSetFilter(f: string) {
    return () => setFilter((v) => (v === f ? "all" : f));
  }

  return (
    <Container maxWidth="lg">
      <Box sx={{ display: "flex", gap: 2, my: 2 }}>
        {user && (
          <Button onClick={toggleCreateItem} variant="contained">
            Create Item
          </Button>
        )}
        <Button
          variant={filter === "ongoing" ? "contained" : "outlined"}
          color="warning"
          onClick={handleSetFilter("ongoing")}
        >
          Ongoing
        </Button>
        <Button
          variant={filter === "completed" ? "contained" : "outlined"}
          color="success"
          onClick={handleSetFilter("completed")}
        >
          Completed
        </Button>
      </Box>

      <Box sx={{ height: "auto", width: "100%", my: 2 }}>
        <DataGrid
          getRowId={(row) => row._id}
          rows={items}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
          checkboxSelection={false}
        />
      </Box>
    </Container>
  );
}
