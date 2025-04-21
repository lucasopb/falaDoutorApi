import 'dotenv/config'; 
import express from 'express';
import doctorRouter from './routes/doctorRouter';
import patientRouter from './routes/patientRoutes';
import { AppDataSource } from './config/dataSource';

const app = express();
app.use(express.json());

app.use('/doctor', doctorRouter);
app.use('/patient', patientRouter)

AppDataSource.initialize()
  .then(() => {
    console.log("📦 Conexão com o banco de dados estabelecida com sucesso!")
  })
  .catch((error) => {
    console.error("❌ Erro ao conectar com o banco de dados:", error);
  });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
