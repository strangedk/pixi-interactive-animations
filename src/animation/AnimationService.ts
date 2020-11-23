import Shovel from "../components/tools/shovel/Shovel";
import WaterCan from "../components/tools/water/WaterCan";
import SeedPack from "../components/tools/seedPack/SeedPack";
import Tree from "../components/tree/Tree";
import gsap from "gsap";
import Sun from "../components/tools/sun/Sun";
import Soil from "../components/soil/Soil";
import SpriteCommon from "../components/common/SpriteCommon";
import DefaultData from "../data/DefaultData";
import {GameType, GameTypeEnum} from "../data/GameType";

class AnimationService {
    // region #Properties
    private shovel!: Shovel;
    private waterCan!: WaterCan;
    private seedPack!: SeedPack;
    private tree!: Tree;
    private sun!: Sun;
    private soil!: Soil;
    private soilOverlay!: SpriteCommon;
    private seed!: SpriteCommon;
    private water!: SpriteCommon;
    private arrow!: SpriteCommon;
    // endregion

    // region #Setup
    setTools = (shovel: Shovel, waterCan: WaterCan, seedPack: SeedPack) => {
        this.shovel = shovel;
        this.waterCan = waterCan;
        this.seedPack = seedPack;
        return this;
    }

    setSeed = (seed: SpriteCommon) => {
        this.seed = seed;
        this.seed.alpha = 0;
        return this;
    }

    setSun = (sun: Sun) => {
        this.sun = sun;
        return this;
    }

    setTree = (tree: Tree) => {
        this.tree = tree;
        return this;
    }

    setSoil = (soil: Soil) => {
        this.soil = soil;
        return this;
    }

    setSoilOverlay = (soilOverlay: SpriteCommon) => {
        this.soilOverlay = soilOverlay;
        this.soilOverlay.alpha = 0;
        return this;
    }

    setWater = (water: SpriteCommon) => {
        this.water = water;
        this.water.alpha = 0;
        return this;
    }

    setArrow = (arrow: SpriteCommon) => {
        this.arrow = arrow;
        this.arrow.alpha = 0;
        // Setup anchor to the arrow corner
        this.arrow.anchor.set(0.5, 0);
        return this;
    }
    // endregion

    // region #Tools attention
    attentionStart = (tool: PIXI.Sprite, amplitude: number = 10) => {
        gsap.to(tool, {y: tool.y + amplitude, repeat: -1, yoyo: true});
    }

    attentionStop = (tool: PIXI.Sprite) => {
        gsap.killTweensOf(tool);
    }

    attentionStartSun = () => {
        this.showArrow();
    }

    attentionStopSun = () => {
        this.hideArrow();
    }
    // endregion

    // region #Shovel animation
    animateShovel = (onComplete: () => void) => {
        const {shovel, soilOverlay} = this;

        // moveTo -> dig -> moveBack

        const moveTo = () => {
            gsap.to(shovel, {
                x: soilOverlay.x + 40,
                y: soilOverlay.y - 120,
                duration: 2,
                ease: 'back.out(2)',
                onComplete: dig
            });
        }

        const dig = () => {
            gsap.to(shovel, {
                rotation: 0.2,
                y: shovel.y + 40,
                duration: 0.5,
                ease: 'back.out(4)',
                onComplete: moveBack
            });
        };

        const moveBack = () => {
            this.digSoil(); // See here, we are dig the soil!
            gsap.to(shovel, {
                rotation: 0,
                x: DefaultData.positions.shovel.x,
                y: DefaultData.positions.shovel.y,
                duration: 1,
                ease: 'back.out(1)',
                onComplete: onComplete,
            });
        }

        moveTo();
    }
    // endregion

