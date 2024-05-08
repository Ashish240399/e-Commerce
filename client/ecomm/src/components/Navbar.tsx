"use client";
// import Image from "next/image";
// import Link from "next/link";
// import React, { useContext, useEffect, useState } from "react";
// import logo from "../assets/images/logo.png";
// import { usePathname } from "next/navigation";
// import { UserContext } from "@/context/userContext/userContext";

// const Navbar = () => {
//   const pathname = usePathname();
//   const [userDetails, setUserDetails] = useState<UserType | null>(null);
//   const userContext = useContext(UserContext);

//   useEffect(() => {
//     if (userContext?.user) {
//       setUserDetails(userContext.user);
//     }
//     const userData = localStorage.getItem("user");
//     if (userData) {
//       setUserDetails(JSON.parse(userData));
//     }
//   }, [userContext]);
//   return (
//     <div className="bg-primary text-text flex justify-between items-center px-[2.5%] h-[70px]">
//       <div className="flex gap-1 items-center justify-center">
//         <Image src={logo} width={70} height={70} alt="Company Logo" />
//         <span className="text-sky-400">Ecommerce</span>
//       </div>
//       <div className="flex items-center justify-center gap-[8vw] w-fit">
//         <div className="w-fit relative">
//           <Link href="/home">Home</Link>
//           <div
//             className={`${
//               pathname.includes("/home")
//                 ? "h-[1px] rounded-lg w-full bg-secondary absolute top-[100%] left-0 transition-all"
//                 : "h-[1px] rounded-lg w-0 bg-secondary absolute top-[100%] left-0 transition-all"
//             }`}
//           ></div>
//         </div>
//         <div className="w-fit relative">
//           <Link href="/cart">Cart</Link>
//           <div
//             className={`${
//               pathname == "/cart"
//                 ? "h-[1px] rounded-lg w-full bg-secondary absolute top-[100%] left-0 transition-all"
//                 : "h-[1px] rounded-lg w-0 bg-secondary absolute top-[100%] left-0 transition-all"
//             }`}
//           ></div>
//         </div>
//         <div className="w-fit relative">
//           {!userDetails ? (
//             <div>
//               <Link href="/auth/login">Login</Link>
//               <div
//                 className={`${
//                   pathname == "/auth/login"
//                     ? "h-[1px] rounded-lg w-full bg-secondary absolute top-[100%] left-0 transition-all"
//                     : "h-[1px] rounded-lg w-0 bg-secondary absolute top-[100%] left-0 transition-all"
//                 }`}
//               ></div>
//             </div>
//           ) : (
//             <div>
//               <Link href={"/account"}>{userDetails.firstName}</Link>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Navbar;



import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { usePathname } from 'next/navigation';
import { UserContext } from '@/context/userContext/userContext';
import Link from 'next/link';
import Image from 'next/image';
import logo from "../assets/images/logo.png";
import { CartContext } from '@/context/cartContext/cartContext';

interface Props {
  
  window?: () => Window;
}

const drawerWidth = 240;
const navItems = ['Home', 'Cart', 'Login'];
const navLinks = ['/home', '/cart', '/auth/login']

export default function Navbar(props: Props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const pathname = usePathname();
  const [userDetails, setUserDetails] = React.useState<UserType | null>(null);
  const userContext = React.useContext(UserContext);
  const cartContext = React.useContext(CartContext);

  React.useEffect(() => {
    if (userContext?.user) {
      setUserDetails(userContext.user);
    }
    const userData = localStorage.getItem("user");
    if (userData) {
      setUserDetails(JSON.parse(userData));
    }
  }, [userContext]);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
      <Image src={logo} width={70} height={70} alt="Company Logo" />
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton sx={{ textAlign: 'center' }}>
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex',backgroundColor:'black' }}>
      {/* <CssBaseline /> */}
      <AppBar component="nav">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            <Image src={logo} width={70} height={70} alt="Company Logo" />
          </Typography>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            {navItems.map((item,id:number) => (
              <Button key={id} sx={{ color: '#fff' }}>
                {!userDetails && id==2 ? <Link href={navLinks[id]}>{item}</Link>: userDetails && id==2 && <Link href="/account">{userDetails?.firstName}</Link> }
                {id!=2 && <Link href={navLinks[id]}>{item}</Link>}
                {id == 1 && cartContext?.totalCartCount && cartContext?.totalCartCount!=0 ? cartContext?.totalCartCount:""}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
    </Box>
  );
}