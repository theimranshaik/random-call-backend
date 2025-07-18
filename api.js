const API_BASE = 'https://random-call-backend.onrender.com';

export async function getContacts() {
  const res = await fetch(`${API_BASE}/contacts`);
  return res.json();
}

export async function addContact(contact) {
  const res = await fetch(`${API_BASE}/contacts`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(contact),
  });
  return res.json();
}

export async function getRandomContact() {
  const res = await fetch(`${API_BASE}/contacts/random`);
  return res.json();
}