    // region #Seed pack animation
    animateSeedPack = (onComplete: () => void) => {
        const {seedPack, soilOverlay, seed} = this;

        // moveTo -> open + drop -> moveBack

        const moveTo = () => {
            gsap.to(seedPack, {
                x: soilOverlay.x,
                y: soilOverlay.y - 200,
                duration: 2,
                rotation: -2.5,
                onComplete: open,
            });
        }

        const open = () => {
            seedPack.open();
            gsap.to(seedPack, {
                y: seedPack.y + 30,
                yoyo: true,
                repeat: 2,
                duration: 0.5,
                onComplete: moveBack,
            })
            drop();
        }

        const dropWeight = GameType.current == GameTypeEnum.Cacao ?
            44 : 0;
        const drop = () => {
            seed.x = seedPack.x;
            seed.y = seedPack.y;
            seed.alpha = 1;
            gsap.to(seed, {
                y: soilOverlay.y - dropWeight,
                duration: 2,
            });
        }

        const moveBack = () => {
            seedPack.close();
            gsap.to(seedPack, {
                rotation: 0,
                x: DefaultData.positions.seedPack.x,
                y: DefaultData.positions.seedPack.y,
                duration: 2,
                onComplete: onComplete,
            })
        }

        moveTo();
    }

    hideSeed = () => {
        if (this.seed.alpha !== 0)
            gsap.to(this.seed, {alpha: 0, duration: 2});
    }
    // endregion

    // region #Water can animation
    animateWaterCan = (onComplete: () => void) => {
        const {waterCan, water, soilOverlay} = this;

        const moveTo = () => {
            gsap.to(waterCan, {
                rotation: -1,
                x: soilOverlay.x + 100,
                y: soilOverlay.y - 240,
                duration: 1,
                onComplete: shower,
            })
        }

        const shower = () => {
            showWater();

            gsap.to(waterCan, {
                y: waterCan.y + 50,
                rotation: -1.1,
                yoyo: true,
                repeat: 3,
                duration: 0.75,
                onComplete: moveBack,
            });
        }

        const moveBack = () => {
            this.growTree();
            hideWater();
            gsap.to(waterCan, {
                rotation: 0,
                x: DefaultData.positions.waterCan.x,
                y: DefaultData.positions.waterCan.y,
                onComplete: onComplete,
            });
        }

        const showWater = () => {
            const {water, waterCan} = this;

            water.x = waterCan.x - 80;
            water.y = waterCan.y + 15;
            water.alpha = 0.2;

            this.hideSeed();
            this.hideSoilHole();
            this.showOverlay();

            gsap.to(water, {
                alpha: 1,
                y: water.y + 50,
                x: water.x - 10,
                rotation: -0.1,
                loop: true,
                repeat: 3,
                duration: 0.75,
            })
        }

        const hideWater = () => {
            gsap.to(water, {alpha: 0, duration: 1});
        }

        moveTo();
    }
    // endregion

    // region #Sun animation
    animateSun = (onComplete: () => void, moveBack: boolean = true) => {
        const {sun, soilOverlay} = this;

        const grow = () => {
            this.growTree();

            if (moveBack)
                this.hideSun(onComplete);
            else
                onComplete();
        }

        gsap.to(sun, {
            x: (soilOverlay.x - sun.width / 2) + 12,
            y: -30,
            duration: 3,
            ease: 'back.out(2)',
            onComplete: grow,
        });
    }

    hideSun = (onComplete: () => void) => {
        const {sun} = this;
        gsap.to(sun, {
            x: DefaultData.positions.sun.x,
            y: DefaultData.positions.sun.y,
            duration: 2,
            onComplete: onComplete,
        })
    }
    // endregion

    // region #Tree

    growTree = () => {
        this.tree?.grow();
    }
    // endregion

    // region #Soil
    digSoil = () => {
        this.soil.dig();
    }

    hideSoilHole = () => {
        if (this.soil.alpha !== 0)
            this.soil.hideHole();
    }

    showOverlay = () => {
        gsap.to(this.soilOverlay, {alpha: 1, duration: 2})
    }
    // endregion

    // region #Arrow
    showArrow = () => {
        const {arrow, sun} = this;

        arrow.x = sun.x + sun.width - 70;
        arrow.y = sun.y + sun.height - 70;
        arrow.rotation = -0.7;

        gsap.to(arrow, {alpha: 1, duration: 1});
        gsap.to(arrow, {
            x: arrow.x - 40,
            y: arrow.y - 40,
            duration: 1,
            yoyo: true,
            repeat: -1,
        });
    }

    hideArrow = () => {
        const {arrow} = this;

        gsap.to(arrow, {
            alpha: 0, duration: 1, onComplete: () => {
                gsap.killTweensOf(this.arrow);
            }
        });
    }
    // endregion
}

export default AnimationService;