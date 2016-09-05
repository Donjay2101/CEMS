﻿    var count = 0;
var count1 = 0;

var weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];


// -----------------------------------------------------------------------Schedule Calculation--------------------------------------------------------//


Date.daysBetween = function (date1, date2) {
    //Get 1 day in milliseconds
    var one_day = 1000 * 60 * 60 * 24;

    // Convert both dates to milliseconds
    var date1_ms = new Date(date1).getTime();
    var date2_ms = new Date(date2).getTime();

    // Calculate the difference in milliseconds
    var difference_ms = date2_ms - date1_ms;

    // Convert back to days and return
    var diff = Math.round(difference_ms / one_day);
    return (diff + 1);
}


$(document).on('change', '#S_startDate', function () {


    //date  will give the time as well
    var curDate = new Date();
    

    //convert in string 
    curDate = formatDate(curDate);
    
    //convert back to date to compare
    curDate = new Date(curDate);
   // alert(curDate);
    var startDate=$('#S_startDate').val();
    $('#S_startDate').val(startDate);
    var startDate = formatDate(startDate);

    startDate = new Date(startDate);

   
    var newdate = new Date();
    newdate = formatDate(newdate);
    if (startDate < curDate)
    {
        $('#S_startDate').val(newdate);
        alert('Start Date Should be greated than current Date');        
    }
   
    



})

function check(data)
{
    if(data==undefined || data=="")
    {
        return true;
    }
    else{
        return false;
    }
}

function convertUTCDateToLocalDate(date) {
    var newDate = new Date(date.getTime() + date.getTimezoneOffset() * 60 * 1000);

    var offset = date.getTimezoneOffset() / 60;
    var hours = date.getHours();

    newDate.setHours(hours - offset);

    return newDate;
}
function formatDate(date) {
    var strDate = date.toString();   
    if (strDate.indexOf('-') > 0)
    {
        if (strDate.indexOf('GMT')>0)
        {
            var d = new Date(date);
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
        }
        else {
            var d = new Date(date);
           // alert(d);
            d=convertUTCDateToLocalDate(d);
            month = '' + (d.getMonth() + 1),
           day = '' + d.getDate(),
           year = d.getFullYear();
        }
    }
    else
    {
       // alert('in Date' + strDate);
        var d = new Date(date);
        month = '' + (d.getMonth() + 1),
       day = '' + d.getDate(),
       year = d.getFullYear();
    }         
    if (month.length < 2) month = month;
    if (day.length < 2) day = day;

    return [month, day, year].join('/');
}

function convertDate(date)
{
    var d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + (d.getDate()),
    year = d.getFullYear();
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    return [year, month, day].join('-');
}

function AddTask(index,option)
{
    count = 1;
 

    var taskID = $('#TaskName').val()
    var taskname = $('#TaskName option:selected').html();
    if (taskname == 'select--')
    {
        alert('Select any task');
        return;
    }

    var S_StartDate = $('#S_startDate').val();
    var s_EndDate = $('#S_endDate').val();


    if (check(S_StartDate))
    {
        alert('start date not given');
        return;
    }

    if (check(s_EndDate))
    {
        alert('end date is not given');
        return;
    }


    var startDate = $('#StDate').val();
    var endDate = $('#EDate').val();

    var conStart = new Date(startDate);
    var conSstart = new Date(S_StartDate);
    var conend = new Date(endDate);
    if (option == 1)
    {
        if (!check(endDate) && conend< conSstart) {
            alert('end date should be greater than Schedule start date');
            return;
        }
    }

    
    if (!check(startDate ) && conStart < conStart)
    {
        alert('start date should be greater than Schedule start date');
        return;
    }

   
    
    var days = $('#Days').val();
    var difference=0;
    S_StartDate = formatDate(S_StartDate);
    s_EndDate = formatDate(s_EndDate);
    var PersonName;
    if ($('#Presons') != null)
    {
        Personstring = $('#Person').html();
        PersonName = $('#Persons').val();
        PersonN = $('#Persons option:selected').html();
        sessionStorage.setItem('Person', Personstring);
        if(PersonN=='select--')
        {
            alert('select any one person');
            return;
        }
    }
        
    
    var arr = saveTask();
   // console.log(arr);

    if (S_StartDate != '' && S_StartDate != 'Invalid Date' && S_StartDate != undefined && s_EndDate != '' && s_EndDate != 'Invalid Date' && s_EndDate != undefined)
    {    
          
        if (days != null && days != undefined && days!='')
        {

            //if (days == 1)
            //{
            //    days = 0;
            //}
                if(index==1)
                {
                    if (S_StartDate == '' || S_StartDate == undefined || S_StartDate == 'Invalid Date' || s_EndDate == '' || s_EndDate == undefined || s_EndDate=='Invalid Date')
                    {
                        alert('Start Date and End Date is mendatory');
                        return;
                    }
                    else
                    {
                   //     alert('End Date Days' + days);
                        startDate = S_StartDate;                       
                        tempstartDate = new Date(S_StartDate);
                     //   alert('temp start date :' + tempstartDate);

                        var TEndDate = new Date(tempstartDate.AddDays(days-1));
                       // alert('TEndDAte: ' + TEndDate);
                        endDate = formatDate(TEndDate);
                       // alert('End Date' + endDate);
                    }
                }
                else
                {
                    //if (option == 1)
                    //{
                    //    alert('end date cnnot be greater than Schedule end date.');
                    //    return;
                    //}
                    if (days == null || days == undefined || days == '') {
                        alert('enter no of Days or start Date or endDate');
                    }
                    else {
                        if (option == 1)
                        {
                            var startDate = $('#TaskTable tr').eq(index - 1).find('td').eq(3).find('label').html();
                        }
                        else
                        {
                            var startDate = $('#TaskTable tr').eq(index - 1).find('td').eq(2).find('label').html();
                        }
                        
                        startDate = new Date(startDate);
                        var TstartDate = new Date(startDate.AddDays(1));
                        startDate = formatDate(TstartDate);
                        //  alert(days);
                        var TEndDate = new Date(TstartDate.AddDays(days - 1));
                        /// alert(TEndDate);

                        endDate = formatDate(TEndDate);
                    }

                }
              
        }


      //  alert('s_EndDate  ' + s_EndDate);

        var edate = new Date(s_EndDate);
        end_date = new Date(endDate);
       // alert(end_date);
       
     //   alert('check in greate ' + edate);
       // alert('check in greate main ' + end_date);
        if (end_date > edate) {
            if (option == 1)
            {
                alert('end date cnnot be greater than Schedule end date.');
                return;
            }
            
            //if (option == 1)
            //{
            //    alert('end date cannot be greater than schedule date');
            //    return;
            //}
            if (confirm('Date is greater then end date do want to continue')) {
                end_date = formatDate(end_date);
                //   alert(end_date);
                $('#S_endDate').val(end_date);
            }
            else {
                return;
            }
        }
      
            if (days == null || days == undefined || days=='')
            {
                //alert('endDate  1' + endDate)
                days = Date.daysBetween(startDate, endDate);
               // alert("Days count "+days)
              //  alert('f '+days);
            }
            else
            {
             //   var startDate;
            }


            dropdownstring=$('#dropdown').html();
           
            
            
          
            if ((taskname != '') && (taskname != undefined))
            {
              //  alert(isNaN(days));

                if ((!isNaN(days)) || days>=0)
                {
                    if (days < 0)
                    {
                        alert('End Date should be greater then start Date');
                    }
                    else
                    {

                        if (days == 0)
                        {
                            days = 1;
                        }
                       
                        $('.edittr').remove();
                        var idx = $('.edittr').index();
                        endate = formatDate(endDate);
                      //  alert('final end Date' + endate);
                        stdate = formatDate(startDate);
                        //alert('final start Date' + stdate);
             
                        var htmlString = "<tr class='text-center'><td> <label class='wrap-content grey' value='"+taskID+"'>" + taskname + "</label></td>"

                        if (option == 1)
                        {
                            htmlString += "<td> <label class='wrap-content grey' value='" + PersonName + "'>" + PersonN + "</label></td>"
                        }

                        htmlString+="<td><label class='wrap-content grey'>" + stdate + "</label></td><td><label class='wrap-content grey'>" + endate + "</label></td><td><label class='wrap-content grey'>" + days + "</label>"//</td><td><input type='button' class='edit' value='Edit' style='width:60px;font-size: 13px;'  /></td></tr><tr class='edittr'>"

                        if (option == 1)
                        {
                            htmlString += "</td><td><input type='button' class='Sedit' value='Edit' style='width:60px;font-size: 13px;'  /></td></tr><tr class='edittr'>"
                        }
                        else
                        {
                            htmlString += "</td><td><input type='button' class='edit' value='Edit' style='width:60px;font-size: 13px;'  /></td></tr><tr class='edittr'>"
                        }
                        
                        htmlString += "<td ><div id='dropdown' class='wrap-content'>" + dropdownstring + "</div></td>"
                        if (option == 1)
                        {
                            htmlString += "<td ><div id='Person' class='wrap-content'><select id='Persons'></select></div></td>"
                        }
                                       htmlString+= "<td ><input type='text' name='StDate' id='StDate' class='Cdate wrap-content'/></td>"
                                        + "<td ><input type='text'  name='EDate' id='EDate' class='Cdate wrap-content'/></td>"
                                        + "<td ><input type='number' name='Days' id='Days' value='' class='wrap-content'/></td>"
                        if (option == 1)
                        {
                            htmlString+="<td style='text-align:center'><input type='button' name='tskbtn' class='STbtn' value='Add'  id='Stskbtn' class='wrap-content' style='width:60px;font-size: 13px;'/></td></tr>";
                        }
                        else
                        {
                            htmlString += "<td style='text-align:center'><input type='button' name='tskbtn' class='Tbtn' value='Add'  id='tskbtn' class='wrap-content' style='width:60px;font-size: 13px;'/></td></tr>";
                        }

                        $("#TaskTable").append(htmlString);
                        $('#edittr').remove();
                        sessionStorage.setItem('dropdown', dropdownstring);
                        sessionStorage.setItem('StartDate', $('#S_startDate').val());
                        sessionStorage.setItem('EndDate', $('#S_endDate').val());
                        sessionStorage.setItem('selectedID', taskID);
                        
                        jsonArray=JSON.stringify(arr);
                        sessionStorage.setItem('taskArray', jsonArray);

                        var string = $('#Datacontainer').html();
                        sessionStorage.setItem('data', string);
                        
                    }          
                }
                else
                {
                    alert('Days should be in numbers ');
                    $("#Days").focus();
                }
    
            }
    }  
}


