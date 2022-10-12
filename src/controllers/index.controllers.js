import Treatment from "../models/treatment";
export const renderIndex = async (req, res) => {
  const treatments = await Treatment.find().lean();

  res.render("index", { treatments: treatments });
};
export const renderAbout = (req, res) => res.render("about");
