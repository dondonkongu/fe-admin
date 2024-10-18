import { HiOutlineAnnotation, HiOutlineCog, HiOutlineCube, HiOutlineDocumentText, HiOutlineQuestionMarkCircle, HiOutlineShoppingCart, HiOutlineUser, HiOutlineViewGrid } from "react-icons/hi"

export const DASHBOARD_SIDEBAR_LINKS =[
    {
        key: 'dashboard',
        label: 'Dashboard',
        path:'/',
        icon: <HiOutlineViewGrid />,
    },
    {
        key: 'products',
        label: 'Products',
        path:'/products',
        icon: <HiOutlineCube />,
    },
    {
        key: 'orders',
        label: 'Orders',
        path:'/oders',
        icon: <HiOutlineShoppingCart />,
    },
    {
        key: 'customers',
        label: 'Customers',
        path:'/customers',
        icon: <HiOutlineUser/>,
    },
    {
        key: 'transactions',
        label: 'Transactions',
        path:'/customer',
        icon: <HiOutlineDocumentText />,
    },
    {
        key: 'messages',
        label: 'Messages',
        path:'/messages',
        icon: <HiOutlineAnnotation/>,
    },
]

export const DASHBOARD_SIDEBAR_BOTTOM_LINKS =[
    {
        key: 'settings',
        label: 'Settings',
        path:'/settings',
        icon: <HiOutlineCog />,
    },
    {
        key: 'support',
        label: 'Help & Support',
        path:'/support',
        icon: <HiOutlineQuestionMarkCircle/>,
    }

]