function EditTask(index,option)
{
    //debugger;
    if (isEditOpen) {
        alert('row is in editable mode. cancel to change the edit mode');
        return;
    }
    if (option == 1)
    {
        var TaskName = $('#TaskTable tr').eq(index).find('td').eq(0).find('label').attr('value');
        var PersonName = $('#TaskTable tr').eq(index).find('td').eq(1).find('label').attr('value');
        var startDate = $('#TaskTable tr').eq(index).find('td').eq(2).find('label').html();
        var endDate = $('#TaskTable tr').eq(index).find('td').eq(3).find('label').html();
        var days = $('#TaskTable tr').eq(index).find('td').eq(4).find('label').html();
        dropdownstring = sessionStorage.getItem('dropdown').toString();
    }
    else
    {
        var TaskName = $('#TaskTable tr').eq(index).find('td').eq(0).find('label').attr('value');
        var startDate = $('#TaskTable tr').eq(index).find('td').eq(1).find('label').html();
        var endDate = $('#TaskTable tr').eq(index).find('td').eq(2).find('label').html();
        var days = $('#TaskTable tr').eq(index).find('td').eq(3).find('label').html();
    }
   
    dropdownstring = sessionStorage.getItem('dropdown').toString();

    sessionStorage.setItem('currentTr', $('#TaskTable tr').eq(index).html());

    var selectedID = sessionStorage.getItem('selectedID');
    var taskstring = dropdownstring.toString();
    isEditOpen = true;

    var startDatestr = "<input type='text' name='StDate' value='" + startDate + "' id='uSDate' class='Cdate wrap-content'/>";
    var endDatestr = "<input type='text'  name='EDate' value='" + endDate + "' id='uEDate' class='Cdate wrap-content'/>";
    var dayString = "<input type='number' name='Days' value='" + days + "' id='uDays' value='' class='wrap-content'/>";
    if (option == 1)
    {
        dropdownstring1 = sessionStorage.getItem('Person').toString();
        taskstring1 = "<select id='Persons'></select>";
        var btnString = "<a href='#'  id='Supdatebtn'>Update</a><span class='mrgn'>|</span> <a href='#' id='cancelBtn'>cancel</a>";
       // var days = $('#TaskTable tr').eq(index).find('td').eq(2).html(btnString);
        $('#TaskTable tr').eq(index).find('td').eq(0).html(taskstring);
        $('#TaskTable tr').eq(index).find('td').eq(1).html(taskstring1);
        $('#TaskTable tr').eq(index).find('td').eq(2).html(startDatestr);
        $('#TaskTable tr').eq(index).find('td').eq(3).html(endDatestr);        
        $('#TaskTable tr').eq(index).find('td').eq(4).html(dayString);
        $('#TaskTable tr').eq(index).find('td').eq(5).html(btnString);
        $('#TaskTable tr').eq(index).find('td').eq(5).css('width', '100px');
        $('#TaskTable tr').eq(index).find('td').eq(5).css('text-align', 'center');
        $('#TaskName').val(TaskName);
        //$('#Persons').val(PersonName);
    }
    else
    {
        var btnString = "<a href='#'  id='updatebtn'>Update</a><span class='mrgn'>|</span> <a href='#' id='cancelBtn'>cancel</a>";
        var days = $('#TaskTable tr').eq(index).find('td').eq(2).html(btnString);
        $('#TaskTable tr').eq(index).find('td').eq(0).html(taskstring);
        $('#TaskTable tr').eq(index).find('td').eq(1).html(startDatestr);
        $('#TaskTable tr').eq(index).find('td').eq(2).html(endDatestr);
        $('#TaskTable tr').eq(index).find('td').eq(3).html(dayString);
        $('#TaskTable tr').eq(index).find('td').eq(4).html(btnString);
        $('#TaskTable tr').eq(index).find('td').eq(4).css('width', '100px');
        $('#TaskTable tr').eq(index).find('td').eq(4).css('text-align', 'center');
        $('#TaskTable').find('tr').eq(index).find('td').eq(0).find('#TaskName option[value=\''+TaskName+'\'] ').attr('selected','selected');//  $('').val(TaskName);
    }
   
    //var days = $('#TaskTable tr').eq(index).find('td').eq(2).html(btnString);
    //$('#TaskTable tr').eq(index).find('td').eq(0).html(taskstring);
    //$('#TaskTable tr').eq(index).find('td').eq(1).html(startDatestr);
    //$('#TaskTable tr').eq(index).find('td').eq(2).html(endDatestr);
    //$('#TaskTable tr').eq(index).find('td').eq(3).html(dayString);
    //$('#TaskTable tr').eq(index).find('td').eq(4).html(btnString);
    //$('#TaskTable tr').eq(index).find('td').eq(4).css('width', '100px');
    //$('#TaskTable tr').eq(index).find('td').eq(4).css('text-align', 'center');
    //$('#TaskName option:selected').html(TaskName);
}

function saveTask()
{
    ////debugger;
    //dropdownstring = $('#TaskName').html();
    length = $('#TaskName >option').length;

    var arr = new Array();

    for(i=1;i<length;i++)
    {
        name = $('#TaskName >option').eq(i).html();
        ID = $('#TaskName >option').eq(i).val();
        //alert(data);
        arr[name] = ID;
    }
    arr['OFF'] ='0';
    return arr;
}

$(document).on('click', '.Tbtn', function () {
    //var index = $(this).closest('tr').index();
    var index = $(this).closest('tr').index();
  //  alert('ad' + index);
    //console.log('ad' + index);
   AddTask(index);
});

