"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/layout/logo";
import { ContactChoiceTrigger } from "@/components/contact/contact-choice";
import { navigation } from "@/lib/constants/site";
import { lockPageScroll } from "@/lib/scroll-lock";
import { trapDialogTab } from "@/lib/dialog-focus";

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuState, setMenuState] = useState({ pathname, open: false });
  const menuRef = useRef<HTMLDialogElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const open = menuState.pathname === pathname && menuState.open;
  const setOpen = (nextOpen: boolean) => setMenuState({ pathname, open: nextOpen });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const menu = menuRef.current;
    if (!open || !menu) return;
    const toggle = toggleRef.current;
    const unlock = lockPageScroll();
    document.body.dataset.menuOpen = "true";
    menu.showModal();
    menu.querySelector<HTMLAnchorElement>(".mobile-links a")?.focus({ preventScroll: true });
    const query = window.matchMedia("(min-width: 1024px)");
    const closeOnDesktop = () => { if (query.matches) setMenuState({ pathname, open: false }); };
    query.addEventListener("change", closeOnDesktop);
    return () => {
      query.removeEventListener("change", closeOnDesktop);
      if (menu.open) menu.close();
      unlock();
      delete document.body.dataset.menuOpen;
      toggle?.focus({ preventScroll: true });
    };
  }, [open, pathname]);

  return <header className={`site-header ${scrolled || open ? "site-header-scrolled" : ""}`}>
    <div className="container-site header-inner">
      <Logo />
      <span className="header-system" aria-hidden="true">BRUEL_SYS</span>
      <nav className="desktop-nav" aria-label="Navegação principal">{navigation.map(item => <Link key={item.href} href={item.href} aria-current={pathname === item.href || (item.href === "/street" && pathname.startsWith("/street/")) ? "page" : undefined}>{item.label}</Link>)}</nav>
      <ContactChoiceTrigger className="button button-primary header-cta">AGENDAR <span aria-hidden="true">↗</span></ContactChoiceTrigger>
      <button ref={toggleRef} className="menu-toggle" type="button" aria-expanded={open} aria-controls="mobile-menu" aria-haspopup="dialog" aria-label="Abrir menu" onClick={() => setOpen(true)}><span>MENU</span><span className="menu-symbol" aria-hidden="true">+</span></button>
    </div>
    <dialog ref={menuRef} id="mobile-menu" className="mobile-menu" aria-label="Menu de navegação" onKeyDown={event => { if (event.target instanceof Node && menuRef.current?.contains(event.target) && !document.getElementById("contact-choice-dialog")?.hasAttribute("open")) trapDialogTab(event, menuRef.current); }} onCancel={event => { event.preventDefault(); setOpen(false); }}>
      <div className="container-site header-inner mobile-menu-top"><Logo onClick={() => setOpen(false)} /><button type="button" className="menu-toggle" onClick={() => setOpen(false)} aria-label="Fechar menu"><span>FECHAR</span><span className="menu-symbol" aria-hidden="true">×</span></button></div>
      <div className="container-site mobile-menu-inner">
        <span className="eyebrow">NAVEGAÇÃO / BRUEL_SYS</span>
        <nav className="mobile-links" aria-label="Navegação mobile">{navigation.map((item, index) => <Link key={item.href} href={item.href} onClick={() => setOpen(false)}><span>0{index + 1}</span>{item.label}<b aria-hidden="true">↗</b></Link>)}</nav>
        <ContactChoiceTrigger className="mobile-book" onNavigate={() => setOpen(false)}>AGENDAR SESSÃO <span aria-hidden="true">↗</span></ContactChoiceTrigger>
        <span className="eyebrow">RIO VERDE / GO — BRASIL</span>
      </div>
    </dialog>
  </header>;
}
