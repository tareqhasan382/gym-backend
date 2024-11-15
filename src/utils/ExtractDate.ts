// function ExtractDate(dateTime: Date): string {
//   return new Date(dateTime).toISOString().split("T")[0]; // YYYY-MM-DD
// }
export const ExtractDate = (dateTime: Date): string => {
  return new Date(dateTime).toISOString().split("T")[0];
};
