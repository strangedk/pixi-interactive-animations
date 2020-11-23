import * as PIXI from 'pixi.js';
import ResourceService from "../../resources/ResourceService";

class SpriteCommon extends PIXI.Sprite {
    constructor(resourceName: string) {
        super();

        this.texture = ResourceService.getTexture(resourceName);
    }
}

export default SpriteCommon;