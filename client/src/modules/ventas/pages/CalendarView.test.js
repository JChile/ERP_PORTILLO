import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { CalendarView } from "./CalendarView";

describe("CalendarView component", () => {
  test("renders CalendarView component correctly", async () => {
    render(<CalendarView />);
    const createButton = screen.getByRole("button", { name: /crear/i });
    expect(createButton).toBeInTheDocument();
    fireEvent.click(createButton);
    const filterButton = screen.getByRole("button", {
      name: /filtrar eventos/i,
    });
    expect(filterButton).toBeInTheDocument();
    fireEvent.click(filterButton);
    const filterDrawer = screen.getByRole("presentation");
    expect(filterDrawer).toBeInTheDocument();
    const checkboxes = screen.getAllByRole("checkbox");
    checkboxes.forEach((checkbox) => {
      fireEvent.click(checkbox);
    });
    const filterApplyButton = screen.getByRole("button", { name: /filtrar/i });
    fireEvent.click(filterApplyButton);
    await waitFor(() => {
      expect(screen.queryByRole("presentation")).not.toBeInTheDocument();
    });
  });
});




/**
 * 
 * Pruebas de funcionalidad.
 * pruebas de usabilidad.
 * 
 */