$(document).on('change', '#uSDate', function () {

 
    var index = $(this).closest('tr').index();

    var starDate = $('#uSDate').val();

    startDate = new Date(startDate);
    var endDate = $('#uEDate').val();
    endDate = new Date(endDate);

    var diff = Date.daysBetween(starDate, endDate);
    $('#uDays').val(diff);

 




})




$(document).on('change', '#TaskName', function () {
    

    var task = $('#TaskName option:selected').html();
    
    var index = $(this).closest('tr').index();
    var c=0;
    $('#TaskTable tr').each(function (idx, el) {

        if (idx != index && idx != 0) {

            var prevTask = $('#TaskTable tr').eq(idx).find('td').eq(0).html();
            if(task==prevTask)
            {
                if (confirm('Task is selected previously select any other task'))
                {
                   
                }
                else
                {
                    $(this).focus();
                }
                // c = 1;
                
               //break;
            }
        }


    });
})

//-------------------------for update the date part------------------------///
$(document).on('change', '#uEDate', function () {

    // //debugger;

    var index = $(this).closest('tr').index();

    var starDate = $('#uSDate').val();

    starDate = new Date(starDate);
    var endDate = $('#uEDate').val();
    endDate = new Date(endDate);

    var diff = Date.daysBetween(starDate, endDate);
    $('#uDays').val(diff);

    //alert('index:' + $('#uEDate').val());

    //var date = $(this).val();
    //var tempDate = formatDate(date);
    //// alert('tempDate'+tempDate);
    //var C_tempDate = new Date(tempDate);
    //// alert('C_tempDate' + C_tempDate);

    //var Edate = $('#S_endDate').val();
    //var tempEdate = formatDate(Edate);

    //var C_EtempDate = new Date(tempEdate);
    //if (C_tempDate > C_EtempDate) {
    //    if (confirm('Date is greater then end date it will increase the end date. do you want to continue?')) {
    //        C_tempDate = convertDate(C_tempDate);
    //        $('#S_endDate').val(C_tempDate);
    //    }
    //}






})

$(document).on('change', '#uDays', function () {
    
 
    var startDate = $('#uSDate').val();

    startDate = new Date(formatDate(startDate));
    days=$(this).val();
    startDate.AddDays(days);
    $('#uEDate').val(formatDate(startDate));
    //endDate = new Date(endDate);


})

function updateTask(index,option)
{
    //debugger;
    var mainendDate = $('#S_endDate').val();
    mainendDate = new Date(mainendDate);

    var startDate = $('#uSDate').val();
    startDate = new Date(startDate);

    var endDate = $('#uEDate').val();
    endDate = new Date(endDate);

    if (startDate >endDate)
    {
        alert('end Date should greater than start date');
        return;
    }
  
    if (option == 1)
    {
      
        var Person = $('#Persons option:selected').html();
        //var personarr = getPersonsArray();
        var PersonID =$('#Persons').val();
    }
    var tName = $('#TaskTable ').find('tr').eq(index).find('td').eq(0).find('#TaskName option:selected').html();
    var tID = $('#TaskName').val();
    days = $('#uDays').val();
    var string = $('#Datacontainer').html();
    var count = 0;
    dropdownstring = $('#dropdown').html();
    for (i = 0; i < $('#TaskTable tr').length ; i++) {
        if (i != index && i != 0) {
           // var TaskName = $('#TaskName option:selected').html();
            
            var oStartDate = $('#TaskTable tr').eq(i).find('td').eq(2).find('label').html();
            var oendDate = $('#TaskTable tr').eq(i).find('td').eq(3).find('label').html();
            
            oStartDate = new Date(oStartDate);
            oendDate = new Date(oendDate);
            var task = $('#TaskTable tr').eq(i).find('td').eq(0).find('label').html();
            if ((startDate >= oStartDate && startDate <= oendDate) || (endDate >= oStartDate && endDate <= oendDate)) {
                if (confirm('dates are occupied with task: ' + task + 'do you want to continue')) {
                    if (option == 1)
                    {
                        var htmlString = "<td> <label class='wrap-content grey' value='" + tID + "'>" + tName + "</label></td><td> <label class='wrap-content grey' value='" + PersonID + "'>" + Person + "</label></td><td><label class='wrap-content grey'>" + formatDate(startDate) + "</label></td><td><label class='wrap-content grey'>" + formatDate(endDate) + "</label></td><td><label class='wrap-content grey'>" + days + "</label></td><td><input type='button' class='Sedit' value='Edit' style='width:60px;font-size: 13px;'  /></td>";
                    }
                    else
                    {
                        var htmlString = "<td> <label class='wrap-content grey' value='" + tID + "'>" + tName + "</label></td><td><label class='wrap-content grey'>" + formatDate(startDate) + "</label></td><td><label class='wrap-content grey'>" + formatDate(endDate) + "</label></td><td><label class='wrap-content grey'>" + days + "</label></td><td><input type='button' class='edit' value='Edit' style='width:60px;font-size: 13px;'  /></td>";
                    }
                    
                    $('#TaskTable tr').eq(index).html(htmlString);
                    
                    sessionStorage.setItem('data', string);
                    isEditOpen = false;
                    count = 1;
                    break;
                }


            }

        }
    }
    if (count == 0) {
        if (endDate > mainendDate) {
            if (option == 1)
            {
                alert('end date cannot be greater than schedule end date');
                return;
            }
            if (confirm('given end date is greater than schedule end date do you want to continue')) {
                var htmlString = "<td> <label class='wrap-content grey'>" + tName + "</label></td><td><label class='wrap-content grey'>" + formatDate(startDate) + "</label></td><td><label class='wrap-content grey'>" + formatDate(endDate) + "</label></td><td><label class='wrap-content grey'>" + days + "</label></td><td><input type='button' class='edit' value='Edit' style='width:60px;font-size: 13px;'  /></td>";
                $('#TaskTable tr').eq(index).html(htmlString);
                isEditOpen = false;
                sessionStorage.setItem('data', string);
                $('#S_endDate').val(formatDate(endDate));
            }
        }
        else
        {
            if (option == 1) {
                var htmlString = "<td> <label class='wrap-content grey' value='" + tID + "'>" + tName + "</label></td><td> <label class='wrap-content grey' value='" + PersonID + "'>" + Person + "</label></td><td><label class='wrap-content grey'>" + formatDate(startDate) + "</label></td><td><label class='wrap-content grey'>" + formatDate(endDate) + "</label></td><td><label class='wrap-content grey'>" + days + "</label></td><td><input type='button' class='Sedit' value='Edit' style='width:60px;font-size: 13px;'  /></td>";
            }
            else {
                var htmlString = "<td> <label class='wrap-content grey' value='" + tID + "'>" + tName + "</label></td><td><label class='wrap-content grey'>" + formatDate(startDate) + "</label></td><td><label class='wrap-content grey'>" + formatDate(endDate) + "</label></td><td><label class='wrap-content grey'>" + days + "</label></td><td><input type='button' class='edit' value='Edit' style='width:60px;font-size: 13px;'  /></td>";
            }

            
            $('#TaskTable tr').eq(index).html(htmlString);
            sessionStorage.setItem('data', string);
            isEditOpen = false;
        }

        //count = 1;
    }
   

}


//----------------------update button logic-----------------------------//
$(document).on('click', '#updatebtn', function () {

    var index = $(this).closest('tr').index();
    updateTask(index);
});

var isEditOpen = false;

$(document).on('click', '#cancelBtn', function () {

    var index = $(this).closest('tr').index();

    var trdata = sessionStorage.getItem('currentTr');
    $(this).closest('tr').html(trdata);
    isEditOpen = false;
})

//------------Edit button logic--------------------//
$(document).on('click', '.edit', function () {
    var index = $(this).closest('tr').index();
    EditTask(index);
})
//------------Edit button logic--------------------//



//----------------------- logic when user will tab on update----------------------// 
$(document).on('focusout', '#StDate', function () {


  //  var index = $(this).closest('tr').index()
   // updateTask(index);
    
})
//----------------------- logic when user will tab----------------------//






