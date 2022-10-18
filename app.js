const express = require("express");
var axios = require("axios");
const app = express();
const { google } = require("googleapis");
const customsearch = google.customsearch("v1");
var cors = require("cors");

const port = 6000;
const GG_API_KEY = "AIzaSyCbfYxqhkpXoNckPA7tliSX9Nj-NLcanm4";
const GG_CX = "536ddf6afe205448a";

app.use(cors({ origin: true, credentials: true }));
app.get("/listing", (req, res) => {
  const { q = "tattoo", start, num } = req.query;
  console.log(req.query);
  console.log(q, start, num);
  customsearch.cse
    .list({
      auth: GG_API_KEY,
      cx: GG_CX,
      q: q,
      start: start!="" ? start : "1",
      //  num
    })
    .then((result) => result.data)
    .then((result) => {
      const { queries, items, searchInformation } = result;

      const page = (queries.request || [])[0] || {};
      const previousPage = (queries.previousPage || [])[0] || {};
      const nextPage = (queries.nextPage || [])[0] || {};

      const data = {
        q: "tattoo arm",
        totalResults: page.totalResults,
        count: page.count,
        startIndex: page.startIndex,
        nextPage: nextPage.startIndex,
        previousPage: previousPage.startIndex,
        time: searchInformation.searchTime,
        items: items.map((o) => ({
          link: o.link,
          title: o.title,
          snippet: o.snippet,
          img: (((o.pagemap || {}).cse_image || {})[0] || {}).src,
        })),
      };
      // res.status(200).send(result);
      res.status(200).send({data});
    })
    .catch((err) => {
      console.log("Error");
      console.log(err);
      res.status(500).send(err);
    });
  // res.send({
  //   q: "tattoo arm",
  //   totalResults: "208000000",
  //   count: 10,
  //   startIndex: 11,
  //   nextPage: 21,
  //   previousPage: 1,
  //   time: 0.440906,
  //   items: [
  //     {
  //       link: "https://www.pinterest.ca/lauragorrie/flower-tattoo-arm/",
  //       title:
  //         "58 Best Flower Tattoo arm ideas | beautiful tattoos, body art tattoos ...",
  //       snippet:
  //         'May 2, 2020 - Explore Laura Gorrie\'s board "Flower Tattoo arm" on Pinterest. See more ideas about beautiful tattoos, body art tattoos, sleeve tattoos.',
  //       img: "https://i.pinimg.com/200x150/50/cb/08/50cb088bbf0125f33b5e2d1fc1eb48bb.jpg",
  //     },
  //     {
  //       link: "https://www.etsy.com/market/arm_tattoo",
  //       title: "Arm Tattoo - Etsy",
  //       snippet:
  //         "Results 1 - 40 of 5000+ ... Check out our arm tattoo selection for the very best in unique or custom, handmade pieces from our tattooing shops.",
  //       img: "https://i.etsystatic.com/18560562/r/il/2da588/1824439139/il_300x300.1824439139_2pzi.jpg",
  //     },
  //     {
  //       link: "https://www.healthline.com/health/body-modification/pain-tattoos-chart",
  //       title: "Tattoo Pain Chart: Where It Hurts Most and Least, and More",
  //       snippet:
  //         "Jul 23, 2019 ... Here, we'll take a closer look at the most and least painful places to get tattooed. Most painful. It's likely most painful to get a tattoo on a ...",
  //       img: "https://post.healthline.com/wp-content/uploads/2019/05/111435-tattoo-pain-scale-1200x628-facebook-1200x628.jpg",
  //     },
  //     {
  //       link: "https://joinstatepolice.ny.gov/tattoo-policy",
  //       title: "Tattoo Policy | Join the State Police",
  //       snippet:
  //         "Effective for the 2022 Eligibility List, the New York State Police tattoo ... Tattoos on the chest, back, or arms must be covered by wearing a properly ...",
  //       img: "https://joinstatepolice.ny.gov/sites/g/files/oee1071/files/media/2019/04/gettyimages-153339696.jpg",
  //     },
  //     {
  //       link: "https://medermislaserclinic.com/tattoo-removal-before-and-after/arms-hands/",
  //       title: "Arms & Hands Laser Tattoo Removal Before & After Results",
  //       snippet:
  //         "Laser tattoo removal is the safest and most effective method for fading or completely erasing unwanted ink. Using the laser method to remove tattoos on the arms ...",
  //       img: "https://medermislaserclinic.com/wp-content/uploads/2018/01/MedermisLaser2.png",
  //     },
  //     {
  //       link: "https://www.bravotv.com/the-real-housewives-of-orange-county/style-living/meghan-king-removes-jim-edmonds-tattoo-from-arm",
  //       title: 'Meghan King Removes "Jim Edmonds" Tattoo from Arm | Style ...',
  //       snippet:
  //         "Jul 20, 2020 ... Meghan King Is Removing the Tattoo for Ex Jim Edmonds on Her Arm. \"It's my only tattoo and it's time to go,\" The Real Housewives of Orange ...",
  //       img: "https://www.bravotv.com/sites/bravo/files/2020/07/meghan-king-tattoo-removal.jpg",
  //     },
  //     {
  //       link: "https://pagesix.com/2022/07/11/reese-witherspoons-daughter-ava-shows-off-new-arm-tattoo/",
  //       title: "Reese Witherspoon's daughter, Ava, shows off new arm tattoo",
  //       snippet:
  //         "Jul 11, 2022 ... Reese Witherspoon and Ryan Phillippe's lookalike daughter Ava Phillippe shows off a new arm tattoo in sweet snaps with her mom.",
  //       img: "https://pagesix.com/wp-content/uploads/sites/3/2022/07/reese-witherspoon-ava-philippe-68.jpg?quality=75&strip=all&w=1200",
  //     },
  //     {
  //       link: "https://encyclopedia.ushmm.org/content/en/article/tattoos-and-numbers-the-system-of-identifying-prisoners-at-auschwitz",
  //       title:
  //         "Tattoos and Numbers: The System of Identifying Prisoners at ...",
  //       snippet:
  //         "Dec 9, 2019 ... Just before I turned 6, my family was deported to Auschwitz from the Theresienstadt ghetto. My arm was tattooed with the number 169061. There, I ...",
  //       img: "https://encyclopedia.ushmm.org/images/thumb/d1cbe67d-a92b-4ef6-bde3-a80e1d517355.jpg.pagespeed.ce.fHqKIGQcGV.jpg",
  //     },
  //     {
  //       link: "https://www.nexusmods.com/cyberpunk2077/mods/2961",
  //       title: "Denny Arm Tattoo at Cyberpunk 2077 Nexus - Mods and community",
  //       snippet:
  //         "Jul 28, 2021 ... The tattoo on the upper arm in the screenshots is Custom Body Tattoos 1. Known issues:﻿. When using the testera shotgun the tattoo will ...",
  //       img: "https://staticdelivery.nexusmods.com/mods/3333/images/thumbnails/2961/2961-1627485506-992563218.png",
  //     },
  //     {
  //       link: "https://www.cbssports.com/nfl/news/aaron-rodgers-shows-off-mysterious-new-arm-tattoo-and-we-might-have-already-decoded-it-but-probably-not/",
  //       title:
  //         "Aaron Rodgers shows off mysterious new arm tattoo and we might ...",
  //       snippet:
  //         "Jul 7, 2022 ... The Packers QB just got the first tattoo of his life and we might have just decoded it.",
  //       img: "https://sportsfly.cbsistatic.com/fly-0336/bundles/sportsmediacss/images/fantasy/default-article-image-large.png",
  //     },
  //   ],
  // });
});


app.listen(port, () => console.log(`Listening on port ${port}`));
