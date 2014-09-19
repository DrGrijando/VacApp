var isVaccineTabSelected = true;
var user;
var password;
var currentElementID;
var currentElementList;

/* FUNCTIONS FOR ADDING A NEW VACCINE OR PRESCRIPTION */

function addNewVaccine()
{
    var title= document.getElementById("new-vaccine-title").value;
    var date = document.getElementById("new-vaccine-date").value;
    if(title=="" || date=="")
    {
        alert("Enter all the information before saving the data.");
    }
    else
    {
        var newItem = document.createElement("div");
        var id=title.concat(date).replace(/-| /g,'');
        newItem.id = id;        
        newItem.className='vaccine-entry';    
        
        var info = document.createElement("div");
        info.innerHTML=title;
        info.className='vaccine-title';
        newItem.appendChild(info);	// Add the TextNode to the ListItem
        
        info = document.createElement("div");
        info.innerHTML=date;
        info.className='vaccine-date';
        newItem.appendChild(info);	// Add the TextNode to the ListItem
        
        newItem.onclick=viewDetailedVaccine;
        
        document.getElementById("vaccine-list").appendChild(newItem);	// Add the div to the specified List        
        
        // Store the new vaccine in the localStorage
        
        var vaccineToStore={"title":title,"date":date,"id":id,"type":"vaccine"}
        vaccines.push(vaccineToStore);
        
        var str="";
        for(var i=0;i<vaccines.length;i++)
        {
            if(i==(vaccines.length-1))
            {
                str=str+JSON.stringify(vaccines[i]);
            }            
            else
            {
                str=str+JSON.stringify(vaccines[i])+"+";
            }            
        }
        localStorage.setItem("vaccines",str);
                
        goBack();
    }    
}

function addNewPrescription()
{
    var title= document.getElementById("new-prescription-title").value;
    var date = document.getElementById("new-prescription-date").value;
    var finalDate = document.getElementById("new-prescription-final-date").value;
    var doseTakes=document.getElementById("new-prescription-dose-takes").value;
    var doseTakesMeasure=document.getElementById("new-prescription-dose-takes-measure").value;
    var doseFrequency=document.getElementById("new-prescription-dose-frequency").value;
    var doseFrequencyMeasure=document.getElementById("new-prescription-dose-frequency-measure").value;
    var text = document.getElementById("new-prescription-text").value;
    
    
    if(title=="" || date=="" || finalDate=="" || doseTakes=="" || doseTakesMeasure=="" ||doseFrequency==""||doseFrequencyMeasure=="" ||text=="")
    {
        alert("Enter all the information before saving the data.");
    }
    else
    {
        var newItem = document.createElement("div");
        var id=title.concat(date).replace(/-| /g,'');
        newItem.id = id;
        newItem.className='prescription-entry';
        
        var info = document.createElement("div");
        info.innerHTML=title;
        info.className='prescription-title';
        newItem.appendChild(info);	// Add the TextNode to the ListItem
        
        info = document.createElement("div");
        info.innerHTML=date;
        info.className='prescription-date';
        newItem.appendChild(info);	// Add the TextNode to the ListItem   
                
        info = document.createElement("div");
        info.innerHTML=text;
        info.className='prescription-text';
        newItem.appendChild(info);	// Add the TextNode to the ListItem   
        
        newItem.onclick=viewDetailedPrescription;
        
        document.getElementById("prescription-list").appendChild(newItem);	// Add the div to the specified List   
        
        // Store the new prescription in the localStorage
        
        var prescriptionToStore={"title":title,"date":date,"finalDate":finalDate,"doseTakes":doseTakes,
            "doseTakesMeasure":doseTakesMeasure,"doseFrequency":doseFrequency,
            "doseFrequencyMeasure":doseFrequencyMeasure,"text":text,"id":id,"type":"prescription"}
        prescriptions.push(prescriptionToStore);
        
        var str="";
        for(var j=0;j<prescriptions.length;j++)
        {
            if(j==(prescriptions.length-1))
            {
                str=str+JSON.stringify(prescriptions[j]);
            }
            else
            {
                str=str+JSON.stringify(prescriptions[j])+"+";
            }
        }
        localStorage.setItem("prescriptions",str);
        
        goBack();
    }
}

