const db = require("../models");
const Forum = db.forum;
const User = db.user;
const { OpenAI } = require("openai");

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const getAllForum = async (req, res) => {
  try {
    const forum = await Forum.find().exec();
    res.json({ forum });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

const createForum = async (req, res) => {
  const { title, description, location, user } = req.body;

  const format = {
    valid: "boolean true or false",
  };

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4-1106-preview",
      messages: [
        {
          role: "system",
          content: `You are a helpful AI that is able to determine whether the users post is about travel \nYou are to output the following in json format: ${JSON.stringify(
            format
          )} \nDo not put quotation marks or escape character \\ in the output fields.`,
        },
        {
          role: "user",
          content: `Determine and return a boolean value if a users post is about travel with these details: title: ${title} description: ${description} and location : ${location}`,
        },
      ],
      temperature: 0.9,
      max_tokens: 300,
      frequency_penalty: 0.0,
      presence_penalty: 0.6,
      stop: [" Human:", " AI:"],
    });
    checkValid = response.choices[0].message.content.split(":")[1];
    if (checkValid == "false}") {
      res.send({ error: true });
    } else if (checkValid == "true}") {
      const forum = new Forum({
        title,
        description,
        location,
        createdBy: req.params.userId,
        user: { user },
      });

      await forum.save();
      res.send({
        error: false,
        message: "Forum created successfully!",
        forumId: forum._id,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

const getForumById = async (req, res) => {
  const { forumId } = req.params;

  try {
    const forum = await Forum.findById(forumId).exec();

    res.json({ forum });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  getAllForum,
  createForum,
  getForumById,
};
