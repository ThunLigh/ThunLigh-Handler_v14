const { ClusterManager } = require("discord-hybrid-sharding");
require("dotenv").config();
require("colors");

const manager = new ClusterManager("./src/index.js", {
    totalShards: "auto",
    shardsPerClusters: 1,
    totalClusters: "auto",
    mode: "process",
    token: process.env.TOKEN,
});

console.log(`Handler hecho por: ThunLigh `.red + `https://github.com/ThunLighDev`.blue)
manager.on("clusterCreate", (cluster) => console.log(`[Shard] Cluster ${cluster.id} iniciado`.magenta));
manager.spawn({ timeout: -1 });