//----------------------update button logic-----------------------------//







//--------------------------logic when user will hit tab on add new----------------//
$(document).on('focusout', '#Days', function () {

   // var index = $(this).closest('tr').index();
    //alert('ad' + index);
   // console.log('ad' + index);
     //  AddTask(index);
});
//--------------------------logic when user will hit tab on add new----------------//


// -----------------------------------------------------------------------Schedule Calculation--------------------------------------------------------//




// -----------------------------------------------------------------------Off Calculation--------------------------------------------------------//

function manageOff(startDate,endDate) {
        

    var start=startDate;
    var end = endDate;

    //alert(endDate);

    var htmlString = "<div class='off-management'><div class='row'>"
        + "<div class='row text-right' style='margin-top:5px;cursor:pointer' id='closebtn'>"
        + "<span  style='font-size: 19px;border: 1px solid #BFBFBF;margin-right: 3px;color: #A7A7A7;font-weight: bold;cursor:pointer'>&nbsp;X&nbsp;</span>"
        + "</div>" 
        +"<div class='row'>"
        + "<h3 class='popup-heading' style='margin-top: 0px;'>OFF Management</h3>"
        + "</div>"
           + "<input type='button' id='backbtn' value='Back' class='popup-btn'/>"
            + "<input type='Submit' value='submit' id='btnsubmitSchedule' name='submit Schedule' class='popup-btn'/>"
    + "</div>"
    + "<div class='row'>"
        + " <div class='col-md-2' style='padding-right: 0px;'>"
            + "<label class='date'>Start Date: </label>"
            + "</div>"
            + "<div class='col-md-4' style='margin-top: 10px;'>"
                + "<span id='strtDate'>" + formatDate(start) + "</span>"
            + "</div>"
            + "<div class='col-md-2'>"
                    + "<label class='date'>End Date:</label>"
            + "</div>"
            + "<div class='col-md-4' style='margin-top: 10px;'>"
                + "<span id='endDate'>" + formatDate(end) + "</span>"
            + "</div>"
    + "</div>" 
    +"<div class='row'>"
            + "<div class='col-md-1'>" 
                    +"<input type='checkbox' id='sunchkbx'/></div><label class='date'> Mark all sundays as OFF </label>" 
              +"</div>" 
              +"<div style='height: 288px;overflow-y: scroll;border: 1px solid #C1C1C1;border-radius: 5px;'>" 
                    +"<table id='offTable' border='1'><tr><th>Date</th><th>Day</th><th>Task on Date</th><th>Schedule Off</th></tr>";

    
    ///alert();


    while(start<=end)
    {   
        var name = "";
        var countDays = 0;
        length = $('#TaskTable tr').length;
        if (length < 3)
        {
            alert('select atleast one task');
            return;
        }
        for (i = 0; i < length; i++)
        {
            var Name = $('#TaskTable tr').eq(i).find('td').eq(0).find('label').html();
            var StartDate = $('#TaskTable tr').eq(i).find('td').eq(1).find('label').html();
            var endDate = $('#TaskTable tr').eq(i).find('td').eq(2).find('label').html();
            var Days = $('#TaskTable tr').eq(i).find('td').eq(3).find('label').html();
          //  countDays = Name + '-' + Days+';';
            
                StartDate = new Date(StartDate);
                endDate = new Date(endDate);

                if(start>=StartDate &&start<=endDate)
                {
                   // alert(Name);
                    name = Name;
                    break;
                }

        }

        //$('#TaskTable tr').each(function (idx, elem) {
        //    // console.log(elem);
        //    var Name = $(elem).find('td').eq(0).html();
        //    var StartDate = $(elem).find('td').eq(1).html();
        //    var endDate = $(elem).find('td').eq(2).html();
        //    var Days = $(elem).find('td').eq(3).html();
            
        //});
        htmlString += "<tr><td>" + formatDate(start) + "</td>";
        var day = start.getDay();
        var strDay = weekDays[day];
        htmlString += "<td>" + strDay + "</td>";
        htmlString += "<td>" + name + "</td>";
        htmlString += "<td><input type='checkbox' name='chkbx' class='offchk'/></td></tr>";
       
        var value = $('#Datacontainer').html();
        sessionStorage.setItem('Container', value);
        console.log(value);
        start.AddDays(1);
        ////switch(day)
        ////{
        ////    case 1:
        ////        strDay
        ////}
    }
    htmlString += "</table></div></div>";
    $('#overLay').css('display', 'none');
    $('#overLay1').css('display', 'block');
    $('#Datacontainer1').html("");
    $('#Datacontainer1').html(htmlString);

    sessionStorage.setItem('OFFContainer',htmlString);


  
}

$(document).on('click', '#backbtn', function () {

    ////debugger;
    var data = sessionStorage.getItem('Container');
    if(data!=null && data!=undefined)
    {
        $('#overLay1').css('display', 'none');
        $('#overLay').css('display', 'block');
        sessionStorage.removeItem("OFFContainer");
        sessionStorage.removeItem('sundayChecked');
        $('#Datacontainer1').html(data.toString());
    }
        

})

$(document).on('focusout', '#endDate', function () {

    var data = $(this).val();
    var datew = new Date(data);
    var curdate=$.now();
    if(datew<curdate)
    {
        alert('Date should be greater then current Date');
        $(this).focus();
    }    
});


$(document).on('change', '#sunchkbx',function(){


    //loop through to all the rows in table for checking the sundays
    result=$('#sunchkbx').is(':checked');
    if (result)
    {
        sessionStorage.setItem('sundayChecked', result);
        $('#offTable tr').each(function (idx, obj) {
         
            var day = $(this).find('td').eq(1).html();
            var Task = $(this).find('td').eq(2).html();
            if (weekDays.indexOf(day) == 0 && Task!='OFF') {               
                   // alert('Index in sun ' + $(this).index() + ' length ' + $('#offTable tr').length);
                    AddDates($(this).index(), $('#offTable tr').size(),1);
                    $(this).find('td').eq(2).html('OFF');
                    $(this).find('td').eq(3).html('<input type="checkbox" checked name="chkbx" class="offchk">');
                    $(this).attr('class', 'off');

            }
        })
        var value = $('#Datacontainer1').html();
        sessionStorage.setItem('OFFContainer', value);
    }
    else {
        sessionStorage.setItem('sundayChecked', result);
        $('#offTable tr').each(function (idx, obj) {
            //alert('asdsa');
            var day = $(this).find('td').eq(1).html();
            var Task = $(this).find('td').eq(2).html();
            console.log(day);
            console.log(Task);
            //console.log(weekDays.indexOf(day) == 0 && Task!='OFF');
            if (weekDays.indexOf(day) == 0 && Task=='OFF') {               
                // alert('Index in sun ' + $(this).index() + ' length ' + $('#offTable tr').length);
                minusSundays($(this).index(), $('#offTable tr').size());
                //$(this).find('td').eq(2).html('OFF');
                //$(this).find('td').eq(3).html('<input type="checkbox"  name="chkbx" class="offchk">');
                //$(this).attr('class', 'off');

            }
        })
        var value = $('#Datacontainer1').html();
        sessionStorage.setItem('OFFContainer', value);
       
      
    }
        var data = $('#Datacontainer1').html();
        sessionStorage.setItem('offdata', data);

       
})


$(document).on('change', '.offchk', function () {

    var result = $(this).is(':checked')
  
    if(result)
    {
        
        var index = $(this).closest('tr').index();
        var length = $('#offTable tr').length;
        AddDates(index, length, 0);
        //result = $('#sunchkbx').is(':checked');
        //if (result)
        //{
        //    AddDates(index, length,1);
        //}
        $('#offTable tr').eq(index).find('td').eq(2).html('OFF');
        $('#offTable tr').eq(index).find('td').eq(3).html('<input type="checkbox" checked  name="chkbx" class="offchk">');
        $('#offTable tr').eq(index).attr('class', 'off');
        var value = $('#Datacontainer1').html();
        sessionStorage.setItem('OFFContainer', value);
    }
    else
    {
       
        var index = $(this).closest('tr').index();
        var length = $('#offTable tr').length;
        minusDates(index, length, 0);
        //  $('#offTable tr').eq(index).find('td').eq(2).html('OFF');
        $('#offTable tr').eq(index).find('td').eq(3).html('<input type="checkbox"  name="chkbx" class="offchk">');
        $('#offTable tr').eq(index).removeAttr('class');
        var value = $('#Datacontainer1').html();
        sessionStorage.setItem('OFFContainer', value);
        //alert('hello');
    }

})


