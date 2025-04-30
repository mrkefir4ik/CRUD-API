
import process from 'process';
import 'dotenv/config'
import cluster from 'cluster';
import { server } from './server';
import { cpus } from 'os';


const PORT = process.env.PORT || 3000;

const numCPUs = cpus().length;

if (cluster.isPrimary) {

    console.log(`Primary cluster ${process.pid} is running`);


    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }

    cluster.on('exit', (worker, code, signal) => {

        console.log(`Cluster ${worker.process.pid} is closed with code ${code}`);

    });

} else {

    server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
    console.log(`Cluster ${process.pid} have started`);

}

process.on("exit", () => {
    for (let id in cluster.workers) {
        cluster.workers[id].kill();
    }
});