function addNewPHR()
{
    var title= document.getElementById("new-phr-title").value;
    var date = document.getElementById("new-phr-date").value;
    var text = document.getElementById("new-phr-text").value;
    if(title=="" || date=="" || text=="")
    {
        alert("Enter all the information before saving the data.");
    }
    else
    {
        var newItem = document.createElement("div");
        var id=title.concat(date).replace(/-| /g,'');
        newItem.id = id;
        newItem.className='phr-entry';    
        
        var info = document.createElement("div");
        info.innerHTML=title;
        info.className='phr-title';
        newItem.appendChild(info);	// Add the TextNode to the ListItem
        
        info = document.createElement("div");
        info.innerHTML=date;
        info.className='phr-date';
        newItem.appendChild(info);	// Add the TextNode to the ListItem
        
        info = document.createElement("div");
        info.innerHTML=text;
        info.className='phr-text';
        newItem.appendChild(info);	// Add the TextNode to the ListItem
        
        newItem.onclick=viewDetailedPHR;
        
        document.getElementById("record-list").appendChild(newItem);	// Add the div to the specified List        
        
        // Store the new PHR in the localStorage
        
        var phrToStore={"title":title,"date":date,"text":text,"id":id,"type":"phr"}
        record.push(phrToStore);
        
        var str="";        
        for (var k=0;k<record.length;k++)
        {
            if(k==(record.length-1))
            {
                str=str+JSON.stringify(record[k]);
            }
            else
            {
                str=str+JSON.stringify(record[k])+"+";
            }
        }
        localStorage.setItem("record",str);        
        
        goBack();
    }    
}

function login()
{
    user=localStorage.getItem("loginUser");
    password=localStorage.getItem("loginPassword");
    
    if((user==null)||(password==null))
    {
        user=document.getElementById("login-user-input").value;
        password=document.getElementById("login-password-input").value;
        
        if((user=="")&&(password==""))
        {
            document.getElementById("login-user-input").style.cssText="background-color:rgb(255,128,128) !important;-webkit-transition: background-color 500ms linear;";
            document.getElementById("login-password-input").style.cssText="background-color:rgb(255,128,128) !important;-webkit-transition: background-color 500ms linear;";
            document.getElementById("login-error-text").innerHTML="Information missing.";
            document.getElementById("login-error-text").style.cssText="text-align: center;color:rgb(88,220,145) !important;-webkit-transition: background-color 3000ms linear;";
        }
        else if(user=="")
        {
            document.getElementById("login-user-input").style.cssText="background-color:rgb(255,128,128) !important;-webkit-transition: background-color 500ms linear;";
            document.getElementById("login-error-text").innerHTML="Please, enter your user email before proceeding.";
            document.getElementById("login-error-text").style.cssText="text-align: center;color:rgb(88,220,145) !important;-webkit-transition: background-color 3000ms linear;";            
        }
        else if(password=="")
        {
            document.getElementById("login-password-input").style.cssText="background-color:rgb(255,128,128) !important;-webkit-transition: background-color 500ms linear;";
            document.getElementById("login-error-text").innerHTML="Please, enter your password before proceeding.";
            document.getElementById("login-error-text").style.cssText="text-align: center;color:rgb(88,220,145) !important;-webkit-transition: background-color 3000ms linear;";            
        }
        else
        {
            window.localStorage.setItem("loginUser",document.getElementById("login-user-input").value);
            window.localStorage.setItem("loginPassword",document.getElementById("login-password-input").value);    
            document.location.href="#tabstrip-vaccines";
        }
    }
    else
    {
        if((user==document.getElementById("login-user-input").value)&&(password==document.getElementById("login-password-input").value))
        {
            document.location.href="#tabstrip-vaccines";
        }
        else if((document.getElementById("login-user-input").value=="")&&(document.getElementById("login-password-input").value==""))
        {
            document.getElementById("login-user-input").style.cssText="background-color:rgb(255,128,128) !important;-webkit-transition: background-color 500ms linear;";
            document.getElementById("login-password-input").style.cssText="background-color:rgb(255,128,128) !important;-webkit-transition: background-color 500ms linear;";
            document.getElementById("login-error-text").innerHTML="Information missing.";
            document.getElementById("login-error-text").style.cssText="text-align: center;color:rgb(88,220,145) !important;-webkit-transition: background-color 3000ms linear;";
        }
        else if(document.getElementById("login-user-input").value=="")
        {
            document.getElementById("login-user-input").style.cssText="background-color:rgb(255,128,128) !important;-webkit-transition: background-color 500ms linear;";
            document.getElementById("login-error-text").innerHTML="Please, enter your user email before proceeding.";
            document.getElementById("login-error-text").style.cssText="text-align: center;color:rgb(88,220,145) !important;-webkit-transition: background-color 3000ms linear;";            
        }
        else if(document.getElementById("login-password-input").value=="")
        {
            document.getElementById("login-password-input").style.cssText="background-color:rgb(255,128,128) !important;-webkit-transition: background-color 500ms linear;";
            document.getElementById("login-error-text").innerHTML="Please, enter your password before proceeding.";
            document.getElementById("login-error-text").style.cssText="text-align: center;color:rgb(88,220,145) !important;-webkit-transition: background-color 3000ms linear;";            
        }
        else
        {
            document.getElementById("login-error-text").innerHTML="Wrong user name and/or password. Please, try again.";
            document.getElementById("login-error-text").style.cssText="text-align: center;color:rgb(88,220,145) !important;-webkit-transition: background-color 3000ms linear;";            
        }
    }
}

