export default function (update, duration = 500) {
  try {
    if (document?.startViewTransition) document.startViewTransition(() => update(), duration);
    else update();
  } catch ({ message: error }) {
    console.log({ error });
  }
}
