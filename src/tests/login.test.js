import React from "react";
import { screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";
import { renderWithRouterAndRedux } from "./helpers/renderWithRouterAndRedux";

const mock = () => {
  global.fetch = jest.fn(async () => ({
    json: async () =>
      "afd716964a724b749a42b72858e7283d7183c332db41a1ea3e89d6fd5089be2d",
  }));
};

describe("Teste o componente <Login.js />.", () => {
  test('Botão "Play" desabilitado se não preencher nenhum campo', () => {
    renderWithRouterAndRedux(<App />);

    const playBtn = screen.getByRole("button", { name: /play/i });
    expect(playBtn).toHaveProperty("disabled", true);
  });
  test('Botão "Play" habilitado se preencher os campos de nome e email', () => {
    renderWithRouterAndRedux(<App />);

    const inputEmail = screen.getByTestId("input-gravatar-email");
    expect(inputEmail).toBeInTheDocument();
    const inputName = screen.getByTestId("input-player-name");
    const email = "gmail@hotmail.com";
    const name = "Persona";
    const playBtn = screen.getByRole("button", { name: /play/i });
    userEvent.type(inputEmail, email);
    expect(playBtn).toHaveProperty("disabled", true);
    userEvent.type(inputName, name);
    expect(playBtn).toHaveProperty("disabled", false);
  });
  test('Botão "Play" inicia jogo e salva token de jogador redirect ao jogo', async () => {
    renderWithRouterAndRedux(<App />);

    const inputEmail = await screen.getByTestId("input-gravatar-email");
    const inputName = await screen.getByTestId("input-player-name");
    const email = "gmail@hotmail.com";
    const name = "Persona";
    userEvent.type(inputName, name);
    const playBtn = await screen.getByRole("button", { name: /play/i });
    expect(playBtn).toHaveProperty("disabled", true);
    userEvent.type(inputEmail, email);
    userEvent.click(playBtn);
  });
  test("Será validado se o botão Settings existe na página", () => {
    renderWithRouterAndRedux(<App />);

    const settingBtn = screen.getByRole("button", { name: /settings/i });
    expect(settingBtn).toBeInTheDocument();
  });
  test("Será validado se a tela de configurações possui um título", () => {
    renderWithRouterAndRedux(<App />);

    const settingBtn = screen.getByRole("button", { name: /settings/i });
    userEvent.click(settingBtn);
    expect(screen.getByText(/Configurações/i)).toBeInTheDocument();
  });

  test("Será validado se o fatch é chamado", async () => {
    renderWithRouterAndRedux(<App />);

    mock();
    const email = screen.getByTestId("input-gravatar-email");
    const name = screen.getByTestId("input-player-name");
    const btn = screen.getByTestId("btn-play");

    act(() => {
      userEvent.type(email, "test@test.com");
      userEvent.type(name, "Trybe");
      userEvent.click(btn);
    });

    expect(history.location.pathname).tobe("/jogo");
    expect(global.fetch).toBeCalled();
  });
});
