import { Poem } from "./poem";
import { PoemGetScore } from "./poemGetScore";
import { User } from "./user";

export interface PoemListModel{
    poem:Poem;
    poemGetSocre:PoemGetScore;
    user:User
}