import * as PIXI from 'pixi.js';
import ControlPanel from "../components/common/ControlPanel";
import Shovel from "../components/tools/shovel/Shovel";
import WaterCan from "../components/tools/water/WaterCan";
import SpriteCommon from "../components/common/SpriteCommon";
import ResourceList from "../resources/ResourceList";
import SeedPack from "../components/tools/seedPack/SeedPack";
import Tree from "../components/tree/Tree";
import DefaultData from "../data/DefaultData";
import AnimationService from "../animation/AnimationService";
import Sun from "../components/tools/sun/Sun";
import Soil from "../components/soil/Soil";
import {GameType, GameTypeEnum} from "../data/GameType";

class GameScreen extends PIXI.Container {
    private readonly ans = new AnimationService();

    private readonly bgFront: SpriteCommon = new SpriteCommon(ResourceList.bgFront);
    private readonly bgBack: SpriteCommon = new SpriteCommon(ResourceList.bgBack);

    private readonly controlPanel: ControlPanel = new ControlPanel();

    private readonly shovel: Shovel = new Shovel();
    private readonly waterCan: WaterCan = new WaterCan();
    private readonly seedPack: SeedPack = new SeedPack();
    private readonly seed: SpriteCommon = new SpriteCommon(ResourceList.seed);
    private readonly water: SpriteCommon = new SpriteCommon(ResourceList.COMMON_WATER);

    private readonly sun: Sun = new Sun();
    private readonly soil: Soil = new Soil();
    private readonly tree: Tree = new Tree();

    private readonly soilOverlay: SpriteCommon = new SpriteCommon(ResourceList.COMMON_SOIL_OVERLAY);
    private readonly grass: SpriteCommon = new SpriteCommon(ResourceList.grass);

    private readonly arrow: SpriteCommon = new SpriteCommon(ResourceList.COMMON_ARROW);

    constructor() {
        super();

        // Background
        this.addChild(this.bgBack);

        // Sun & Foreground. Is different z-index for different games
        if (GameType.current == GameTypeEnum.Cacao)
            this.addChild(this.sun, this.bgFront);
        else
            this.addChild(this.bgFront, this.sun);

        // Soil
        this.addChild(this.soil);
        // Tree
        this.addChild(this.tree);
        // Seed
        this.addChild(this.seed);
        // Soil overlay, added but hidden
        this.addChild(this.soilOverlay);
        // Grass
        GameType.current == GameTypeEnum.Cacao && this.addChild(this.grass);
        // Water
        this.addChild(this.water);
        // Control panel with tools (background only)
        this.addChild(this.controlPanel);
        // Tools
        this.addChild(this.shovel);
        this.addChild(this.waterCan);
        this.addChild(this.seedPack);
        // Arrow
        this.addChild(this.arrow);

        this.arrangeElements();

        this.ans // Animation Service setup
            .setTools(this.shovel, this.waterCan, this.seedPack)
            .setTree(this.tree)
            .setSun(this.sun)
            .setSoil(this.soil)
            .setSoilOverlay(this.soilOverlay)
            .setSeed(this.seed)
            .setWater(this.water)
            .setArrow(this.arrow);

        this.start();
    }

    start = () => {
        this.gotoStep(0);
    }

