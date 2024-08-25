import { Box, Button } from "@mui/material";
import Link from "next/link";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

export const GoToButton = ({ text, href }: { text: string; href: string }) => {
  return (
    <Link href={href} passHref>
      <Button
        variant="contained"
        color="primary"
        endIcon={<ArrowForwardIcon />}
      >
        {text}
      </Button>
    </Link>
  );
};
