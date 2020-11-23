enum GameTypeEnum {
    Cacao,
    Mint,
}

class GameType {
    static get current(): GameType {
        return GameTypeEnum.Cacao;
    }
}

export {GameTypeEnum, GameType};