function AddDates(index,length,opt)
{
    //index = index + 1;
    html = "";
    ////debugger;
    //index=index+1
   // alert('index: ' + index + ' Length: ' + length);
    var result = $('#sunchkbx').is(':checked');
    var SDate = $('#offTable tr').eq(index).find('td').eq(0).html();
    var Task= $('#offTable tr').eq(index).find('td').eq(2).html();
    //var SDate = $('#offTable tr').eq(index).find('td').html();
    var mainTask=Task;
    SDate = new Date(SDate);
    var tempDate = SDate;
    tempDate.AddDays(1);
    var tempTask='';
   // if (Task == 'OFF' && tempDate.getDay() == 0) {
    // alert("Temp Date " + formatDate(tempDate));
    
    if (opt == 1) {

        if (tempDate.getDay() == 0) {
            html = "<tr class='off'><td>" + formatDate(tempDate) + "</td><td>" + weekDays[tempDate.getDay()] + "</td><td>OFF</td><td><input type='checkbox'  name='chkbx' class='offchk'></td><tr>";
            html += "<tr><td>" + formatDate(tempDate) + "</td><td>" + weekDays[tempDate.getDay()] + "</td><td>" + Task + "</td><td><input type='checkbox'  name='chkbx' class='offchk'></td><tr>";
        }
        else {
            var Task1 = $('#offTable tr').eq(index + 1).find('td').eq(2).html();
            while (Task1 == "OFF") {
                tempDate.AddDays(1);
                index += 1;
                Task1 = $('#offTable tr').eq(index+1).find('td').eq(2).html();
            }
                html = "<tr><td>" + formatDate(tempDate) + "</td><td>" + weekDays[tempDate.getDay()] + "</td><td>" + Task + "</td><td><input type='checkbox'  name='chkbx' class='offchk'></td><tr>";                       
        }
    }
    else {
         var Task1 = $('#offTable tr').eq(index + 1).find('td').eq(2).html();
            while (Task1 == "OFF") {
               
                tempDate.AddDays(1);
                index += 1;
                Task1 = $('#offTable tr').eq(index+1).find('td').eq(2).html();
                
            }
            
                html = "<tr><td>" + formatDate(tempDate) + "</td><td>" + weekDays[tempDate.getDay()] + "</td><td>" + Task + "</td><td><input type='checkbox'  name='chkbx' class='offchk'></td><tr>";      
    }



        
        for (i = index + 1; i <length; i++) {
            var TDate = $('#offTable tr').eq(i).find('td').eq(0).html();
            var Task = $('#offTable tr').eq(i).find('td').eq(2).html();
            var Day = $('#offTable tr').eq(i).find('td').eq(1).html();
                      

            COUNT = 0;
            OffTask = i+1;
            var Task1 = $('#offTable tr').eq(OffTask).find('td').eq(2).html();
            //code manage if there is any individual OFF given...... previous while checking All sundays off.
            while(Task1 == 'OFF')
            {
                OffTask++;
                Task1 = $('#offTable tr').eq(OffTask).find('td').eq(2).html();
                TDate = $('#offTable tr').eq(i).find('td').eq(0).html();
                TDate = new Date(TDate);
                TDate.AddDays(1);
                var Day = weekDays[TDate.getDay()];
                TDate = formatDate(TDate);
                $('#offTable tr').eq(i).find('td').eq(0).html(TDate);
                $('#offTable tr').eq(i).find('td').eq(1).html(Day);
                $('#offTable tr').eq(i).find('td').eq(2).html('OFF');
                $('#offTable tr').eq(i).attr('class', 'off');
                $('#offTable tr').eq(i).find('td').eq(3).html('<input type="checkbox" checked  name="chkbx" class="offchk">');                
                i++;                
                
                //Task1 = $('#offTable tr').eq(i).find('td').eq(2).html();
                COUNT ++;
            }
                    if (COUNT ==0)
                    {

                        if (mainTask != 'OFF')
                        {
                            TDate = new Date(TDate);
                            TDate.AddDays(1);
                            var Day = weekDays[TDate.getDay()];
                            TDate = formatDate(TDate);
                            if (Day == 'Sunday')
                            {
                                if(result)
                                {
                                    if (opt == 0)
                                    {
                                         $('#offTable tr').eq(i).find('td').eq(0).html(TDate);
                                         $('#offTable tr').eq(i).find('td').eq(1).html(Day);
                                         tempTask = $('#offTable tr').eq(i).find('td').eq(2).html();
                                         $('#offTable tr').eq(i).find('td').eq(2).html('OFF');
                                         $('#offTable tr').eq(i).find('td').attr('class','off');
                                         $('#offTable tr').eq(i).find('td').eq(3).html('<input type="checkbox" checked name="chkbx" class="offchk">');
                                         TDate1 = new Date(TDate);
                                         TDate1.AddDays(1);                                    
                                         Day = weekDays[TDate1.getDay()];
                                         Temp1Date = formatDate(TDate1);
                                         htmlString =  "<tr><td>" + formatDate(Temp1Date) + "</td><td>" + weekDays[TDate1.getDay()] + "</td><td>" + tempTask + "</td><td><input type='checkbox'  name='chkbx' class='offchk'></td><tr>";
                                         //htmlString = "<tr><td" +  TDate + "</td><td>" + Day + "</td><td>" + tempTask + "</td></tr>";
                                         $('#offTable tr').eq(i).after(htmlString);
                                         $('#offTable tr').eq(i + 2).remove();
                                         i++;
                                        // length += 1;
                                    }
                                    else
                                    {
                                        $('#offTable tr').eq(i).find('td').eq(0).html(TDate);
                                        $('#offTable tr').eq(i).find('td').eq(1).html(Day);
                                        $('#offTable tr').eq(i).find('td').removeAttr('class');
                                        $('#offTable tr').eq(i).find('td').eq(3).html('<input type="checkbox" name="chkbx" class="offchk">');
                                    }
                                
                                   
                                }
                                else
                                {
                                    $('#offTable tr').eq(i).find('td').eq(0).html(TDate);
                                    $('#offTable tr').eq(i).find('td').eq(1).html(Day);
                                    $('#offTable tr').eq(i).find('td').removeAttr('class');
                                    $('#offTable tr').eq(i).find('td').eq(3).html('<input type="checkbox" name="chkbx" class="offchk">');
                                }
                                
                            }
                            else
                            {
                                
                                $('#offTable tr').eq(i).find('td').eq(0).html(TDate);
                                $('#offTable tr').eq(i).find('td').eq(1).html(Day);
                                $('#offTable tr').eq(i).find('td').removeAttr('class');
                                $('#offTable tr').eq(i).find('td').eq(3).html('<input type="checkbox" name="chkbx" class="offchk">');
                            }
                            
                        }
                      
                    }
                    else {
                        TDate = new Date(TDate);
                        TDate.AddDays(1);
                        var Day = weekDays[TDate.getDay()];
                        TDate = formatDate(TDate);
                        $('#offTable tr').eq(i).find('td').eq(0).html(TDate);
                        $('#offTable tr').eq(i).find('td').eq(1).html(Day);
                        $('#offTable tr').eq(i).find('td').eq(2).html(Task);
                        $('#offTable tr').eq(i).removeAttr('class','off');
                        $('#offTable tr').eq(i).find('td').eq(3).html('<input type="checkbox" name="chkbx" class="offchk">');
                    }
                    


        }
    //}
        if (mainTask != 'OFF')
        {
            $('#offTable tr').eq(index).after(html);
            $('#offTable tr').eq(index + 2).remove();
        }
  
}



