const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const supabaseUrl = 'https://nmlspwqddcgxocmskufw.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5tbHNwd3FkZGNneG9jbXNrdWZ3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI4MTQ2MTksImV4cCI6MjA2ODM5MDYxOX0.nyDhvgVJymRi11kKaPtKKdHUKF8C0QoVkkVLHK2i7WU';

const supabase = createClient(supabaseUrl, supabaseKey);

app.get('/', (req, res) => {
  res.send('Random Call Buddy API is running');
});

app.get('/contacts', async (req, res) => {
  const { data, error } = await supabase.from('contacts').select('*').order('created_at', { ascending: false });
  if (error) return res.status(500).json({ error });
  res.json(data);
});

app.post('/contacts', async (req, res) => {
  const { name, phone } = req.body;
  if (!name || !phone) return res.status(400).json({ error: 'Name and phone are required' });

  const { data, error } = await supabase.from('contacts').insert([{ name, phone }]);
  if (error) return res.status(500).json({ error });
  res.status(201).json(data[0]);
});

app.get('/contacts/random', async (req, res) => {
  const { data, error } = await supabase.from('contacts').select('*');
  if (error) return res.status(500).json({ error });
  if (!data || data.length === 0) return res.status(404).json({ error: 'No contacts found' });

  const random = data[Math.floor(Math.random() * data.length)];
  res.json(random);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
