import 'express-async-errors'
import 'dotenv/config'; 
import cors from "cors"
import express from 'express';
import doctorRouter from './routes/doctorRouter';
import doctorHealthInsuranceRouter from './routes/doctorHealthInsuranceRouter'
import patientRouter from './routes/patientRouter';
import healthInsuranceRouter from './routes/HealthInsuranceRouter'
import { AppDataSource } from './config/dataSource';
import { errorHandler } from './middlewares/errorHandlerMiddleware';
import reportRouter from './routes/reportRouter'
import importRouter from "./routes/importsRouter";
import appointmentRouter from "./routes/appointmentsRouter"


const app = express();

const allowedOrigins = [
  "http://localhost:3001", // Para ambiente local
  "https://faladoutorfront.onrender.com", // ✅ Frontend em produção
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
}));

app.use(express.json());

app.use('/doctor', doctorRouter);
app.use('/patient', patientRouter);
app.use('/health-insurance', healthInsuranceRouter)
app.use('/report', reportRouter)
app.use('/doctor-health-insurance', doctorHealthInsuranceRouter)
app.use('/appointment', appointmentRouter)
app.use(importRouter);


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
