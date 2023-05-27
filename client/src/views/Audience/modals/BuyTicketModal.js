import React, { useContext, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField
} from "@mui/material";
import { buyTicket } from "../../../queries/audience.queries/buyTicket.query";
import { AuthContext } from "../../../helpers/AuthProvider";

const BuyTicketModal = ({
  buyTicketModal,
  setBuyTicketModal,
  setAlert
}) => {
  const [session_id, setSession_id] = useState("");

  const { isLoggedIn } = useContext(AuthContext);

  const handleBuyTicketModalClose = () => {
    setBuyTicketModal(false);
    setSession_id("");
  };

  const handleBuyTicketSubmit = async () => {
    console.log("Buy Ticket Form Submitted!");
    console.log("Username:", isLoggedIn?.username);
    console.log("Session ID:", session_id);

    const buyTicketData = {
      username: isLoggedIn?.username,
      session_id: session_id.length ? session_id : null
    };

    try {
      const data = await buyTicket(buyTicketData);
      console.log("Buy Ticket data", data);
      setAlert({
        active: true,
        alertType: "success",
        alertMessage: `Buy Ticket for session ${session_id} by ${isLoggedIn?.username} is saved successfully!`
      });
    } catch (error) {
      console.error("Buy Ticket error:", error);
      setAlert({
        active: true,
        alertType: "error",
        alertMessage: error.message
      });
    }

    setSession_id("");

    handleBuyTicketModalClose();
  };

  const handleSessionIdChange = (event) => {
    setSession_id(event.target.value);
  };

  return (
    <Dialog
      open={buyTicketModal}
      onClose={handleBuyTicketModalClose}
    >
      <DialogTitle>Buy Ticket</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Session ID"
              value={session_id}
              onChange={handleSessionIdChange}
              fullWidth
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleBuyTicketModalClose}>Cancel</Button>
        <Button onClick={handleBuyTicketSubmit} color="primary">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default BuyTicketModal;
