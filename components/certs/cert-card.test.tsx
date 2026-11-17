import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, expect, it } from "vitest";
import { getFeaturedCertifications } from "@/lib/content";
import { CertCard } from "./cert-card";

afterEach(cleanup);

it("cert card warns that the PDF opens in a new tab", () => {
  render(<CertCard cert={getFeaturedCertifications()[0]} />);
  expect(screen.getByText(/PDF, opens in a new tab/)).toBeInTheDocument();
});
