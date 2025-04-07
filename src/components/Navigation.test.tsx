import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Navigation from "./Navigation";

describe("Navigation", () => {
  it("renders navigation links correctly", () => {
    render(<Navigation />);

    // Vérifier que le logo est présent
    expect(screen.getByText("3W")).toBeInTheDocument();

    // Vérifier que les liens de navigation sont présents
    expect(screen.getByText("Projets")).toBeInTheDocument();
    expect(screen.getByText("Contact")).toBeInTheDocument();

    // Vérifier que les liens ont les bons href
    expect(screen.getByText("Projets").closest("a")).toHaveAttribute(
      "href",
      "/projets"
    );
    expect(screen.getByText("Contact").closest("a")).toHaveAttribute(
      "href",
      "/contact"
    );
  });

  it("has correct accessibility attributes", () => {
    render(<Navigation />);

    // Vérifier que la navigation a le bon rôle ARIA
    const nav = screen.getByRole("navigation");
    expect(nav).toBeInTheDocument();

    // Vérifier que les liens sont accessibles au clavier
    const links = screen.getAllByRole("link");
    links.forEach((link: HTMLElement) => {
      expect(link).toHaveAttribute("href");
      expect(link).toHaveAttribute("aria-label");
    });
  });
});
