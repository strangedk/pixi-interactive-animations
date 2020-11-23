import * as PIXI from 'pixi.js';
import ResourceList from "../../../resources/ResourceList";
import ResourceService from "../../../resources/ResourceService";

class Shovel extends PIXI.Sprite {
    constructor() {
        super();

        this.texture = ResourceService.getTexture(ResourceList.COMMON_SHOVEL);
        this.interactive = true;
        this.buttonMode = true;
    }
}

export default Shovel;
