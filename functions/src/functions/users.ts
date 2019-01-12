import { createBaseExpressApp } from "../utils";
import usersController from "../controllers/users";

export default createBaseExpressApp("users", usersController, {
  memory: "128MB" // eg: 128MB, 256MB, 512MB, 1GB, 2GB
});