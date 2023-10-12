import express from "express";
import axios from "axios";
import * as cheerio from "cheerio";
const app = express();


// routes ?\
app.get('/A', async (req, res) => {
  try {
    const url = "https://satta-king-online.in/";
    const response = await axios.get(url);
    const html = response.data;
    const $ = cheerio.load(html);
    const dataArray = [];

    $('table tr').each((index, element) => {
      if (index === 0) {
        // Skip the first row, which contains headers
        return;
      }

      const row = $(element).find('td');

      const dataObject = {
        date: row.eq(0).text().trim(),
        disawer: row.eq(1).text().trim(),
        indiaBazar: row.eq(2).text().trim(),
        faridabad: row.eq(3).text().trim(),
        gaziabad: row.eq(4).text().trim(),
        gali: row.eq(5).text().trim(),
      };

      dataArray.push(dataObject);
    });
    console.log(new Date().toLocaleDateString());
    const day=new Date().getDate()
    const sen = new Array();
    sen.push(dataArray[day-2])
    sen.push(dataArray[day-1])
    res.send(sen);
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred while fetching data from the first website.');
  }
});

app.get('/B', async (req, res) => {
  try {
    const url1 = "https://a7-satta.com/";
    const response = await axios.get(url1);
    const html = response.data;
    const $ = cheerio.load(html);
    const result = [];

    $('tbody tr').each((index, element) => {
      const $row = $(element);
      const name = $row.find('.gamenameeach').text().trim();
      const time = $row.find('.foryellow').text().trim();
      const yesterday = $row.find('.yesterday-number .special-bold').text().trim();
      const today = $row.find('.today-number').text().trim();
      result.push({
        name,
        time,
        yesterday,
        today,
      });
    });

    console.log(result[2]);
    console.log(result[3]);

    const sen = [result[2], result[3]];
    res.send(sen);
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred while fetching data from the second website.');
  }
});







app.get('/*', (req, res) => res.send("Page not found"));
app.listen(3000, () => console.log("Server on http://127.0.0.1:3000"));
