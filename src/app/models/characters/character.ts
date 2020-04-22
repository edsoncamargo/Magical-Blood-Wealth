export abstract class Character {
    name: string;
    life: number;
    demage: number;
    agility: number;
    defense: number;

    constructor(name: string, life = 100, demage = 5, agility = 5, defense = 5) {
        this.name = name;
        this.life = life;
        this.demage = demage;
        this.agility = agility;
        this.defense = defense;
    }
}
