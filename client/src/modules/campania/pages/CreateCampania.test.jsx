import { describe, expect, test } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { CreateCampania } from "./CreateCampania";

describe("CreateCampaniaTest", () => {
  test("Se renderiza sin ningun problema", () => {
    render(<CreateCampania />);
  });

  test("check input values", () => {
    render(<CreateCampania />);

    // Encuentra el campo de entrada del texto por su atributo name
    const nameInput = screen.getByPlaceholderText("Nombre de la campaña");

    // Simula el evento de cambio en el campo de entrada de texto
    fireEvent.change(nameInput, {target: {value: "Test campaign"}});

    // verifica el valor del campo de entrada de text haya cambiado
    expect(nameInput.value).toBe("Test campaign")
  })
});
