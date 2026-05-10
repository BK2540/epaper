import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Footer from "./Footer";

describe("Footer", () => {
  // Verifies the troubleshooting area exposes the email and phone contact links.
  it("renders troubleshooting contact information", () => {
    render(<Footer />);

    expect(screen.getByText(/troubleshoot/i)).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /enewspaper@bangkokpost\.co\.th/i }),
    ).toHaveAttribute("href", "mailto:enewspaper@bangkokpost.co.th");
    expect(screen.getByRole("link", { name: /02 616 4000/i })).toHaveAttribute(
      "href",
      "tel:026164000",
    );
    expect(screen.getByText(/ext\.4615, 4618/i)).toBeInTheDocument();
  });

  // Verifies the footer displays the legal/navigation links expected on desktop.
  it("renders footer navigation links", () => {
    render(<Footer />);

    const footerNavigation = screen.getByRole("navigation", {
      name: /footer navigation/i,
    });

    expect(
      within(footerNavigation).getByRole("link", { name: /terms of use/i }),
    ).toBeInTheDocument();
    expect(
      within(footerNavigation).getByRole("link", {
        name: /republishing permission/i,
      }),
    ).toBeInTheDocument();
    expect(
      within(footerNavigation).getByRole("link", { name: /privacy policy/i }),
    ).toBeInTheDocument();
    expect(
      within(footerNavigation).getByRole("link", { name: /cookies policy/i }),
    ).toBeInTheDocument();
    expect(
      within(footerNavigation).getByRole("link", {
        name: /online advertising/i,
      }),
    ).toBeInTheDocument();
    expect(
      within(footerNavigation).getByRole("link", { name: /contact us/i }),
    ).toBeInTheDocument();
    expect(
      within(footerNavigation).getByRole("link", {
        name: /tell us what you think/i,
      }),
    ).toBeInTheDocument();
    expect(
      within(footerNavigation).getByRole("link", { name: /partnership/i }),
    ).toBeInTheDocument();
  });

  // Verifies the copyright line uses the current product/company copy.
  it("renders the company copyright line", () => {
    render(<Footer />);

    expect(
      screen.getByText(/2026 bangkok post public company limited/i),
    ).toBeInTheDocument();
  });
});
