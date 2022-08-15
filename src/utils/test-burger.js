export default function generateTestBurger(data) {
  if (data) {
    const testBurger = [];
    testBurger[0] = 0.5 < Math.random() ? data[0] : data[1];
    for (let i = 0; i < 3; i++) {
      data.forEach((ingr) => {
        if (ingr.type !== 'bun' && 0.87 < Math.random()) testBurger.push(ingr);
      });
    }
    return testBurger;
  }
}
