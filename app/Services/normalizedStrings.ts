function normalizeString(name: string): string {
  let newName = "";
  for (let i = 0; i < name.length; i++) {
    if (!(name[i] === ".") && !(name[i] === " ")) {
      newName += name[i];
    }
  }
  newName = newName.toLowerCase();
  return newName;
}
export default normalizeString;
