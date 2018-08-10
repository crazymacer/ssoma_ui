<?php
header('Content-Type: application/json');
/*
$prep   = $this->conexion->prepare($sql);  
$prep->execute();   
$result = $prep->fetchAll(PDO::FETCH_ASSOC);

$data   = [];
foreach ($result as $key => $value) {
    $InfoData=[]; 
    foreach ($value as $key1 => $value1) {
        $InfoData[$key1] = $value1;
    }
    $data[] = $InfoData;
}

$json_data = [
    "data"   => $data   
];

echo json_encode($json_data); 

*/

    $data   = [];
    
    $InfoData1=[]; 
    $InfoData1["Id"] = "1";
    $InfoData1["Dni"] = "54545465";
    $InfoData1["AssigmentDate"] = "12/08/2018";
    $InfoData1["FirstName"] = "Jhon";
    $InfoData1["LastName"] = "Doe";
    $InfoData1["JobTitle"] = "Operador";
    $InfoData1["Observation"] = "Ninguna";
    $data[] = $InfoData1;

    $InfoData2=[]; 
    $InfoData2["Id"] = "2";
    $InfoData2["Dni"] = "65451565";
    $InfoData2["AssigmentDate"] = "20/08/2018";
    $InfoData2["FirstName"] = "Jane";
    $InfoData2["LastName"] = "Smith";
    $InfoData2["JobTitle"] = "Auxiliar";
    $InfoData2["Observation"] = "Ninguna";
    $data[] = $InfoData2;

$json_data = [
    "data"   => $data   
];

echo json_encode($json_data); 