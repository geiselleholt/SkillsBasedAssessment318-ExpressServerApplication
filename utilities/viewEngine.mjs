import fs from "fs";

const templateViewEngine = (filePath, options, callback) => {
  fs.readFile(filePath, (err, content) => {
    if (err) return callback(err);
    const rendered = content
      .toString()
      .replaceAll("#title#", `${options.title}`)
      .replaceAll("#content#", `${options.content}`);
    return callback(null, rendered);
  });
};

export default templateViewEngine;
