const mediaItems = [
  {
    media_id: 9632,
    filename: "ffd8.jpg",
    filesize: 887574,
    title: "Favorite drink",
    description: "",
    user_id: 1606,
    media_type: "image/jpeg",
    created_at: "2023-10-16T19:00:09.000Z",
  },
  {
    media_id: 9626,
    filename: "dbbd.jpg",
    filesize: 60703,
    title: "Miika",
    description: "My Photo",
    user_id: 3671,
    media_type: "image/jpeg",
    created_at: "2023-10-13T12:14:26.000Z",
  },
  {
    media_id: 9625,
    filename: "2f9b.jpg",
    filesize: 30635,
    title: "Aksux",
    description: "friends",
    user_id: 260,
    media_type: "image/jpeg",
    created_at: "2023-10-12T20:03:08.000Z",
  },
  {
    media_id: 9592,
    filename: "f504.jpg",
    filesize: 48975,
    title: "Desert",
    description: "",
    user_id: 3609,
    media_type: "image/jpeg",
    created_at: "2023-10-12T06:59:05.000Z",
  },
  {
    media_id: 9590,
    filename: "60ac.jpg",
    filesize: 23829,
    title: "Basement",
    description: "Light setup in basement",
    user_id: 305,
    media_type: "image/jpeg",
    created_at: "2023-10-12T06:56:41.000Z",
  },
];

/**
 * Gets all items
 *
 * @param {object} req - http request
 * @param {object} res - http response
 */
const getItems = (req, res) => {
  const limit = req.query.limit;
  // TODO: check that the param value is int before using
  if (limit) {
    res.json(mediaItems.slice(0, limit));
  } else {
    res.json(mediaItems);
  }
};

/**
 *
 * @param {*} req
 * @param {*} res
 */
const getItemsById = (req, res) => {
  // if item with id exists send it, otherwise send 404
  console.log("getItemsById", req.params);
  const item = mediaItems.find((element) => element.id == req.params.id);
  if (item) {
    res.json(item);
  } else {
    res.status(404);
    res.json({ message: "Item not found." });
  }
};

const postItem = (req, res) => {
  console.log("new item posted", req.body);
  // TODO: check last weeks example for generating an id
  if (req.body.name) {
    mediaItems.push({ id: 0, name: req.body.name });
    res.sendStatus(201);
  } else {
    res.sendStatus(400);
  }
};

const deleteItem = (res, id) => {
  const index = mediaItems.findIndex((item) => item.id == id);
  if (index !== -1) {
    mediaItems.splice(index, 1);
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(`{"message": "Item with id ${id} deleted."}`);
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end('{"message": "Item not found."}');
  }
};

const putItem = (req, res, id) => {
  let body = [];
  req
    .on("error", (err) => {
      console.error(err);
    })
    .on("data", (chunk) => {
      body.push(chunk);
    })
    .on("end", () => {
      body = Buffer.concat(body).toString();
      console.log("req body", body);
      body = JSON.parse(body);
      if (!body.name) {
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(`{"message": "Missing data."}`);
        return;
      }
      const index = mediaItems.findIndex((item) => item.id == id);
      if (index !== -1) {
        mediaItems[index].name = body.name;
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(`{"message": "Item with id ${id} updated."}`);
      } else {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end('{"message": "Item not found."}');
      }
    });
};

export { getItems, getItemsById, postItem, deleteItem, putItem };
