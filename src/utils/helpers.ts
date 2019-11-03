type Obj = { [key: string]: string }

export const removeKeyFromObject = (obj: Obj, keyToDelete: string): Object => {
  if (!keyToDelete || keyToDelete.length < 1) {
    return obj
  }

  delete obj[keyToDelete]
  return obj
}
