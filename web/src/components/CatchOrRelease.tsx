import { Button } from "@mui/material";
import React, { useEffect } from "react";

interface IProps {
  name: string;
}
const CatchOrRelease = ({ name }: IProps) => {
  useEffect(() => {});
  return <Button variant="contained">Catch</Button>;
};

export default CatchOrRelease;
