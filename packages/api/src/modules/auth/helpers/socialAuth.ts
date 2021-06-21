//@ts-ignore
import SAuth from "sauth-token";

const sAuth = new SAuth({
  facebook: {
    fields: ["id", "first_name", "last_name", "email"],
  },
  google: {
    // Not Required
  },
});
export default sAuth;
