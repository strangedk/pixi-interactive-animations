import * as PIXI from 'pixi.js';
import ResourceService from "../../resources/ResourceService";
import ResourceList from "../../resources/ResourceList";
import gsap from 'gsap';
import {GameType, GameTypeEnum} from "../../data/GameType";

class Tree extends PIXI.Sprite {
    private readonly level1 = ResourceService.getSprite(ResourceList.level1);
    private readonly level2 = ResourceService.getSprite(ResourceList.level2);
    private readonly level3 = ResourceService.getSprite(ResourceList.level3);
    private readonly level4 = ResourceService.getSprite(ResourceList.level4);
    private readonly level5 = ResourceService.getSprite(ResourceList.level5);

    private readonly levels: PIXI.Sprite[];

    private currentLevel: number = 0;

    constructor() {
        super();

        const {level1, level2, level3, level4, level5} = this;
        this.levels = [level1, level2, level3, level4, level5];

        // Fix for the Mint additional tree level
        if (GameType.current == GameTypeEnum.Mint) {
            const level6 =  ResourceService.getSprite(ResourceList.MINT_LEVEL_6);
            this.levels.push(level6);
        }

        this.levels.forEach(l => {
            this.addChild(l);
            l.alpha = 0
            l.anchor.set(0.5, 1);
        });
    }

    public grow = () => {
        this.showLevel(++this.currentLevel);
    }

    private showLevel = (level: number, onComplete?: () => void) => {
        this.hideAll();

        gsap.to(this.levels[level-1], {alpha: 1, duration: 1, onComplete});
    }

    private hideAll = () => {
        this.levels.forEach(l => gsap.to(l,{alpha: 0, duration: 0.5}));
    }
}

export default Tree;