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
                    document.getElementById('results').appendChild(row);


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

            // let ownerName = "";

            // const {data1, error1} =  await supabase.from('People').select('Name').ilike('LicenseNumber', "%"+vehicleText1.value+"%");



            const {data, error} =  await supabase.from('Vehicles').select('VehicleID, Make, Model, Colour, People(Name, LicenseNumber)').ilike('VehicleID', "%"+vehicleText1.value+"%");
            
            if (data != ""){
                document.getElementById("message").innerHTML = ("Search successful");
                document.getElementById("results").innerHTML = ("");


                data.forEach((currItem) => {

                    // create div 
                    // add text to div
                    // add div to page
                    let row = document.createElement('div');
                    row.innerHTML = ("Vehicle ID: " + currItem.People.LicenseNumber + "<br>Vehicle Make: " + currItem.Make + "<br>Vehicle Model: " + currItem.Model + "<br>Vehicle Colour: " + currItem.Colour + "<br>Vehicle Owner Name: " + currItem.People.Name);
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

        if (regoText.value == "" || makeText.value == "" || modelText.value == "" || colourText.value == "" || ownerText.value == ""){
            document.getElementById("message").innerHTML = ("Error - there is missing information");

        }else{
            const {data, error} =  await supabase.from('People').select('PersonID, Name, Address, DOB, LicenseNumber').ilike('Name', "%"+ownerText.value+"%");           
            // if owner already exists...
            if (data != ""){
                document.getElementById("message").innerHTML = ("User found");
                document.getElementById("results").innerHTML = ("");

                let newOwnerID = 0;
                data.forEach((currItem) => {

                    newOwnerID = currItem.PersonID;

                });
                
                // if the name exists, get corresponding owner id in people data base
                // then put the id, along with the other vehicle information into the vehicle database
                const { error } = await supabase.from('Vehicles').insert({ VehicleID: regoText.value, Make: makeText.value, Model: modelText.value, Colour: colourText.value, OwnerID: newOwnerID});

                if (!error){
                    document.getElementById('message').innerHTML = ("<br>Vehicle added successfully");

                } else {
                    document.getElementById('message').innerHTML = ("Error");
                }



                // if owner does not currently exist..
            } else {
                document.getElementById("message").innerHTML = ("User does not exist<br> <br>Enter form to create new record: ")
                document.getElementById("results").innerHTML = ("");
                document.getElementById("newForm").innerHTML = ("");

                let formContainer = document.createElement('div');
                let form = document.createElement('form');

                let elem1 = document.createElement('input')
                elem1.type = 'text';
                elem1.id = 'personid';
                elem1.name = 'personid';
                elem1.placeholder = 'personid';

                let elem2 = document.createElement('input')
                elem2.type = 'text';
                elem2.id = 'name';
                elem2.name = 'name';
                elem2.placeholder = 'name';

                let elem3 = document.createElement('input')
                elem3.type = 'text';
                elem3.id = 'address';
                elem3.name = 'address';
                elem3.placeholder = 'address';

                let elem4 = document.createElement('input')
                elem4.type = 'text';
                elem4.id = 'dob';
                elem4.name = 'dob';
                elem4.placeholder = 'dob';

                let elem5 = document.createElement('input')
                elem5.type = 'text';
                elem5.id = 'license';
                elem5.name = 'license';
                elem5.placeholder = 'license';

                let elem6 = document.createElement('input')
                elem6.type = 'text';
                elem6.id = 'expire';
                elem6.name = 'expire';
                elem6.placeholder = 'expire';

                let newUserButton = document.createElement('button');
                newUserButton.type = 'button';
                newUserButton.id = 'newUserButton';

                newUserButton.innerHTML = ("Add owner");

                form.appendChild(elem1);
                form.appendChild(elem2);
                form.appendChild(elem3);
                form.appendChild(elem4);
                form.appendChild(elem5);
                form.appendChild(elem6);
                form.appendChild(newUserButton);

                formContainer.appendChild(form);
                document.getElementById('newForm').appendChild(formContainer);

                var addOwnerButton = document.getElementById("newUserButton");
                if (addOwnerButton){
                    addOwnerButton.addEventListener("click", async () => {

                        var newidText = document.getElementById("personid");
                        var newNameText = document.getElementById("name");
                        var newAddressText = document.getElementById("address");
                        var newDOBText = document.getElementById("dob");
                        var newLicenseText = document.getElementById("license");
                        var newExpiryText = document.getElementById("expire");


                        if (newidText.value == "" || newNameText.value == "" || newAddressText.value == "" || newDOBText.value == "" || newLicenseText.value == "" || newExpiryText.value == ""){
                            document.getElementById('results').innerHTML = ("<br>Error - there is missing information<br> You need to fill in the new user form before adding a vehicle.");

                        }else {                                

                            const { error } = await supabase.from('People').insert({ PersonID: parseInt(newidText.value), Name: newNameText.value, Address: newAddressText.value, DOB: newDOBText.value, LicenseNumber: newLicenseText.value, ExpiryDate: newExpiryText.value});

                            document.getElementById('results').innerHTML = ("<br> New user has been added successfully")
                            document.getElementById('message').innerHTML = ("");

                        }

                    });


                }

            }
        }
    });

}