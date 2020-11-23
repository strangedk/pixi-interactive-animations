import * as PIXI from 'pixi.js';
import ResourceList from "../../../resources/ResourceList";
import ResourceService from "../../../resources/ResourceService";

class Sun extends PIXI.Sprite {
    constructor() {
        super();

        this.texture = ResourceService.getTexture(ResourceList.COMMON_SUN);
        this.interactive = true;
        this.buttonMode = true;
    }
}

export default Sun;
