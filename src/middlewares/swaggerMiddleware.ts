import path from "path";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";

const getServers: any = () => {
  const urls = [process.env.PRODUCTION_URL, process.env.SANDBOX_URL];
  return urls
    .map((url, index) => {
      const description = index === 0 ? "Production Server" : "Sandbox Server";
      return { description, url };
    })
    .filter((sawaggerServer) => sawaggerServer.url !== undefined);
};

const setDocument = () => {
  const document = YAML.load(path.join(__dirname, "../openApi.yml"));
  document.servers = getServers();

  return document;
};

const swaggerConfig = setDocument();
const swaggerMiddleware = swaggerUi;

export { swaggerConfig };
export default swaggerMiddleware;
