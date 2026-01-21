
//  checks if all the keys in the formData object have non-empty values.
export function allDataFilledIn(formData) {
  return Object.keys(formData).every((key) => formData[key].trim().length > 0);
}