import dbConnect from "utils/dbConnect";
import JobApp from "models/jobapp";

dbConnect();

export default async (req, res) => {
  const {
    query: { id },
    method,
  } = req;
  switch (method) {
    case "GET":
      try {
        const jobApp = await JobApp.findById(id);
        if (!jobApp) {
          return res.status(404).json({
            success: false,
          });
        }
        res.status(200).json({
          success: true,
          data: jobApp,
        });
      } catch (error) {
        res.status(400).json({
          success: false,
        });
      }
      break;
    case "PUT":
      try {
        const jobApp = await JobApp.findOneAndUpdate({_id:id}, req.body, {
          runVallidators: true,
        });
        if (!jobApp) {
          return res.status(404).json({
            success: false,
          });
        }
        res.status(200).json({
          success: true,
          data: jobApp,
        });
      } catch (error) {
        res.status(400).json({
          success: false,
          error,
        });
      }
      break;
    case "DELETE":
      try {
        const jobApp = await JobApp.deleteOne({ _id: id });
        if (!jobApp) {
          return res.status(400).json({
            success: false,
          });
        }
        res.status(200).json({
          success: true,
          data: {},
        });
      } catch (error) {
        console.error(error)
        res.status(400).json({
          success: false,
          error,
        });
      }
      break;
    default:
      res.status(400).json({
        success: false,
        error,
      });
      break;
  }
};