function loadData()
{
    user=localStorage.getItem("loginUser");
    password=localStorage.getItem("loginPassword");
    
    if((user!=null)&&(password!=null))
    {
        document.getElementById("login-user-input").value=user;
        document.getElementById("options-user-input").value=user;
        document.getElementById("login-password-input").value=password;
        document.getElementById("options-password-input").value=password;
    }
    var isChecked=(localStorage.getItem("settings")==="true");
    if(isChecked)
    {
        document.getElementById("confirm-deletions-checkbox").checked=true;
    }
    else
    { 
        document.getElementById("confirm-deletions-checkbox").checked=false;
    }    
}

function notificationsTest()
{
    window.plugin.notification.local.add({
        id: 1,
        title: "Cheer up, boys!",
        message: "Notifications are running!"
    });
}

function resetInputBackground()
{
    document.getElementById(window.event.srcElement.id).style.cssText="background-color:transparent !important;-webkit-transition: background-color 500ms linear;";
}

function defaultData()
{
    var obj = document.getElementById(window.event.srcElement.id);
    var date=new Date();
    
    if(obj.id=="add-vaccine-button")
    {
        document.getElementById("new-vaccine-title").value="";
        document.getElementById("new-vaccine-date").value=date.toISOString().split("T")[0];
    }
    else if(obj.id=="add-prescription-button")
    {
        document.getElementById("new-prescription-title").value="";
        document.getElementById("new-prescription-date").value=date.toISOString().split("T")[0];
        document.getElementById("new-prescription-final-date").value="";
        document.getElementById("new-prescription-text").value="";
        document.getElementById("new-prescription-dose-takes").value="";
        document.getElementById("new-prescription-dose-takes-measure").value="pill(s)";
        document.getElementById("new-prescription-dose-frequency").value="";
        document.getElementById("new-prescription-dose-frequency-measure").value="hour(s)";
    }
    else if(obj.id=="add-phr-button")
    {
        document.getElementById("new-phr-title").value="";
        document.getElementById("new-phr-date").value=date.toISOString().split("T")[0];
        document.getElementById("new-phr-text").value="";
    }
}

function deleteLoginInfo()
{
    localStorage.removeItem("loginUser");
    localStorage.removeItem("loginPassword");
    alert("User and password deleted.");
}

