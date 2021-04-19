import express from "express";
import { shoppingListRouter } from "./routes/shoppingList";
import { userRouter } from "./routes/user";
import authenticated from "./middleware/authenticated";

const router = express.Router();

router.get("/", function (_, res) {
  res.json({
    status: "API is working",
    message: "1337",
  });
});

router.all("*", authenticated);

router.use("/shoppinglist", shoppingListRouter);
router.use("/user", userRouter);

export { router as apiRouter };
