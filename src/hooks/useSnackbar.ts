import { useState } from "react";

export default function useSnackbar() {
  const [snackbar, setSnackbar] = useState({ isOpen: false, msg: "" });
  const closeSnackbar = () => setSnackbar({ isOpen: false, msg: "" });
  const openSnackbar = (msg: string) => setSnackbar({ isOpen: true, msg });
  return { snackbar, closeSnackbar, openSnackbar };
}
