import React from "react";
import JollyIcon from "../../public/JOLLY Logo.png";
import { userStateContext } from "../context/userState";

//components
import MenuIcon from "../assets/icons/menuIcon";

export default function Nav({ pageState }) {
  const [open, setOpen] = React.useState(false);
  const { userState } = React.useContext(userStateContext);
  const { admin, loged } = userState;
}
