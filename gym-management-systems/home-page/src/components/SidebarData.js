// D:\GMS_Github\GymManagementSystem\gym-management-systems\home-page\src\components\SidebarData.js
import React from 'react';
import DashboardIcon from '@mui/icons-material/Dashboard';
import GroupIcon from '@mui/icons-material/Group';
import CardMembershipIcon from '@mui/icons-material/CardMembership';
import SportsIcon from '@mui/icons-material/Sports';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import InventoryIcon from '@mui/icons-material/Inventory';
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';

const SidebarData = [
  {
    title: "Dashboard",
    icon: <DashboardIcon />,
    link: "/dashboard"
  },
  {
    title: "Members",
    icon: <GroupIcon />,
    link: "/members"
  },
  {
    title: "Membership Plans",
    icon: <CardMembershipIcon />,
    link: "/membershipplans"
  },
  {
    title: "Trainers",
    icon: <SportsIcon />,
    link: "/trainers"
  },
  {
    title: "Gym Equipments",
    icon: <FitnessCenterIcon />,
    link: "/equipments"
  },
  {
    title: "Products",
    icon: <InventoryIcon />,
    link: "/products"
  },
  {
    title: "Sales",
    icon: <PointOfSaleIcon />,
    link: "/sales"
  }
];

export default SidebarData;
