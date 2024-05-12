function formatDate(timestamp) {
  const date = new Date(timestamp);

  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Note: Months are zero-based
  const year = date.getFullYear().toString().slice(-2); // Take last two digits of the year

  return `${day}-${month}-${year}`;
}

export { formatDate };
