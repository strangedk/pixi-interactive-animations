import * as PIXI from 'pixi.js';
import ResourceService from "../../../resources/ResourceService";
import ResourceList from "../../../resources/ResourceList";

class WaterCan extends PIXI.Sprite {
    constructor() {
        super();

        this.texture = ResourceService.getTexture(ResourceList.COMMON_WATERING);
        this.interactive = true;
        this.buttonMode = true;
    }
}

export default WaterCan;