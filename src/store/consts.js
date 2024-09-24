import { AiOutlineHeart, AiOutlineHome } from "react-icons/ai";
import { BsBasket2 } from "react-icons/bs";
import { MdRestaurantMenu } from "react-icons/md";

export const btns = [
  {
    id: 1,
    title: " Home",
    icon: AiOutlineHome,
    path: "/",
  },
  {
    id: 2,
    title: " Menu",
    icon: MdRestaurantMenu,
    path: "/menu",
  },
  {
    id: 3,
    title: "Favourites",
    icon: AiOutlineHeart,
    path: "/favourites",
  },
  {
    id: 4,
    title: " Basket",
    icon: BsBasket2,
    path: "/basket",
  },
];
