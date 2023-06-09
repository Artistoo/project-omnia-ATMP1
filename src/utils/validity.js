import { validEmailServiceProviders } from "../../data";
export const validEmail = (value) => {
  const isEmail =
    /@([\w-]+)\./.test(value) &&
    /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(value);
  if (isEmail) {
    const domain = value.match(/@([\w-]+)\./)[1];
    return validEmailServiceProviders.some((email) => {
      return domain === email.domain;
    });
  }
};
