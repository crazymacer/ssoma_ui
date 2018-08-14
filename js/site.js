$(document).ready(function () 
{

  /*  ============================================================================================= */
  /*  ====================================== GLOBAL FUNCTIONS ===================================== */
  /*  ============================================================================================= */
  
  //Set default theme for all Select2 widgets
  $.fn.select2.defaults.set( "theme", "bootstrap" );

  //Redirect
  function redirectToPage(url, parameters=null)
  {
      if (parameters==null)
          window.location.href = url;
      else
          window.location.href = url+'?'+parameters;
  }

  //DataTable Language json
  var DataTableLanguageUrl="datatable.json";

  /*  ============================================================================================= */
  /*  ======================================= EPP ASSIGMENT ======================================= */
  /*  ============================================================================================= */

  //EPP Assigment API Url
  var ApiUrlEppAssigment = "json.php";
  
  //EPP Assigment DataTableId
  var DtEppAssigmentId="#DtEppAssigment";
  
  //Initializing Epp Assigment DataTable
  var DtEppAssigment=$(DtEppAssigmentId).DataTable(
  {
    //Setting datatable language
    "language": 
    {
      "url": DataTableLanguageUrl
    },
    "autoWidth": false,
    //Hide enttries dropdown
    "lengthChange": false,

    //Add data to the request by manipulating the data object (no return from the function):
    "ajax": 
    {
      "url": ApiUrlEppAssigment,
      "data": function (d) 
      {
        d.CompanyId = DtEppAssigmentCompanyFilter;
        d.ProjectId = DtEppAssigmentProjectFilter;
        d.Month     = DtEppAssigmentDateRangeFilter;
      },
      "type": "POST"
    },
    columnDefs: [
      { className: 'text-center', targets: [0,1,2,3,4,5,6] },
    ],

    //Define columns name
    "columns": 
    [
      { "data": "Id" },
      { "data": "Dni"},
      { "data": "AssigmentDate"},
      { "data": "FullName" },
      { "data": "Company"},
      { "data": "JobTitle"},
      { "data": "Observation"}
    ],
    "processing": true,
    
    //Mensaje Inicial
    "initComplete": function(settings, json) 
    {
      $('.dataTables_empty').html('<div class="alert alert-warning" role="alert">Seleccione una Empresa, Proyecto y Periodo.</div>');
    }
  });
  
  //Initializing Epp Assigment Variables
  if(DataTableExist(DtEppAssigmentId))
  {
    //Initialize filters data
    var DtEppAssigmentCompanyFilter   = "0";
    var DtEppAssigmentProjectFilter   = "0";
    var DtEppAssigmentDateRangeFilter = "0";
    
    //Var to store row selected data
    var RowDataEppAssigment = null;

    //Hidign ID Column
    DtEppAssigment.column(0).visible(false);
  
  }
  
  //OnClick DtEppAssigment row
  $(DtEppAssigmentId+' tbody').on( 'click', 'tr', function () 
  {
    if ($(this).hasClass('selected')) 
    {
      if(!IsDatatableEmpty(DtEppAssigment))
      {
        $(this).removeClass('selected');
        RowDataEppAssigment=null;
      }
    }
    else 
    {
      if(!IsDatatableEmpty(DtEppAssigment))
      {
        DtEppAssigment.$('tr.selected').removeClass('selected');
        $(this).addClass('selected');
        RowDataEppAssigment=DtEppAssigment.row(this).data();
        //Show data on console
        console.log(  RowDataEppAssigment);
      }
    }
  });
  
  //Show Epp Assigment Data
  $('#BtnEppAssigmentLoadData').click( function () 
  {
    //Get datatable filters 
    GetDtEppAssigmentFilters();
    
    //Check filters
    if(DtEppAssigmentCompanyFilter == 0 | DtEppAssigmentProjectFilter == 0 | DtEppAssigmentDateRangeFilter == 0)
    {
      swal("Oops!", "Primero debes seleccionar una empresa, proyecto y periodo!", "warning");
    }
    else
    {
      //Load DtEppAssigment data with filters
      DtEppAssigment.ajax.reload();
    }
  });

  //OnClick BtnEppAssigmentRead
  $('#BtnEppAssigmentRead').click( function () 
  {
      $('#ModalEppCreate').modal('show'); 
  });

  //OnClick BtnEppAssigmentRead
  $('#BtnEppAssigmentEdit').click( function () 
  {
      if(RowDataEppAssigment!=null)
    {
      redirectToPage("EppAssigmentDetail/"+RowDataEppAssigment["Id"]);
      //console.log(RowDataEppAssigment["Id"]);
    }
    else
    {
        swal("Oops!", "Debes seleccionar un registro.", "warning");
        console.log( RowDataEppAssigment ); 
    }
      
  });

  /*  ============================================================================================= */
  /*  ================================ EPP ASSIGMENT > DETAIL > INDEX ============================= */
  /*  ============================================================================================= */

  /* Para eliminar en la DB las filas seleccionadas, capturar los ID en una variable via javascript */

  //EPP Assigment API Url
  var ApiUrlEppAssigmentDetail = "jsonEppAssigmentDetail.php";
  
  //EPP Assigment DataTableId
  var DtEppAssigmentDetailId="#DtEppAssigmentDetail";
  
  //Initializing Epp Assigment DataTable
  var DtEppAssigmentDetail=$(DtEppAssigmentDetailId).DataTable(
  {
    //Setting datatable language
    "language": 
    {
      "url": DataTableLanguageUrl
    },
    "autoWidth": false,
    //Hide enttries dropdown
    "lengthChange": false,
    //Hide searchbox
    //searching: false,

    //Add data to the request by manipulating the data object (no return from the function):
    "ajax": 
    {
      "url": ApiUrlEppAssigmentDetail,
      "data": function (d) 
      {
        d.ProjectId   = /*DtEppAssigmentDetailProjectId*/1;
        d.EmployeeId  = /*DtEppAssigmentDetailEmployeeId*/1;
      },
      "type": "POST"
    },
    columnDefs: [
      { className: 'text-center', targets: [0,1,2,3,4,5,6,7] },
    ],

    //Define columns name
    "columns": 
    [
      { "data": "EppAssigmentDetailItemId"},
      { "data": "InternalCode"},
      { "data": "Description"},
      { "data": "ExpiryDate" },
      { "data": "Quantity"},
      { "data": "Price"},
      { "data": "TotalPrice"},
      { "data": "AssigmentType"}
    ],
    "processing": true,
    
    //Mensaje Inicial
    "initComplete": function(settings, json) 
    {
      $('.dataTables_empty').html('<div class="alert alert-warning" role="alert">Seleccione una Empresa, Proyecto y Periodo.</div>');
    }
  });


  /*  ============================================================================================= */
  /*  ================================ EPP ASSIGMENT > DETAIL > EDIT ============================== */
  /*  ============================================================================================= */

  /* Para eliminar en la DB las filas seleccionadas, capturar los ID en una variable via javascript */

  //EPP Assigment API Url
  var ApiUrlEppAssigmentDetailEdit = "jsonEppAssigmentDetail.php";
  
  //EPP Assigment DataTableId
  var DtEppAssigmentDetailId = "#DtEppAssigmentDetailEdit";
  
  //Initializing Epp Assigment DataTable
  var DtEppAssigmentDetailEdit=$(DtEppAssigmentDetailId).DataTable(
  {
    //Setting datatable language
    "language": 
    {
      "url": DataTableLanguageUrl
    },
    "autoWidth": false,
    //Hide enttries dropdown
    "lengthChange": false,
    //Hide searchbox
    //searching: false,

    //Add data to the request by manipulating the data object (no return from the function):
    "ajax": 
    {
      "url": ApiUrlEppAssigmentDetailEdit,
      "data": function (d) 
      {
        d.ProjectId   = /*DtEppAssigmentDetailProjectId*/1;
        d.EmployeeId  = /*DtEppAssigmentDetailEmployeeId*/1;
      },
      "type": "POST"
    },
    columnDefs: [
      { className: 'text-center', targets: [0,1,2,3,4,5,6,7] },
    ],

    //Define columns name
    "columns": 
    [
      { "data": "EppAssigmentDetailItemId"},
      { "data": "InternalCode"},
      { "data": "Description"},
      { "data": "ExpiryDate" },
      { "data": "Quantity"},
      { "data": "Price"},
      { "data": "TotalPrice"},
      { "data": "AssigmentType"}
    ],
    "processing": true,
    
    //Mensaje Inicial
    "initComplete": function(settings, json) 
    {
      $('.dataTables_empty').html('<div class="alert alert-warning" role="alert">Seleccione una Empresa, Proyecto y Periodo.</div>');
    }
  });

  //Initializing Epp Assigment Variables
  if(DataTableExist(DtEppAssigmentDetailId))
  {
    //Var to store row selected data
    var RowDataEppAssigmentDetail = null;

    //Hidign ID Column
    DtEppAssigmentDetailEdit.column(0).visible(false);

    //Initializing FrmEppAssigmentEppCreate inputs
    $('#FrmEppAssigmentDetailEppCreate select[name=TxtAssigmentTypeId]').select2({});
    $('#FrmEppAssigmentDetailEppCreate select[name=TxtInternalCode]').select2({});
    $('#FrmEppAssigmentDetailEppCreate select[name=TxtEppId]').select2({});
    $('#FrmEppAssigmentDetailEppCreate input[name=TxtExpiryDate]').datepicker(
    {
      format: "dd/mm/yyyy", todayBtn: "linked", language: "es", autoclose: true, todayHighlight: true
    });

    //Initializing FrmEppAssigmentEppEdit inputs
    $('#FrmEppAssigmentDetailEppEdit select[name=TxtAssigmentTypeId]').select2({});
    $('#FrmEppAssigmentDetailEppEdit select[name=TxtInternalCode]').select2({});
    $('#FrmEppAssigmentDetailEppEdit select[name=TxtEppId]').select2({});
    $('#FrmEppAssigmentDetailEppEdit input[name=TxtExpiryDate]').datepicker(
    {
      format: "dd/mm/yyyy", todayBtn: "linked", language: "es", autoclose: true, todayHighlight: true
    });
  
  }

  //EppAssigment Save Button
  $('#FrmEppAssigmentDetailEdit button[name=BtnSave]').click( function () 
  {
    //Send success message
    SendSaveSuccessMessageRedirect("Registro del EPP Actualizado");

    //Validate message
    //var fruits = ["Banana", "Orange", "Apple", "Mango"];
    //SendValidationMessage(fruits);

    //Error message
    //SendUpdatErrorMessage();

  });

  //EppAssigment Cancel Button
  $('#FrmEppAssigmentDetailEdit button[name=BtnCancel]').click( function () 
  {
    //Error message
    swal("Ooops!", "Redirigir con los parametros.", "warning");
  });
  
  //EPP New Button
  $('#FrmEppAssigmentDetailEdit button[name=BtnEppNew]').click( function () 
  {
    $('#ModalEppAssigmentDetailEppNew').modal();
  });

  //EPP Edit Button
  $('#FrmEppAssigmentDetailEdit button[name=BtnEppEdit]').click( function () 
  {
    //Launch Edit Modal
    $('#ModalEppAssigmentDetailEppEdit').modal();

    //Send info message if no select a row
    //SendEditInfoMessage();
  });
  
  //EPP Create Button
  $('#FrmEppAssigmentDetailEppCreate button[name=BtnEppCreate]').click( function () 
  {
    //Success message
    SendCreateSuccessMessage();

    //Validation message
    //var fruits = ["Banana", "Orange", "Apple", "Mango"];
    //SendValidationMessage(fruits);

    //Error message
    //SendCreateErrorMessage()

  });

  //EPP Update Button
  $('#FrmEppAssigmentDetailEppEdit button[name=BtnEppUpdate]').click( function () 
  {

    //Send success message
    SendUpdateSuccessMessage();

    //Send error message
    //SendUpdatErrorMessage();

  });

  //EPP Delete Button
  $('#FrmEppAssigmentDetailEdit button[name=BtnEppDelete]').click( function () 
  { 

    //Send info message
    SendDeleteInfoMessage();

    //Send warning message
    /*swal({
      title: MsgWarningTitle,
      text: MsgDeleteWarning,
      icon: "warning",
      buttons: ["No", "Si"],
      dangerMode: true,
    })
    .then((willDelete) => 
    {
      //If clic on yes
      if (willDelete) 
      {
        
        //Send success message
        //SendDeleteSuccessMessage();

        //Send error message
        //SendDeleteErrorMessage();
        
      }
      
    });*/
    
    

  });

        
  /*  ============================================================================================= */
  /*  ================================== SWAL VALIDATION MESSAGES ================================= */
  /*  ============================================================================================= */
  
  //Swal Titles
  var MsgSuccessTitle     = "Excelente!";
  var MsgInfoTitle        = "Oops, Faltó algo!";
  var MsgWarningTitle     = "Advertencia!";
  var MsgErrorTitle       = "Oops, Algo salió mal!";

  //Create Messages
  var MsgCreateSuccess    = "Los datos fueron registrados.";
  var MsgCreateError      = "No se pudieron registrar los datos, inténtelo nuevamente.";

  //Update Messages
  var MsgUpdateSuccess    = "Los cambios fueron guardados.";
  var MsgUpdateInfo       = "Primero debe seleccionar el registro a editar";
  var MsgUpdateError      = "No se pudieron guardar los cambios, inténtelo nuevamente.";

  //Delete Messages
  var MsgDeleteSuccess    = "El elemento fue eliminado,";
  var MsgDeleteInfo       = "Primero debe seleccionar un registro.";
  var MsgDeleteWarning    = "¿Está seguro de elimar este elemento?";
  var MsgDeleteError      = "No se pudo eliminar el elemento, inténtelo nuevamente.";
  
  //Validation Message
  var MsgValidation       = "Necesita verificar los siguientes campos";

      
  //General Messages
  function SendSuccessMessageRedirect(MsgTitle, MsgText, url) 
  {
    //Success message
    swal(MsgTitle, MsgText, "success")
    .then((value) => {
      swal(`Redirigir a la url: `+url);
    });
  }

  function SendSuccessMessage(MsgText) 
  {
    swal(MsgSuccessTitle, MsgText, "success");
  }

  function SendErrorMessage(MsgText) 
  {
    swal(MsgErrorTitle, MsgText, "error");
  }

  function SendInfoMessage(Msgtext)
  {
    swal(MsgInfoTitle, Msgtext, "info");
  }

  function SendValidationMessage(validationsArray)
  {    
    msg = MsgValidation+": \n\n ";
    for (i = 0; i < validationsArray.length; i++) 
    {
      msg += "- " + validationsArray[i]+"\n";
    }
    swal(MsgInfoTitle, msg, "info");
  }

  //Create Messages
  function SendCreateSuccessMessage()
  {
    SendSuccessMessage(MsgCreateSuccess);
  }

  function SendCreateErrorMessage()
  {
    SendErrorMessage(MsgCreateError);
  }

  //Edit and update Messages
  function SendEditInfoMessage()
  {
    SendInfoMessage(MsgUpdateInfo);
  }

  function SendUpdateSuccessMessage()
  {
    SendSuccessMessage(MsgUpdateSuccess);
  }

  function SendUpdatErrorMessage()
  {
    SendErrorMessage(MsgUpdateError);
  }
  
  //Delete Messages
  function SendDeleteInfoMessage()
  {
    SendInfoMessage(MsgDeleteInfo);
  }

  function SendDeleteSuccessMessage()
  {
    SendSuccessMessage(MsgDeleteSuccess);
  }

  function SendDeleteErrorMessage() 
  {
    SendErrorMessage(MsgDeleteError);
  }

  //Save Messages
  function SendSaveSuccessMessageRedirect(url) 
  {
    SendSuccessMessageRedirect(MsgSuccessTitle, MsgUpdateSuccess, url) 
  }

  
  /*  ============================================================================================= */
  /*  ==================================== DATATABLE FUNCTIONS ==================================== */
  /*  ============================================================================================= */

  //Get Epp Assigment filters data
  function GetDtEppAssigmentFilters()
  {
    DtEppAssigmentCompanyFilter   = $("#DtEppAssigmentCompanyFilter").val();
    DtEppAssigmentProjectFilter   = $("#DtEppAssigmentProjectFilter").val();
    DtEppAssigmentDateRangeFilter = $("#DtEppAssigmentDateRangeFilter").val();
  }

  function IsDatatableEmpty(DataTable)
  {
    if (!DataTable.data().count())
      return true;
    else
      return false;
  }

  function DataTableExist(DataTableId)
  {
    if ($.fn.DataTable.isDataTable(DataTableId)) 
      return true;
    else
      return false;
  }

});