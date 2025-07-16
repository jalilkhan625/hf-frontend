"use client";

import Image from "next/image";
import Link from "next/link";
import { AppBar, Toolbar, Typography, Box } from "@mui/material";

const Navbar = () => {
  return (
    <AppBar position="static" color="transparent" elevation={0}>
      <Toolbar sx={{ justifyContent: "space-between", py: 2 }}>
        <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center" }}>
          <Image src="/logo.jpg" alt="Logo" width={40} height={40} />
          <Typography variant="h6" sx={{ ml: 1, fontWeight: "bold", color: "#1a237e" }}>
            OCR Summarizer
          </Typography>
        </Link>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
