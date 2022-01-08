import { FaUsers } from 'react-icons/fa';
import { BsCartPlusFill, BsFillInboxesFill } from 'react-icons/bs';
import { AiOutlineStock } from 'react-icons/ai';


export const cardData = [
    {   
        bg: "bg1",
        title: "Total Users",
        amount: "34",
        icon: <FaUsers />,
    },
    {   
        bg: "bg2",
        title: "Total Orders",
        amount: "56",
        icon: <BsCartPlusFill />,
    },
    {   
        bg: "bg3",
        title: "Total Products",
        amount: "23",
        icon: <BsFillInboxesFill />,
    },
    {   
        bg: "bg4",
        title: "Out of Stock",
        amount: "86",
        icon: <AiOutlineStock />,
    }
]