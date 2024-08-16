import express from 'express';
import { MongoClient, ServerApiVersion } from 'mongodb';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config(); // .env dosyasını yükler
const app = express();
app.use(cors());

const uri =  process.env.VITE_Mongo_db_URL
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

app.get('/data', async (req, res) => {
  try {
    await client.connect();
    const database = client.db('Library');
    const collection = database.collection('LibraryPrlk');
    const users = await collection.find({}).toArray();
   // console.log('users:', users); // Veriyi doğru şekilde konsola yazdırıyoruz
    res.json(users); // Veriyi JSON formatında döndürüyoruz
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
   finally {
    await client.close();
  }
});

const PORT = process.env.PORT || 5000; // Port numarası burada belirlenir
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
