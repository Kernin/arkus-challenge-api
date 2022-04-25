<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Access-Control-Allow-Headers,Content-Type,Access-Control-Allow-Methods, Authorization, X-Requested-With');

include_once '../../config/Database.php';
include_once '../../models/TeamBO.php';
include_once '../../models/TeamMemberDO.php';

$database = new Database();
$db = $database->connect();

$team_logic = new TeamBO($db);

$data = json_decode(file_get_contents('php://input'));

$team_data = [];

foreach ($data->team as $member) {
  $arr_member = (array)$member;
  $team_member = TeamMemberDO::constructNewMember($arr_member);
  array_push($team_data, $team_member);
}

if ($team_logic->createTeam($team_data)) {
  echo json_encode(
    array('message' => 'Team Created')
  );
} else {
  echo json_encode(
    array('message' => 'Team Not Created')
  );
}
