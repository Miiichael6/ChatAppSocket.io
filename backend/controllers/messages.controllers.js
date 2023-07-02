import Message from "../models/mensaje.js";

export const obtenerChat = async (req, res) => {
  const myId = req.uid;
  const mensajeDe = req.params.de;

  const lastThirty = await Message.find({
    $or: [
      { de: myId, para: mensajeDe },
      { de: mensajeDe, para: myId },
    ],
  })
    .sort({ createdAt: "asc" })
    .limit(30);

  return res.json({
    ok: true,
    messages: lastThirty,
  });
};
