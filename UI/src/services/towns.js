export function getTowns(allTownsResponseGql) {
  const towns = new Set([]);

  allTownsResponseGql.forEach((t) => {
    towns.add(t.town);
  });

  return towns;
}
