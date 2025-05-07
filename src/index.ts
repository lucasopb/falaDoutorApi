import 'express-async-errors'
import 'dotenv/config'; 
import cors from "cors"
import express from 'express';
import doctorRouter from './routes/doctorRouter';
import patientRouter from './routes/patientRoutes';
import healthInsuranceRouter from './routes/HealthInsuranceRouter'
import { AppDataSource } from './config/dataSource';
import { errorHandler } from './middlewares/errorHandlerMiddleware';

const app = express();

app.use(cors({
  origin: "http://localhost:3001",  
  credentials: true,  
}));

app.use(express.json());

app.use('/doctor', doctorRouter);
app.use('/patient', patientRouter);
app.use('/health-insurance', healthInsuranceRouter)

app.use(errorHandler);

AppDataSource.initialize()
  .then(() => {
    console.log("📦 Conexão com o banco de dados estabelecida com sucesso!")
  })
  .catch((error) => {
    console.error("❌ Erro ao conectar com o banco de dados:", error);
  });

const PORT = process.env.PORT || 3000;
app.listen(3000, "0.0.0.0", () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
