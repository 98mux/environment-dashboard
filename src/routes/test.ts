 
import {readFile} from "fs/promises";
import * as csv from "csvtojson";
/** @type {import('./__types/[id]').RequestHandler} */
export async function get({ params }) {
  // `params.id` comes from [id].js
  //const file = readFile("../../activities.csv");
  const json = await csv().fromFile("../../activities.csv");
 
  //let json = "bruh";
  return {
    status: 200,
    body:JSON.stringify(json)
  };
}