function minusDates(index,length,opt)
{
    ////debugger;
    var c = 0, temp = 1;
    var loop = false;
   // alert(index);
  //  alert(length);
   // sessionStorage()
    if (index < length)
    {
        var arr = new Array();

        var Task=$('#offTable tr').eq(index+1).find('td').eq(2).html();
       // $('#offTable tr').eq(index).find('td').eq(2).html(Task);


        for (i = index; i <(length) ; i++) {
           
            if ($('#offTable tr').eq(i).find('td').eq(0).html() != undefined)
            {
                arr.push($('#offTable tr').eq(i).find('td').eq(0).html() +
               '-' + $('#offTable tr').eq(i).find('td').eq(1).html() + '-' + $('#offTable tr').eq(i).find('td').eq(2).html());
            }           
           
           // console.log('Array '+arr[c]);
        }

        indexCount = index;
        for (j = 0; j < arr.length - 1; j++) {

            //   console.log('arr[j]' + arr[j]);
            // console.log('arr[j+1]' + arr[j+1]);
            splitData = arr[j + 1].split('-');

            if (splitData != undefined && splitData != 'undefined' && splitData != '') {
                var Task = splitData[2];
                var Day = splitData[1];
                {
                
                  Task1 = arr[j+1].split('-');
                    while (Task1[2] == "OFF") {                     
                        j++;
                        c++;
                        loop = true;
                        Task1 = arr[j + 1].split('-');
                        Task = Task1[2];
                    }                                       
                        $('#offTable tr').eq(indexCount).find('td').eq(2).html(Task);
                        $('#offTable tr').eq(indexCount).removeAttr('class');                                        
                    if (loop == true) {
                        indexCount += (c);
                        loop = false;
                        c = 0;
                    }
                }
               
              
                indexCount += 1;
                
            }
        }
        $('#offTable tr').eq(length - 1).remove();

                 
        }
        

    
   
}

function minusSundays(index,length)
{

    ////debugger;

    var Task = $("#offTable tr").eq(index).find('td').eq(2).html();;
    var Date = $("#offTable tr").eq(index).find('td').eq(0).html();
    //------------------
    var curTask;
    var curDate;

    var loopoff = 0;
    var prevIndex;
    var prevTask;
    var count = 0;

    for (i = index + 1; i < length; i++) {
        curTask = $("#offTable tr").eq(i).find('td').eq(2).html();
        curDate = $("#offTable tr").eq(i).find('td').eq(0).html();
        //--------------------if the next task will OFF ================
        
        //prevTask = $("#offTable tr").eq(i).find('td').eq(2).html();
       
        prevIndex = i - 1;

        while (curTask == 'OFF') {
            i++;
            curTask = $("#offTable tr").eq(i).find('td').eq(2).html();
        }

        $("#offTable tr").eq(prevIndex).find('td').eq(2).html(curTask);
        console.log("Date"+$("#offTable tr").eq(prevIndex).find('td').eq(1).html()+"  Day:"+$("#offTable tr").eq(prevIndex).find('td').eq(1).html());
        $("#offTable tr").eq(prevIndex).find('td').eq(3).html('<input type="checkbox" name="chkbx" class="offchk">');
        $("#offTable tr").eq(prevIndex).removeAttr('class');
      
       

        prevTask = $("#offTable tr").eq(prevIndex).find('td').eq(2).html();
        if (prevTask == 'OFF')
        {
            while (prevTask == 'OFF')
            {
                prevIndex--;
                prevTask = $("#offTable tr").eq(prevIndex).find('td').eq(2).html();
            }
            
        }

      
        //prevIndex += count;
        count = 0;
    }

    $("#offTable tr").eq(length - 1).remove();

  
}


//---------------------------------old functions not in wrokign right now-------------------------------------------//
function AddOff()
{
    count1 = 1;
    var taskname = $('#offName').val();

    var sdate = $('#SoffDate').val();
    var edate = $('#EoffDate').val();
    //alert('df');

    if (taskname != '' && taskname != undefined && sdate != '' && sdate != undefined) {
        
        if (sdate != 'Invalid Date') {
            //$('.edittr').remove();
         //   alert(days)
            //var idx = $('.edittr').index();
            var htmlString = "<tr><td>" + taskname + "</td><td>" + sdate + "</td>";
          //  alert(edate);
            if (edate =='')
            {
                htmlString += "<td>" + sdate + "</td>";
            }
            else
            {
                htmlString += "<td>" + edate + "</td>";
            }

            htmlString+="<td><input type='button' class='offedit' value='edit'  /></td></tr>";

           // alert(htmlString)
            $("#soffTable").append(htmlString);
            //$('#edittr').remove();
            $('#offName').val("");
            $('#SoffDate').val("");
            $('#EoffDate').val("");
        }
        else {
            alert('Date Should be valid');
            $("#SoffDate").focus();
        }

    }

}

function updateOff(index)
{

    var taskname = $('#uoffName').val();
    var days = $('#uoffDate').val();
    var Edays = $('#uEoffDate').val();
    if (taskname != '' && taskname != undefined && days != '' && days != undefined) {
        if (days!='Invalid Date') {
            //$('.edittr').remove();
            //var idx = $('.edittr').index();
            var htmlString = "<td>" + taskname + "</td><td>" + days + "</td><td>" + Edays + "</td><td><input type='button' class='offedit' value='edit'  /></td></tr>";
            $('#soffTable tr').eq(index).html(htmlString);

        }
        else {
            alert('date should be valid');
            $("#soffDate").focus();
        }

    }
}

function backtoSchedule()
{
    $('#overLay1').css('display', 'none');
    $('#overLay').css('display', 'block');


    var data = sessionStorage.getItem('data');
    if (data != null)
    {
        $('#Datacontainer').html(data.toString());
    }   
}

$(document).on('click', '#offbtn', function () {


    //gett start date and end date............
    var strtDate=$('#S_startDate').val();
    var endDate = $('#S_endDate').val();

    //    alert('start Date'+strtDate);
    //    alert('End date:' + endDate);
    ////chnage the format becuase it stores data in UTc format 
   // alert('un '+endDate);
    strtDate = formatDate(strtDate);
    endDate = formatDate(endDate);

   // alert('con'+endDate);
    //convert string ti Date object
    strtDate = new Date(strtDate);
    endDate = new Date(endDate);

   // alert('con to Date' + endDate);
    //alert('object start Date' + strtDate);
    //alert('object End date:' + endDate);



    manageOff(strtDate, endDate);
    
    //var value = $('#Datacontainer').html();
    //createCookie('Container',value)
    //htmlString = "<div><div><span>Note:Mark all sunday off:<input type='checkbox' id='chkbox' name='chkbox' /></span><input type='button' onclick='backtoSchedule()'  value='back' /> <div class='row'> "
    //+ "<table id='offTable'><tr><th>Occassion</th><th>Start Date</th><th>End Date</th></tr><tr class='edittr'><td><input type='text' id='offName'/></td><td><input type='date' id='SoffDate'/></td><td><input type='date' id='EoffDate'/></td><td><input type='button' name='tskbtn' class='Tbtn' value='Add' onclick='AddOff()' id='tskbtn'/></td></tr></table></div>"
    //+ "<div><table id='soffTable' style='width:100%'><tr><th>Occassion</th><th>Start Date</th><th>End Date</th></tr></table></div>"
    //+"</div> </div>";
    //$('#overLay1').css('display', 'block');
    //$('#Datacontainer1').html(htmlString);
});

