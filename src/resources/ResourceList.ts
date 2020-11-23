import {GameType, GameTypeEnum} from "../data/GameType";

class ResourceList {
    // region #Selected resources by game type
    static get bgFront() {
        return GameType.current == GameTypeEnum.Cacao ? ResourceList.CACAO_BG_FRONT : ResourceList.MINT_BG_FRONT;
    };
    static get bgBack() {
        return GameType.current == GameTypeEnum.Cacao ? ResourceList.CACAO_BG_BACK : ResourceList.MINT_BG_BACK;
    };
    static get grass() {
        return ResourceList.CACAO_GRASS;
    };
    static get level1() {
        return GameType.current == GameTypeEnum.Cacao ? ResourceList.CACAO_LEVEL_1 : ResourceList.MINT_LEVEL_1;
    };
    static get level2() {
        return GameType.current == GameTypeEnum.Cacao ? ResourceList.CACAO_LEVEL_2 : ResourceList.MINT_LEVEL_2;
    };
    static get level3() {
        return GameType.current == GameTypeEnum.Cacao ? ResourceList.CACAO_LEVEL_3 : ResourceList.MINT_LEVEL_3;
    };
    static get level4() {
        return GameType.current == GameTypeEnum.Cacao ? ResourceList.CACAO_LEVEL_4 : ResourceList.MINT_LEVEL_4;
    };
    static get level5() {
        return GameType.current == GameTypeEnum.Cacao ? ResourceList.CACAO_LEVEL_5 : ResourceList.MINT_LEVEL_5;
    };
    static get seedPack() {
        return GameType.current == GameTypeEnum.Cacao ? ResourceList.CACAO_SEED_PACK : ResourceList.MINT_SEED_PACK;
    };
    static get seedPackOpen() {
        return GameType.current == GameTypeEnum.Cacao ? ResourceList.CACAO_SEED_PACK_OPEN : ResourceList.MINT_SEED_PACK_OPEN;
    };
    static get seed() {
        return GameType.current == GameTypeEnum.Cacao ? ResourceList.CACAO_SEED : ResourceList.MINT_SEED;
    };
    // endregion

    // region #Cacao
    static CACAO_BG_FRONT = '../assets/cacao/background-front.png';
    static CACAO_BG_BACK = '../assets/cacao/background-back.png';
    static CACAO_GRASS = '../assets/cacao/background-grass.png';
    static CACAO_LEVEL_1 = '../assets/cacao/level-1.png';
    static CACAO_LEVEL_2 = '../assets/cacao/level-2.png';
    static CACAO_LEVEL_3 = '../assets/cacao/level-3.png';
    static CACAO_LEVEL_4 = '../assets/cacao/level-4.png';
    static CACAO_LEVEL_5 = '../assets/cacao/level-5.png';
    static CACAO_SEED_PACK = '../assets/cacao/seedPack.png';
    static CACAO_SEED_PACK_OPEN = '../assets/cacao/seedPackOpen.png';
    static CACAO_SEED = '../assets/cacao/seed.png';
    // endregion

    // region #Mint
    static MINT_BG_FRONT = '../assets/mint/background-front.png';
    static MINT_BG_BACK = '../assets/mint/background-back.png';
    static MINT_LEVEL_1 = '../assets/mint/level-1.png';
    static MINT_LEVEL_2 = '../assets/mint/level-2.png';
    static MINT_LEVEL_3 = '../assets/mint/level-3.png';
    static MINT_LEVEL_4 = '../assets/mint/level-4.png';
    static MINT_LEVEL_5 = '../assets/mint/level-5.png';
    static MINT_LEVEL_6 = '../assets/mint/level-6.png';
    static MINT_SEED_PACK = '../assets/mint/seedPack.png';
    static MINT_SEED_PACK_OPEN = '../assets/mint/seedPackOpen.png';
    static MINT_SEED = '../assets/mint/seed.png';
    // endregion

    // region #Common
    static COMMON_SHOVEL = '../assets/shovel.png';
    static COMMON_SOIL = '../assets/soil.png';
    static COMMON_SOIL_HOLE = '../assets/soil-hole.png';
    static COMMON_SOIL_OVERLAY = '../assets/soil-overlay.png';
    static COMMON_SOIL_PART = '../assets/soil-part.png';
    static COMMON_WATER = '../assets/water.png';
    static COMMON_WATERING = '../assets/watering.png';
    static COMMON_SUN = '../assets/sun.png';
    static COMMON_ARROW = '../assets/arrow.png';
    // endregion

    static LIST: string[] = [
        ResourceList.bgFront,
        ResourceList.bgBack,
        ResourceList.grass,
        ResourceList.level1,
        ResourceList.level2,
        ResourceList.level3,
        ResourceList.level4,
        ResourceList.level5,
        ResourceList.MINT_LEVEL_6, // Additional level for the Mint game
        ResourceList.seed,
        ResourceList.seedPack,
        ResourceList.seedPackOpen,

        ResourceList.COMMON_SHOVEL,
        ResourceList.COMMON_SOIL,
        ResourceList.COMMON_SOIL_HOLE,
        ResourceList.COMMON_SOIL_OVERLAY,
        ResourceList.COMMON_SOIL_PART,
        ResourceList.COMMON_WATER,
        ResourceList.COMMON_WATERING,
        ResourceList.COMMON_SUN,
        ResourceList.COMMON_ARROW,
    ];
}

export default ResourceList;