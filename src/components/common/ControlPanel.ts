import * as PIXI from 'pixi.js';

class ControlPanel extends PIXI.Graphics {
    WIDTH = 440;
    HEIGHT = 166;

    constructor() {
        super();

        this.beginFill(0x0, 0.5);
        this.drawRoundedRect(0, 0, this.WIDTH, this.HEIGHT, 12);
        this.endFill();
    }
}

export default ControlPanel;