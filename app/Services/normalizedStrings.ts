function normalizeString(name: string): string {
  var newName = "";
  for (let i = 0; i < name.length; i++) {
    if (!(name[i] === ".")) {
      newName += name[i];
    }
  }
  newName = newName.toLowerCase();
  console.log(newName);
  return newName;
}
export default normalizeString;
