const rl = require("readline");
const events = require('events');

// Create an event emitter instance
const Myevent = new events();

// Array to store contacts objects
const contacts = [];

// Event listener for adding a contact
Myevent.on('add', (name, phone) => {
    // Store the contact data (name and phone) in the contacts object
    const contact = {name,phone};
    contacts.push(contact);

    console.log('Contact added successfully!');
});

// Event listener for finding a contact
Myevent.on('find',(searchName)=> {
    // Find the contact in the contacts object
    const foundContact = contacts.filter((contactFound) => contactFound.name===searchName);//contactFound is a parameter in callbac function
    if (foundContact.length===0) {
        console.log("contact not found !!");
        
    } else {
        console.log('Contact found.');
        console.log(foundContact);
        
    }
});

// Event listener for displaying all contact
Myevent.on('display', () => {
    // Display all contacts stored in the contacts object
    console.log('All contacts:');
    
    if (contacts.length==0) {
        console.log("list is empty");
    }else{
        console.log(contacts);
    }
});

// Initialize readline interface for taking user input
const interface = rl.createInterface({
    input: process.stdin,
    output: process.stdout
});


// Function to prompt user for input
function prompt(question) {
    return new Promise((resolve, reject) => {
        interface.question(question, (userInput) => {
            resolve(userInput);
        });
    });
}

// lit function to start the application
async function lit() {//lit qqs
    while (true) {
        console.log('Choose an operation:');
        console.log('1. Add a contact');
        console.log('2. Find a contact');
        console.log('3. Display all contacts');
        console.log('4. Exit');
        const choice = await prompt('Enter your choice: ');

        switch (choice) {
            case '1':
                const name = await prompt('Enter the name: ');
                const phone = await prompt('Enter the phone number: ');
                Myevent.emit('add', name, phone);
                break;
            case '2':
                const searchName = await prompt('Enter the name to search: ');
                Myevent.emit('find', searchName);
                break;
            case '3':
                Myevent.emit('display');
                break;
            case '4':
                interface.close(); // Close readline interface
                return; // Exit the application
               
            default:
                console.log('Invalid choice. Please try again.');
        }
    }
}

// Start the lit function
lit();