function viewDetailedVaccine()
{
    currentElementList=window.event.srcElement.parentElement.parentElement.id;
    var a;
    if(currentElementList=="vaccine-list"){a=vaccines;}
    else{a=record;}
    
    for(var i=0;i<a.length;i++)
    {
        //var v=JSON.parse(vaccines[i]);
                    
        if(a[i].id==window.event.srcElement.parentElement.id)
        {
            document.getElementById("detailed-vaccine-title").innerHTML=a[i].title;
            document.getElementById("detailed-vaccine-date").innerHTML=a[i].date;
            currentElementID=a[i].id;
            break;
        }
    }     
    document.location.href="#detailed-vaccine-view";    
}

function viewDetailedPrescription()
{
    currentElementList=window.event.srcElement.parentElement.parentElement.id;
    var a;
    if(currentElementList=="prescription-list"){a=prescriptions;}
    else
    {
        a=record;
    }
    
    for(var j=0;j<a.length;j++)
    {
        //var p=JSON.parse(prescriptions[j]);
        
        if(a[j].id==window.event.srcElement.parentElement.id)
        {
            document.getElementById("detailed-prescription-title").innerHTML=a[j].title;
            document.getElementById("detailed-prescription-date").innerHTML=a[j].date;
            document.getElementById("detailed-prescription-final-date").innerHTML=a[j].finalDate;
            document.getElementById("detailed-prescription-dose").innerHTML=a[j].doseTakes+" "
            +a[j].doseTakesMeasure+"/"+a[j].doseFrequency+" "+a[j].doseFrequencyMeasure;
            document.getElementById("detailed-prescription-text").innerHTML=a[j].text;
            currentElementID=a[j].id;
            
            break;
        }
    } 
    document.location.href="#detailed-prescription-view";
}

function viewDetailedPHR()
{
    currentElementList=window.event.srcElement.parentElement.parentElement.id;
    
    for(var k=0;k<record.length;k++)
    {
        //var p=JSON.parse(record[k]);
        
        if(record[k].id==window.event.srcElement.parentElement.id)
        {
            document.getElementById("detailed-phr-title").innerHTML=record[k].title;
            document.getElementById("detailed-phr-date").innerHTML=record[k].date;
            document.getElementById("detailed-phr-text").innerHTML=record[k].text;
            currentElementID=record[k].id;
            break;
        }
    } 
    document.location.href="#detailed-phr-view";
}

function deleteElement()
{
    var i=0;
    var isChecked=document.getElementById("confirm-deletions-checkbox").checked;
    if(isChecked)
    {
        if(confirm("Are you sure you want to delete this entry?"))
        {
            switch(currentElementList)
            {
                case "vaccine-list":                       
                while(i<vaccines.length)
                {
                    if(currentElementID==vaccines[i].id)
                    {
                        vaccines.splice(i,1);
                        break;
                    }
                    i++;
                }
                saveToLocalStorage(vaccines);
                updateVaccineList();
                break;
                
                case "prescription-list":
                while(i<prescriptions.length)
                {
                    if(currentElementID==prescriptions[i].id)
                    {
                        prescriptions.splice(i,1);
                        break;
                    }
                    i++;
                }
                saveToLocalStorage(prescriptions);
                updatePrescriptionList();
                break;
                
                case "record-list":
                while(i<record.length)
                {
                    if(currentElementID==record[i].id)
                    {
                        record.splice(i,1);
                        break;
                    }
                    i++;
                }       
                saveToLocalStorage(record);
                updateRecordList();
                break;
            }
            goBack();
        }
    }
    else
    {
        switch(currentElementList)
            {
                case "vaccine-list":                       
                while(i<vaccines.length)
                {
                    if(currentElementID==vaccines[i].id)
                    {
                        vaccines.splice(i,1);
                        break;
                    }
                    i++;
                }
                saveToLocalStorage(vaccines);
                updateVaccineList();
                break;
                
                case "prescription-list":
                while(i<prescriptions.length)
                {
                    if(currentElementID==prescriptions[i].id)
                    {
                        prescriptions.splice(i,1);
                        break;
                    }
                    i++;
                }
                saveToLocalStorage(prescriptions);
                updatePrescriptionList();
                break;
                
                case "record-list":
                while(i<record.length)
                {
                    if(currentElementID==record[i].id)
                    {
                        record.splice(i,1);
                        break;
                    }
                    i++;
                }       
                saveToLocalStorage(record);
                updateRecordList();
                break;
            }
            goBack();
    }    
}

