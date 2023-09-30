/**
 * @jest-environment jsdom
 */

import { describe, expect, test } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { CreateCampania } from "./CreateCampania";
import React from "react";
import { BrowserRouter, BrowserRouter as Router } from "react-router-dom";

describe("CreateCampaniaTest", () => {
  test("Se renderiza sin ningun problema", async () => {
    render(
      <Router>
        <CreateCampania />
      </Router>
    );
  });
});

/**
 * type of tests
 *
 * Unit tests
 *
 * Integration test
 *
 * End to End test
 *
 */
