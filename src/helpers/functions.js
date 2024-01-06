import { HP, ATK, DEF, SP_ATK, SP_DEF, SPEED } from "../constants/maxStats";

function createArray(num) {
  // Creamos un array con el número de páginas
  const array = [];
  for (let i = 1; i <= num; i++) {
    array.push(i);
  }
  return array;
}

function mapTemporaryStats(stats) {
  const tempStatsObj = stats.map((stat) => {
    const tempStat = { ...stat };
    switch (tempStat.name) {
      case "hp":
        tempStat.color = HP.HP_COLOR;
        tempStat.max = HP.MAX_HP;
        break;
      case "attack":
        tempStat.color = ATK.ATK_COLOR;
        tempStat.max = ATK.MAX_ATK;
        break;
      case "defense":
        tempStat.color = DEF.DEF_COLOR;
        tempStat.max = DEF.MAX_DEF;
        break;
      case "special-attack":
        tempStat.color = SP_ATK.SP_ATK_COLOR;
        tempStat.max = SP_ATK.MAX_SP_ATK;
        break;
      case "special-defense":
        tempStat.color = SP_DEF.SP_DEF_COLOR;
        tempStat.max = SP_DEF.MAX_SP_DEF;
        break;
      case "speed":
        tempStat.color = SPEED.SPEED_COLOR;
        tempStat.max = SPEED.MAX_SPEED;
        break;
      default:
        break;
    }
    return tempStat;
  });

  return tempStatsObj;
}

export { createArray, mapTemporaryStats };
