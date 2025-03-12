import Listing from "../../models/listing/listing.model.js";

export const createListing = async (req, res, next) => {
  try {
    const listing = await Listing.create(req.body);
    return res.status(200).json({ isValid: true, listing });
  } catch (error) {
    next(error);
  }
};

export const fetchUserListings = async (req, res, next) => {
  try {
    if (req.user.id == req.params.id) {
      const data = await Listing.find({ userRef: req.params.id });
      return res.status(200).json({ isValid: true, data });
    } else {
      return next(401, "UnAuthorized");
    }
  } catch (error) {
    next(error);
  }
};

export const deleteListingById = async (req, res, next) => {
  try {
    const data = await Listing.findById(req.params.id);
    if (!data) {
      return next(404, "Not Found");
    } else {
      if (req.user.id == data.userRef) {
        await Listing.findByIdAndDelete(req.params.id);
        return res
          .status(200)
          .json({ isValid: true, data: "Listing Deleted Successfully!" });
      } else {
        return next(401, "UnAuthorized");
      }
    }
  } catch (error) {
    next(error);
  }
};

export const updateListingById = async (req, res, next) => {
  try {
    const data = await Listing.findById(req.params.id);
    if (!data) {
      return next(404, "Not Found");
    } else {
      if (req.user.id == data.userRef) {
        await Listing.findByIdAndUpdate(req.params.id, req.body, { new: true });
        return res
          .status(200)
          .json({ isValid: true, data: "Listing Updated Successfully!" });
      } else {
        return next(401, "UnAuthorized");
      }
    }
  } catch (error) {
    next(error);
  }
};

export const fetchListingById = async (req, res, next) => {
  try {
    const data = await Listing.findById(req.params.id);
    if (data) {
      return res.status(200).json({ isValid: true, data });
    } else {
      return next(404, "Not Found");
    }
  } catch (error) {
    next(error);
  }
};

export const fetchCreatedListings = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 0;
    const index = parseInt(req.query.index) || 0;

    let furnished = req.query.furnished;
    if (typeof furnished === "undefined" || furnished === "false") {
      furnished = { $in: [false, true] };
    }

    let parking = req.query.parking;
    if (typeof parking === "undefined" || parking === "false") {
      parking = { $in: [false, true] };
    }

    let type = req.query.type;
    if (type === "undefined" || type === "all") {
      type = { $in: ["rent", "sale"] };
    }

    const searchText = req.query.searchText || "";
    const sort = req.query.sort || "createdAt";
    const order = req.query.order || "desc";

    const listings = await Listing.find({
      name: { $regex: searchText, $options: "i" },
      type,
      furnished,
      parking,
    })
      .sort({ [sort]: order })
      .skip(index)
      .limit(limit);

    return res.status(200).json({ isValid: true, listings });
  } catch (error) {
    next(error);
  }
};
