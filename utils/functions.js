module.exports = {
  convertYYYYMMDDToDate: function (date) {
    if (typeof date !== "string") return null;
    date = date.replace(/-/g, "");
    const year = date.substring(0, 4);
    const month = date.substring(4, 6) - 1; // JavaScript months are zero-indexed
    const day = date.substring(6, 8);

    return new Date(year, month, day);
  }
}