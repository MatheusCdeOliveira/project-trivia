import React from "react";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import renderWithRouterAndRedux from "./helpers/renderWithRouterAndRedux";
import App from "../App";

describe("testes da página de feedback", () => {
  it("testa se existe botão play again", async () => {
    const { history } = renderWithRouterAndRedux(
      <App />,
      {
        player: {
          name: "",
          assertions: 0,
          score: 0,
          gravatarEmail: "",
        },
      },
      "/feedback"
    );

    const playAgainBtn = screen.getByTestId("btn-play-again");
    expect(playAgainBtn).toBeInTheDocument();

    userEvent.click(playAgainBtn);

    await screen.findByText(/email/i);

    expect(history.location.pathname).toBe("/");
  });

  it("testa se existe botão ranking", async () => {
    const { history } = renderWithRouterAndRedux(
      <App />,
      { name: "", assertions: 0, score: 0, gravatarEmail: "" },
      "/feedback"
    );

    const rankingBtn = screen.getByRole("button", { name: /ranking/i });
    expect(rankingBtn).toBeDefined();

    userEvent.click(rankingBtn);
    expect(history.location.pathname).toBe("/ranking");
  });

  it("testa se existe uma imagem na tela", async () => {
    renderWithRouterAndRedux(
      <App />,
      { name: "", assertions: 0, score: 0, gravatarEmail: "" },
      "/feedback"
    );

    const feedbackImg = screen.getByTestId("feedback-total-question");

    expect(feedbackImg).toBeInTheDocument();
  });

  it("testa se existe um contagem de respostas  e de pontos na tela", async () => {
    renderWithRouterAndRedux(
      <App />,
      { name: "", assertions: 0, score: 0, gravatarEmail: "" },
      "/feedback"
    );

    const totalScore = screen.getByTestId("feedback-total-score");
    expect(totalScore).toBeDefined();

    const totalQuestions = screen.getByTestId("feedback-total-question");
    expect(totalQuestions).toBeDefined();
  });

  it("testa se exibe mensagem na tela", async () => {
    renderWithRouterAndRedux(
      <App />,
      { name: "", assertions: 0, score: 0, gravatarEmail: "" },
      "/feedback"
    );

    const couldBeMessage = screen.getByTestId("feedback-text");
    expect(couldBeMessage).toBeInTheDocument();
  });

  it("testa se exibe mensagem na tela", () => {
    renderWithRouterAndRedux(
      <App />,
      {
        player: {
          name: "",
          assertions: 0,
          score: 0,
          gravatarEmail: "",
        },
      },
      "/feedback"
    );
    const couldBeMessage = screen.getByTestId("feedback-text");
    expect(couldBeMessage).toBeInTheDocument();
  });

  it("testa se exibe mensagem na tela", () => {
    renderWithRouterAndRedux(
      <App />,
      {
        player: {
          name: "",
          assertions: 3,
          score: 0,
          gravatarEmail: "",
        },
      },
      "/feedback"
    );

    const wellDoneMessage = screen.getByText(/well done!/i);
    expect(wellDoneMessage).toBeInTheDocument();
  });
});
