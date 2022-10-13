import React from "react";
import { screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import renderWithRouterAndRedux from "./helpers/renderWithRouterAndRedux";
import App from "../App";

describe("testes da página de feedback", () => {
  it("testa se  botão ranking redireciona ", async () => {
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
      "/ranking"
    );
    const incioBtn = screen.getByTestId("btn-go-home");
    expect(incioBtn).toBeInTheDocument();

    userEvent.click(incioBtn);

    expect(history.location.pathname).toBe("/");
  });

  it("testa se  botão ranking redireciona ", async () => {
    const { history, debug } = renderWithRouterAndRedux(
      <App />,
      {
        player: {
          name: "",
          assertions: 0,
          score: 0,
          gravatarEmail: "",
        },
      },
      "/"
    );

    const email = screen.getByTestId("input-gravatar-email");
    const name = screen.getByTestId("input-player-name");
    const btn = screen.getByTestId("btn-play");

    act(() => {
      userEvent.type(email, "test@test.com");
      userEvent.type(name, "Trybe");
      userEvent.click(btn);
    });

    await screen.findByTestId("question-text", {}, { timeout: 2000 });
    const btnCorrect0 = await screen.findByTestId("correct-answer");
    userEvent.click(btnCorrect0);

    userEvent.click(screen.getByRole("button", { name: /next/i }));

    await screen.findByTestId("question-text", {}, { timeout: 2000 });
    const btnCorrect1 = await screen.findByTestId("correct-answer");
    userEvent.click(btnCorrect1);

    userEvent.click(screen.getByRole("button", { name: /next/i }));

    await screen.findByTestId("question-text", {}, { timeout: 2000 });
    const btnCorrect2 = await screen.findByTestId("correct-answer");
    userEvent.click(btnCorrect2);

    userEvent.click(screen.getByRole("button", { name: /next/i }));

    await screen.findByTestId("question-text", {}, { timeout: 2000 });
    const btnCorrect3 = await screen.findByTestId("correct-answer");
    userEvent.click(btnCorrect3);
    userEvent.click(screen.getByRole("button", { name: /next/i }));

    await screen.findByTestId("question-text", {}, { timeout: 2000 });
    const btnCorrect4 = await screen.findByTestId("correct-answer");
    userEvent.click(btnCorrect4);
    userEvent.click(screen.getByRole("button", { name: /next/i }));

    expect(history.location.pathname).toBe("/feedback");

    userEvent.click(screen.getByRole("button", { name: /play again/i }));
    expect(history.location.pathname).toBe("/");

    const email2 = screen.getByTestId("input-gravatar-email");
    const name2 = screen.getByTestId("input-player-name");
    const btn2 = screen.getByTestId("btn-play");

    act(() => {
      userEvent.type(email2, "test@.com");
      userEvent.type(name2, "Loser");
      userEvent.click(btn2);
    });

    await screen.findByTestId("question-text", {}, { timeout: 2000 });
    await screen.findByText("30");
    await screen.findByText("10", {}, { timeout: 25000 });
    const btnWrong0 = await screen.findAllByRole("button");
    userEvent.click(btnWrong0[0]);

    userEvent.click(screen.getByRole("button", { name: /next/i }));

    await screen.findByTestId("question-text", {}, { timeout: 2000 });
    const btnWrong1 = await screen.findAllByRole("button");

    await screen.findByText("0", {}, { timeout: 32000 });

    userEvent.click(screen.getByRole("button", { name: /next/i }));

    await screen.findByTestId("question-text", {}, { timeout: 2000 });
    const btnWrong2 = await screen.findAllByRole("button");
    userEvent.click(btnWrong2[0]);

    userEvent.click(screen.getByRole("button", { name: /next/i }));

    await screen.findByTestId("question-text", {}, { timeout: 2000 });
    const btnWrong3 = await screen.findAllByRole("button");
    userEvent.click(btnWrong3[0]);

    userEvent.click(screen.getByRole("button", { name: /next/i }));

    await screen.findByTestId("question-text", {}, { timeout: 2000 });
    const btnWrong4 = await screen.findAllByRole("button");
    userEvent.click(btnWrong4[0]);

    userEvent.click(screen.getByRole("button", { name: /next/i }));

    expect(history.location.pathname).toBe("/feedback");

    userEvent.click(screen.getByRole("button", { name: /ranking/i }));
    expect(history.location.pathname).toBe("/ranking");

    const name0 = screen.getByText("Trybe");
    expect(name0).toBeInTheDocument();

    const name1 = screen.getByText("Loser");
    expect(name1).toBeInTheDocument();

    debug();

    /* act(() => {
      userEvent.click(btnWrong);
    }); */
  }, 40000);
});
