
const racaoMaisBarata = (racaoMelhorPreco: number[]) => {
  if (racaoMelhorPreco.length == 0 || racaoMelhorPreco == null) {
    return null;
  }
  let menorPreco = racaoMelhorPreco[0];
  for (let i = 0; i < racaoMelhorPreco.length; i++) {
    if (menorPreco > racaoMelhorPreco[i] && racaoMelhorPreco[i] != 0) {
      menorPreco = racaoMelhorPreco[i];
    }
  }
  return menorPreco;
};
export default racaoMaisBarata;