function updateVaccineList()
{
    emptyList(document.getElementById("vaccine-list"));
    for(var i=0;i<vaccines.length;i++)
    {        
        var newItem = document.createElement("div");
        newItem.id = vaccines[i].id;
        newItem.className='vaccine-entry';    
        
        var info = document.createElement("div");
        info.innerHTML=vaccines[i].title
        info.className='vaccine-title';
        newItem.appendChild(info);  // Add the TextNode to the ListItem                      
        
        info = document.createElement("div");
        info.innerHTML=vaccines[i].date;
        info.className='vaccine-date';
        newItem.appendChild(info);  // Add the TextNode to the ListItem
        
        newItem.onclick=viewDetailedVaccine
        
        document.getElementById("vaccine-list").appendChild(newItem);   // Add the div to the specified List
    }
}

function updatePrescriptionList()
{
    emptyList(document.getElementById("prescription-list"));
    for(var j=0; j<prescriptions.length; j++)
    {
        var newItem = document.createElement("div");
        newItem.id = prescriptions[j].id;
        newItem.className='prescription-entry';
        
        var info = document.createElement("div");
        info.innerHTML=prescriptions[j].title;
        info.className='prescription-title';
        newItem.appendChild(info);  // Add the TextNode to the ListItem
        
        info = document.createElement("div");
        info.innerHTML=prescriptions[j].date;
        info.className='prescription-date';
        newItem.appendChild(info);  // Add the TextNode to the ListItem
        
        info = document.createElement("div");
        info.innerHTML=prescriptions[j].text;
        info.className='prescription-text';
        newItem.appendChild(info);  // Add the TextNode to the ListItem
        
        newItem.onclick=viewDetailedPrescription;
        
        document.getElementById("prescription-list").appendChild(newItem);  // Add the div to the specified List
    }
}

function updateRecordList()
{
    emptyList(document.getElementById("record-list"));
    for(var k=0;k<record.length;k++)
    {
        var newItem = document.createElement("div");
        var info;
        newItem.id = record[k].id;
        switch(record[k].type)
        {
                    case "vaccine":
                    newItem.className='vaccine-entry';
                    info = document.createElement("div");
                    info.innerHTML=record[k].title;
                    info.className='vaccine-title';
                    newItem.appendChild(info);  // Add the TextNode to the ListItem                      
                    
                    info = document.createElement("div");
                    info.innerHTML=record[k].date;
                    info.className='vaccine-date'
                    newItem.appendChild(info);  // Add the TextNode to the ListItem
                    
                    newItem.onclick=viewDetailedVaccine
                    
                    document.getElementById("record-list").appendChild(newItem);   // Add the div to the specified List
                    break;
                    
                    case "prescription":
                    newItem.className='prescription-entry';  
                    info = document.createElement("div");
                    info.innerHTML=record[k].title;
                    info.className='prescription-title';
                    newItem.appendChild(info);  // Add the TextNode to the ListItem
                    
                    info = document.createElement("div");
                    info.innerHTML=record[k].date;
                    info.className='prescription-date';
                    newItem.appendChild(info);  // Add the TextNode to the ListItem
                    
                    info = document.createElement("div");
                    info.innerHTML=record[k].text;
                    info.className='prescription-text';
                    newItem.appendChild(info);  // Add the TextNode to the ListItem
                    
                    newItem.onclick=viewDetailedPrescription;
                    
                    document.getElementById("record-list").appendChild(newItem);  // Add the div to the specified List
                    break;
                    
                    case "phr":
                    newItem.className='phr-entry';   
                    info = document.createElement("div");
                    info.innerHTML=record[k].title;
                    info.className='phr-title';
                    newItem.appendChild(info);  // Add the TextNode to the ListItem                      
                    
                    info = document.createElement("div");
                    info.innerHTML=record[k].date;
                    info.className='phr-date'
                    newItem.appendChild(info);  // Add the TextNode to the ListItem
                    
                    info = document.createElement("div");
                    info.innerHTML=record[k].text;
                    info.className='phr-text'
                    newItem.appendChild(info);  // Add the TextNode to the ListItem
                    
                    newItem.onclick=viewDetailedPHR
                    
                    document.getElementById("record-list").appendChild(newItem);    // Add the div to the specified List                    
                    break;     
        }
    }
}

