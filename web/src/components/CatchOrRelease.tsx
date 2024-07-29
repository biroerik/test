import { Button } from "@mui/material";
import axios from "axios";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";

interface IProps {
  name: string;
}
const CatchOrRelease = ({ name }: IProps) => {
  const [isCaught, setIsCaught] = useState(false);
  useEffect(() => {
    const CheckStatus = async () => {
      try {
        const response = await axios.post(
          "api/isCaught",
          { name },
          {
            headers: { Authorization: `Bearer ${Cookies.get("jwt")}` },
          }
        );
        setIsCaught(response.data);
      } catch (error) {
        console.error("There was an error fetching the message!", error);
      }
    };
    CheckStatus();
  });
  const catchOrRelease = async () => {
    try {
      const response = await axios.post(
        "api/catchOrRelease",
        { name },
        {
          headers: { Authorization: `Bearer ${Cookies.get("jwt")}` },
        }
      );
      setIsCaught(response.data);
    } catch (error) {
      console.error("There was an error fetching the message!", error);
    }
  };

  return (
    <Button onClick={catchOrRelease} variant="contained">
      {isCaught ? "Release" : "Catch"}
    </Button>
  );
};

export default CatchOrRelease;
