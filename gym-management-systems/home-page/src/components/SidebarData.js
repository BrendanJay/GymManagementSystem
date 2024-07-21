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
    link: "/admin/dashboard"
  },
  {
    title: "Members",
    icon: <GroupIcon />,
    link: "/admin/members"
  },
  {
    title: "Membership Plans",
    icon: <CardMembershipIcon />,
    link: "/admin/membershipplans"
  },
  {
    title: "Trainers",
    icon: <SportsIcon />,
    link: "/admin/trainers"
  },
  {
    title: "Gym Equipments",
    icon: <FitnessCenterIcon />,
    link: "/admin/equipments"
  },
  {
    title: "Products",
    icon: <InventoryIcon />,
    link: "/admin/products"
  },
  {
    title: "Sales",
    icon: <PointOfSaleIcon />,
    link: "/admin/sales"
  }
];

export default SidebarData;
