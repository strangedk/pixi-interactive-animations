import SpriteCommon from "../common/SpriteCommon";
import ResourceList from "../../resources/ResourceList";
import * as PIXI from 'pixi.js';
import ResourceService from "../../resources/ResourceService";
import gsap from 'gsap';

class Soil extends PIXI.Sprite {
    private readonly soilHole: SpriteCommon = new SpriteCommon(ResourceList.COMMON_SOIL_HOLE);
    private readonly soilPart: SpriteCommon = new SpriteCommon(ResourceList.COMMON_SOIL_PART);

    constructor() {
        super();
        this.texture = ResourceService.getTexture(ResourceList.COMMON_SOIL);

        const {soilHole, soilPart} = this;

        this.addChild(soilHole);
        soilHole.x = this.width / 2 - soilHole.width / 2;
        soilHole.y = 26;
        soilHole.alpha = 0;

        this.addChild(soilPart);
        soilPart.x = this.width / 2 - soilPart.width / 2;
        soilPart.y = 0;
        soilPart.alpha = 0;
    }

    /**
     * Make the hole, and throw the soil part
     */
    dig = () => {
        gsap.to(this.soilHole, {alpha: 1, duration: 0.5});
        gsap.to(this.soilPart, {
            alpha: 1, x: this.soilPart.x - 50, y: -20, duration: 0.5,
            onComplete: () => {
                gsap.to(this.soilPart, {alpha: 0, duration: 0.3});
            }
        });
    }

    hideHole = () => {
        gsap.to(this.soilHole, {alpha: 0, duration: 2.5});
        gsap.to(this.soilPart, {alpha: 0, duration: 2.5});
    }

}

export default Soil;