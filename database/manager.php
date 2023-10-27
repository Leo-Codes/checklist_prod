<?php
ob_start();

$contentType = isset($_SERVER['CONTENT_TYPE']) ? trim($_SERVER['CONTENT_TYPE']) : '';

if ($contentType == "application/json") {
    //Receive RAW post data:
    $json_content = trim(file_get_contents("php://input"));
    $json_data = json_decode($json_content, true);
    $operation = $json_data['operation'];

    switch ($operation) {
        case ('fetch'):
            fetch_json();
            break;
        case ('update'):
            $updatedJson = $json_data['updatedJson'];
            update_json($updatedJson);
            break;
        
    }
}

function Connect(){
    
    try{
        $PDO = new PDO("mysql:host=localhost;dbname=lcodes","root","");
        // returns PHP DATA OBJECT
        // echo "conectado";
        return $PDO;
    }catch(PDOException $e){
        echo $e;
        
    }


}

function fetch_json(){
    $pdo = Connect();
    $stmt = $pdo->prepare("SELECT * from json_checklist where id=2");
     try {
        $stmt->execute();
        $result = $stmt->fetch(PDO::FETCH_ASSOC);
        echo json_encode($result['json_data']);
     }catch(PDOexception $e){
        echo $e->getMessage();
     }
}

function update_json($_updatedJson){
    $pdo = Connect();
    $stmt = $pdo->prepare("UPDATE json_checklist SET json_data=:cur_json where id=2");
    $stmt->bindParam(':cur_json', $_updatedJson);
    try{
        $stmt->execute();
        echo json_encode("updated");
    }catch(PDOException $e){
        echo $e;
    }

}

// get_json();