    gotoStep = (step: number) => {
        const {ans, shovel, seedPack, waterCan, soil, sun} = this;

        switch (step) {
            case 0: // Make attention on the shovel
                ans.attentionStart(shovel);
                shovel.once('click', () => this.gotoStep(1));
                shovel.once('touchend', () => this.gotoStep(1));
                break;
            case 1: // Use the shovel
                ans.attentionStop(shovel);

                ans.animateShovel(() => {
                    ans.attentionStart(seedPack);
                    seedPack.once('click', () => this.gotoStep(2));
                    seedPack.once('touchend', () => this.gotoStep(2));
                });
                break;
            case 2: // Use the seed pack, put the
                ans.attentionStop(seedPack);

                ans.animateSeedPack(() => {
                    ans.attentionStart(waterCan);
                    waterCan.once('click', () => this.gotoStep(3));
                    waterCan.once('touchend', () => this.gotoStep(3));
                });

                break;
            case 3: // Use the water can, show the little tree
                ans.attentionStop(waterCan);

                ans.animateWaterCan(() => {
                    ans.attentionStartSun();
                    ans.showOverlay();
                    sun.once('click', () => this.gotoStep(4));
                    sun.once('touchend', () => this.gotoStep(4));
                })
                break;
            case 4:
                ans.attentionStopSun();
                ans.animateSun(() => {
                    ans.attentionStart(waterCan);
                    waterCan.once('click', () => this.gotoStep(5));
                    waterCan.once('touchend', () => this.gotoStep(5));
                })
                break;
            case 5:
                ans.attentionStop(waterCan);
                ans.animateWaterCan(() => {
                    ans.attentionStartSun();
                    sun.once('click', () => this.gotoStep(6));
                    sun.once('touchend', () => this.gotoStep(6));
                });
                break;
            case 6:
                // For the mint we have an additional level
                const moveSunBack = GameType.current === GameTypeEnum.Mint;
                ans.attentionStopSun();
                ans.animateSun(() => {
                    ans.attentionStart(waterCan);
                    waterCan.once('click', () => this.gotoStep(7));
                    waterCan.once('touchend', () => this.gotoStep(7));
                }, moveSunBack);
                break;
            case 7:
                ans.attentionStop(waterCan);

                if (GameType.current === GameTypeEnum.Cacao) {
                    ans.animateWaterCan(this.done);
                } else {
                    ans.animateWaterCan(() => {
                        ans.attentionStartSun();
                        sun.once('click', () => this.gotoStep(8));
                        sun.once('touchend', () => this.gotoStep(8));
                    })
                }
                break;
            case 8:
                ans.attentionStopSun();
                ans.animateSun(this.done, false);
                break;
        }
    }

    done = () => {
        // -- Here tree has fully grows!
        console.info('Growing is successfully done! Invoke window.treeGameComplete() now');
        const global = window as any;
        global.treeGameComplete && global.treeGameComplete();
    }

    arrangeElements = () => {
        const marginPanel = 30;
        const gapTools = 30;
        const marginToolsLeft = 15;
        const marginToolsTop = 36;
        const treeTop = 64;

        const {bgFront, bgBack, controlPanel, shovel, waterCan, seedPack, soil, soilOverlay, grass, tree, sun} = this;

        // Control panel depends on background
        controlPanel.x = bgBack.width - controlPanel.width - marginPanel;
        controlPanel.y = bgBack.height - controlPanel.height - marginPanel;

        // Every tool depends on control panel and each other
        shovel.x = controlPanel.x + marginToolsLeft;
        shovel.y = controlPanel.y + marginToolsTop;
        waterCan.x = shovel.x + shovel.width + gapTools;
        waterCan.y = shovel.y - 27;
        seedPack.x = waterCan.x + waterCan.width + gapTools;
        seedPack.y = shovel.y - 2;

        // Soil heap
        soil.x = (bgBack.width - soil.width) / 2;
        soil.y = bgBack.height - soil.height;
        // Soil overlay
        soilOverlay.x = (bgBack.width - soilOverlay.width) / 2;
        soilOverlay.y = soil.y + 40;

        // Tree
        tree.x = soil.x + soil.width / 2;
        tree.y = soil.y + treeTop;

        sun.x = GameType.current == GameTypeEnum.Cacao ? 0 : -sun.width/2;
        sun.y = GameType.current == GameTypeEnum.Cacao ? 0 : -sun.height/2;

        // Grass
        grass.y = bgBack.height - grass.height;

        // Save defaults
        DefaultData.positions = {
            shovel: new PIXI.Point(shovel.x, shovel.y),
            waterCan: new PIXI.Point(waterCan.x, waterCan.y),
            seedPack: new PIXI.Point(seedPack.x, seedPack.y),
            sun: new PIXI.Point(sun.x, sun.y),
        }
    }
}

export default GameScreen;