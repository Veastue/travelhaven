'use client'
import React, { ReactComponentElement } from 'react'
import Container from '../Container'
import { TbBeach, TbMountain, TbPool } from 'react-icons/tb'
import { GiBarn, GiBoatFishing, GiCastle, GiCaveEntrance, GiDesert, GiForestCamp, GiIsland, GiWindmill } from 'react-icons/gi'
import { MdOutlineVilla } from 'react-icons/md'
import CategoryBox from './CategoryBox'
import { usePathname, useSearchParams } from 'next/navigation'
import { FaSkiing } from 'react-icons/fa'
import { BsSnow2 } from 'react-icons/bs'
import { IoDiamond } from 'react-icons/io5'

export const categories = [
    {
        label: 'Beach',
        icon: TbBeach,
        description: 'This property is close to the beach!'
    },
    {
        label: 'Windmill',
        icon: GiWindmill,
        description: 'This property has windmills!'
    },
    {
        label: 'Modern',
        icon: MdOutlineVilla,
        description: 'This property is modern'
    },
    {
        label: 'Countryside',
        icon: TbMountain,
        description: 'This property is in countryside!'
    },
    {
        label: 'Pools',
        icon: TbPool,
        description: 'This property has a pools!'
    },
    {
        label: 'Islands',
        icon: GiIsland,
        description: 'This property is on an Island!'
    },
    {
        label: 'Lake',
        icon: GiBoatFishing,
        description: 'This property is close to a lake!'
    },
    {
        label: 'Skiing',
        icon: FaSkiing,
        description: 'This property has skiing activities!'
    },
    {
        label: 'Castles',
        icon: GiCastle,
        description: 'This property is in a castle!'
    },
    {
        label: 'Camping',
        icon: GiForestCamp,
        description: 'This property has camping activities'
    },
    {
        label: 'Arctic',
        icon: BsSnow2,
        description: 'This property is near arctic!'
    },
    {
        label: 'Cave',
        icon: GiCaveEntrance,
        description: 'This property is in a cave'
    },
    {
        label: 'Desert',
        icon: GiDesert,
        description: 'This property is in the desert!'
    },
    {
        label: 'Barns',
        icon: GiBarn,
        description: 'This property is in a Barn!'
    },
    {
        label: 'Lux',
        icon: IoDiamond,
        description: 'This property is luxurious!'
    },
]


const Categories = () => {
    const params = useSearchParams();
    const category = params?.get('category');
    const pathname = usePathname();
    const isMainPage = pathname === '/';
    if(!isMainPage){
        return null
    }

    return (
        <Container>
            <div className='pt-4 flex flex-row items-center justify-between overflow-x-auto' >
                {categories.map((item)=>(
                    <CategoryBox
                    key={item.label}
                    label={item.label}
                    selected={category === item.label}
                    icon={item.icon}
                    />
                ))}
            </div>
        </Container>
    )
}

export default Categories