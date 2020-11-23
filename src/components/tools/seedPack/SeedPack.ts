import * as PIXI from 'pixi.js';
import ResourceList from "../../../resources/ResourceList";
import ResourceService from "../../../resources/ResourceService";

class SeedPack extends PIXI.Sprite {
    constructor() {
        super();

        this.close();

        this.interactive = true;
        this.buttonMode = true;
    }

    open = () => {
        this.texture = ResourceService.getTexture(ResourceList.seedPackOpen)
    }

    close = () => {
        this.texture = ResourceService.getTexture(ResourceList.seedPack);
    }
}

export default SeedPack;
