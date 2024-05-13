// After install the supabase-js module
import {createClient} from
'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';
// // Create a single supabase client for interacting with your database
const supabase = createClient('https://hcoewqxfecydeqseabxl.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhjb2V3cXhmZWN5ZGVxc2VhYnhsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTI2NzQ1NTAsImV4cCI6MjAyODI1MDU1MH0.syQYXuGh4nRDW6h0Yp0FJdxQ5LuI0MTTrNnI0FblxYI');


//search for person information through name

var nameButton = document.getElementById("button1");
if (nameButton){
    nameButton.addEventListener("click", async () => {
        var nameText = document.getElementById("name");
        var vehicleText = document.getElementById("license");

        // check if both text boxes are full (not allowed)
        if (vehicleText.value != "" && nameText.value != ""){
            document.getElementById("message").innerHTML = ("Error - both text fields are full");
            document.getElementById("results").innerHTML = ("");


        }
        // check if both text boxes are empty (not allowed)
        else if (nameText.value == "" && vehicleText.value == ""){
            document.getElementById("message").innerHTML = ("Error - both text fields are empty");
            document.getElementById("results").innerHTML = ("");


        // if vehicle text has data then search...
        } else if (vehicleText.value != "" && nameText.value == ""){
            const {data, error} =  await supabase.from('Vehicles').select('VehicleID, Make, Model, Colour, OwnerID').ilike('VehicleID', "%"+vehicleText.value+"%");
            
            if (data != ""){
                document.getElementById("message").innerHTML = ("Search successful");
                document.getElementById("results").innerHTML = ("");

                data.forEach((currItem) => {

                    // create div 
                    // add text to div
                    // add div to page
                    let row = document.createElement('div');
                    row.innerHTML = ("Vehicle ID: " + currItem.VehicleID + "<br>Vehicle Make: " + currItem.Make + "<br>Vehicle Model: " + currItem.Model + "<br>Vehicle Colour: " + currItem.Colour + "<br>Vehicle Owner ID: " + currItem.OwnerID)
                    let row2 = document.createElement('div');
                    row2.innerHTML = ("<br>")
                    document.getElementById('results').appendChild(row);
                    document.getElementById('results').appendChild(row2);


                });
                        
                } else {
                    document.getElementById("message").innerHTML = ("No result found");
                    document.getElementById("results").innerHTML = ("");

            }
        
        // if name text has data then search...
        }else {
            const {data, error} =  await supabase.from('People').select('PersonID, Name, Address, DOB, LicenseNumber').ilike('Name', "%"+nameText.value+"%");
            
            if (data != ""){
                document.getElementById("message").innerHTML = ("Search successful");
                document.getElementById("results").innerHTML = ("");


                data.forEach((currItem) => {
                    // create div 
                    // add text to div
                    // add div to page
                    let row = document.createElement('div');
                    row.innerHTML = ("Person ID: " + currItem.PersonID + "<br>Name: " + currItem.Name + "<br>Address: " + currItem.Address + "<br>DOB: " + currItem.DOB + "<br>License Number: " + currItem.LicenseNumber)
                    let row2 = document.createElement('div');
                    row2.innerHTML = ("<br>")
                    document.getElementById('results').appendChild(row);
                    document.getElementById('results').appendChild(row2);


                });

            } else {
                document.getElementById("message").innerHTML = ("No result found");
                document.getElementById("results").innerHTML = ("");

            }


        }

    });

}



//search for vehicle information through license number

var vehicleButton = document.getElementById("vehicleButton");
if (vehicleButton){
    vehicleButton.addEventListener("click", async () => {
        var vehicleText1 = document.getElementById("rego");
        if (vehicleText1.value == ""){
            document.getElementById("message").innerHTML = ("Error - there is missing information");
            document.getElementById("results").innerHTML = ("");

            
        }else{
            const {data, error} =  await supabase.from('Vehicles').select('VehicleID, Make, Model, Colour, OwnerID').ilike('VehicleID', "%"+vehicleText1.value+"%");
            
            if (data != ""){
                document.getElementById("message").innerHTML = ("Search successful");
                document.getElementById("results").innerHTML = ("");

                data.forEach((currItem) => {

                    // create div 
                    // add text to div
                    // add div to page
                    let row = document.createElement('div');
                    row.innerHTML = ("Vehicle ID: " + currItem.VehicleID + "<br>Vehicle Make: " + currItem.Make + "<br>Vehicle Model: " + currItem.Model + "<br>Vehicle Colour: " + currItem.Colour + "<br>Vehicle Owner ID: " + currItem.OwnerID)
                    let row2 = document.createElement('div');
                    row2.innerHTML = ("<br>")
                    document.getElementById('results').appendChild(row);
                    document.getElementById('results').appendChild(row2);


                });
                        
                } else {
                    document.getElementById("message").innerHTML = ("No result found");
                    document.getElementById("results").innerHTML = ("");

            }
        }

    });

}

// NEW VEHICLE CODE

var NVButton = document.getElementById("NVButton");
if (NVButton){
    NVButton.addEventListener("click", async () => {

        var regoText = document.getElementById("rego");
        var makeText = document.getElementById("make");
        var modelText = document.getElementById("model");
        var colourText = document.getElementById("colour");
        var ownerText = document.getElementById("owner");

        if (regoText.value == "" || makeText == "" || modelText.value == "" || colourText == "" || ownerText.value == ""){
            document.getElementById("message").innerHTML = ("Error - there is missing information");

        }else{
            const {data, error} =  await supabase.from('People').select('Name').ilike('Name', "%"+ownerText.value+"%");
           
            // if owner already exists...
            if (data != ""){
                document.getElementById("results").innerHTML = ("User found: " + data);
        }
        }

    });

}




//                const {data1, error1} =  await supabase.insert('Vehicles').select('VehicleID, Make, Model, Colour, OwnerID').ilike('VehicleID', "%"+vehicleTextV.value+"%");






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