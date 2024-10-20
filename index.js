const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

let contacts = [];

app.post('/contacts', (req, res) => {
    const { name, email, phone } = req.body;
  
    if (!name || !email || !phone) {
        return res.status(400).json({ error: 'Name, email, and phone are required' });
    }

    const newContact = {
        id: contacts.length + 1, // Simple auto-incrementing ID
        name,
        email,
        phone
    };

    contacts.push(newContact); // Add new contact to the array
    res.status(201).json(newContact); // Return the new contact
});

// Get all contacts (GET /contacts)
app.get('/contacts', (req, res) => {
    res.json(contacts); // Return all contacts
});

// Get a contact by ID (GET /contacts/:id)
app.get('/contacts/:id', (req, res) => {
    const contactId = parseInt(req.params.id, 10);
    const contact = contacts.find(c => c.id === contactId); // Find contact by ID

    if (!contact) {
        return res.status(404).json({ error: 'Contact not found' });
    }

    res.json(contact); // Return the found contact
});

// Update a contact by ID (PUT /contacts/:id)
app.put('/contacts/:id', (req, res) => {
    const contactId = parseInt(req.params.id, 10);
    const contact = contacts.find(c => c.id === contactId); // Find contact by ID

    if (!contact) {
        return res.status(404).json({ error: 'Contact not found' });
    }

    const { name, email, phone } = req.body;

    // Update contact fields if provided in the request
    contact.name = name || contact.name;
    contact.email = email || contact.email;
    contact.phone = phone || contact.phone;

    res.json(contact); // Return the updated contact
});

// Delete a contact by ID (DELETE /contacts/:id)
app.delete('/contacts/:id', (req, res) => {
    const contactId = parseInt(req.params.id, 10);
    const index = contacts.findIndex(c => c.id === contactId); // Find contact by ID

    if (index === -1) {
        return res.status(404).json({ error: 'Contact not found' });
    }

    contacts.splice(index, 1); // Remove the contact from the array
    res.status(204).send(); // Send no content response (success)
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
