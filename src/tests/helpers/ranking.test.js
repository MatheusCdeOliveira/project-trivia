import React from "react";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import renderWithRouterAndRedux from "./helpers/renderWithRouterAndRedux";
import App from "../App";

describe("testes da página de feedback", () => {
  it("testa se existe botão ranking", async () => {
    const { history } = renderWithRouterAndRedux(
      <App />,
      { name: "", assertions: 0, score: 0, gravatarEmail: "" },
      "/feedback"
    );

  
  });
});
