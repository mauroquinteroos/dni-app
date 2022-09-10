const { Router } = require("express");
const axios = require("axios").default;
const https = require("https");

const router = Router();
const httpsAgent = new https.Agent({
  rejectUnauthorized: false,
});

router.get("/:dni", async (req, res) => {
  try {
    const APIPERU_URL = `${process.env.APIPERU_URL}${req.params.dni}`;

    console.log(APIPERU_URL);

    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.APIPERU_TOKEN}`,
    };

    const data = await axios.get(APIPERU_URL, { headers, httpsAgent });

    return res.json(data.data);
  } catch (err) {
    return res.status(500).json({ message: err });
  }
});

module.exports = router;