$(document).on('click', '.offedit', function () {

    var index = $(this).closest('tr').index();
    var Task = $('#soffTable tr').eq(index).find('td').eq(0).html();
    var days = $('#soffTable tr').eq(index).find('td').eq(1).html();
    var sdays = $('#soffTable tr').eq(index).find('td').eq(2).html();

    var taskstring = "<input  type='text' autofocus='true' name='offName' value='" + Task + "' id='uoffName' /> ";
    var dayString = "<input type='date' name='Days' value='" + days + "' id='uoffDate'/>";
    var edayString = "<input type='date' name='Days' value='" + sdays + "' id='uEoffDate'/>";
    var btnString = "<input type='button' name='btn' value='update'  id='offupdatebtn'/>";

    
    $('#soffTable tr').eq(index).find('td').eq(0).html(taskstring);
    $('#soffTable tr').eq(index).find('td').eq(1).html(dayString);
    $('#soffTable tr').eq(index).find('td').eq(2).html(edayString);
    $('#soffTable tr').eq(index).find('td').eq(3).html(btnString);
})

$(document).on('click', '#offupdatebtn', function () {

    var index = $(this).closest('tr').index();
    updateOff(index);
    
})

$(document).on('focusout', '#uoffDate', function () {

    var index = $(this).closest('tr').index();
    updateOff(index);

})

$(document).on('change', '.offchk', function () {

    var index = $(this).closest('tr').index();
    
   // alert('index:' + index);
  //  console.log($(this));
    //alert($(this).is(':checked'));
    if ($(this).is(':checked'))
    {
        if(index!=undefined && index!=0)
        {
           // alert('index:' + index);
            $("#offTable tr").eq(index).attr('class', 'off');
        }
        
    }
    else
    {
        if (index != undefined && index != 0) {
            //alert('index:' + index);
            $("#offTable tr").eq(index).removeAttr('class');
        }
    }

    var data = $('#Datacontainer1').html();
    sessionStorage.setItem('offdata', data);
    
})

$(document).on('focusout', '#EoffDate', function () {

    AddOff();
})

//-------------------------------------------------old functions not in wrokign right now---------------------------------------------------------------//

// -----------------------------------------------------------------------Off Calculation--------------------------------------------------------//




//----------------------------------------------------------------------- Common Calculation-----------------------------------------------------//



function addSchedule() {

    ////debugger;
    var ID=$('#Cruise').val();
    if (ID != undefined && ID != "")
    {
        $('#overLay').css('display', 'block');

        $('#Datacontainer').load('/Cruises/Schedule?ID='+ID, function () { });

        sessionStorage.setItem('CruiseID',ID);
    }
    else
    {
        alert('select Cruise for schedule');
    }



 

}



//creating a object to store schedule
var submitSchedule = function (Date,Task,TaskID) {

    this.Date = Date;
    this.Task = Task;
    this.TaskID = TaskID;

}

$(document).on('click', '#btnsubmitSchedule', function () {
    
    ////debugger;
    var l = $('#offTable tr').size();
    var data = "";
    var arr = new submitSchedule();
    var subarr = new Array();
    var tasks = saveTask();
   // console.log(tasks);
    //var Taskarr =JSON.parse(tasks);
    //console.log('out' + sessionStorage.getItem('taskArray'));
    for (i = 1; i < l; i++)
    {
        //debugger;
        var Date = $('#offTable tr').eq(i).find('td').eq(0).html();
        var Task = $('#offTable tr').eq(i).find('td').eq(2).html();
        var TaskID =parseInt(tasks[Task]);
        console.log('taks ID' + TaskID);
        if (TaskID != null && !isNaN(TaskID))
        {
            var arr = new submitSchedule(Date, Task, TaskID);
            subarr.push(arr);
        }
        
        
    }
    ////debugger;
    var jsonstring = JSON.stringify(subarr);
    
    cruiseID=$('#CruiseID').val();
    
    $.ajax({
        url: "/Cruises/SubmitCruiseSchedule",
        method: "POST",
        data: { model: jsonstring, CruiseID: cruiseID },
        dataType: "JSON",
        success: function (data) {
            //alert('asda');
            //data1 = JSON.parse(data);
            //console.log(data);
            //getData(data);
            if (data == "done")
            {
                $('#overLay').css('display', 'none');
                $('#overLay1').css('display', 'none');
                sessionStorage.clear();
                GetSchedule(cruiseID);
            }                                 
        },
        error: function () {
            alert("something went wrong try after sometime.")
        }
        

    });
    
});


$(document).ready(function () {

    //if ($('.dhx_cal_tab_first') != undefined)
    //{
    //    $('.dhx_cal_tab_first').css('display', 'none');
    //    $('.dhx_cal_today_button').css('display', 'none');
    //    $('.active').css('border-bottom-left-radius','5px');
    //    $('.active').css('border-top-left-radius', '5px');
    
    //}


    var data = sessionStorage.getItem('data');
   /// sessionStorage.setItem('data', null);
    // data = null;
  //  alert(data);
    if (data != null)
    {
        
        $('#overLay').css('display', 'block');
        $('#Datacontainer').html(data.toString());

        startDate=sessionStorage.getItem('StartDate');
        endDate = sessionStorage.getItem('EndDate');
        $('#S_startDate').val(startDate);
        $('#S_endDate').val(endDate);
        var offData = sessionStorage.getItem('OFFContainer');
        if (offData != null)
        {
            //alert('asd');
           // console.log(offData.toString());
            $('#overLay').css('display', 'none');
            $('#overLay1').css('display', 'block');
            $('#Datacontainer1').html(offData.toString());
            result = sessionStorage.getItem('sundayChecked');

            if(result)
            {

                $('#sunchkbx').attr('checked', 'checked');
            }
        }
        
    }
    //console.log(data);
    //var data = readCookie('container');
    //alert(data);
    //if (data != null && data != '')
    //{
    //    $('#overLay').css('display', 'block');

    //    //var data = readCookie('container');
    //    $('#Datacontainer').html(data);
    //}
    
})


window.onbeforeunload = function (e) {
    return ;
};

function check()
{
   // alert('hello');
    if (count>0)
    {
      //  alert("check"+count );
        var string = $('#Datacontainer').html();
        sessionStorage.setItem('data', string);

        //if(count1>0)
        //{
        //    var string = $('#Datacontainer1').html();
        //    sessionStorage.setItem('offdata', string);
        //}
        //return "after reload data will be lost";
    }
}

$(document).on('click', '#closebtn', function () {
    $('#overLay').css('display', 'none');
    $('#overLay1').css('display', 'none');
    $('#overLay2').css('display', 'none');
    //sessionStorage.clear();
    sessionStorage.removeItem('data');
    sessionStorage.removeItem('StartDate');
    sessionStorage.removeItem('EndDate');
    sessionStorage.removeItem('sundayChecked');
})

  /* to calculate Start Date*/
    Date.prototype.MinusDays = function (days) {
        this.setDate(this.getDate() - parseInt(days));
        return this;
    };


    Date.prototype.AddDays = function (days) {
       // alert('this.getDate() ' + this.getDate())
       // alert('this.days' + days)
        this.setDate(this.getDate() + parseInt(days));
        //alert('this' + this)
        return this;
    };
/* End calculate Start Date*/


    function createCookie(name, value, days) {
        if (days) {
            var date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            var expires = "; expires=" + date.toGMTString();
        }
        else var expires = "";
        document.cookie = name + "=" + value + expires + "; path=/";
    }

    function readCookie(name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }

//----------------------------------------------------------------------- Common Calculation-----------------------------------------------------//




    $(document).on('focus', ".Cdate", function () {
        $(this).datepicker({
            changeMonth: true,//this option for allowing user to select month
            changeYear: true //this option for allowing user to select from year range
        });
    });


