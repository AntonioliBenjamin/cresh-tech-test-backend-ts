import 'reflect-metadata';
import "dotenv/config";
import { statusController } from './app/controllers/StatusController';
import { TransactionController } from './app/controllers/TransactionController';
import { CustomerController } from './app/controllers/CustomerController';
import { Kernel } from './app/config/Kernel';
import { createExpressServer, useContainer, useExpressServer } from 'routing-controllers';
import mongoose from 'mongoose';

const MONGODB_URL = process.env.MONGODB_URL
const PORT = process.env.PORT

const app = createExpressServer({
  controllers: [],
});

mongoose.set('strictQuery', false)
mongoose.connect(MONGODB_URL, (err) => {
    if (err) {
        throw err;
    }
    console.info("Connected to mongodb");
});

const container = new Kernel()

container.init()

useContainer(container)

useExpressServer(app, {
  controllers: [
    CustomerController,
    TransactionController,
    statusController
  ]
})

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
