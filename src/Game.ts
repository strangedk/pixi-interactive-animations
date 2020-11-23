import * as PIXI from 'pixi.js';
import GameScreen from "./screens/GameScreen";

class Game extends PIXI.Container {
    private gameScreen: GameScreen | undefined;
    constructor(private app: PIXI.Application) {
        super();

        this.startGame();
    }

    startGame = () => {
        this.cleanUp();

        this.gameScreen = new GameScreen();
        this.addChild(this.gameScreen);
    }

    cleanUp = () => {
        this.removeChildren();
    }
}

export default Game;