//------------------------------------------------------------------ sub Schedule Part---------------------------------------------------------/////



    var submitSubSchedule = function (TaskDate,personID,TaskID,scheduelno,CruiseID) {
        this.TaskDate = TaskDate;
        this.PersonID= personID;
        this.TaskID = TaskID;
        this.ScheduelNo = scheduelno;
        this.CruiseID = CruiseID;
    }
    function addSubSchedule()
    {

        var cruise = $('#Cruise').val();
        if (cruise == '' || cruise == undefined)
        {
            alert('select any cruise');
            return;
        }
        $('#overLay').css('display', 'block');
        $('#Datacontainer').load('/Cruises/AddSubschedule?cruiseID=' + cruise, function () { });

        sessionStorage.setItem('CruiseID', cruise);
    }

    $(document).on('click', '#Stskbtn', function () {
        //var index = $(this).closest('tr').index();
        var index = $(this).closest('tr').index();
        //  alert('ad' + index);
        //console.log('ad' + index);
        AddTask(index,1);
    });

    $(document).on('click', '.Sedit', function () {
        var index = $(this).closest('tr').index();

        EditTask(index, 1);
    })

    $(document).on('click', '#Supdatebtn', function () {
  
        var index = $(this).closest('tr').index();
        updateTask(index,1);
    });


    $(document).on('change', '#TaskName', function () {

        var data = $('#TaskTable tr').eq(0).find('th').eq(0).html();

        if(data=='Category Name')
        {
            var id = $(this).val();

            $.ajax({
                url: '/Cruises/Persons?ID='+id,                
                success: function (data) {
                    //debugger;
                    var htmlString = "";
                    for (i = 0; i < data.length; i++)
                    {
                        htmlString += "<option value='" + data[i].ID + "'>" + data[i].FirstName + " "+data[i].LastName+ "</option>";
                    }                   
                    $('#Persons').html(htmlString);
                },
                error: function (err) {
                    alert(err.statusText);
                }

            })
        }
    });

    function getPersonsArray()
    {
     
        var options= $('#Persons option');

        var personarray=new Array();
        for (i = 1; i < options.length;i++)
        {
            var val=options[i].val();
            var per=options[i].html();
            personarray[per] = val;
        }
        return personarray;
    }
    $(document).on('click', '#btnSubSchedule', function () {

        var l = $('#TaskTable tr').size();
        var data = "";
        var arr = new submitSubSchedule();
        var subarr = [];
        var tasks = saveTask(); 
       // var persons=getPersonsArray();
        // console.log(tasks);
        //var Taskarr =JSON.parse(tasks);
        //console.log('out' + sessionStorage.getItem('taskArray'));


        for (i = 1; i < l-1; i++) {
            var CatName = $('#TaskTable tr').eq(i).find('td').eq(0).find('label').html();

            var PersonID = $('#TaskTable tr').eq(i).find('td').eq(1).find('label').attr('value');

            var startDate= $('#TaskTable tr').eq(i).find('td').eq(2).find('label').html();
            var endDate = $('#TaskTable tr').eq(i).find('td').eq(3).find('label').html();
            startDate = formatDate(startDate);
            endDate = formatDate(endDate);
            startDate = new Date(startDate);
            endDate = new Date(endDate)

            Scheduleno = $('#Schedules').val();
            CruiseID = $('#CruiseID').val();
            var arr = {};

            while(startDate<=endDate)
            {
                TaskDate =formatDate(startDate);

                var TaskID = parseInt(tasks[CatName]);
              //  var CruiseID = CruiseID;
                arr = {};
                arr.TaskDate = TaskDate;
                arr.PersonID = PersonID;
                arr.TaskID = TaskID;
                arr.ScheduleNo = Scheduleno;
                arr.CruiseID = CruiseID;

                //new submitSubSchedule(TaskDate, PersonID, TaskID, Scheduleno, CruiseID);
                subarr.push(arr);
               // arr = null;
                startDate.AddDays(1);
            }


           // var Days = $('#TaskTable tr').eq(i).find('td').eq(4).find('label').html();


            
            //console.log('taks ID' + TaskID);
            
           
        }
        ////debugger;
        var jsonstring = JSON.stringify(subarr);

       
        $.ajax({
            url: "/Cruises/SubmitSubSchedules",
            method: "POST",
            data: { model: jsonstring, Scheduleno: Scheduleno,CruiseID:CruiseID },
            dataType: "JSON",
            success: function (data) {
                //alert('asda');
                //data1 = JSON.parse(data);
                //console.log(data);
                //getData(data);
                if (data == "done") {
                    $('#overLay').css('display', 'none');
                    $('#overLay1').css('display', 'none');
                    sessionStorage.clear();

                    GetSchedule(CruiseID);
                }
            },
            error: function () {
                alert("something went wrong try after sometime.")
            }


        });
    });




// Notes management


    function openNotes()
    {

        var cruiseID = $('#Cruise').val();
        var cruiseName = $('#Cruise option:selected').html();
        var year = $('#cmbYear').val();
        if (year == null || year == undefined || year == "")
        {
            return;
        }

      
        $.ajax({
            url: '/Cruises/GetSchedules?cruiseID=' + cruiseID + "&Year=" + year,
            success: function (data) {
                if(data==null)
                {
                    alert('no data available');
                }
                else
                {
                    if( data.CruiseViewModel!=null && data.CruiseViewModel.length>0)
                    {
                        //debugger;

                        var htmlString = "<div class='row text-right'><span id='closebtn' style=' font-size: 19px;border: 1px solid #BFBFBF;margin-right: 3px;color: #A7A7A7;font-weight: bold;cursor:pointer'>&nbsp;X&nbsp;</span></div>";
                        htmlString+="<div class='row'>";
                        htmlString += "<h3 class='popup-heading'> Notes for Cruise: " + cruiseName + "</h3>";
                    htmlString+="<input type='hidden' id='IDCruise' value='"+cruiseID+"' value='35'>";
            
            
                    htmlString+="</div><div style='min-height: 100px;height: 367px;overflow-x: scroll;' id='notesContainer' class='row text-center'>";
                        for (i = 0; i < data.CruiseViewModel.length; i++)
                        {
                            htmlString += "<div style='border-bottom:1px solid #E2DCDC' class='row'>";
                            var date = convertJSONDate(data.CruiseViewModel[i].Date);
                            var dispDate = formatDate(date);
                            htmlString += "<div class='col-md-3'>" + dispDate+ "</div>";
                            htmlString += "<div class='col-md-3' style='background:" + data.CruiseViewModel[i].Color + "' value='" + data.CruiseViewModel[i].TaskID + "'>" + data.CruiseViewModel[i].TaskName + "</div>";
                            htmlString += "<div class='col-md-6'><input type='text' id='txtnotes' /> </div></div>";
                        }
                        
                        htmlString += "</div>";
                        htmlString += "<div class='row'>";
                        htmlString += "<div class='col-md-8'><input type='button'  value='Save' id='btnSaveNotes' class='popup-btn'/></div></div>";
                        $('#overLay').css('display', 'block');
                        $('#Datacontainer').html(htmlString);
                    }
                    else
                    {
                        alert('No schedule for the ship');
                    }

                   
                }

            },
            error: function (err) {
                alert(err.statusText);
            }


        });
    }


    $(document).on('click', '#btnSaveNotes', function () {
        var arr = new Array;;
        //debugger;
        var data = $('#notesContainer').find('div.row');
        var date;
        var taskId;
        var notes;
        var crusieID = $('#IDCruise').val();
        if (crusieID == undefined || crusieID == "")
        {
            alert('cannot find cruise');
            return;
        }
        if(data.length>0)
        {
            for (i = 0; i < data.length;i++)
            {
                //date
                date=data[i].childNodes[0].innerText;
                date = new Date(date);
                //date = date.toISOString();
                //date += " 00:00:00";


                //TaskID
                taskId = data[i].childNodes[1].getAttribute('value');

                //Notes
                notes = data[i].childNodes[2].childNodes[0].value;

                //create object and insert data

                if (notes != undefined && notes != "")
                {
                    var obj = new Object;
                    obj.TaskDate = date;
                    obj.TaskID = taskId;
                    obj.Notes = notes;
                    obj.CruiseID = crusieID;
                    arr.push(obj);
                }
                
            }
            var temp = JSON.stringify(arr);
           
            
            $.ajax({
                url: '/cruises/SaveNotes',
                contentType: "Application/JSON; charset=utf-8",
                data: "{ 'model': " + JSON.stringify(arr) + "}",
                type: 'POST',
                dataType: "JSON",
                success: function (data) {
                    alert('data saved successfully');
                    $('#overLay').css('display', 'none');
                    $('#Datacontainer').html("");
                },
                error: function (err) {
                    alert(err.statusText);
                }
            });

        }



    });








