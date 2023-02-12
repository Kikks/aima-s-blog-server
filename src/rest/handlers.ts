import axios from "axios";
import { load } from "cheerio";
import { Request, Response } from "express";
import { isEmpty } from "../utils/validators/helpers";

export const handleGetUrlMetadata = async (req: Request, res: Response) => {
  try {
    const url = req.query?.url as string;

    if (!url || isEmpty(url)) {
      throw new Error("An error occured while tryin to get site metadata.");
    }

    const response = await axios.get(url, { responseType: "text" });

    const $ = load(response.data);
    const title =
      $('meta[property="og:title"]').attr("content") ||
      $("title").text() ||
      $('meta[name="title"]').attr("content");
    const description =
      $('meta[property="og:description"]').attr("content") ||
      $('meta[name="description"]').attr("content");
    const image =
      $('meta[property="og:image"]').attr("content") ||
      $('meta[property="og:image:url"]').attr("content");

    return res.status(200).json({
      success: 1,
      meta: {
        title,
        description,
        image: {
          url: image,
        },
      },
    });
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({
      success: 0,
      message: error?.message || "An error occured while tryin to get site metadata.",
    });
  }
};
