$(document).ready(function () 
  {
    /*============================================
                    GLOBAL 
    =============================================*/

    var DataTableLanguageUrl="datatable.json";

    /*============================================
                  EPP ASSGIMENT 
    =============================================*/

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

     /*============================================
                  EPP ASSGIMENT DETAIL
    =============================================*/

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



















    /*  ======================================================
        ===== INITIALIZING EPP ASSIGMENT DETAIL EDIT DATA ====
        ====================================================== */
    /* Para eliminar en la DB las filas seleccionadas, capturar los ID en una variable via javascript */

    //EPP Assigment API Url
    var ApiUrlEppAssigmentDetailEdit = "jsonEppAssigmentDetail.php";
    
    //EPP Assigment DataTableId
    var DtEppAssigmentDetailId = "#Dt_EppAssigmentDetail_Edit";
    
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

    //Create Button
    $('#Btn_EppAssigmentDetail_Create').click( function () 
    {

    });

    //Read Button
    $('#Btn_EppAssigmentDetail_Read').click( function () 
    {
      
    });

    //Update Button
    $('#Btn_EppAssigmentDetail_Update').click( function () 
    {});

    //Delete Button
    $('#Btn_EppAssigmentDetail_Delete').click( function () 
    {
      swal({
        title: "Eliminar Item",
        text: "¿Está seguro de elimar este item?",
        icon: "warning",
        buttons: ["No", "Si"],
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
          /*swal("Poof! Your imaginary file has been deleted!", {
            icon: "success",
          });*/
        } 
        /*else {
          swal("Your imaginary file is safe!");
        }*/
      });
    });

    //Edit Button
    $('#Btn_EppAssigmentDetail_Edit').click( function () 
    {
      //Error message
      swal("Oops!", "Primero debes seleccionar un EPP.", "warning");

      //Success message
      //swal("Genial!", "Cambios guardados!.", "success");

    });

    //Save Changes Button
    $('#Btn_EppAssigmentDetail_Save').click( function () 
    {
      //Send success message
      //SendSuccessMessageUpdateRedirect("Registro del EPP Actualizado")

      //Validate message
      var fruits = ["Banana", "Orange", "Apple", "Mango"];
      SendValidationMessage(fruits);

      //Error message
      //swal("Ooops!", "Ocurrio algo, inténtalo nuevamente.", "warning");

      //Error

      ///
    });

    //Save Changes Button
    $('#Btn_EppAssigmentDetail_Cancel').click( function () 
    {
      //Error message
      swal("Ooops!", "Redirigir con los parametros.", "warning");
    });

    

    /*  ===============================
        ===== VALIDATION MESSAGES =====
        =============================== */
    
    //Swal Messages
    var MsgCreateSuccess    = "";
    var MsgCreateWarning    = "";
    var MsgCreateError      = "Ocurrio un problema al momento de registrar, inténtelo nuevamente.";
    var MsgValidation       = "Necesita verificar los siguientes campos";

    //Swal Title
    var MsgSuccessTitle     = "Genial!";
    var MsgWarningTitle     = "Cuidado!";
    var MsgErrorTitle       = "Oops!";
    var MsgValidationTitle  = "Oops!";
    
    //Swal funcionts
    function SendSuccessMessageUpdate() 
    {
      swal("Genial!", "Los cambios fueron guardados.", "success");
    }

    function SendSuccessMessageUpdateRedirect(url) 
    {
      //Success message
      swal("Genial!", "Registro actualizado!.", "success")
      .then((value) => {
        swal(`Redirigir a la url: `+url);
      });
    }

    function SendValidationMessage(validationsArray)
    {    
      msg = MsgValidation+": \n\n ";
      for (i = 0; i < validationsArray.length; i++) 
      {
        msg += "- " + validationsArray[i]+"\n";
      }
      swal(MsgValidationTitle, msg, "warning");
    }














































    /*============================================
                  DATATABLE FUNCTIONS
      ============================================*/
    
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

    /*============================================
                  GLOBAL FUNCTIONS
      ============================================*/
    
    function redirectToPage(url, parameters=null)
    {
        if (parameters==null)
            window.location.href = url;
        else
            window.location.href = url+'?'+parameters;
    }
 
  });