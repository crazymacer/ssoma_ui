<?php
header('Content-Type: application/json');


if (!empty($_POST["ProjectId"])) 
{
    
    //If para saber si existe o no ese registro
    if ($_POST["ProjectId"]!="") 
    {
        $data   = [];

        for ($i=1; $i < 50; $i++)
        { 
            
            $InfoData1=[]; 
            $InfoData1["Id"] = $i;
            $InfoData1["Dni"] = "54545465";
            $InfoData1["AssigmentDate"] = "12/08/2018";
            $InfoData1["FullName"] = "Juan carlos Palomino Quispe";
            $InfoData1["Company"] = "AHREN Contratistas Generales S.A.C.";
            $InfoData1["JobTitle"] = "Operador";
            $InfoData1["Observation"] = "Ninguna";
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









