import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@heroui/navbar";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@heroui/react";
import { Link, useLoaderData } from "react-router";
import { AmberLogo } from "../../assets/AmberLogo";
import { ChevronDown } from "../../assets/ChevronDown";
import type { Service } from "../../models/service.model";
import type { RootLoader } from "~/root";


const menuItems = [
  {
    text: "home",
    link: "/",
  },
  {
    text: "services",
    link: "/",
  },
  {
    text: "doctors",
    link: "/",
  },
  {
    text: "blog",
    link: "/",
  },
  {
    text: "contact",
    link: "/contact",
  },
];

export default function AmberNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const [hoverServices, setHoverServices] = useState(false);
  const [hoverDoctors, setHoverDoctors] = useState(false);
  const { t } = useTranslation();
  const { services, doctors } = useLoaderData<RootLoader>();

  return (
    <Navbar onMenuOpenChange={setIsMenuOpen} className="border-b border-gray-200">
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <Link to="/">
          <NavbarBrand>
            <div style={{ width: "90px" }}>
              <AmberLogo />
            </div>
            <span>
              <div className="text-amber-500 font-semibold text-lg leading-3">
                Amber
              </div>
              <span className="text-amber-500 text-sm sm:text-base">
                {t("bannerTitle")}
              </span>
            </span>
          </NavbarBrand>
        </Link>
      </NavbarContent>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem
          className="hover:text-amber-500 transition"
        >
          <Link to="#">{t("home")}</Link>
        </NavbarItem>
        <NavbarItem
          className="hover:text-amber-500 transition"
        >
          <Dropdown>
            <DropdownTrigger>
              <Button
                disableRipple
                className="p-0 bg-transparent data-[hover=true]:bg-transparent hover:text-amber-500 transition text-base"
                endContent={<ChevronDown fill={hoverServices ? "rgb(245,158,11)" : "rgb(0,0,0)"} size={16} className="hover:text-amber-500" />}
                radius="sm"
                variant="light"
                onMouseEnter={() => setHoverServices(true)}
                onMouseLeave={() => setHoverServices(false)}
              >
                {t("services")}
              </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Dropdown list of services" items={services.data}>
              {(service) => (
                <DropdownItem
                  key={service.attributes.slug}
                  textValue="{service.attributes.title}"
                >
                  <Link
                    className="w-full h-full flex items-center px-3 py-2 transition rounded"
                    to={'/services/' + service.attributes.slug}
                  >
                    {service.attributes.title}
                  </Link>
                </DropdownItem>
              )}
            </DropdownMenu>
          </Dropdown>
        </NavbarItem>
        <NavbarItem
          className="hover:text-amber-500 transition"
        >
          <Dropdown>
            <DropdownTrigger>
              <Button
                disableRipple
                className="p-0 bg-transparent data-[hover=true]:bg-transparent hover:text-amber-500 transition text-base"
                endContent={<ChevronDown fill={hoverDoctors ? "rgb(245,158,11)" : "rgb(0,0,0)"} size={16} className="hover:text-amber-500" />}
                radius="sm"
                variant="light"
                onMouseEnter={() => setHoverDoctors(true)}
                onMouseLeave={() => setHoverDoctors(false)}
              >
                {t("doctors")}
              </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Dropdown list of doctors" items={doctors.data}>
              {(doctor) => (
                <DropdownItem
                  key={doctor.attributes.slug}
                  textValue="{service.attributes.title}"
                  className="p-0"
                >
                  <Link
                    className="w-full h-full flex items-center px-3 py-2 transition rounded"
                    to={'/doctors/' + doctor.attributes.slug}
                  >
                    {doctor.attributes.name}
                  </Link>
                </DropdownItem>
              )}
            </DropdownMenu>
          </Dropdown>
        </NavbarItem>
        <NavbarItem
          className="hover:text-amber-500 transition"
        >
          <Link to="#">{t("blog")}</Link>
        </NavbarItem>
        <NavbarItem
          className="hover:text-amber-500 transition"
        >
          <Link to="/contact">{t("contact")}</Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item.text}-${index}`}>
            <Link
              color={
                index === 2
                  ? "primary"
                  : index === menuItems.length - 1
                    ? "danger"
                    : "foreground"
              }
              className="w-full"
              to={item.link}
            >
              {t(item.text)}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  )
}


