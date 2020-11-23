import * as PIXI from 'pixi.js';
import Game from "./Game";
import ResourceService from "./resources/ResourceService";

const options: object = {
  width: 1920,
  height: 829,
  antialias: true,
  transparent: true,
};

const app: PIXI.Application = new PIXI.Application(options);

const init = () => {
  ResourceService.init(() => {
    const game: Game = new Game(app);
    app.stage.addChild(game);
  });

  //   sprite.x = app.renderer.width / 2;
  //   sprite.y = app.renderer.height / 2;
  //   app.ticker.add((delta: number) => loop(sprite, delta));
}

init();

document.body.appendChild(app.view);