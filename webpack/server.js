const fs = require('fs');

const devServer = (dir, https) => {
    const projectConfig = JSON.parse(fs.readFileSync("./Project.json"));
    const staticFolder = projectConfig.frontendFolderName;
    return {
      static: `${dir}/${staticFolder}`,
      host: 'localhost',
      headers: {'Access-Control-Allow-Origin': '*'},
      port: 8080,
      https
    }
}


module.exports = devServer;