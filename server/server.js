const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
app.use(express.json());
app.listen(port, () =>
  console.log(`Listening on port ${port}`)
);

const videos = require("./exampleData.json");

// GET all data "/"
app.get("/", (req, res) => {
  res.send(videos);
});

//GET video by id
app.get("/:videoId", (request, response) => {
  const videoId = +request.params.videoId;
  const videoWithId = videos.find(
    (video) => video.id === videoId
  );
  videoWithId
    ? response.send(videoWithId)
    : response.status(404).send({
        msg: `Video with id: ${videoId} does not exist !!!`,
      });
});

// Create a new message
app.post("/", (request, response) => {
  const title = request.body.title;
  const url = request.body.url;
  if (
    !title ||
    !url ||
    !url.includes("youtube") ||
    !url.includes("watch?v=")
  ) {
    return response.status(400).send({
      result: "failure",
      message: "Video could not be saved",
    });
  }
  const lastMessageId = videos[videos.length - 1].id;
  const newVideo = {
    id: lastMessageId + 1,
    title: title,
    url: url,
  };
  videos.push(newVideo);
  response.send({ id: newVideo.id });
});
