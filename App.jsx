import { useEffect, useState } from 'react';
import { getContacts, addContact, getRandomContact } from './api';

function App() {
  const [contacts, setContacts] = useState([]);
  const [form, setForm] = useState({ name: '', phone: '' });
  const [random, setRandom] = useState(null);

  useEffect(() => {
    loadContacts();
  }, []);

  async function loadContacts() {
    const data = await getContacts();
    setContacts(data);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const newContact = await addContact(form);
    setContacts((prev) => [newContact, ...prev]);
    setForm({ name: '', phone: '' });
  }

  async function handleRandom() {
    const data = await getRandomContact();
    setRandom(data);
  }

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-xl mb-4">Random Call Buddy</h1>

      <form onSubmit={handleSubmit} className="space-y-2 mb-6">
        <input
          type="text"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="w-full p-2 border"
          required
        />
        <input
          type="text"
          placeholder="Phone"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          className="w-full p-2 border"
          required
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2">Add Contact</button>
      </form>

      <div className="mb-6">
        <h2 className="mb-2 font-medium">Contact List</h2>
        <div className="grid gap-2">
          {contacts.map(c => (
            <div key={c.id} className="border p-2 rounded">
              {c.name} - {c.phone}
            </div>
          ))}
        </div>
      </div>

      <button onClick={handleRandom} className="bg-green-600 text-white px-4 py-2">
        Give Me a Random Contact
      </button>

      {random && (
        <div className="mt-4 p-4 border bg-yellow-100">
          <p>Call this friend:</p>
          <p className="text-lg">{random.name} - {random.phone}</p>
        </div>
      )}
    </div>
  );
}

export default App;
