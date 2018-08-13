<?php
header('Content-Type: application/json');


if (!empty($_POST["ProjectId"])) 
{
    
    //If para saber si existe o no ese registro
    if ($_POST["ProjectId"]!="") 
    {
        $data   = [];

        for ($i=1; $i < 5; $i++)
        { 
            
            $InfoData1=[]; 
            $InfoData1["EppAssigmentDetailItemId"] = $i;
            $InfoData1["InternalCode"] = "54545465";
            $InfoData1["Description"] = "Casco de EPP";
            $InfoData1["ExpiryDate"] = "12/08/2018";
            $InfoData1["Quantity"] = "1";
            $InfoData1["Price"] = "2.50";
            $InfoData1["TotalPrice"] = "2.50";
            $InfoData1["AssigmentType"] = "Nuevo";
            $data[] = $InfoData1;
            
        }

        $json_data = [
            "data"   => $data   
        ];

        echo json_encode($json_data); 
    }
    else
    {
        
        $InfoData1=[]; 
        $InfoData1["sEcho"] = "1";
        $InfoData1["iTotalRecords"] = "0";
        $InfoData1["iTotalDisplayRecords"] = "0";

        $blank   = [];

        $InfoData1["aaData"] =  $blank;

     

        $json_data = [
            "data"   => $InfoData1   
        ];

        echo json_encode($InfoData1); 

    }

}
else
    {
       

        $InfoData1=[]; 
        $InfoData1["sEcho"] = "1";
        $InfoData1["iTotalRecords"] = "0";
        $InfoData1["iTotalDisplayRecords"] = "0";

        $blank   = [];

        $InfoData1["aaData"] =  $blank;

     

        $json_data = [
            "data"   => $InfoData1   
        ];

        echo json_encode($InfoData1); 


    }









