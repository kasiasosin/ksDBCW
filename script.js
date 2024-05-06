// After install the supabase-js module
import {createClient} from
'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';
// // Create a single supabase client for interacting with your database
const supabase = createClient('https://hcoewqxfecydeqseabxl.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhjb2V3cXhmZWN5ZGVxc2VhYnhsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTI2NzQ1NTAsImV4cCI6MjAyODI1MDU1MH0.syQYXuGh4nRDW6h0Yp0FJdxQ5LuI0MTTrNnI0FblxYI');


//search for person information through name

var nameButton = document.getElementById("nameButton");
if (nameButton){
    nameButton.addEventListener("click", async () => {
        console.log("Button was clicked!");
        var nameText = document.getElementById("searchName");
        console.log("The text: " + nameText.value);
        if (nameText.value == null || nameText.value == ""){
            console.log("Error: Search box is empty");
        }else{
            const {data, error} =  await supabase.from('People').select('PersonID, Name, Address, DOB, LicenseNumber').ilike('Name', "%"+nameText.value+"%");
            console.log("The data: ", data);

            // document.getElementById("maincontent").innerHTML = ("The data: ", data);

            // var dataValue = async() => data.value;

            // if (data.value == null || data.value == "") {
            //     console.log("Error - no results returned");
            // }
        }

    });

}


// search for person information through name
// var nameButton = document.getElementById("nameButton");
// if (nameButton){
//     nameButton.addEventListener("click", async () => {
//         console.log("Button was clicked!");
//         var nameText = document.getElementById("searchName");
//         if (nameText == null || nameText == ""){
//             console.log("Error: Search box is empty");
//         }else{
//             const {data, error} =  await supabase.from('People').select('Index', 'Name', 'Address', 'DOB', 'LicenseNumber').eq('Name', nameText);
//             console.log("The data: " + data);
//         }

//     });

// }



// search for person information through license number

var vehicleButton = document.getElementById("vehicleButton");
if (vehicleButton){
    vehicleButton.addEventListener("click", async () => {
        console.log("Button was clicked!");
        var vehicleText = document.getElementById("searchVehicle");
        console.log("The text: " + vehicleText.value);
        if (vehicleText.value == null || vehicleText.value == ""){
            console.log("Error: Search box is empty");
        }else{
            const {data, error} =  await supabase.from('People').select('PersonID, Name, Address, DOB, LicenseNumber').ilike('LicenseNumber', "%"+vehicleText.value+"%");
            console.log("The data: ", data);
            // if (data.value == null || data.value == "") {
            //     console.log("Error - no results returned");
            // }
        }

    });

}

//search for vehicle information through license number

var vehicleButtonV = document.getElementById("vehicleButtonV");
if (vehicleButtonV){
    vehicleButtonV.addEventListener("click", async () => {
        console.log("Button was clicked!");
        var vehicleTextV = document.getElementById("searchVehicleV");
        console.log("The text: " + vehicleTextV.value);
        if (vehicleTextV.value == null || vehicleTextV.value == ""){
            console.log("Error: Search box is empty");
        }else{
            const {data, error} =  await supabase.from('Vehicles').select('VehicleID, Make, Model, Colour, OwnerID').ilike('VehicleID', "%"+vehicleTextV.value+"%");
            console.log("The data: ", data);
            // if (data.value == null || data.value == "") {
            //     console.log("Error - no results returned");
            // }
        }

    });

}

// NEW VEHICLE CODE

var NVButton = document.getElementById("NVButton");
if (NVButton){
    NVButton.addEventListener("click", async () => {
        console.log("Button was clicked!");

        var NVTextReg = document.getElementById("RegNum");
        var NVTextMake = document.getElementById("Make");
        var NVTextModel = document.getElementById("Model");
        var NVTextColour = document.getElementById("Colour");
        var NVTextOwner = document.getElementById("Owner");

        if (NVTextReg.value == null || NVTextReg.value == "" || NVTextMake.value == null || NVTextMake.value == "" || NVTextModel.value == null || NVTextModel.value == "" || NVTextColour.value == null || NVTextColour.value == "" || NVTextOwner.value == null || NVTextMake.value == ""){
            console.log("Error: There is missing information");
        }else{
            const {data, error} =  await supabase.insert('Vehicles').select('VehicleID, Make, Model, Colour, OwnerID').ilike('VehicleID', "%"+vehicleTextV.value+"%");
            console.log("The data: ", data);
        }

    });

}










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