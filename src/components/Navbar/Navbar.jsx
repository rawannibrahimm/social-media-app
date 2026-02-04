import React from 'react'
import {
  Navbar as HeroNavbar,
  NavbarBrand,
  NavbarContent,
  Input,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
  Badge,
  Skeleton,
} from "@heroui/react"

import connectLogo from "../../assets/Images/connect-logo.png"
import { useNavigate } from 'react-router-dom'
import { MdOutlineSearch } from "react-icons/md"
import { IoMdNotificationsOutline } from "react-icons/io"
import { LuMessageSquareMore } from "react-icons/lu"
import { useContext } from 'react'
import { authContext } from '../../Context/AuthContext'
import { UserContext } from '../../Context/UserContext'

export default function Navbar() {
  const navigate = useNavigate()
  const { userData, isLoading } = useContext(UserContext)
  const { setToken } = useContext(authContext)

  function logoutUser() {
    localStorage.removeItem("userToken")
    setToken(false)
  }

  return (
    <>
      <HeroNavbar isBordered maxWidth="xl" isBlurred="false" position="static">

        {/* Logo */}
        <NavbarContent justify="start">
          <NavbarBrand>
            <img
              src={connectLogo}
              alt=""
              className="w-11.5 cursor-pointer"
            />
            <p className="text-xl font-bold text-blue-500">
              Connect
            </p>
          </NavbarBrand>
        </NavbarContent>

        {/* Search input – desktop only */}
        <NavbarBrand className="hidden sm:flex" justify="center">
          <Input
            classNames={{
              base: "max-w-full h-10",
              mainWrapper: "h-full",
              input: "text-small",
              inputWrapper:
                "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
            }}
            placeholder="Search..."
            size="md"
            startContent={<MdOutlineSearch />}
            type="search"
            radius="full"
          />
        </NavbarBrand>

        {/* Right content */}
        <NavbarContent as="div" className="items-center px-4" justify="end">

          {/* Notifications */}
          {isLoading ? (
            <Skeleton className="flex rounded-full w-8 h-8 sm:w-10 sm:h-10" />
          ) : (
            <NavbarBrand className="grow-0 bg-gray-100 rounded-full p-2 cursor-pointer">
              <Badge size="sm" color="danger" content="">
                <IoMdNotificationsOutline className="w-5 h-5 sm:w-6 sm:h-6" />
              </Badge>
            </NavbarBrand>
          )}

          {/* Messages */}
          {isLoading ? (
            <Skeleton className="flex rounded-full w-8 h-8 sm:w-10 sm:h-10" />
          ) : (
            <NavbarBrand className="grow-0 bg-gray-100 rounded-full p-2 cursor-pointer">
              <Badge size="sm" color="danger" content="">
                <LuMessageSquareMore className="w-5 h-5 sm:w-6 sm:h-6" />
              </Badge>
            </NavbarBrand>
          )}

          {/* Avatar */}
          <Dropdown placement="bottom-end">
            <DropdownTrigger className="cursor-pointer">
              {isLoading ? (
                <Skeleton className="flex rounded-full w-8 h-8 sm:w-10 sm:h-10" />
              ) : (
                <Avatar
                  as="button"
                  className="transition-transform w-8 h-8 sm:w-10 sm:h-10"
                  name={userData.name}
                  size="md"
                  src={userData.photo}
                />
              )}
            </DropdownTrigger>

            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem
                textValue={userData.email}
                key="profile"
                className="h-14 gap-2"
              >
                <p className="font-semibold">Signed in as</p>
                <p className="font-semibold">{userData.email}</p>
              </DropdownItem>

              <DropdownItem
                key="profile-dropdown"
                textValue="profile-dropdown"
                onClick={() => navigate("/profile")}
              >
                My Profile
              </DropdownItem>

              <DropdownItem
                onClick={logoutUser}
                key="logout"
                color="danger"
                textValue="Logout"
              >
                Log Out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarContent>
      </HeroNavbar>
    </>
  )
}
