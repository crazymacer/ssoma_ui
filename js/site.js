$(document).ready(function () 
  {
    /*============================================
                    GLOBAL SCRIPT
    =============================================*/

    DataTableLanguageUrl="datatable.json";

    /*============================================
                  EPP ASSGIMENT SCRIPT
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