export type HistoryEntry = {
  date: Date;
  word: String;
  lettersFound: Array<String>;
  nbErrors: Number;
  isWon: Boolean;
};
