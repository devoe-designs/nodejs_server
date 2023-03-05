import { table } from "console"
import http from "http"
import fetch from "node-fetch"
import { createDeflateRaw } from "zlib"

const server = http.createServer((req, res) => {
    const url = req.url
    let tableData =
      "<table border='1'><tr><th>name</th><th>height</th><th>birth_year</th><th>gender</th><th>url</th></tr>";
    if (url === "/") {
      res.write('<h1>Welcome to the home page</h1>');
      res.write('<img src="https://picsum.photos/200/300">');    
      res.end();

    }

    else if (url === "/list") {
      fetch("https://swapi.dev/api/people/?page=1")
        .then(res => res.json())
        .then(data => {
          createData(data.results)
          res.write(tableData)
          res.end ()
        })
    } else {
        res.write("Page Not Found.")
        res.end ()

    }

    function createData(data) {
      data.forEach(element => {
        tableData+=`<tr><td>${element.name}</td><td>${element.height}</td><td>${element.birth_year}</td><td>${element.gender}</td><td>${element.url}</td></tr>`
      });
      tableData+= `</table>`

    }

  }).listen(8090, console.log("Server listening on port 8090"));