function emptyList(list)
{
    var i=0;
    while(i<list.childNodes.length)
    {
        if(list.childNodes[i].tagName=="DIV")
        {
            list.removeChild(list.childNodes[i]);
        }
        else{i++;}
    }
}

function saveToLocalStorage(arrayToSave,targetList)
{
    // IF IT IS NOT SPECIFIED, THE KEY USED FOR THE LOCALSTORAGE WILL BE THE ONE RELATED TO THE
    // CURRENT LIST (IT SHOULD BE SPECIFIED WHEN USER IS MOVING AN ELEMENT TO THE RECORD TAB)
    if(typeof(targetList)==='undefined') targetList=currentElementList;
    
    var str="";
    for(var i=0;i<arrayToSave.length;i++)
    {
        if(i==(arrayToSave.length-1))
        {
            str=str+JSON.stringify(arrayToSave[i]);
        }
        else
        {
            str=str+JSON.stringify(arrayToSave[i])+"+";            
        }
    }
    
    switch(targetList)
    {
        case "vaccine-list":
            if(str!=""){localStorage.setItem("vaccines",str);}
            else{localStorage.removeItem("vaccines");}            
            break;
        
        case "prescription-list":
            if(str!=""){localStorage.setItem("prescriptions",str);}
            else{localStorage.removeItem("prescriptions");}            
            break;
        
        case "record-list":
            if(str!=""){localStorage.setItem("record",str);}
            else{localStorage.removeItem("record");}            
            break;
    }
}

function moveToRecord()
{
    var i=0;
    switch(currentElementList)
    {
        case "vaccine-list":            
            while(i<vaccines.length)
            {
                if(currentElementID==vaccines[i].id)
                {
                    record.push(vaccines[i]);                
                    vaccines.splice(i,1);
                    break;
                }
                i++;
            }
            saveToLocalStorage(vaccines);
            saveToLocalStorage(record,"record-list");
            updateVaccineList();
            updateRecordList();
            break;
        
        case "prescription-list":
            while(i<prescriptions.length)
            {
                if(currentElementID==prescriptions[i].id)
                {
                record.push(prescriptions[i]);
                    prescriptions.splice(i,1);
                    break;
                }
                i++;
            }
            saveToLocalStorage(prescriptions);
            saveToLocalStorage(record,"record-list");
            updatePrescriptionList();
            updateRecordList();            
            break;
    }
    goBack();
}

function test()
{
    /*
    var v1={"title":"caca","date":"2014-09-09"}
    localStorage.setItem("vaccines",JSON.stringify(v1));
    v1={"title":"pipi","date":"2015-11-25"}
    var str=localStorage.getItem("vaccines")+"+"+JSON.stringify(v1);
    localStorage.setItem("vaccines",str);
    var vector=localStorage.getItem("vaccines").split("+");
    */
}

function saveSettings()
{
    localStorage.setItem("loginUser",document.getElementById("options-user-input").value);
    localStorage.setItem("loginPassword",document.getElementById("options-password-input").value);
    localStorage.setItem("settings",document.getElementById("confirm-deletions-checkbox").checked);
    goBack();
}

function goBack()
{
    window.history.go(-1);
}
