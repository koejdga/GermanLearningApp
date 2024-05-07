export enum Game {
  DRAP_DROP = "DragDropGame",
  WRITE_TRANSLATION = "WriteTranslationGame",
  ARTICLE = "ArticleGame",
  ENDINGS = "EndingsGame",
}

export enum GameInDb {
  DRAP_DROP = "drag_drop_game",
  WRITE_TRANSLATION = "write_translation_game",
  ARTICLE = "article_game",
  ENDINGS = "endings_game",
}

export const gameToDbMapping: Record<Game, GameInDb> = {
  [Game.DRAP_DROP]: GameInDb.DRAP_DROP,
  [Game.WRITE_TRANSLATION]: GameInDb.WRITE_TRANSLATION,
  [Game.ARTICLE]: GameInDb.ARTICLE,
  [Game.ENDINGS]: GameInDb.ENDINGS,
};

export const gameToNameMapping: Record<Game, string> = {
  [Game.DRAP_DROP]: "Нові слова",
  [Game.WRITE_TRANSLATION]: "Письмо",
  [Game.ARTICLE]: "Артиклі",
  [Game.ENDINGS]: "Закінчення",
};
