import Story from "../models/authorStoriesModel.js";

const authorStory = async (req, res, next) => {
  const { author, content, title, likes, comments } = req.body;
  console.log(author);
  if (author && content && title) {
    try {
      const story = await Story.create({
        author,
        content,
        title,
        likes,
        comments,
      });
      // await story.save();
      res.send("Story saved succesfully");
    } catch (error) {
      console.error("Error creating story:", error);
      return next(error);
    }
  } else {
    console.log("Please fill all the fields");
    return res.status(400).json({ message: "Please fill all the fields" });
  }
};

//Getting stories
const authorStorylist = async (req, res, next) => {
  try {
    const stories = await Story.find(); // Fetch all stories from the database
    res.json(stories); // Return the array of stories
  } catch (error) {
    console.error("Error fetching stories:", error);
    next(error);
  }
};

// In your authorStoriesController.js
const likeStory = async (req, res, next) => {
  const { storyId } = req.params;
  try {
    const story = await Story.findById(storyId);
    if (!story) {
      return res.status(404).json({ message: "Story not found" });
    }

    // Increment the like count
    story.likes += 1;
    await story.save();
    return res.status(200).json({ message: "Like added successfully" });
  } catch (error) {
    return next(error);
  }
};

const commentStory = async (req, res, next) => {
  const { storyId } = req.params;
  const { comment } = req.body;

  try {
    const story = await Story.findById(storyId);
    if (!story) {
      return res.status(404).json({ message: "Story not found" });
    }

    // Add the comment to the story's comments array
    story.comments.push(comment);
    await story.save();

    return res.status(200).json({ message: "Comment added successfully" });
  } catch (error) {
    return next(error);
  }
};

export { authorStory, authorStorylist, commentStory, likeStory };
