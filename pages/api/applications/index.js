import dbConnect from "utils/dbConnect";
import JobApp from "models/jobapp";

dbConnect();

export default async (req, res) => {
  const { method } = req;

  switch (method) {
    case "GET":
      try {
        const jobApps = await JobApp.find({});
        res.status(200).json({
          success: true,
          data: jobApps,
        });
      } catch (error) {
        res.status(400).json({
          success: false,
          error
        });
      }
      break;
    case "POST":
      try {
        const jobApp = await JobApp.create(req.body);
        res.status(201).json({
          success: true,
          data: jobApp,
        });
      } catch (error) {
        res.status(400).json({
          success: false,
          error
        });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
};
