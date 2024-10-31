import Listing from "../../models/listing/listing.model.js";

export const createListing = async (req, res, next) => {
  try {
    const listing = await Listing.create(req.body);
    return res.status(200).json({ isValid: true, listing });
  } catch (error) {
    next(error);
  }
};
