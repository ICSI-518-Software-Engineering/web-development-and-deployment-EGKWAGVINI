import { RequestHandler } from "express";
import MathInterFace from "src/Modals/MathInterface";

export const AddTwoNumbers: RequestHandler = async (
  req: { body: MathInterFace },
  res: { json: any }
) => {
  const { firstNumber, secondNumber } = req.body;

  if (typeof firstNumber !== "number" || typeof secondNumber !== "number") {
    res.json({
      response: "Please provide Number as input.",
    });
    return;
  }

  try {
    const sum = firstNumber + secondNumber;
    res.json({
      response: sum,
    });
  } catch (error: any) {
    res.json({
      response: error.message,
    });
  }
};
