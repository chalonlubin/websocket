"use strict";

/** Grabs joke from icanhazdadjoke API */

const axios = require("axios");
const API_URL = "https://icanhazdadjoke.com";

async function getDadJoke() {
  let response;
  try {
    response = await axios({
      url: API_URL,
      headers: {
        Accept: "application/json",
        "User-Agent": "something else",
      },
    });
  } catch (err) {
    console.log("err", err);
  }
  return response.data.joke;
}

module.exports = { getDadJoke };
