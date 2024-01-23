export default function (date = new Date()) {
  try {
    return new Intl.DateTimeFormat('default', {
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
    }).format(date);
  } catch ({ message: error }) {
    console.log({ error });
  }
}
