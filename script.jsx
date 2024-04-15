// After install the supabase-js module
// import { createClient } from
//     'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';
// // Create a single supabase client for interacting with your database
// const supabase = createClient('https://hcoewqxfecydeqseabxl.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhjb2V3cXhmZWN5ZGVxc2VhYnhsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTI2NzQ1NTAsImV4cCI6MjAyODI1MDU1MH0.syQYXuGh4nRDW6h0Yp0FJdxQ5LuI0MTTrNnI0FblxYI') 



// search for person information through name
var PSButtonName = document.getElementById("PSButtonName");
PSbuttonName.addEventListener("click", async () => {
    console.log("Button was clicked!");
    var nameText = document.getElementById("searchName");
    if (search == null || search == ""){
        console.log("Error: Search box is empty")
    }else{
        const {data1, error1} = await supabase
        .from('People')
        .select('Index', 'Name', 'Address', 'DOB', 'LicenseNumber')
        .eq('Name', nameText);

    }

});



// search for person information through license number
var PSButtonVehicle = document.getElementById("PSButtonVehicle");
PSbuttonVehicle.addEventListener("click", async () => {
    console.log("Button was clicked!");
    var vehicleText = document.getElementById("searchVehicle2");
    if (vehicleText == ""){
        console.log("Error: Search box is empty")
    }else{
        const {data1, error1} = await supabase
        .from('People')
        .select('Index', 'Name', 'Address', 'DOB', 'LicenseNumber')
        .eq('LicenseNumber', vehicleText);

    }

});

// search for vehicle information through license number
var VSButton = document.getElementById("VSButton");
VSButton.addEventListener("click", async () => {
    console.log("Button was clicked!");
    var vehicleText2 = document.getElementById("searchVehicle");
    if (vehicleText2 == ""){
        console.log("Error: Search box is empty")
    }else{
        const {data1, error1} = await supabase
        .from('Vehicles')
        .select('VehicleID', 'Make', 'Model', 'Colour', 'OwnerID')
        .eq('LicenseNumber', vehicleText2);

    }

});

var NVButton = document.getElementByID("NVButton");
NVButton.addEventListener("click", async () => {
    console.log("Button was clicked!");
    var RegNum = document.getElementById("RegNum");
    var RegNum = document.getElementById("Make");
    var RegNum = document.getElementById("Model");
    var RegNum = document.getElementById("Colour");
    var RegNum = document.getElementById("Owner");
    if (RegNum == "" || Make == "" || Model == "" || Colour == "" || Owner == "") {
        document.getElementById("main").innerHTML("Error: Search box is empty")
    }else{
        const {data1, error1} = await supabase
        .from('Vehicles')
        .select('VehicleID', 'Make', 'Model', 'Colour', 'OwnerID')
        .eq('LicenseNumber', vehicleText2);

    }
});


// NEW VEHICLE CODE
const { error5 } = await supabase.from('')
.insert({ Name: '', Address: '', DOB: '', LicenseNumber: '', ExpiryDate: '' })






// example fetching data from table
// const { data, error } = await supabase
// .from('students')
// .select('student_id')
// .eq('username', 'grey07')

// example code
// // Fetch data from the table
// async function fetchData() {
//     const { data, error } = await supabase.from('your_table_name').select();
//     console.log('Fetched data:'
//     , data);
//     }
//     // Call the fetchData function to retrieve data
//     fetchData();

// Inserting data
// const { error } = await supabase.from('students')
// .insert({ first_name: 'Sarah', username: 'sarah05', ... })

// Updating data
//const { error } = await supabase.from('students')
//.update({ username: 'kai01' }).eq('student_id', 1000)

// Deleting data
// const { error } = await supabase.from('countries')
// .delete().eq('username','grey07')