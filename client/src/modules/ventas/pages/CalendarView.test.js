import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { CalendarView } from "./CalendarView";
import axios from "axios";

jest.mock("axios");

describe("getEvents", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  // tarea, tareas que tengo que realizar, para el proximo viernes es hacer una presentación acerca del
  // mapeo sistematico, considerar la imagen del documento que capturaste y que los tienes almcenado con
  // el chat de +51 981 049 157
});

describe("CalendarView", () => {
  const component = render(<CalendarView />);

  // pruebas de aceptacion, pruebas de caja negra, pruebas de integración.
  // pruebas de funcionalidad, pruebas de implementación.
  // pruebas con selenium.
  /*
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
  */
});

/**
 *
 * Pruebas de funcionalidad.
 * pruebas de usabilidad.
 *
 */
